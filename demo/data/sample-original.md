> Recorded educational sample. Heuristic findings are not proof of exploitability. Version banners are synthetic matching signals.

# Firmware analysis report: samples/sample-original

*Generated 2026-11-19T06:50:03.438559+00:00 by defile 2.8.0+defile.2*

## Executive summary

- Binaries analyzed: **1**
- Findings: **5** (critical 1, high 3, medium 0, low 0)
- Known CVEs correlated: CVE-2014-0160, CVE-2016-2107

## Binaries

| Path | Arch | Bits | Endian | NX | Canary | RELRO | PIE | Stripped |
|------|------|------|--------|----|--------|-------|-----|----------|
| `samples/sample-original/bin/probe` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |

## Findings

### 1. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `25fe0de25498fb37` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-original/bin/probe` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 2. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-original/bin/probe`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `60871fcc3f21a5c1` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-original/bin/probe` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 3. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `7ff0e3e86f767207` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-original/bin/probe` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 4. [HIGH] Telnet service enabled in config

- **Class:** insecure_service_enabled  
- **Confidence:** 60%  
- **Component:** `/etc/config/device.conf`  
- **Rule:** `config-hardening`  
- **Finding ID:** `0a757dcae3008fbc` (triage: new)  

/etc/config/device.conf: Telnet service enabled in config -- `telnet_enable=1`

Evidence — `samples/sample-original/etc/config/device.conf` @ `(module)`:

```asm
telnet_enable=1
```

**Remediation:** Disable telnet; use SSH with key auth or a local-only management interface instead.

### 5. [INFO] Startup/service script: S10sample

- **Class:** init_script  
- **Confidence:** 60%  
- **Component:** `/etc/init.d/S10sample`  
- **Rule:** `fs-hardening`  
- **Finding ID:** `34e15bad434742c5` (triage: new)  

/etc/init.d/S10sample runs at boot/service start; review the services it launches as part of the attack surface.

Evidence — `samples/sample-original/etc/init.d/S10sample` @ `(module)`:

```asm
-rwxr-xr-x
```

**Remediation:** Disable unnecessary services.
