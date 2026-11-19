package main

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"strings"
	"testing"
	"time"
)

// Exercise the real routes and stores; challenge answers are read only inside
// this test process. Production CAPTCHA and authentication are never disabled.
func TestAuthenticationHTTPContractAndRestart(t *testing.T) {
	dir := t.TempDir()
	users := filepath.Join(dir, "users.json")
	auth := NewAuthStore(users)
	password := randHex(16)
	auth.SetPassword("analyst", password)
	store, err := NewStore(filepath.Join(dir, "jobs"), "contract")
	if err != nil {
		t.Fatal(err)
	}
	api := NewAPI(store, nil, nil, nil, "", "", false, "", auth, nil)
	mux := http.NewServeMux()
	api.Routes(mux)
	request := func(method, path, body, token string) *httptest.ResponseRecorder {
		r := httptest.NewRequest(method, path, strings.NewReader(body))
		if token != "" {
			r.Header.Set("Authorization", "Bearer "+token)
		}
		w := httptest.NewRecorder()
		mux.ServeHTTP(w, r)
		return w
	}
	challenge := func() (string, string) {
		w := request("GET", "/api/captcha", "", "")
		var data map[string]string
		if err := json.Unmarshal(w.Body.Bytes(), &data); err != nil {
			t.Fatal(err)
		}
		if !strings.HasPrefix(data["image"], "data:image/png;base64,") {
			t.Fatal("missing CAPTCHA image")
		}
		api.captcha.mu.Lock()
		answer := api.captcha.entries[data["id"]].answer
		api.captcha.mu.Unlock()
		return data["id"], answer
	}
	login := func(pass string) *httptest.ResponseRecorder {
		id, answer := challenge()
		body, _ := json.Marshal(loginReq{Username: "analyst", Password: pass, CaptchaID: id, CaptchaAnswer: answer})
		return request("POST", "/api/login", string(body), "")
	}
	for _, route := range []struct{ method, path string }{
		{"GET", "/api/jobs"}, {"GET", "/api/jobs/example/report?format=md&download=1"},
		{"POST", "/api/upload"}, {"POST", "/api/compare"}, {"GET", "/api/ai/providers"},
		{"POST", "/api/jobs"}, {"POST", "/api/jobs/example/triage"},
	} {
		if w := request(route.method, route.path, "{}", ""); w.Code != 401 {
			t.Fatalf("unprotected %s: %d", route.path, w.Code)
		}
	}
	if w := request("POST", "/api/login", `{"username":"analyst","password":"wrong"}`, ""); w.Code != 400 {
		t.Fatal("CAPTCHA missing was accepted")
	}
	id, answer := challenge()
	if !api.captcha.Verify(id, answer) || api.captcha.Verify(id, answer) {
		t.Fatal("CAPTCHA is not one-use")
	}
	w := login(password)
	if w.Code != 200 {
		t.Fatalf("valid login: %d", w.Code)
	}
	var session map[string]string
	json.Unmarshal(w.Body.Bytes(), &session)
	token := session["session"]
	if token == "" {
		t.Fatal("no session")
	}
	if w := request("GET", "/api/jobs", "", token); w.Code != 200 {
		t.Fatal("authenticated request failed")
	}
	if w := request("GET", "/api/jobs?token="+token, "", ""); w.Code != 200 {
		t.Fatal("SSE/download query-token contract failed")
	}
	newPassword := randHex(16)
	body, _ := json.Marshal(changePasswordReq{OldPassword: password, NewPassword: newPassword})
	if w := request("POST", "/api/change-password", string(body), token); w.Code != 200 {
		t.Fatal("password change failed")
	}
	if auth.verify("analyst", password) || !auth.verify("analyst", newPassword) {
		t.Fatal("password change not applied")
	}
	reopened := NewAuthStore(users)
	if !reopened.verify("analyst", newPassword) {
		t.Fatal("password lost after restart")
	}
	if _, ok := reopened.Check(token); ok {
		t.Fatal("session survived restart")
	}
	raw, _ := os.ReadFile(users)
	if strings.Contains(string(raw), newPassword) || strings.Contains(string(raw), password) {
		t.Fatal("plaintext password persisted")
	}
	auth.mu.Lock()
	info := auth.sessions[token]
	info.expires = time.Now().Add(-time.Second)
	auth.sessions[token] = info
	auth.mu.Unlock()
	if w := request("GET", "/api/jobs", "", token); w.Code != 401 {
		t.Fatal("expired session accepted")
	}
	w = login(newPassword)
	json.Unmarshal(w.Body.Bytes(), &session)
	token = session["session"]
	request("POST", "/api/logout", "", token)
	if w := request("GET", "/api/jobs", "", token); w.Code != 401 {
		t.Fatal("logout left session usable")
	}
	for i := 0; i < maxFailedAttempts; i++ {
		if w := login(randHex(16)); w.Code != 401 {
			t.Fatalf("failed attempt %d: %d", i, w.Code)
		}
	}
	if w := login(newPassword); w.Code != 429 {
		t.Fatal("account lockout not enforced")
	}
}
