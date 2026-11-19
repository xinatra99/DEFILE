> Recorded educational sample. Heuristic findings are not proof of exploitability. Version banners are synthetic matching signals.

# Firmware analysis report: samples/sample-corpus

*Generated 2026-11-19T06:50:04.339493+00:00 by defile 2.8.0+defile.2*

## Executive summary

- Binaries analyzed: **101**
- Findings: **305** (critical 101, high 203, medium 0, low 0)
- Known CVEs correlated: CVE-2014-0160, CVE-2016-2107

## Binaries

| Path | Arch | Bits | Endian | NX | Canary | RELRO | PIE | Stripped |
|------|------|------|--------|----|--------|-------|-----|----------|
| `samples/sample-corpus/bin/probe-026` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-085` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-038` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-027` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-022` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-071` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-015` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-004` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-064` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-006` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-045` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-089` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-090` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-012` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-043` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-051` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-070` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-060` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-061` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-016` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-049` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-058` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-098` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-076` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-011` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-034` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-069` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-024` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-009` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-047` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-099` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-018` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-037` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-072` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-053` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-084` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-075` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-092` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-091` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-042` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-077` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-086` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-097` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-010` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-067` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-021` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-056` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-000` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-048` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-083` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-029` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-096` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-052` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-050` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-003` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-082` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-002` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-014` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-032` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-079` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-073` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-030` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-078` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-088` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-007` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-036` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-095` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-040` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-005` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-023` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-019` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-008` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-035` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-046` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-059` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-074` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-066` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-041` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-031` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-028` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-087` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-065` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-044` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-055` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-033` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-057` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-025` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-081` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-020` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-068` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-054` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-017` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-062` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-094` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-063` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-093` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-080` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-039` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-013` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |
| `samples/sample-corpus/bin/probe-001` | x86_64 | 64 | little | yes | **no** | partial | **no** | **no** |

## Findings

