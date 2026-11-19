> Recorded educational sample. Heuristic findings are not proof of exploitability. Version banners are synthetic matching signals.

# Firmware analysis report: samples/sample-hardened

*Generated 2026-11-19T06:50:03.976244+00:00 by defile 2.8.0+defile.2*

## Executive summary

- Binaries analyzed: **1**
- Findings: **1** (critical 0, high 0, medium 0, low 0)

## Binaries

| Path | Arch | Bits | Endian | NX | Canary | RELRO | PIE | Stripped |
|------|------|------|--------|----|--------|-------|-----|----------|
| `samples/sample-hardened/bin/probe` | x86_64 | 64 | little | yes | yes | full | yes | **no** |

## Findings

### 1. [INFO] Startup/service script: S10sample

- **Class:** init_script  
- **Confidence:** 60%  
- **Component:** `/etc/init.d/S10sample`  
- **Rule:** `fs-hardening`  
- **Finding ID:** `3d2eee3cbd2efe9c` (triage: new)  

/etc/init.d/S10sample runs at boot/service start; review the services it launches as part of the attack surface.

Evidence — `samples/sample-hardened/etc/init.d/S10sample` @ `(module)`:

```asm
-rwxr-xr-x
```

**Remediation:** Disable unnecessary services.
