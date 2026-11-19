package main

import (
	"os"
	"path/filepath"
	"testing"
)

func TestDefaultDataDirPreservesExistingInstallation(t *testing.T) {
	temp := t.TempDir()
	current := filepath.Join(temp, "defile-service")
	if got := defaultDataDir(temp); got != current {
		t.Fatalf("new install: %s", got)
	}
	legacy := filepath.Join(temp, "ifda-service")
	if err := os.Mkdir(legacy, 0700); err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(filepath.Join(legacy, "users.json"), []byte("{}"), 0600); err != nil {
		t.Fatal(err)
	}
	if got := defaultDataDir(temp); got != legacy {
		t.Fatalf("existing install: %s", got)
	}
	if err := os.Mkdir(current, 0700); err != nil {
		t.Fatal(err)
	}
	if got := defaultDataDir(temp); got != current {
		t.Fatalf("current data should take priority: %s", got)
	}
}
