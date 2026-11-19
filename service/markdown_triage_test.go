package main

import (
	"strings"
	"testing"
)

func TestMarkdownTriageOverlayPreservesEvidence(t *testing.T) {
	const id = "0123456789abcdef"
	metadata := "- **Rule:** `sample`  \n- **Finding ID:** `" + id + "` (triage: new)  \n"
	evidence := "```asm\n" + metadata + "```\n"
	input := []byte(metadata + "\nEvidence:\n" + evidence)
	for _, state := range []string{"confirmed", "false_positive", "accepted_risk", "new"} {
		got := string(overlayMarkdownTriage(input, map[string]string{id: state}))
		if !strings.Contains(got, "`"+id+"` (triage: "+state+")") {
			t.Fatalf("missing state %s", state)
		}
		if !strings.Contains(got, evidence) {
			t.Fatal("firmware evidence changed")
		}
	}
	previous := []byte(strings.Replace(metadata, "triage: new", "triage: confirmed", 1))
	if got := string(overlayMarkdownTriage(previous, nil)); !strings.Contains(got, "triage: new") {
		t.Fatal("reset state was not reflected")
	}
}