### 1. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `f3cab9ee9c5ee775` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-026` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 2. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `cd1e2118c1cb2433` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-085` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 3. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `b8b5ee4fbc255402` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-038` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 4. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `beb5392e1bb83506` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-027` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 5. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `26a52549b4295020` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-022` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 6. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `ff938e3645d91e53` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-071` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 7. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `dbfcc5e6a2778651` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-015` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 8. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `9fd6ef082fb283b4` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-004` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 9. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `7baceb98784d00be` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-064` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 10. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `7c16c9f41ee70af6` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-006` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 11. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `d041129f6faee593` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-045` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 12. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `b30dafab6480caf3` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-089` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 13. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `9dc185e289e96677` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-090` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 14. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `c7e7c846809ba00e` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-012` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 15. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `9731741af44d2793` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-043` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 16. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `47005ed435e95860` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-051` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 17. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `aaacd745bfb22b4f` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-070` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 18. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `039cc8469d6647b4` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-060` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 19. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `e8e29d1e5ecab5b0` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-061` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 20. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `dce16f01c8bdd3ef` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-016` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 21. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `4ce8e6bc9d61092e` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-049` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 22. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `4829cd4bbf9c233d` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-058` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 23. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `58eda617db3f0b26` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-098` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 24. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `6152ae5968125c2c` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-076` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 25. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `e14b8ea2e3055214` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-011` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 26. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `f856fdedda28c693` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-034` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 27. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `343a2d64f39f4f14` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-069` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 28. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `b1f02b52e668c2f7` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 29. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `9faa10189015c8bf` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-024` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 30. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `0c1540b7f82df1b5` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-009` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 31. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `1817cc938aef4508` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-047` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 32. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `e5fc866a55f23c68` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-099` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 33. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `24a78356e918c37e` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-018` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 34. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `5447739e002eb7df` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-037` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 35. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `dc7fe3ffbe1ca087` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-072` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 36. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `59c6281f9be41bf2` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-053` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 37. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `c98fcfb181942513` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-084` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 38. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `b7df08a601513c7f` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-075` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 39. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `f9904e8e3da380e3` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-092` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 40. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `2f8c0ced62925369` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-091` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 41. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `fdb7c827ea5745eb` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-042` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 42. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `d3ce2ea28b61b2b4` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-077` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 43. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `3eec1ce74dd9fc15` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-086` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 44. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `2b245c74a157a316` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-097` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 45. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `f1cde0109cb08f67` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-010` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 46. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `339491a9a26e93fa` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-067` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 47. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `96a6e075823ba871` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-021` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 48. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `19e955b0220ea02c` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-056` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 49. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `6c2997fb22c2c4f1` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-000` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 50. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `efe75173dfe75280` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-048` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 51. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `943e97cfe8a7ffeb` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-083` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 52. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `d71dc0bf774a4281` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-029` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 53. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `3a1810d80bef42ec` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-096` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 54. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `04012a06de6729a8` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-052` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 55. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `8e482af974b1e59a` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-050` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 56. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `3555400da8622e7c` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-003` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 57. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `3149b23122e91acc` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-082` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 58. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `0b5f675d6b22a24e` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-002` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 59. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `16744a3b20a66012` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-014` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 60. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `104de90dd03c7070` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-032` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 61. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `0212c5d6cabb7c85` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-079` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 62. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `26b66bd3766a064d` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-073` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 63. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `6633979b43b6fdbc` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-030` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 64. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `b5bc6d407de733b7` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-078` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 65. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `7f6865a61aa43049` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-088` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 66. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `fefc5bfde035e21f` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-007` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 67. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `01824b1dadb9fde6` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-036` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 68. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `6434733472832ef9` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-095` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 69. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `f804b8d11c81c34a` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-040` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 70. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `5d9d8027b9137768` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-005` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 71. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `1ec64f390ecec278` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-023` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 72. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `f4d5ac799dade298` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-019` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 73. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `b547055c223c35da` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-008` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 74. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `24b8a810d224a34a` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-035` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 75. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `cc0833cd54bb607f` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-046` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 76. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `7ba68cd0d51a0c25` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-059` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 77. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `c0fb763d0bf1db91` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-074` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 78. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `78325017b639472a` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-066` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 79. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `e1d4f35a1ccdaef0` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-041` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 80. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `7c45f239c4759552` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-031` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 81. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `b44629b21482bfc2` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-028` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 82. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `5f0a96be0397edcf` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-087` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 83. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `1068352e845a9322` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-065` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 84. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `a77ce65cf6e247ec` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-044` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 85. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `57c9af24c8e53628` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-055` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 86. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `942630037e6eb58c` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-033` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 87. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `843ee3f97e57978e` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-057` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 88. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `5a1395de970d9a78` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-025` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 89. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `df9ac05e0539f150` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-081` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 90. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `23d0bed9d1f5a39f` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-020` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 91. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `72ffdd58ddb62093` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-068` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 92. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `63add933083cfd45` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-054` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 93. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `7e74681f2c0babdb` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-017` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 94. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `526afb15cd053c3e` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-062` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 95. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `395b0f66b408f57f` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-094` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 96. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `e2a2e593e3b3179d` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-063` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 97. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `7461c094cb373bf1` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-093` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 98. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `891840a0147d8a61` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-080` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 99. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `8b87bb1befd7d37e` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-039` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 100. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `3c86d305677e0bb7` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-013` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 101. [CRITICAL] openssl 1.0.1f: CVE-2014-0160

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `57bd5941a47ed41b` (triage: new)  
- **CVE:** CVE-2014-0160  

Heartbleed: TLS heartbeat OOB read

