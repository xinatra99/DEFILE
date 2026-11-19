package main

import (
	"os/exec"
	"path/filepath"
	"syscall"
	"testing"
)

func TestJobControlRealProcessAndRestart(t *testing.T) {
	dir := filepath.Join(t.TempDir(), "jobs")
	store, err := NewStore(dir, "contract")
	if err != nil {
		t.Fatal(err)
	}
	job := store.Create("/fixture", false)
	cmd := exec.Command("sleep", "30")
	cmd.SysProcAttr = &syscall.SysProcAttr{Setpgid: true}
	if err := cmd.Start(); err != nil {
		t.Fatal(err)
	}
	t.Cleanup(func() {
		if cmd.ProcessState == nil {
			_ = syscall.Kill(-cmd.Process.Pid, syscall.SIGKILL)
		}
	})
	store.update(job.ID, func(j *Job) { j.Status = StatusRunning })
	store.setControl(job.ID, cmd.Process, func() { _ = syscall.Kill(-cmd.Process.Pid, syscall.SIGKILL) })
	if err := store.Pause(job.ID); err != nil {
		t.Fatal(err)
	}
	if j, _ := store.Get(job.ID); j.Status != StatusPaused {
		t.Fatal("pause state missing")
	}
	if err := store.Resume(job.ID); err != nil {
		t.Fatal(err)
	}
	if j, _ := store.Get(job.ID); j.Status != StatusRunning {
		t.Fatal("resume state missing")
	}
	if err := store.Cancel(job.ID); err != nil {
		t.Fatal(err)
	}
	_ = cmd.Wait()
	if j, _ := store.Get(job.ID); j.Status != StatusCancelled {
		t.Fatal("cancel state missing")
	}
	// Worker completion normally persists the terminal record through update.
	store.update(job.ID, func(j *Job) { j.Status = StatusCancelled })
	unfinished := store.Create("/unfinished", false)
	reopened, err := NewStore(dir, "contract")
	if err != nil {
		t.Fatal(err)
	}
	if j, _ := reopened.Get(job.ID); j.Status != StatusCancelled {
		t.Fatal("terminal state changed after restart")
	}
	if j, _ := reopened.Get(unfinished.ID); j.Status != StatusFailed || j.Error != "interrupted by service restart" {
		t.Fatal("unfinished job not reconciled")
	}
	if fresh := reopened.Create("/next", false); fresh.ID == job.ID || fresh.ID == unfinished.ID {
		t.Fatal("job ID reused after restart")
	}
}
