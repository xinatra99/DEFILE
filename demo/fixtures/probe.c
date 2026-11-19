/* DEFILE educational fixture. Distributed under the project's Apache-2.0 license.
 * Never accepts command-line/network input. Version banners are intentional test
 * signals, NOT evidence that these third-party libraries are present. */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#ifndef HARDENED
static const char *banner = "OpenSSL 1.0.1f — synthetic version-banner fixture";
void sample_copy(const char *text) { char out[128]; strcpy(out, text); puts(out); }
#else
static const char *banner = "OpenSSL 1.0.2h — synthetic version-banner fixture";
void sample_copy(const char *text) { char out[128]; snprintf(out, sizeof out, "%s", text); puts(out); }
#endif
int main(void) { puts(banner); sample_copy("DEFILE educational fixture"); return 0; }