Evidence — `samples/sample-corpus/bin/probe-001` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 102. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-026`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `2530a6c8bafaa619` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-026` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 103. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-085`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `ba9b4ee347ec287b` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-085` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 104. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-038`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `0dd1a52d87eb8a8a` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-038` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 105. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-027`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `062855ea869d97c4` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-027` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 106. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-022`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `d0cd985ab5cfdb1f` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-022` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 107. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-071`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `ac6228222f458810` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-071` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 108. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-015`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `92e3e9fab9c9b4be` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-015` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 109. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-004`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `1642c4c0fa6815b1` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-004` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 110. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-064`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `c5283f998fc64392` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-064` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 111. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-006`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `78f240beebcaf4ed` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-006` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 112. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-045`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `b0dac32bb04c8934` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-045` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 113. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-089`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `0b6c28a53ddc3363` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-089` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 114. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-090`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `2f82736b80fd2e93` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-090` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 115. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-012`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `ed1ccd5adbd77a67` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-012` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 116. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-043`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `ca5a49aea70ef91b` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-043` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 117. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-051`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `f971bad395f6cfd2` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-051` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 118. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-070`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `e6d8e6002f881e79` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-070` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 119. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-060`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `816b63dda338c947` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-060` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 120. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-061`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `b5dc7a200b44ce05` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-061` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 121. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-016`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `38edb26d24eb75db` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-016` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 122. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-049`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `721f5b24c410dde9` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-049` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 123. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-058`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `0342943abb6a0060` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-058` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 124. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-098`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `b6559629cd5e3ec5` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-098` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 125. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-076`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `4e83005b91bd8bbc` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-076` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 126. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-011`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `493afda4a443a175` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-011` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 127. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-034`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `3ee538c1527a8388` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-034` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 128. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-069`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `c666b3eb784be4d4` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-069` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 129. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `47b270137d1e2ccb` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 130. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-024`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `1d16732d59f9968c` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-024` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 131. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-009`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `1587d4a38c6ea00c` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-009` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 132. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-047`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `ad6cd7ed270a8be2` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-047` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 133. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-099`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `6d0d6409ac4439c3` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-099` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 134. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-018`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `00f6258aac4290fb` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-018` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 135. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-037`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `4127ba834dd6458c` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-037` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 136. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-072`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `8755a483c9a85447` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-072` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 137. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-053`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `7ebc459f92a3cc86` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-053` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 138. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-084`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `3fc04b5237f0a675` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-084` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 139. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-075`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `6dbb00f494de0e09` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-075` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 140. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-092`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `0d6076c522995b59` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-092` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 141. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-091`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `dc4a0b470a3e9943` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-091` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 142. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-042`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `8b659b76b106f507` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-042` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 143. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-077`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `d444747619078b49` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-077` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 144. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-086`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `c4b4040462bfb597` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-086` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 145. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-097`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `8c6feeec12bf9c52` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-097` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 146. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-010`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `2c2c2b02aca43430` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-010` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 147. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-067`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `23d216edf2181f1a` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-067` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 148. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-021`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `3359c59bbabdec7b` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-021` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 149. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-056`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `900e46a8f08bce9a` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-056` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 150. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-000`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `f600abbcf8dd2ae8` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-000` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 151. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-048`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `cec69462efe2dd30` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-048` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 152. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-083`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `af5f8baedd316d01` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-083` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 153. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-029`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `7c8c3db7988a22b8` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-029` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 154. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-096`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `f4f41792bf18c239` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-096` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 155. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-052`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `10ba841725921f11` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-052` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 156. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-050`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `ac737f5334cec32e` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-050` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 157. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-003`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `aab387958d036c10` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-003` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 158. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-082`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `5584ab3991eed4d0` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-082` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 159. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-002`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `4356b12cba515335` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-002` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 160. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-014`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `29b9d649b3939623` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-014` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 161. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-032`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `9d9396618a963fee` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-032` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 162. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-079`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `b525b86eea3d0a25` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-079` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 163. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-073`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `1e5d2a3b9319961a` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-073` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 164. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-030`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `43ac83d4bbe69e98` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-030` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 165. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-078`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `22324bccda6ff62b` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-078` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 166. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-088`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `149945015af3116c` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-088` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 167. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-007`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `a321f0b5e3cf5aec` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-007` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 168. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-036`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `4a8068c4e25ea64e` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-036` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 169. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-095`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `0d1a5da0ccb79113` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-095` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 170. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-040`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `56f9dbf3b0480e90` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-040` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 171. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-005`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `457b17619ba02ede` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-005` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 172. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-023`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `7520db4ed764957c` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-023` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 173. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-019`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `6b6e8262c0782fb1` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-019` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 174. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-008`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `0d00ad436658670b` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-008` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 175. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-035`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `89c3186f419a73fc` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-035` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 176. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-046`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `84b8118858115aac` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-046` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 177. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-059`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `babd56e6c469a628` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-059` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 178. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-074`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `ac6a44e66eb2fd44` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-074` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 179. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-066`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `33d940a5e55f616c` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-066` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 180. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-041`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `8fff7f61e097ee45` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-041` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 181. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-031`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `2ffa8e609c76ef96` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-031` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 182. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-028`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `7dabd88f988ae159` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-028` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 183. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-087`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `f9e757ce9cf9c615` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-087` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 184. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-065`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `2d94309dfc2b7a35` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-065` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 185. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-044`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `4cff412a2ee0b0f1` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-044` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 186. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-055`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `4ed77502aa72bd16` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-055` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 187. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-033`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `49fd448428a92d2c` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-033` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 188. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-057`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `77b9fbe00acf7114` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-057` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 189. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-025`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `ae6a21a5df02a5fb` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-025` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 190. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-081`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `f0b15ba5be84fa30` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-081` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 191. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-020`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `0b53aa9af28bd1aa` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-020` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 192. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-068`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `5ded40f5f3bddccf` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-068` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 193. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-054`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `69f4b670d9b36835` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-054` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 194. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-017`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `02e82c72a32336bf` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-017` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 195. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-062`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `8a01aec38679c819` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-062` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 196. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-094`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `da4b3e884cc26901` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-094` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 197. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-063`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `89931e5df6ac79aa` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-063` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 198. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-093`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `6c5fa0bfbefe55a3` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-093` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 199. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-080`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `dd6b482bd5a3e9f2` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-080` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 200. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-039`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `0ea52bc36dca8f1e` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-039` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 201. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-013`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `120c9ecafe645981` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-013` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 202. [HIGH] Call to unsafe function strcpy() in sample_copy

