package main

import (
	"os"
	"path/filepath"
)

// defaultDataDir preserves an existing installation's default data directory.
// Files stay in place: moving databases without their WAL files or losing ai.key
// could strand scan history or provider credentials. An explicit -data wins in main.
func defaultDataDir(tempDir string) string {
	current := filepath.Join(tempDir, "defile-service")
	if info, err := os.Stat(current); err == nil && info.IsDir() {
		return current
	}
	legacy := filepath.Join(tempDir, "ifda-service")
	for _, marker := range []string{"reports.db", "users.json", "triage.json", "jobs"} {
		if _, err := os.Stat(filepath.Join(legacy, marker)); err == nil {
			return legacy
		}
	}
	return current
}
