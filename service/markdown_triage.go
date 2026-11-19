package main

import (
	"regexp"
	"strings"
)

var markdownFindingState = regexp.MustCompile("^(- \\*\\*Finding ID:\\*\\* `[a-f0-9]{16}` \\(triage: )([a-z_]+)(\\)  \\r?\\n?)$")
var markdownFindingID = regexp.MustCompile("`([a-f0-9]{16})`")

// Overlay only the renderer's metadata row immediately after its Rule row.
// Code-fenced firmware evidence remains byte-for-byte unchanged. Reading the
// existing Markdown avoids materializing a large full JSON report to change state.
func overlayMarkdownTriage(data []byte, states map[string]string) []byte {
	lines := strings.SplitAfter(string(data), "\n")
	fenced, afterRule := false, false
	for i, line := range lines {
		trimmed := strings.TrimSpace(line)
		if strings.HasPrefix(trimmed, "```") {
			fenced = !fenced
			afterRule = false
			continue
		}
		if !fenced && afterRule {
			match := markdownFindingState.FindStringSubmatch(line)
			id := markdownFindingID.FindStringSubmatch(line)
			if match != nil && id != nil {
				state := states[id[1]]
				if !validTriage[state] {
					state = "new"
				}
				lines[i] = match[1] + state + match[3]
			}
		}
		afterRule = !fenced && strings.HasPrefix(trimmed, "- **Rule:** `")
	}
	return []byte(strings.Join(lines, ""))
}