- **Class:** buffer_overflow  
- **Confidence:** 80%  
- **Component:** `samples/sample-corpus/bin/probe-001`  
- **Rule:** `unsafe-api`  
- **Finding ID:** `54203d39a14dba75` (triage: new)  

strcpy: unbounded copy into fixed buffer.

Evidence — `samples/sample-corpus/bin/probe-001` @ `sample_copy` `0x40117d`:

```asm
call 0x401050  <strcpy>
```

**Remediation:** Use bounded operations (strlcpy/snprintf), validate lengths, and enable FORTIFY_SOURCE.

### 203. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `822f4d1966101a28` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-026` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 204. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `00ad81040d479c28` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-085` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 205. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `9b68784c37435c1c` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-038` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 206. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `3eee6d7658de70d8` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-027` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 207. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `f72c0242a83ecac4` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-022` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 208. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `6ce86c3cc54dee78` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-071` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 209. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `0897493ed500cfbd` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-015` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 210. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `7a6d47e651866684` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-004` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 211. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `82365461d3390c15` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-064` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 212. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `70e101e883e2c123` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-006` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 213. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `d2cce25b4d09b41a` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-045` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 214. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `870e3d3bd98a53d7` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-089` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 215. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `3dd50bfa78f58d8a` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-090` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 216. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `98f94873bd0e8047` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-012` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 217. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `c8662933363ffe92` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-043` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 218. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `7ba257ff197e92ff` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-051` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 219. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `e372bbfd0c0c679d` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-070` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 220. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `a219244d21e70586` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-060` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 221. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `42c76ee7da1b50b0` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-061` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 222. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `b19f9cbc17cf7c64` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-016` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 223. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `94ee332b3485dbdc` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-049` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 224. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `860f1231a2783a08` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-058` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 225. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `8e90d50bc8d32951` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-098` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 226. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `655f404158ceedb0` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-076` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 227. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `326c8b98c6ad146b` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-011` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 228. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `5e72ade6d91438fb` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-034` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 229. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `16d71c7e82ad170d` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-069` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 230. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `32773ec3b0803d98` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 231. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `219affaf6e25c9bd` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-024` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 232. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `696e7bc983d38940` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-009` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 233. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `f9ec78259cb7e34f` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-047` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 234. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `a445369d40d5cc38` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-099` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 235. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `d0db39282a7d2775` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-018` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 236. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `c81cfe0d6301ba66` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-037` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 237. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `4b7d1603ac0b57c1` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-072` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 238. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `b21faa5010d06ad7` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-053` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 239. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `06970904ab7d16d3` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-084` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 240. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `03df3dd0e75ba5f1` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-075` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 241. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `59e10f99b7ad24be` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-092` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 242. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `b570b14805926719` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-091` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 243. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `40d57949f110d795` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-042` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 244. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `0a1b87e5d405592a` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-077` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 245. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `0478ea59557a2619` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-086` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 246. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `ed15c917d447bf47` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-097` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 247. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `1e1d4d5f55fbe689` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-010` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 248. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `769d8e4ba4bf3452` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-067` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 249. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `9f625ae1ca80fefa` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-021` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 250. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `e7828b43b4c20462` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-056` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 251. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `e99255e36368a322` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-000` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 252. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `f09d54788c638ccc` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-048` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 253. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `3c2e156ccdda3732` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-083` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 254. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `6039a191dd5a2ebf` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-029` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 255. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `d7f39502111b5d12` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-096` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 256. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `a8028001aa7dbc42` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-052` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 257. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `b4c981893281adb0` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-050` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 258. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `aa65f4532b28f754` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-003` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 259. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `b26ccf7d7cd51767` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-082` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 260. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `1bdd3ff8915c44c4` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-002` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 261. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `29c1ec690f15a39f` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-014` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 262. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `72657b37f4a48274` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-032` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 263. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `17bed7108d1d6cd0` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-079` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 264. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `54c7e16fcaa8b0d7` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-073` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 265. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `da58e3ff4aafe00e` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-030` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 266. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `ee935f95c55946d9` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-078` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 267. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `8118c5ad3b5a5e9b` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-088` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 268. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `299781c36b079f70` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-007` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 269. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `15110acea0a1e4b8` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-036` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 270. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `a16087b54bad034a` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-095` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 271. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `ff313cb588c07530` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-040` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 272. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `b0e51d9068df314a` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-005` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 273. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `3869a329bb2b40fb` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-023` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 274. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `54f226c723c91dbd` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-019` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 275. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `eedb93809fce1b48` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-008` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 276. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `385bd73523cbd91c` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-035` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 277. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `2cede7554f95aea9` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-046` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 278. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `5386a801328afc68` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-059` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 279. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `c5ff826fd5288dc3` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-074` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 280. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `31fe0f4b8a40a093` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-066` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 281. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `0ee212dae9bcdba5` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-041` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 282. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `6553ee3b35fe4aab` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-031` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 283. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `4d0944976ee53348` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-028` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 284. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `625d66549072cc19` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-087` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 285. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `4d78c92f313f0804` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-065` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 286. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `cf331c65b2337a49` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-044` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 287. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `85c6c82a1c4d335d` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-055` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 288. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `145d57c42e228273` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-033` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 289. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `5b739f257f2afbe0` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-057` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 290. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `99ff5657085d2c00` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-025` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 291. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `abd11099f06656b4` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-081` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 292. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `e7723d88fadf21ed` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-020` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 293. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `7902de28e65dea64` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-068` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 294. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `8eb3d21c2be3e8e7` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-054` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 295. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `e0f05434ff630e6a` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-017` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 296. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `7f6380140afcd212` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-062` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 297. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `e0b46a3fd300fa60` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-094` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 298. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `b9bc2585a991f8b3` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-063` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 299. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `c9ec85e9be61baac` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-093` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 300. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `5473f4cb5d0bab24` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-080` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 301. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `12da518cf8d3fd34` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-039` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 302. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `d8c01287f34f5704` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-013` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 303. [HIGH] openssl 1.0.1f: CVE-2016-2107

- **Class:** known_cve  
- **Confidence:** 70%  
- **Component:** `openssl@1.0.1f`  
- **Rule:** `known-cve`  
- **Finding ID:** `9dc8ad27b688aedc` (triage: new)  
- **CVE:** CVE-2016-2107  

OpenSSL AES-NI CBC padding oracle

Evidence — `samples/sample-corpus/bin/probe-001` @ `(module)`:

```asm
OpenSSL 1.0.1f
```

**Remediation:** Upgrade openssl to a fixed release.

### 304. [HIGH] Telnet service enabled in config

- **Class:** insecure_service_enabled  
- **Confidence:** 60%  
- **Component:** `/etc/config/device.conf`  
- **Rule:** `config-hardening`  
- **Finding ID:** `6dbd1863c3e1c557` (triage: new)  

/etc/config/device.conf: Telnet service enabled in config -- `telnet_enable=1`

Evidence — `samples/sample-corpus/etc/config/device.conf` @ `(module)`:

```asm
telnet_enable=1
```

**Remediation:** Disable telnet; use SSH with key auth or a local-only management interface instead.

### 305. [INFO] Startup/service script: S10sample

- **Class:** init_script  
- **Confidence:** 60%  
- **Component:** `/etc/init.d/S10sample`  
- **Rule:** `fs-hardening`  
- **Finding ID:** `56445c1c7615e74f` (triage: new)  

/etc/init.d/S10sample runs at boot/service start; review the services it launches as part of the attack surface.

Evidence — `samples/sample-corpus/etc/init.d/S10sample` @ `(module)`:

```asm
-rwxr-xr-x
```

**Remediation:** Disable unnecessary services.
