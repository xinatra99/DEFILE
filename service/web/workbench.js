const SEVS = ["critical","high","medium","low","info"];
const SHORT = {critical:"crit",high:"high",medium:"med",low:"low",info:"info"};
// The six inventory views and the two string views used to be top-level tabs;
// they are now children of one primary tab each, and these keep the parent lit.
const INVENTORY_TABS = ["binaries","scripts","components","files","busybox","services"];
const STRING_TABS = ["strings","sensitive"];

// Interface copy is native English. Firmware evidence retains its original encoding.


// Default sensitive-string keyword dictionary (IoT default-credential / weak-service
// hunting). User-editable in the UI and persisted to storage. Extends the
// original core list with terms drawn from EMBA's (github.com/e-m-b-a/emba)
// config/*_files.cfg sensitive-file targets (ssh_files, pass_files, cert_files,
// history_files) and its deep_key_search/password_regex signature set — EMBA
// itself matches those by filename/regex rather than a keyword-substring list,
// but the underlying artifact names (id_rsa, shadow, authorized_keys, ...) are
// exactly the kind of substrings worth flagging when they show up embedded in
// a binary's or script's extracted strings.
const DEFAULT_SENSITIVE_KEYWORDS = [
  // core weak-service / default-credential hunting
  "telnet", "ssh", "ftp", "tftp", "root", "toor", "admin", "guest", "support",
  "engineer", "supervisor", "backdoor", "debug", "password", "passwd", "pwd",
  "secret", "private key", "private_key", "default", "enable",
  // credential/key artifact names (EMBA ssh_files.cfg / pass_files.cfg / cert_files.cfg / history_files.cfg)
  "shadow", "master.passwd", "id_rsa", "id_dsa", "id_ecdsa", "id_ed25519",
  "authorized_keys", "known_hosts", ".git-credentials", ".htpasswd",
  "sshd_config", ".bash_history", ".mysql_history",
  // embedded services/daemons commonly left with default/weak config
  "dropbear", "uboot", "u-boot", "wpa_supplicant", "hostapd", "snmpd", "community",
  // key=value style secret assignments
  "api_key", "api_token", "access_token", "auth_token", "secret_key",
  "shared_secret", "wifi_password", "wpa_passphrase",
  // hardware/manufacturing debug backdoors
  "jtag", "uart", "factory_test", "engineering_mode",
];

function app() {
  const storage = globalThis.DEFILE_TRANSPORT?.storage || localStorage;
  return {
    SEVS, SHORT,
    theme: storage.getItem("defile-theme") || "midnight",
    jobs: [], selectedId: null, tab: "dashboard",
    // Report data is served paginated/filtered server-side (findings, in
    // particular, used to be rendered in full client-side — thousands of
    // reactive Alpine components for a large scan — which is what crashed
    // the tab). `summary` is the one thing still safe to load in full: it's
    // just aggregate counts, however big the underlying scan was.
    summary: null,
    findingsPage: { items: [], total: 0, offset: 0, limit: 50 },
    // Binaries/scripts can run into the hundreds on a real firmware (537/246
    // on the reference target) -- real server-side pagination, same pattern
    // as findingsPage/filesPage, not the old load-everything-via-?all=1.
    binariesPage: { items: [], total: 0, offset: 0, limit: 100 },
    scriptsPage: { items: [], total: 0, offset: 0, limit: 100 },
    // Components (SBOM entries) stay as a single ?all=1 load -- orders of
    // magnitude fewer than binaries/scripts in practice (tens, not hundreds).
    componentsPage: { items: [], total: 0 },
    // Files can genuinely run into the thousands -- real pagination too.
    filesPage: { items: [], total: 0, offset: 0, limit: 200 },
    filesKindFilter: "",
    // Separate from filesPage (which stays paginated for the Files tab):
    // the Strings/Sensitive tabs need every non-binary file's extracted
    // strings at once -- a keyword search can't work against just one page.
    filesStringsAll: [],
    // Same reasoning, for binaries: stringsSources (below) needs every
    // binary's strings regardless of which page the Binaries tab itself
    // happens to have loaded, so this is fetched separately via ?all=1
    // rather than reusing binariesPage.items (which is now just one page).
    binariesStringsAll: [],
    // BusyBox applet audit + bin/sbin extra commands + /etc/init.d dump
    // (see defile/inventory/busybox_audit.py) -- small enough to load whole,
    // unlike findings/files.
    busyboxAudit: { has_busybox: false, compiled_in: [], missing: [], extra_commands: [], init_scripts: [] },
    // Identified network services (web/SSH/FTP/Telnet/SOAP/DNS/SNMP/UPnP/
    // WiFi daemons -- see defile/inventory/service_id.py) -- small enough to
    // load whole, unlike findings/files.
    services: [], servicesCategoryFilter: "", servicesQuery: "",
    // Files tab content preview (config files, shell scripts, ... -- not
    // binaries/symlinks): fetched on demand and cached per path so toggling
    // the same row open/closed doesn't re-fetch.
    filePreviewPath: "", filePreviewLoading: false, filePreviewCache: {},
    busyboxDirFilter: "", busyboxQuery: "",
    target: "/bin/ls", uploading: false, sse: null,
    decompile: false, ghidraAvailable: true, moriaVersion: "",
    deleteSelected: [],
    authToken: storage.getItem("defile-token") || "",
    username: storage.getItem("defile-username") || "", showUserMenu: false,
    loginRequired: false, showLogin: false, loginUser: "", loginPass: "", loginError: "",
    captchaId: "", captchaImg: "", captchaAnswer: "",
    showChangePassword: false, oldPassword: "", newPassword: "", newPassword2: "", changePasswordError: "", changePasswordOk: false,
    actor: storage.getItem("defile-actor") || "",
    compareMode: false, compareA: "", compareB: "", compareResult: null, comparing: false, compareProgress: 0,
    functionDiffChartUrl: null,
    archChartUrl: null, archChartCounts: {}, archChartFetching: false, archChartLastFetch: 0,
    // Same 12-color set as defile/report/piechart.py's _PALETTE, so the live
    // client-side SVG animation and the CUDA/CPU-rendered PNG next to it
    // are recognizably the same chart, not two unrelated visualizations.
    ARCH_PALETTE: ["#4285F4","#DB4437","#F4A000","#0F9D58","#AB47BC","#00ACC1",
                   "#FF7043","#9E9D24","#5C6BC0","#00796B","#C2185B","#795548"],
    showVulnDB: false, vulnDB: null, vulnDBLoading: false, vulnDBError: "", vulnDBCheckerFilter: "",
    showSensitiveDict: false,
    showAISettings: false,
    aiProviders: [], aiSelectedProviderId: "", aiAnalysis: null, aiRunning: false, aiStreaming: false, aiError: "",
    aiFormOpen: false, aiForm: { id: "", name: "", host: "", api_key: "", model: "", kind: "openai", max_tokens: 8192 },
    aiFormModels: [], aiFormFetching: false, aiFormError: "",
    aiTesting: {}, aiTestResults: {}, aiPollTimer: null, aiToolActivity: [],
    // Live-run indicators: an elapsed counter (the most reassuring signal
    // during a long pause) and whether the output pane should keep
    // following the tail as text streams in.
    aiElapsed: 0, aiTickTimer: null, aiFollowTail: true,
    triageHistoryCache: {},
    reportLoadError: "", reportLoading: false, reportLoadProgress: 0,
    f: { sev:{critical:true,high:true,medium:true,low:true,info:true},
         vclass:"", triage:"", q:"", minConf:0 },
    sort: "severity",
    // Group the visible findings page by component. Findings are paged
    // server-side, so this groups what is on screen, which is where the
    // repetition actually shows up.
    groupBy: storage.getItem("defile-fgroup") === null ? "component" : storage.getItem("defile-fgroup"),
    collapsedGroups: [],
    stringsBinary: "", stringsQuery: "",
    sensitiveKeywords: (() => {
      try {
        const saved = JSON.parse(storage.getItem("defile-sensitive-keywords"));
        return Array.isArray(saved) && saved.length ? saved : DEFAULT_SENSITIVE_KEYWORDS.slice();
      } catch (e) { return DEFAULT_SENSITIVE_KEYWORDS.slice(); }
    })(),
    newKeyword: "", sensitiveBinary: "", sensitiveResults: [], sensitiveQuery: "",
    // Client-side pager: sensitiveResults is already fully in memory (capped
    // at 3000 by computeSensitive), so paging it is just a slice -- no
    // server round trip needed, unlike findings/files.
    sensitivePage: { offset: 0, limit: 200 },
    findingsJumpTo: "", filesJumpTo: "", sensitiveJumpTo: "", binariesJumpTo: "", scriptsJumpTo: "",

    mobileScans: false, notice: "", noticeTimer: null,
    isDemo: !!globalThis.DEFILE_TRANSPORT,
    scanSearch: "", evidenceReturn: null, demoPreviewReturn: null, focusedBinaryPath: "", binaryFunctionQuery: "",
    get visibleJobs() {
      const q = this.scanSearch.trim().toLowerCase();
      return this.jobs.filter(j => !q || [j.label, j.target, j.id, this.statusLabel(j.status)].join(' ').toLowerCase().includes(q));
    },
    scanName(job) {
      if (!job) return 'Analysis';
      if (job.label) return job.label;
      const parts = (job.target || '').split('/').filter(Boolean);
      return parts.at(-1) === 'rootfs' ? parts.slice(-2).join('/') : this.targetName(job.target);
    },
    scanHint(job) {
      if (this.isDemo) return ({'sample-original':'Start here · original sample', 'sample-hardened':'Compare with the original', 'sample-corpus':'Larger sample · test pagination', 'sample-timeline':'Completed process events', 'sample-extraction':'Extracted firmware regions'})[job.id] || 'Recorded sample';
      return job.kind === 'extract' ? 'Firmware extraction' : 'Static analysis';
    },
    tabLabel() {
      return ({dashboard:'Overview',findings:'Findings',binaries:'Binaries',scripts:'Scripts',files:'Files',components:'Components',busybox:'BusyBox',services:'Services',strings:'All strings',sensitive:'Sensitive strings',ai:'AI investigation',reports:'Reports'})[this.tab] || 'Analysis';
    },
    viewDescription() {
      return ({scripts:'Script inventory and static detections. Open related findings to inspect the matching source evidence.',components:'Components detected from available metadata and version banners. CVE references require build and backport validation.',files:'Files inspected in this analysis. Select a text or configuration file to preview its content; binary evidence is under Binaries.',busybox:'Recorded BusyBox applets, additional commands and startup scripts. Empty sections mean the scan did not identify that evidence.',services:'Services inferred from binaries, banners and configuration. Port numbers are static inferences; no live network probe was performed.',strings:'Text extracted from binary and filesystem records. Choose a source, then search its strings.',sensitive:'Keyword matches in extracted strings. A match is a review lead, not a confirmed credential or vulnerability.'})[this.tab] || '';
    },
    humanClass(value) { return (value || '').replaceAll('_',' '); },
    focusWorkspace() { this.$nextTick?.(() => { document.getElementById('research-workspace')?.focus({preventScroll:true}); }); },
    returnToScan() {
      this.compareMode = false; this.showVulnDB = false; this.showSensitiveDict = false;
      this.focusWorkspace();
    },
    openReportTab(tab) {
      this.returnToScan(); this.tab = tab;
      if (tab === 'ai') this.loadAIAnalysis();
      this.$nextTick?.(() => document.querySelector('.tabs .active')?.scrollIntoView({block:'nearest',inline:'nearest'}));
    },
    openAnalysisOptions() {
      this.mobileScans = true;
      this.$nextTick?.(() => {
        const submission = document.querySelector('.submission-panel'); if (submission) submission.open = true;
        const options = document.querySelector('.analysis-options');
        if (options) { options.open = true; options.querySelector('summary')?.focus(); options.scrollIntoView({block:'nearest'}); }
      });
    },
    openGhidraPreview() {
      if (globalThis.DEFILE_TRANSPORT?.previewGhidra) return globalThis.DEFILE_TRANSPORT.previewGhidra();
      this.openAnalysisOptions();
    },
    returnFromPreview() { return globalThis.DEFILE_TRANSPORT?.returnFromPreview?.(); },
    get focusedBinary() { return this.binariesStringsAll.find(b => b.path === this.focusedBinaryPath) || null; },
    get viewBinary() { return this.focusedBinary || {path:'',functions:[],imports:[],arch:''}; },
    get focusedFunctions() {
      const q = this.binaryFunctionQuery.trim().toLowerCase();
      return (this.focusedBinary?.functions || []).filter(f => !q || [f.name, '0x'+Number(f.address).toString(16), ...(f.callees_imported || [])].join(' ').toLowerCase().includes(q));
    },
    inspectBinary(path, functionName = '') {
      this.focusedBinaryPath = path; this.binaryFunctionQuery = functionName; this.tab = 'binaries';
      this.$nextTick?.(() => { const el = document.getElementById('binary-inspection'); el?.focus({preventScroll:true}); el?.scrollIntoView({block:'start'}); });
    },
    supportsEvidence(e) {
      return this.binariesStringsAll.some(b => b.path === e.binary) || this.filesStringsAll.some(f => f.path === e.binary && this.previewableKind(f.kind));
    },
    async inspectEvidence(e, findingId) {
      this.evidenceReturn = {scan:this.selectedId, findingId};
      if (this.binariesStringsAll.some(b => b.path === e.binary)) { this.inspectBinary(e.binary, e.function || ''); return; }
      const file = this.filesStringsAll.find(f => f.path === e.binary);
      if (file && this.previewableKind(file.kind)) {
        this.tab = 'files'; this.filesKindFilter = ''; await this.loadFiles();
        const index = this.filesStringsAll.findIndex(f => f.path === file.path);
        this.filesPage.offset = Math.floor(index / this.filesPage.limit) * this.filesPage.limit;
        await this.loadFiles(false); this.filePreviewPath = ''; await this.openFilePreview(file);
        this.$nextTick?.(() => {
          const el = [...document.querySelectorAll('[data-preview-path]')].find(el => el.dataset.previewPath === file.path);
          el?.focus({preventScroll:true}); el?.scrollIntoView({block:'center'});
        });
      }
      this.focusWorkspace();
    },
    returnToFinding() {
      const origin = this.evidenceReturn; this.evidenceReturn = null;
      if (!origin || origin.scan !== this.selectedId) return;
      this.tab = 'findings';
      this.$nextTick?.(() => {
        const el = [...document.querySelectorAll('[data-finding-id]')].find(el => el.dataset.findingId === origin.findingId)?.querySelector('.hd');
        el?.focus({preventScroll:true}); el?.scrollIntoView({block:'center'});
      });
    },
    notify(message) {
      this.notice = String(message); clearTimeout(this.noticeTimer);
      this.noticeTimer = setTimeout(() => { this.notice = ""; }, 10000);
    },
    async copyTarget() {
      try { await navigator.clipboard.writeText(this.selJob.target); this.notify("Target path copied."); }
      catch (e) { this.notify("Clipboard unavailable. Select and copy the target path below."); }
    },
    escapeUI() {
      if (this.showAISettings) this.closeAISettings();
      else if (this.showChangePassword) this.showChangePassword = false;
      else { this.mobileScans = false; this.showUserMenu = false; }
    },
    requestData(url, options) {
      return globalThis.DEFILE_TRANSPORT?.request
        ? globalThis.DEFILE_TRANSPORT.request(url, options) : fetch(url, options);
    },
    savePreference(key,value) { storage.setItem(key,value); },
    async init() {
      this.applyTheme();
      try {
        const h = await (await this.requestData("/healthz")).json();
        this.ghidraAvailable = !!h.ghidra_available;
        this.moriaVersion = h.moria_version || "";
        this.loginRequired = !!h.login_required;
      } catch (e) { /* keep defaults; a job will surface the real error if it matters */ }
      if (this.loginRequired && !this.authToken) {
        this.showLogin = true;
      } else {
        await this.refreshJobs();
        if (this.showVulnDB) this.loadVulnDB();
      }
      setInterval(() => { if (!this.sse && !this.showLogin) this.refreshJobs(); }, 3000);
      if (globalThis.DEFILE_TRANSPORT?.onReady) await globalThis.DEFILE_TRANSPORT.onReady(this);
    },
    // Wraps fetch() with the session token (if logged in). A 401 means the
    // session is missing/expired: drop it and show the login screen instead
    // of failing silently — the user re-does whatever they clicked once
    // logged back in, which is simpler than queuing/replaying the request.
    async apiFetch(url, opts = {}) {
      opts.headers = Object.assign({}, opts.headers);
      if (this.authToken) opts.headers["Authorization"] = "Bearer " + this.authToken;
      const r = await this.requestData(url, opts);
      if (r.status === 401 && this.loginRequired) {
        this.authToken = "";
        storage.removeItem("defile-token");
        this.showLogin = true;
      }
      return r;
    },
    async refreshCaptcha() {
      try {
        const r = await this.requestData("/api/captcha");
        const j = await r.json();
        this.captchaId = j.id; this.captchaImg = j.image; this.captchaAnswer = "";
      } catch (e) { this.captchaImg = ""; }
    },
    async doLogin() {
      this.loginError = "";
      try {
        const r = await this.requestData("/api/login", {method:"POST",
          headers:{"Content-Type":"application/json"},
          body: JSON.stringify({
            username: this.loginUser, password: this.loginPass,
            captcha_id: this.captchaId, captcha_answer: this.captchaAnswer,
          })});
        const j = await r.json();
        if (!r.ok) {
          this.loginError = j.error || "login failed";
          await this.refreshCaptcha(); // captcha is one-time-use; get a fresh one after any failure
          return;
        }
        this.authToken = j.session;
        storage.setItem("defile-token", this.authToken);
        this.username = j.username || this.loginUser;
        storage.setItem("defile-username", this.username);
        this.loginPass = ""; this.showLogin = false;
        await this.refreshJobs();
        if (this.showVulnDB) this.loadVulnDB();
      } catch (e) { this.loginError = "network error"; }
    },
    async doLogout() {
      try {
        await this.requestData("/api/logout", {method:"POST", headers:{"Authorization":"Bearer "+this.authToken}});
      } catch (e) {}
      this.authToken = ""; storage.removeItem("defile-token");
      this.username = ""; storage.removeItem("defile-username");
      this.showUserMenu = false;
      this.jobs = []; this.summary = null; this.selectedId = null; this.closeSSE();
      this.showLogin = this.loginRequired;
    },
    openChangePassword() {
      this.oldPassword = ""; this.newPassword = ""; this.newPassword2 = "";
      this.changePasswordError = ""; this.changePasswordOk = false;
      this.showChangePassword = true;
    },
    async doChangePassword() {
      this.changePasswordError = ""; this.changePasswordOk = false;
      if (this.newPassword !== this.newPassword2) {
        this.changePasswordError = 'New passwords don\u0027t match.';
        return;
      }
      try {
        const r = await this.apiFetch("/api/change-password", {method:"POST",
          headers:{"Content-Type":"application/json"},
          body: JSON.stringify({old_password: this.oldPassword, new_password: this.newPassword})});
        const j = await r.json();
        if (!r.ok) { this.changePasswordError = j.error || "failed"; return; }
        this.changePasswordOk = true;
        this.oldPassword = ""; this.newPassword = ""; this.newPassword2 = "";
        setTimeout(() => { this.showChangePassword = false; }, 1200);
      } catch (e) { this.changePasswordError = "network error"; }
    },
    // Appends ?token= for contexts that can't set a header (EventSource, a
    // plain <a href> download link).
    tokenParam(sep) { return this.authToken ? `${sep}token=${encodeURIComponent(this.authToken)}` : ""; },
    applyTheme() {
      document.documentElement.setAttribute("data-theme", this.theme);
      storage.setItem("defile-theme", this.theme);
    },
    stageLabel(stage) { return ({"disassemble":"Disassembling","decompile":"Decompiling (Ghidra)"})[stage] || stage; },
    severityLabel(severity) { return severity; },
    triageLabel(state) { return (state || "new").replaceAll("_", " "); },
    statusLabel(status) { return status === "cancelled" ? "stopped" : status; },

    get viewAIAnalysis() { return this.aiAnalysis || {status: "none", provider_name: "", model: "", content: "", error: ""}; },
    get viewSummary() {
      return this.summary || {findings:0,binaries:0,scripts:0,components:0,file_count:0,
        firmware_size:0,kernel_version:"",arch_summary:"",endian_summary:"",
        cert_count:0,rsa_cert_count:0,service_count:0,open_port_count:0,dir_chart_renderer:""};
    },
    archChartSegmentsSVG() {
      // Colors come from ARCH_PALETTE; all geometry is derived from numeric counts.
      return this.archChartSegments.map(seg => `<circle cx="50" cy="50" r="42" fill="none" stroke-width="16" stroke="${seg.color}" stroke-dasharray="${seg.dasharray}" stroke-dashoffset="${seg.dashoffset}" class="archSeg"></circle>`).join("");
    },
    async refreshJobs() {
      try {
        const response = await this.apiFetch("/api/jobs");
        if (!response.ok) return;
        const jobs = await response.json();
        if (Array.isArray(jobs)) this.jobs = jobs;
      } catch(e){}
    },
    async submit() {
      const t = (this.target||"").trim(); if (!t) return;
      const r = await this.apiFetch("/api/jobs", {method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({target:t, decompile: this.ghidraAvailable && this.decompile})});
      const j = await r.json();
      if (!r.ok) { this.notify(j.error||"submit failed"); return; }
      await this.refreshJobs(); this.select(j.id);
    },
    // Re-runs analysis on an already-scanned target from its job row --
    // `force:true` so the dedup cache (Store.cacheLookup, keyed on target
    // path+size+mtime) doesn't just CopyJob the old report verbatim, which
    // would silently reproduce whatever the previous scan was missing (a
    // report field added since, a fixed detector, ...) instead of actually
    // re-analyzing.
    async rescan(job) {
      const r = await this.apiFetch("/api/jobs", {method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({kind:job.kind||"analyze", target:job.target, decompile:job.decompile, force:true})});
      const j = await r.json();
      if (!r.ok) { this.notify(j.error||"rescan failed"); return; }
      await this.refreshJobs(); this.select(j.id);
    },
    // Identify + unpack a raw firmware image via moria (FR-ING/FR-EXT) --
    // a separate job kind from analyze, see the "extract" branch of the
    // job detail view. Does not pick a rootfs automatically; the resulting
    // region list is what submitFromRegion() acts on.
    async submitExtract() {
      const t = (this.target||"").trim(); if (!t) return;
      const r = await this.apiFetch("/api/jobs", {method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({kind:"extract", target:t})});
      const j = await r.json();
      if (!r.ok) { this.notify(j.error||"extract failed"); return; }
      await this.refreshJobs(); this.select(j.id);
    },
    // From one region of a completed extract job: either submit it as a
    // normal analyze target (it looks like a real unpacked directory tree),
    // or run extract again on it (moria only went one level deep -- e.g. it
    // unpacked a container but left a compressed stream inside untouched).
    // Both are just new jobs against this path; no special-casing needed
    // beyond picking which kind.
    async submitFromRegion(path, kind) {
      const body = kind === "extract" ? {kind:"extract", target:path}
                                       : {target:path, decompile:this.ghidraAvailable && this.decompile};
      const r = await this.apiFetch("/api/jobs", {method:"POST",
        headers:{"Content-Type":"application/json"}, body:JSON.stringify(body)});
      const j = await r.json();
      if (!r.ok) { this.notify(j.error||"submit failed"); return; }
      await this.refreshJobs(); this.select(j.id);
    },
    async upload(ev) {
      const file = ev.target.files[0]; if (!file) return;
      this.uploading = true;
      try {
        const fd = new FormData(); fd.append("file", file);
        const r = await this.apiFetch("/api/upload", {method:"POST", body:fd});
        const j = await r.json();
        if (!r.ok) { this.notify(j.error||"upload failed"); return; }
        this.target = j.target; await this.submit();
      } finally { this.uploading = false; ev.target.value = ""; }
    },
    select(id) {
      this.compareMode = false; this.showVulnDB = false; this.showSensitiveDict = false;
      this.stopAIPolling(); // whatever we were watching, it isn't this job
      // Switching jobs must not carry the previous job's AI analysis into the
      // new job's view (that showed up as opening one scan's AI page and
      // seeing another scan's cached result). Guarded on an actual job change
      // so re-selecting the current job never nulls an aiAnalysis object a
      // live run is still streaming into (runAIAnalysis mutates it in place).
      if (id !== this.selectedId) { this.aiAnalysis = null; this.aiError = ""; this.aiToolActivity = []; }
      this.mobileScans = false; this.evidenceReturn = null; this.focusedBinaryPath = ''; this.binaryFunctionQuery = '';
      this.selectedId = id; this.summary = null; this.tab = "dashboard";
      if (this.sse) { this.sse.close(); this.sse = null; }
      const job = this.jobs.find(x => x.id === id);
      // "extract" jobs have no findings report at all (Regions instead) --
      // loadReport() would 404 against /api/jobs/{id}/summary for one.
      if (job && job.status === "completed") { if (job.kind !== "extract") return this.loadReport(id); return; }
      if (job && job.status === "failed") return;
      if (this.archChartUrl) { URL.revokeObjectURL(this.archChartUrl); this.archChartUrl = null; }
      this.archChartCounts = {};
      this.sse = globalThis.DEFILE_TRANSPORT?.events
        ? globalThis.DEFILE_TRANSPORT.events(id) : new EventSource(`/api/jobs/${id}/events${this.tokenParam("?")}`);
      this.sse.onmessage = (e) => {
        const j = JSON.parse(e.data);
        const idx = this.jobs.findIndex(x => x.id === j.id);
        if (idx >= 0) this.jobs[idx] = j;
        this.maybeUpdateArchChart(j);
        if (j.status === "completed") { this.closeSSE(); if (j.kind !== "extract") this.loadReport(id); }
        if (j.status === "failed") this.closeSSE();
      };
      this.sse.onerror = () => this.closeSSE();
    },
    closeSSE() { if (this.sse) { this.sse.close(); this.sse = null; } },
    // Live "binaries processed so far, by architecture" chart during an
    // active scan (CUDA/CPU-rendered via /api/chart/pie, same renderer as
    // the dashboard/compare-scan charts). The disassemble stage covers most
    // of a scan's wall time and reports each binary's resolved arch as it's
    // processed (defile/pipeline.py's emit(..., arch=info.arch)), so this
    // genuinely fills in progressively -- unlike a file-kind breakdown,
    // which is only known in the very last stage. Throttled: a chart render
    // is a real subprocess spawn, not free, and SSE can push updates as
    // often as every ~400ms.
    async maybeUpdateArchChart(job) {
      if (job.status !== "running" && job.status !== "paused") return;
      const counts = {};
      for (const e of (job.log || [])) {
        if (e.stage === "disassemble" && e.arch) counts[e.arch] = (counts[e.arch] || 0) + 1;
      }
      if (!Object.keys(counts).length) return;
      const now = Date.now();
      if (this.archChartFetching || now - this.archChartLastFetch < 1500) return;
      this.archChartFetching = true;
      this.archChartLastFetch = now;
      try {
        const slices = Object.entries(counts).map(([name, value]) => ({name, value}));
        const r = await this.apiFetch("/api/chart/pie", {
          method: "POST", headers: {"Content-Type": "application/json"},
          body: JSON.stringify({slices}),
        });
        if (r.ok) {
          const blob = await r.blob();
          if (this.archChartUrl) URL.revokeObjectURL(this.archChartUrl);
          this.archChartUrl = URL.createObjectURL(blob);
          this.archChartCounts = counts;
        }
      } catch (e) { /* best-effort; the text progress log still shows what's happening */ }
      finally { this.archChartFetching = false; }
    },
    // Loads the lightweight summary plus one page each of findings/binaries/
    // scripts/components — never the whole report in one response the way
    // this used to work (that's what let a large scan crash the tab).
    async loadReport(id) {
      this.reportLoadError = "";
      this.reportLoading = true;
      this.reportLoadProgress = 0;
      try {
        const r = await this.apiFetch(`/api/jobs/${id}/summary`);
        if (!r.ok) {
          const j = await r.json().catch(() => ({}));
          this.reportLoadError = j.error || `HTTP ${r.status}`;
          return;
        }
        this.summary = await r.json();
        this.filePreviewPath = ""; this.filePreviewCache = {}; this.filesKindFilter = "";
        // Filters/selections (severity toggles, vuln-class, the Sensitive
        // tab's per-binary picker, the Strings tab's binary picker) are
        // scoped to whichever report was loaded when they were set. Left
        // alone across a job switch, a stale severity-only filter (e.g.
        // from an earlier goToFindings({sevOnly:'high'}) drill-down) or a
        // sensitiveBinary/stringsBinary path that doesn't exist in the new
        // report silently zeroes out findings/results with no error —
        // exactly the "numbers don't show" symptom. Reset/recompute them
        // here, once, for every report load rather than only lazily when
        // each tab happens to be clicked.
        this.resetFilters();

        // Percentage progress across summary (already fetched, 1 step) plus
        // each of these parallel fetches, so the loading view shows real
        // movement instead of an indeterminate spinner for however long a
        // large scan's findings/files/etc. take to page in.
        const steps = [
          this.loadFindings(), this.loadBinaries(), this.loadScripts(),
          this.loadComponents(), this.loadFiles(), this.loadFilesStringsAll(),
          this.loadBinariesStringsAll(), this.loadBusyboxAudit(), this.loadServices(),
        ];
        const total = steps.length + 1;
        let done = 1;
        this.reportLoadProgress = Math.round((done / total) * 100);
        await Promise.all(steps.map(p => p.then(() => {
          done++;
          this.reportLoadProgress = Math.round((done / total) * 100);
        })));

        this.sensitiveBinary = "";
        this.computeSensitive();
        this.onStringsTab();
      } catch (e) {
        this.reportLoadError = String(e);
      } finally {
        this.reportLoading = false;
      }
    },
    // Query params mirror the findings filter bar (server-side now, not
    // client-side array filtering) — offset/limit for paging, sev repeated
    // once per checked severity, the rest 1:1 with `this.f`/`this.sort`.
    findingsQueryParams(overrides = {}) {
      const p = new URLSearchParams();
      const offset = overrides.offset ?? this.findingsPage.offset;
      const limit = overrides.limit ?? this.findingsPage.limit;
      p.set("offset", offset); p.set("limit", limit);
      SEVS.forEach(s => { if (this.f.sev[s]) p.append("sev", s); });
      if (this.f.vclass) p.set("vclass", this.f.vclass);
      if (this.f.triage) p.set("triage", this.f.triage);
      if (this.f.minConf) p.set("min_conf", this.f.minConf);
      if (this.f.q) p.set("q", this.f.q);
      p.set("sort", this.sort);
      return p;
    },
    async loadFindings(resetOffset = true) {
      if (resetOffset) this.findingsPage.offset = 0;
      const p = this.findingsQueryParams();
      const r = await this.apiFetch(`/api/jobs/${this.selectedId}/findings?${p}`);
      if (r.ok) { this.findingsPage = await r.json(); this.seedCollapsedGroups(); }
    },
    findingsPrevPage() {
      if (this.findingsPage.offset <= 0) return;
      this.findingsPage.offset = Math.max(0, this.findingsPage.offset - this.findingsPage.limit);
      this.loadFindings(false);
    },
    findingsNextPage() {
      if (this.findingsPage.offset + this.findingsPage.limit >= this.findingsPage.total) return;
      this.findingsPage.offset += this.findingsPage.limit;
      this.loadFindings(false);
    },
    findingsGoToPage() {
      this.findingsPage.offset = this.clampPageOffset(this.findingsJumpTo, this.findingsPage.total, this.findingsPage.limit);
      this.findingsJumpTo = "";
      this.loadFindings(false);
    },
    // Loaded in full (?all=1, no LIMIT server-side): components are never
    // remotely as numerous as findings/files/binaries/scripts in practice,
    // so simplicity wins over paginating a fourth tab.
    async loadPagedListAll(kind) {
      const page = kind + "Page"; // "components" -> "componentsPage"
      const r = await this.apiFetch(`/api/jobs/${this.selectedId}/${kind}?all=1`);
      if (r.ok) this[page] = await r.json();
    },
    loadComponents() { return this.loadPagedListAll("components"); },
    async loadBinaries(resetOffset = true) {
      if (resetOffset) this.binariesPage.offset = 0;
      const p = new URLSearchParams({ offset: this.binariesPage.offset, limit: this.binariesPage.limit });
      const r = await this.apiFetch(`/api/jobs/${this.selectedId}/binaries?${p}`);
      if (r.ok) this.binariesPage = await r.json();
    },
    binariesPrevPage() {
      if (this.binariesPage.offset <= 0) return;
      this.binariesPage.offset = Math.max(0, this.binariesPage.offset - this.binariesPage.limit);
      this.loadBinaries(false);
    },
    binariesNextPage() {
      if (this.binariesPage.offset + this.binariesPage.limit >= this.binariesPage.total) return;
      this.binariesPage.offset += this.binariesPage.limit;
      this.loadBinaries(false);
    },
    binariesGoToPage() {
      this.binariesPage.offset = this.clampPageOffset(this.binariesJumpTo, this.binariesPage.total, this.binariesPage.limit);
      this.binariesJumpTo = "";
      this.loadBinaries(false);
    },
    // stringsSources needs every binary's strings regardless of which page
    // the Binaries tab table itself is showing -- loaded separately, same
    // pattern as loadFilesStringsAll.
    async loadBinariesStringsAll() {
      const r = await this.apiFetch(`/api/jobs/${this.selectedId}/binaries?all=1`);
      if (r.ok) this.binariesStringsAll = (await r.json()).items || [];
    },
    async loadScripts(resetOffset = true) {
      if (resetOffset) this.scriptsPage.offset = 0;
      const p = new URLSearchParams({ offset: this.scriptsPage.offset, limit: this.scriptsPage.limit });
      const r = await this.apiFetch(`/api/jobs/${this.selectedId}/scripts?${p}`);
      if (r.ok) this.scriptsPage = await r.json();
    },
    scriptsPrevPage() {
      if (this.scriptsPage.offset <= 0) return;
      this.scriptsPage.offset = Math.max(0, this.scriptsPage.offset - this.scriptsPage.limit);
      this.loadScripts(false);
    },
    scriptsNextPage() {
      if (this.scriptsPage.offset + this.scriptsPage.limit >= this.scriptsPage.total) return;
      this.scriptsPage.offset += this.scriptsPage.limit;
      this.loadScripts(false);
    },
    scriptsGoToPage() {
      this.scriptsPage.offset = this.clampPageOffset(this.scriptsJumpTo, this.scriptsPage.total, this.scriptsPage.limit);
      this.scriptsJumpTo = "";
      this.loadScripts(false);
    },
    async loadFiles(resetOffset = true) {
      if (resetOffset) this.filesPage.offset = 0;
      const p = new URLSearchParams({ offset: this.filesPage.offset, limit: this.filesPage.limit });
      if (this.filesKindFilter) p.set("kind", this.filesKindFilter);
      const r = await this.apiFetch(`/api/jobs/${this.selectedId}/files?${p}`);
      if (r.ok) this.filesPage = await r.json();
    },
    filesPrevPage() {
      if (this.filesPage.offset <= 0) return;
      this.filesPage.offset = Math.max(0, this.filesPage.offset - this.filesPage.limit);
      this.loadFiles(false);
    },
    async loadFilesStringsAll() {
      const r = await this.apiFetch(`/api/jobs/${this.selectedId}/files?all=1`);
      if (r.ok) this.filesStringsAll = (await r.json()).items || [];
    },
    async loadBusyboxAudit() {
      const r = await this.apiFetch(`/api/jobs/${this.selectedId}/busybox`);
      this.busyboxAudit = r.ok ? await r.json() : {};
      this.busyboxDirFilter = ""; this.busyboxQuery = "";
    },
    async loadServices() {
      const r = await this.apiFetch(`/api/jobs/${this.selectedId}/services`);
      this.services = r.ok ? await r.json() : [];
      this.servicesCategoryFilter = ""; this.servicesQuery = "";
    },
    // Preview only makes sense for text-ish, non-ELF files -- every
    // non-binary, non-symlink kind (config/script/other), which is exactly
    // what the Files tab can't show anywhere else (Binaries/Scripts tabs
    // only cover their own kind, a binary's "content" is already shown as
    // disassembly/strings not raw bytes, and a symlink has no content of
    // its own to read). Written as an exclusion, not an allow-list, so a
    // future new kind is previewable by default instead of silently losing
    // the click-to-preview affordance the way "config" briefly did when it
    // was added as its own kind but this list wasn't updated to match.
    previewableKind(kind) { return kind !== "binary" && kind !== "symlink"; },
    async openFilePreview(f) {
      if (!this.previewableKind(f.kind)) return;
      if (this.filePreviewPath === f.path) { this.filePreviewPath = ""; return; } // toggle closed
      this.filePreviewPath = f.path;
      if (this.filePreviewCache[f.path]) return; // already fetched this job-load
      this.filePreviewLoading = true;
      try {
        const r = await this.apiFetch(`/api/jobs/${this.selectedId}/file-content?path=${encodeURIComponent(f.path)}`);
        const body = await r.json().catch(() => ({}));
        this.filePreviewCache[f.path] = r.ok
          ? { content: body.content, truncated: body.truncated }
          : { error: body.error || `HTTP ${r.status}` };
      } catch (e) {
        this.filePreviewCache[f.path] = { error: String(e) };
      } finally {
        this.filePreviewLoading = false;
      }
    },
    get filePreviewEntry() { return this.filePreviewCache[this.filePreviewPath] || null; },
    // Highlighted-HTML version of the currently-open preview, for the
    // x-html-bound <pre> -- computed lazily (only while a preview is open)
    // rather than in openFilePreview(), so switching themes or re-opening a
    // cached preview never needs a re-fetch to re-render with color.
    get highlightedPreview() {
      const entry = this.filePreviewEntry;
      if (!entry || entry.error || !entry.content) return "";
      return this.highlightPreview(entry.content, this.detectPreviewLang(this.filePreviewPath, entry.content));
    },
    // Regex-token highlighting for the two kinds of content the Files/
    // BusyBox previews actually show (shell scripts, config files in their
    // common shapes) -- not a general-purpose highlighter, just enough
    // structure (comments/strings/keys/keywords) to make either readable at
    // a glance instead of a wall of single-color text.
    detectPreviewLang(path, content) {
      const head = (content || "").slice(0, 200).trimStart();
      if (/^#!.*\b(ba|da|k)?sh\b/.test(head)) return "shell";
      if (/\.(sh|bash)$/i.test(path || "")) return "shell";
      const trimmed = (content || "").trimStart();
      if (trimmed.startsWith("<")) return "xml";
      if (trimmed.startsWith("{") || trimmed.startsWith("[")) return "json";
      return "config";
    },
    escapeHtml(s) {
      return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    },
    // Shared driver for every highlighter below: walks `re`'s matches in
    // order, HTML-escaping the untouched text between them plus each
    // match's own text (never trusting raw file content as HTML), and wraps
    // whichever capture group fired in `classes[groupIndex]`.
    tokenize(text, re, classes) {
      let out = "", last = 0, m;
      while ((m = re.exec(text))) {
        out += this.escapeHtml(text.slice(last, m.index));
        for (let i = 0; i < classes.length; i++) {
          if (m[i + 1] !== undefined) {
            out += `<span class="${classes[i]}">${this.escapeHtml(m[i + 1])}</span>`;
            break;
          }
        }
        last = re.lastIndex;
      }
      out += this.escapeHtml(text.slice(last));
      return out;
    },
    highlightPreview(content, lang) {
      switch (lang) {
        case "shell": return this.highlightShell(content);
        case "xml": return this.highlightXml(content);
        case "json": return this.highlightJson(content);
        default: return this.highlightConfig(content);
      }
    },
    highlightShell(text) {
      const kw = "if|then|else|elif|fi|for|while|until|do|done|case|esac|function|return|exit" +
                 "|local|export|readonly|shift|break|continue|in|select";
      const re = new RegExp(
        "(#[^\\n]*)" +                                   // 1: comment (incl. shebang)
        "|(\"(?:\\\\.|[^\"\\\\])*\"|'[^']*'|`[^`]*`)" +   // 2: string / backtick substitution
        "|(\\$\\{[^}]*\\}|\\$[A-Za-z_][A-Za-z0-9_]*|\\$[0-9@*#?$!-])" + // 3: variable
        `|(\\b(?:${kw})\\b)`,                             // 4: keyword
        "g");
      return this.tokenize(text, re, ["tok-comment", "tok-string", "tok-variable", "tok-keyword"]);
    },
    highlightConfig(text) {
      // Generic config catch-all covering the two shapes firmware configs
      // actually come in: classic ini/"key = value" (comment lines, [section]
      // headers, key before the : or =) and OpenWrt/UCI-style ("config foo",
      // "option bar baz", "list bar baz" -- whitespace-separated, no "="),
      // extremely common in real IoT firmware. Not a real grammar for either,
      // just enough tokens to break up the wall of text.
      const re = /(^[ \t]*[#;][^\n]*$)|(^[ \t]*\[[^\]\n]*\][ \t]*$)|("(?:\\.|[^"\\])*"|'[^']*')|(^[ \t]*(?:config|option|list)\b)|(^[ \t]*[A-Za-z0-9_.\-]+(?=[ \t]*[:=]))/gm;
      return this.tokenize(text, re, ["tok-comment", "tok-section", "tok-string", "tok-keyword", "tok-key"]);
    },
    highlightXml(text) {
      const re = /(<!--[\s\S]*?-->)|("[^"]*"|'[^']*')|(<\/?[A-Za-z][\w:.\-]*|\/?>)/g;
      return this.tokenize(text, re, ["tok-comment", "tok-string", "tok-tag"]);
    },
    highlightJson(text) {
      const re = /("(?:\\.|[^"\\])*"(?=\s*:))|("(?:\\.|[^"\\])*")|(\btrue\b|\bfalse\b|\bnull\b)|(-?\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b)/g;
      return this.tokenize(text, re, ["tok-key", "tok-string", "tok-keyword", "tok-number"]);
    },
    filesNextPage() {
      if (this.filesPage.offset + this.filesPage.limit >= this.filesPage.total) return;
      this.filesPage.offset += this.filesPage.limit;
      this.loadFiles(false);
    },
    filesGoToPage() {
      this.filesPage.offset = this.clampPageOffset(this.filesJumpTo, this.filesPage.total, this.filesPage.limit);
      this.filesJumpTo = "";
      this.loadFiles(false);
    },
    sensitivePrevPage() {
      if (this.sensitivePage.offset <= 0) return;
      this.sensitivePage.offset = Math.max(0, this.sensitivePage.offset - this.sensitivePage.limit);
    },
    sensitiveNextPage() {
      if (this.sensitivePage.offset + this.sensitivePage.limit >= this.filteredSensitiveResults.length) return;
      this.sensitivePage.offset += this.sensitivePage.limit;
    },
    sensitiveGoToPage() {
      this.sensitivePage.offset = this.clampPageOffset(
        this.sensitiveJumpTo, this.filteredSensitiveResults.length, this.sensitivePage.limit);
      this.sensitiveJumpTo = "";
    },
    // Shared by every "jump to page N" control: 1-based page number -> a
    // valid, clamped 0-based offset for that pager's own total/limit.
    clampPageOffset(pageInput, total, limit) {
      const totalPages = Math.max(1, Math.ceil(total / limit));
      let page = parseInt(pageInput, 10);
      if (!Number.isFinite(page) || page < 1) page = 1;
      if (page > totalPages) page = totalPages;
      return (page - 1) * limit;
    },
    resetFilters() {
      this.f = { sev:{critical:true,high:true,medium:true,low:true,info:true},
                 vclass:"", triage:"", q:"", minConf:0 };
    },

    get selJob() { return this.jobs.find(x => x.id === this.selectedId); },
    // These now reflect one loaded page each (findings: the current filtered
    // page; binaries/scripts/components: a single generous page — those
    // three were never the crash source, so aren't given pager UI). Counts
    // for the dashboard/pct() come from `summary` instead, which is always
    // the true total regardless of what's paged in.
    get findings() { return this.findingsPage.items || []; },
    get binaries() { return this.binariesPage.items || []; },
    get scripts() { return this.scriptsPage.items || []; },
    get components() { return this.componentsPage.items || []; },
    get files() { return this.filesPage.items || []; },
    // Dashboard "config files" count: filesStringsAll is the one place every
    // file (not just the current Files-tab page) is already loaded client
    // side, so this needs no extra request -- just filter what's there.
    get configFileCount() { return this.filesStringsAll.filter(f => f.kind === "config").length; },
    get extraCommands() { return this.busyboxAudit.extra_commands || []; },
    get initScripts() { return this.busyboxAudit.init_scripts || []; },
    // Every distinct bin/sbin directory an extra command was found under
    // (there is usually more than one bin/sbin directory: /bin,
    // /usr/bin, /usr/sbin, vendor-specific ones), for the directory filter.
    get extraCommandDirs() {
      return [...new Set(this.extraCommands.map(c => c.dir))].sort();
    },
    get filteredExtraCommands() {
      const q = (this.busyboxQuery||"").trim().toLowerCase();
      return this.extraCommands.filter(c => {
        if (this.busyboxDirFilter && c.dir !== this.busyboxDirFilter) return false;
        if (q && !c.name.toLowerCase().includes(q) && !c.path.toLowerCase().includes(q)) return false;
        return true;
      });
    },
    get serviceCategories() {
      return [...new Set(this.services.map(s => s.category))].sort();
    },
    get filteredServices() {
      const q = (this.servicesQuery||"").trim().toLowerCase();
      return this.services.filter(s => {
        if (this.servicesCategoryFilter && s.category !== this.servicesCategoryFilter) return false;
        if (q && !s.name.toLowerCase().includes(q) && !(s.version||"").toLowerCase().includes(q)
            && !s.binary_path.toLowerCase().includes(q)) return false;
        return true;
      });
    },
    // Distinct ports across every identified service, for the dashboard's
    // open-port chip row -- not a live scan, just what services.ports
    // (config/inetd/init.d flag/well-known default, see service_id.py)
    // already inferred.
    get servicePorts() {
      const ports = new Set();
      this.services.forEach(s => (s.ports||[]).forEach(p => ports.add(p)));
      return [...ports].sort((a,b) => a-b);
    },
    get vclasses() { return Object.keys((this.summary && this.summary.by_vuln_class) || {}).sort(); },
    get cveCount() { return (this.summary && this.summary.cve_count) || 0; },
    get classCounts() {
      const m = (this.summary && this.summary.by_vuln_class) || {};
      return Object.entries(m).map(([k,n])=>({k,n})).sort((a,b)=>b.n-a.n);
    },
    get dirBreakdown() { return (this.summary && this.summary.dir_breakdown) || []; },
    // Current-stage sub-progress (distinct from selJob.progress, the overall
    // 0-100% bar): only "disassemble"/"decompile" carry a done/total pair
    // (see defile/pipeline.py's emit(..., done=, total=)) -- every other stage
    // is a single atomic call with no meaningful sub-count, so this is null
    // for those and the extra bar simply doesn't render.
    get curStageProgress() {
      const j = this.selJob;
      if (!j || !["disassemble", "decompile"].includes(j.stage)) return null;
      const log = j.log || [];
      for (let i = log.length - 1; i >= 0; i--) {
        const e = log[i];
        if (e.stage === j.stage && e.total > 0) {
          return {stage: e.stage, done: e.done, total: e.total, pct: Math.round(100 * e.done / e.total)};
        }
      }
      return null;
    },
    get archChartRows() {
      const total = Object.values(this.archChartCounts).reduce((a, b) => a + b, 0) || 1;
      return Object.entries(this.archChartCounts)
        .map(([arch, n]) => ({arch, n, pct: Math.round(100 * n / total)}))
        .sort((a, b) => b.n - a.n);
    },
    // Color per arch is assigned by first-seen order (Object.keys on a
    // plain object preserves insertion order for string keys), NOT by
    // current rank in archChartRows -- archChartRows re-sorts by count on
    // every tick, and if color followed that sort order a slice could
    // change color mid-scan whenever two archs swapped rank, which would
    // read as a different slice appearing rather than the same one growing.
    archColorFor(arch) {
      const idx = Object.keys(this.archChartCounts).indexOf(arch);
      return this.ARCH_PALETTE[(idx < 0 ? 0 : idx) % this.ARCH_PALETTE.length];
    },
    // SVG donut segments for the live client-side animation (see .archSeg's
    // CSS transition): stroke-dasharray/-dashoffset on a set of concentric
    // circles, one per arch, in a group rotated -90deg so the first segment
    // starts at 12 o'clock -- same convention as the CUDA/CPU renderer's
    // angle math (defile/report/piechart.py), so the two visually agree.
    get archChartSegments() {
      const total = Object.values(this.archChartCounts).reduce((a, b) => a + b, 0) || 1;
      const C = 2 * Math.PI * 42; // circumference at r=42 (see the <circle> markup)
      let cumulative = 0;
      return Object.entries(this.archChartCounts).map(([arch, n]) => {
        const len = (n / total) * C;
        const seg = {arch, color: this.archColorFor(arch),
                     dasharray: `${len} ${C - len}`, dashoffset: -cumulative};
        cumulative += len;
        return seg;
      });
    },
    sevCount(s) { return (this.summary && this.summary.by_severity[s]) || 0; },
    pct(n) { const max = Math.max(1, ...SEVS.map(s=>this.sevCount(s)), ...this.classCounts.map(c=>c.n)); return Math.round(100*n/max); },
    formatSize(bytes) {
      if (!bytes) return "0 B";
      const units = ["B","KB","MB","GB","TB"];
      let i = 0, n = bytes;
      while (n >= 1024 && i < units.length-1) { n /= 1024; i++; }
      return (i === 0 ? n : n.toFixed(1)) + " " + units[i];
    },
    fileKindLabel(kind) { return kind || "other"; },
    servicePortSourceLabel(src) { return ({config: 'config file', inetd: 'inetd.conf', "init.d flag": 'init.d flag', default: 'well-known default'})[src] || src; },
    fileKindChipClass(kind) {
      return { binary: "ok", script: "warn", config: "warn", symlink: "neutral", other: "neutral" }[kind] || "neutral";
    },
    async setTriage(f, state) {
      const r = await this.apiFetch(`/api/jobs/${this.selectedId}/triage`, {method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({finding_id:f.id, state, actor:this.actor})});
      if (r.ok) { f.triage = state; delete this.triageHistoryCache[f.id]; await this.triageHistoryFor(f.id); }
      else { const j = await r.json(); this.notify(j.error||"triage failed"); }
    },
    exportURL(fmt) { if (globalThis.DEFILE_TRANSPORT?.exportURL) return globalThis.DEFILE_TRANSPORT.exportURL(this.selectedId,fmt); return `/api/jobs/${this.selectedId}/report?format=${fmt}&download=1${this.tokenParam("&")}`; },
    dirChartURL() { if (globalThis.DEFILE_TRANSPORT?.dirChartURL) return globalThis.DEFILE_TRANSPORT.dirChartURL(this.selectedId); return `/api/jobs/${this.selectedId}/dir-chart${this.tokenParam("?")}`; },
    downloadBlob(content, mime, filename) {
      const blob = new Blob([content], {type: mime});
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = filename;
      document.body.appendChild(a); a.click(); a.remove();
      URL.revokeObjectURL(url);
    },
    // Export means "everything matching the current filters", not just
    // whatever page happens to be loaded, so these fetch a fresh unpaginated
    // copy from the server (?all=1 -- no LIMIT at all server-side) rather
    // than using `findings`.
    async fetchAllMatchingFindings() {
      const p = this.findingsQueryParams({ offset: 0 });
      p.set("all", "1");
      const r = await this.apiFetch(`/api/jobs/${this.selectedId}/findings?${p}`);
      const j = await r.json();
      return j.items || [];
    },
    async exportFilteredJSON() {
      const items = await this.fetchAllMatchingFindings();
      this.downloadBlob(JSON.stringify(items, null, 2), "application/json",
        `defile-${this.selectedId}-filtered.json`);
    },
    async exportFilteredCSV() {
      const items = await this.fetchAllMatchingFindings();
      const cols = ["id","severity","confidence","vuln_class","title","component","rule","triage","cve_ids","description"];
      const esc = v => `"${String(v==null?"":v).replace(/"/g,'""')}"`;
      const rows = [cols.join(",")];
      for (const f of items) {
        rows.push(cols.map(c => {
          if (c === "cve_ids") return esc((f.cve_ids||[]).join("; "));
          return esc(f[c]);
        }).join(","));
      }
      this.downloadBlob(rows.join("\r\n"), "text/csv", `defile-${this.selectedId}-filtered.csv`);
    },
    async triageHistoryFor(findingId) {
      if (this.triageHistoryCache[findingId]) return this.triageHistoryCache[findingId];
      try {
        const r = await this.apiFetch(`/api/triage/history?finding_id=${encodeURIComponent(findingId)}`);
        const hist = r.ok ? await r.json() : [];
        this.triageHistoryCache[findingId] = hist;
        return hist;
      } catch (e) { return []; }
    },

    async jobControl(id, action) {
      const r = await this.apiFetch(`/api/jobs/${id}/${action}`, {method:"POST"});
      const body = await r.json().catch(() => ({}));
      if (!r.ok) { this.notify(body.error || `${action} failed`); return; }
      const idx = this.jobs.findIndex(x => x.id === id);
      if (idx >= 0) this.jobs[idx] = body;
    },
    pauseJob(id) { this.jobControl(id, "pause"); },
    resumeJob(id) { this.jobControl(id, "resume"); },
    stopJob(id) { if (confirm('Stop this scan? It cannot be resumed — you\u0027ll need to submit it again.')) this.jobControl(id, "stop"); },
    async deleteJob(id) {
      if (!confirm('Delete this scan from history? This also removes its saved report and cannot be undone.')) return;
      const r = await this.apiFetch(`/api/jobs/${id}`, {method:"DELETE"});
      const body = await r.json().catch(() => ({}));
      if (!r.ok) { this.notify(body.error || "delete failed"); return; }
      this.jobs = this.jobs.filter(x => x.id !== id);
      if (this.selectedId === id) {
        this.selectedId = null; this.summary = null; this.closeSSE();
      }
      const i = this.deleteSelected.indexOf(id);
      if (i >= 0) this.deleteSelected.splice(i, 1);
    },

    get deletableJobs() {
      return this.jobs.filter(j => ["completed","failed","cancelled"].includes(j.status));
    },

    get completedJobs() { return this.jobs.filter(j => j.status === "completed" && j.kind !== 'extract' && !j.recorded_timeline); },
    toggleCompare() {
      this.compareMode = !this.compareMode;
      if (this.compareMode) {
        this.compareResult = null; this.showVulnDB = false; this.showSensitiveDict = false;
        const eligible = this.completedJobs;
        const a = eligible.some(j => j.id === this.compareA) ? this.compareA : (eligible.find(j => j.id === this.selectedId)?.id || eligible[0]?.id || '');
        const b = eligible.some(j => j.id === this.compareB && j.id !== a) ? this.compareB : (eligible.find(j => j.id !== a)?.id || '');
        this.compareA = ''; this.compareB = '';
        const apply = () => { this.compareA = a; this.compareB = b; };
        if (this.$nextTick) this.$nextTick(apply); else apply();
        if (this.functionDiffChartUrl) { URL.revokeObjectURL(this.functionDiffChartUrl); this.functionDiffChartUrl = null; }
      }
    },
    async loadVulnDB() {
      if (this.vulnDB) return; // cached — it's static reference data, not per-scan
      this.vulnDBLoading = true; this.vulnDBError = "";
      try {
        const r = await this.apiFetch("/api/vulndb");
        if (!r.ok) {
          if (r.status !== 401) this.vulnDBError = "Could not load CVE coverage. Reopen this view to retry.";
          return;
        }
        this.vulnDB = await r.json();
      } catch (e) { this.vulnDBError = "Could not load CVE coverage. Reopen this view to retry."; }
      finally { this.vulnDBLoading = false; }
    },
    toggleVulnDB() {
      this.showVulnDB = !this.showVulnDB;
      if (!this.showVulnDB) return;
      this.compareMode = false; this.showSensitiveDict = false;
      this.loadVulnDB();
    },
    // Standalone dictionary management (FR-INV-4), independent of any scan —
    // previously the add/remove/reset controls only existed inside a loaded
    // report's Sensitive tab, so there was no way to curate the keyword list
    // without first running a scan.
    toggleSensitiveDict() {
      this.showSensitiveDict = !this.showSensitiveDict;
      if (!this.showSensitiveDict) return;
      this.compareMode = false; this.showVulnDB = false;
    },
    // AI provider config (global, not per-job) + on-demand AI analysis of a
    // completed job's findings. See service/ai.go for the server side.
    async loadAIProviders() {
      try {
        const r = await this.apiFetch("/api/ai/providers");
        this.aiProviders = r.ok ? await r.json() : [];
        if (!this.aiSelectedProviderId && this.aiProviders.length) this.aiSelectedProviderId = this.aiProviders[0].id;
      } catch (e) { this.aiProviders = []; }
    },
    openAISettings() {
      this.showAISettings = true;
      this.closeAIForm();
      this.loadAIProviders();
    },
    closeAISettings() { this.showAISettings = false; this.closeAIForm(); },
    newAIProvider() {
      this.aiForm = { id: "", name: "", host: "", api_key: "", model: "", kind: "openai", max_tokens: 8192 };
      this.aiFormModels = []; this.aiFormError = ""; this.aiFormOpen = true;
    },
    editAIProvider(p) {
      this.aiForm = { id: p.id, name: p.name, host: p.host, api_key: "", model: p.model, kind: p.kind || "openai",
        max_tokens: p.max_tokens || 8192 };
      this.aiFormModels = [p.model]; this.aiFormError = ""; this.aiFormOpen = true;
    },
    closeAIForm() { this.aiFormOpen = false; this.aiFormError = ""; },
    // Populates the model dropdown by calling the provider's /models endpoint
    // -- the whole point being the user never hand-types a model id. Saving
    // is blocked (via the Save button's :disabled) until this has produced a
    // non-empty aiForm.model at least once.
    async fetchAIModelsForForm() {
      this.aiFormError = ""; this.aiFormFetching = true;
      try {
        const body = { host: this.aiForm.host, api_key: this.aiForm.api_key, kind: this.aiForm.kind };
        if (this.aiForm.id) body.provider_id = this.aiForm.id;
        const r = await this.apiFetch("/api/ai/models", {method:"POST",
          headers:{"Content-Type":"application/json"}, body: JSON.stringify(body)});
        const j = await r.json();
        if (!r.ok) { this.aiFormError = j.error || "failed"; this.aiFormModels = []; return; }
        this.aiFormModels = j.models || [];
        if (this.aiFormModels.length && !this.aiFormModels.includes(this.aiForm.model)) this.aiForm.model = this.aiFormModels[0];
      } catch (e) { this.aiFormError = String(e); this.aiFormModels = []; }
      finally { this.aiFormFetching = false; }
    },
    async saveAIProvider() {
      this.aiFormError = "";
      const isEdit = !!this.aiForm.id;
      const url = isEdit ? `/api/ai/providers/${this.aiForm.id}` : "/api/ai/providers";
      const r = await this.apiFetch(url, {method: isEdit ? "PUT" : "POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({name:this.aiForm.name, host:this.aiForm.host, api_key:this.aiForm.api_key, model:this.aiForm.model,
          kind:this.aiForm.kind, max_tokens:this.aiForm.max_tokens})});
      const j = await r.json();
      if (!r.ok) { this.aiFormError = j.error || "save failed"; return; }
      this.closeAIForm();
      await this.loadAIProviders();
    },
    // Connectivity test for an already-saved provider: reuses the same
    // /api/ai/models call the add/edit form's "fetch models" button makes
    // (a real round trip validating host + auth + reachability), without
    // spending any completion tokens the way a full analysis call would.
    async testAIProvider(p) {
      this.aiTesting[p.id] = true;
      this.aiTestResults[p.id] = null;
      try {
        const r = await this.apiFetch("/api/ai/models", {method:"POST",
          headers:{"Content-Type":"application/json"},
          body: JSON.stringify({provider_id: p.id})});
        const j = await r.json();
        if (!r.ok) {
          this.aiTestResults[p.id] = { ok: false, text: j.error || "failed" };
        } else {
          this.aiTestResults[p.id] = { ok: true, text: `${'Connected, models available'} (${(j.models||[]).length})` };
        }
      } catch (e) {
        this.aiTestResults[p.id] = { ok: false, text: String(e) };
      } finally {
        this.aiTesting[p.id] = false;
      }
    },
    async deleteAIProvider(p) {
      if (!confirm(`${'Delete AI provider'} "${p.name}"?`)) return;
      const r = await this.apiFetch(`/api/ai/providers/${p.id}`, {method:"DELETE"});
      if (r.ok) {
        if (this.aiSelectedProviderId === p.id) this.aiSelectedProviderId = "";
        delete this.aiTestResults[p.id]; delete this.aiTesting[p.id];
        await this.loadAIProviders();
      }
    },
    async loadAIAnalysis() {
      if (!this.aiProviders.length) await this.loadAIProviders();
      // Capture the job this load is for. Every await below can interleave
      // with another job switch, so the response must only be applied if it
      // is still the selected job -- otherwise a slower fetch for the previous
      // job would clobber the current job's view with the wrong analysis.
      const jobId = this.selectedId;
      if (!jobId) { this.aiAnalysis = null; return; }
      this.aiError = ""; this.aiStreaming = false; // this load isn't itself a live stream -- see runAIAnalysis
      // A run this tab owns is already streaming into aiAnalysis in place; a
      // one-shot GET would overwrite that live object with a stale snapshot.
      if (this.aiRunning && this.aiAnalysis && this.aiAnalysis.job_id === jobId) { this.syncAIPolling(); return; }
      try {
        const r = await this.apiFetch(`/api/jobs/${jobId}/ai-analysis`);
        const j = r.ok ? await r.json() : null;
        if (this.selectedId !== jobId) return; // switched away mid-fetch: don't paint a stale job's result
        this.aiAnalysis = j;
      } catch (e) { if (this.selectedId === jobId) this.aiAnalysis = null; }
      if (this.selectedId === jobId) this.syncAIPolling();
    },
    // A streaming run only pushes deltas to the tab that started it. Any
    // other viewer of the same job (another tab, a reload, or arriving via
    // the job-list AI button) just gets a one-shot GET -- which, mid-run,
    // is a 'running' row that would otherwise sit there frozen forever.
    // Polling picks up the partial content runAIAnalysis persists every
    // ~500ms, and notices completion. Only runs when this tab is a
    // passive observer: aiRunning means this tab owns the live stream and
    // is already getting deltas directly, so polling would be redundant.
    syncAIPolling() {
      const shouldPoll = !this.aiRunning && this.tab === "ai" &&
        this.aiAnalysis && this.aiAnalysis.status === "running";
      if (!shouldPoll) { this.stopAIPolling(); return; }
      if (this.aiPollTimer) return; // already polling
      // Watching someone else's live run: show the same activity indicators,
      // with elapsed time measured from when that run actually started.
      this.startAITicker(this.aiAnalysis.started_at);
      const jobId = this.selectedId;
      this.aiPollTimer = setInterval(async () => {
        // Bail out if the user moved on, or this tab became the owner of a
        // freshly-started run, since either makes this poll's writes stale.
        if (this.selectedId !== jobId || this.aiRunning || this.tab !== "ai") { this.stopAIPolling(); return; }
        try {
          const r = await this.apiFetch(`/api/jobs/${jobId}/ai-analysis`);
          if (!r.ok) { this.stopAIPolling(); return; }
          const j = await r.json();
          if (this.selectedId !== jobId || this.aiRunning) { this.stopAIPolling(); return; }
          this.aiAnalysis = j;
          this.scrollAIOutToTail();
          if (j.status !== "running") this.stopAIPolling();
        } catch (e) { this.stopAIPolling(); }
      }, 1500);
    },
    stopAIPolling() {
      if (this.aiPollTimer) { clearInterval(this.aiPollTimer); this.aiPollTimer = null; }
      // Nothing is being watched any more, so the clock should stop too --
      // unless this tab is itself driving a run.
      if (!this.aiRunning) this.stopAITicker();
    },
    // Jumps straight to a job's AI Analysis tab from the job-history list
    // (the button next to Delete), without the user having to open the
    // report and click through tabs manually. select() resets tab back to
    // "dashboard" as a side effect, so it's overridden right after.
    openAIAnalysisForJob(id) {
      this.select(id);
      this.tab = "ai";
      this.loadAIAnalysis();
    },
    // Streams the analysis via a single POST whose response body is
    // chunked NDJSON (one {"type":...} event per line -- see service/ai.go's
    // runAIAnalysis): "delta" events append to the growing text as it's
    // generated, "done" finalizes with prompt_meta, "error" (used when the
    // provider fails mid-stream, after headers are already committed) shows
    // the error while keeping whatever content streamed in before it. No
    // percentage progress is shown while waiting for the first delta --
    // neither OpenAI's nor Anthropic's streaming APIs report a total length
    // up front, so an indeterminate animation (not a fabricated number) is
    // what's shown until real content starts arriving.
    async runAIAnalysis() {
      if (!this.aiSelectedProviderId || !this.selectedId) return;
      const jobId = this.selectedId;
      const isCurrent = () => this.selectedId === jobId;
      this.aiRunning = true; this.aiStreaming = false; this.aiError = ""; this.aiToolActivity = [];
      this.aiFollowTail = true;
      this.startAITicker();
      const providerMeta = this.aiProviders.find(p => p.id === this.aiSelectedProviderId) || {};
      this.aiAnalysis = { job_id: jobId, status: "running", content: "",
        provider_name: providerMeta.name || "", model: providerMeta.model || "" };
      try {
        const r = await this.apiFetch(`/api/jobs/${jobId}/ai-analysis`, {method:"POST",
          headers:{"Content-Type":"application/json"},
          body: JSON.stringify({provider_id: this.aiSelectedProviderId})});
        if (!r.ok || !r.body) {
          const j = await r.json().catch(() => ({}));
          const msg = j.error || `HTTP ${r.status}`;
          if (isCurrent()) { this.aiError = msg; this.aiAnalysis.status = "error"; this.aiAnalysis.error = msg; }
          return;
        }
        const reader = r.body.getReader();
        const decoder = new TextDecoder();
        let buf = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buf += decoder.decode(value, {stream: true});
          let idx;
          while ((idx = buf.indexOf("\n")) >= 0) {
            const line = buf.slice(0, idx); buf = buf.slice(idx + 1);
            if (!line.trim()) continue;
            let evt;
            try { evt = JSON.parse(line); } catch (e) { continue; }
            if (!isCurrent()) continue; // keep draining so the connection closes cleanly, just don't paint over a different job's view
            if (evt.type === "delta") {
              this.aiStreaming = true;
              this.aiAnalysis.content += evt.text;
              this.scrollAIOutToTail();
            } else if (evt.type === "tool") {
              // The model is fetching more scan data. Shown as an activity
              // line so a multi-second tool round doesn't look like a hang.
              this.aiToolActivity.push({ name: evt.name, detail: evt.detail || "" });
            } else if (evt.type === "done") {
              this.aiAnalysis.status = "done";
              this.aiAnalysis.prompt_meta = evt.prompt_meta;
            } else if (evt.type === "error") {
              this.aiAnalysis.status = "error";
              this.aiAnalysis.error = evt.message;
              this.aiError = evt.message;
            }
          }
        }
      } catch (e) {
        if (isCurrent()) {
          this.aiError = String(e);
          if (this.aiAnalysis) { this.aiAnalysis.status = "error"; this.aiAnalysis.error = this.aiError; }
        }
      } finally {
        if (isCurrent()) {
          this.aiRunning = false;
          // If the stream ended without ever reaching a terminal event --
          // e.g. the connection dropped while the server kept generating --
          // this tab stops being the owner but the run may still be live,
          // so hand over to polling rather than freezing on 'running'.
          this.syncAIPolling();
          // Keep the clock running only while the analysis genuinely is:
          // polling may still be watching a run this tab no longer drives.
          if (!this.aiAnalysis || this.aiAnalysis.status !== "running") this.stopAITicker();
        }
      }
    },
    get aiPromptMetaText() {
      const m = this.aiAnalysis && this.aiAnalysis.prompt_meta;
      if (!m || !m.truncated) return "";
      return `· ${'covered'} ${m.finding_count_sent}/${m.finding_count_total}`;
    },
    // What the run is doing right now. Distinguishing these three states
    // matters because they have very different silent durations: waiting
    // on a provider can be seconds, a tool round longer, and generation is
    // the only one that visibly produces text.
    get aiPhaseText() {
      if (this.aiStreaming) return 'Writing the analysis…';
      if (this.aiToolActivity.length) return 'Reading scan data and reasoning…';
      return 'Contacting the AI provider…';
    },
    formatElapsed(sec) {
      if (sec < 60) return `${sec}s`;
      const m = Math.floor(sec / 60);
      return `${m}m ${String(sec % 60).padStart(2, "0")}s`;
    },
    // startedAtISO lets a tab that is only *watching* someone else's run
    // (see syncAIPolling) show the true elapsed time from the stored
    // started_at, rather than counting from when this tab happened to open.
    startAITicker(startedAtISO) {
      this.stopAITicker();
      let t0 = Date.now();
      if (startedAtISO) {
        const parsed = Date.parse(startedAtISO);
        if (!isNaN(parsed)) t0 = parsed;
      }
      this.aiElapsed = Math.max(0, Math.floor((Date.now() - t0) / 1000));
      this.aiTickTimer = setInterval(() => {
        this.aiElapsed = Math.max(0, Math.floor((Date.now() - t0) / 1000));
      }, 1000);
    },
    stopAITicker() {
      if (this.aiTickTimer) { clearInterval(this.aiTickTimer); this.aiTickTimer = null; }
    },
    // Keep the newest text in view, but stop doing so the moment the user
    // scrolls up to read something -- yanking the viewport back down while
    // they're reading would be worse than not following at all.
    onAIOutScroll() {
      const el = this.$refs.aiOut;
      if (!el) return;
      this.aiFollowTail = el.scrollHeight - el.scrollTop - el.clientHeight < 40;
    },
    scrollAIOutToTail() {
      if (!this.aiFollowTail) return;
      this.$nextTick(() => {
        const el = this.$refs.aiOut;
        if (el) el.scrollTop = el.scrollHeight;
      });
    },
    get vulnDBRows() {
      const rows = [];
      for (const [component, entries] of Object.entries(this.vulnDB?.curated || {})) {
        for (const e of (entries || [])) {
          const versionText = e.versions ? e.versions.join(", ")
            : [e.version_ge ? `>= ${e.version_ge}` : "", e.version_lt ? `< ${e.version_lt}` : ""].filter(Boolean).join(", ");
          rows.push({component, cve: e.cve, severity: e.severity, summary: e.summary, versionText});
        }
      }
      rows.sort((a, b) => a.component.localeCompare(b.component) || a.cve.localeCompare(b.cve));
      return rows;
    },
    get vulnDBCoverage() { return this.vulnDB?.cve_bin_tool || null; },
    get filteredCheckers() {
      const checkers = this.vulnDBCoverage?.checkers || [];
      const q = this.vulnDBCheckerFilter.trim().toLowerCase();
      return q ? checkers.filter(n => n.includes(q)) : checkers;
    },
    async runCompare() {
      if (!this.compareA || !this.compareB) return;
      this.comparing = true; this.compareResult = null; this.compareProgress = 0;
      try {
        // Server-side diff. The old version fetched BOTH jobs' full-document
        // reports and diffed them in JS -- but a large scan's report is
        // 600+ MB, past V8's ~512 MiB max string length, so r.json() threw,
        // the catch swallowed it, and the diff came back all zeros. The
        // /api/compare endpoint does the whole diff against the SQLite tables
        // and returns only the deltas (see ReportDB.CompareJobs). The render
        // below is unchanged; only the data source moved off the client.
        const r = await this.apiFetch('/api/compare', {
          method: 'POST', headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            a: this.compareA, b: this.compareB,
            sensitive_keywords: this.sensitiveKeywords,
          }),
        });
        this.compareProgress = 100;
        const body = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(body.error || `HTTP ${r.status}`);
        this.compareResult = body;
        this.fetchFunctionDiffChart(body.functionDiff.counts);
      } catch (e) {
        this.notify("compare failed: " + e);
      } finally {
        this.comparing = false;
      }
    },
    // Renders the added/removed/modified/unchanged function counts as a
    // CUDA/CPU-rendered pie chart (POST /api/chart/pie -> defile/report/
    // piechart.py, same renderer as the dashboard's rootfs-composition
    // chart) -- best-effort: the counts themselves (already in
    // compareResult.functionDiff.counts) are the source of truth, this is
    // just a visualization on top, so a failure here is silently ignored
    // rather than surfaced as a compare-scan error.
    async fetchFunctionDiffChart(counts) {
      if (this.functionDiffChartUrl) { URL.revokeObjectURL(this.functionDiffChartUrl); this.functionDiffChartUrl = null; }
      const slices = Object.entries(counts).filter(([,v]) => v > 0).map(([k,v]) => ({name: ({added:'Added', removed:'Removed', modified:'Modified', unchanged:'Unchanged'})[k], value: v}));
      if (!slices.length) return;
      try {
        const r = await this.apiFetch('/api/chart/pie', {
          method: 'POST', headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({slices}),
        });
        if (!r.ok) return;
        const blob = await r.blob();
        this.functionDiffChartUrl = URL.createObjectURL(blob);
      } catch (e) { /* best-effort visualization; counts/table still render without it */ }
    },
    toggleDeleteSelect(id) {
      const i = this.deleteSelected.indexOf(id);
      if (i >= 0) this.deleteSelected.splice(i, 1);
      else this.deleteSelected.push(id);
    },
    selectAllForDelete() {
      const all = this.deletableJobs.map(j => j.id);
      this.deleteSelected = (this.deleteSelected.length === all.length) ? [] : all;
    },
    async deleteSelectedJobs() {
      if (!this.deleteSelected.length) return;
      if (!confirm(`${'Delete the selected scans from history? This also removes their saved reports and cannot be undone.'} (${this.deleteSelected.length})`)) return;
      const ids = this.deleteSelected.slice();
      const r = await this.apiFetch("/api/jobs/batch-delete", {method:"POST",
        headers:{"Content-Type":"application/json"}, body: JSON.stringify({ids})});
      const body = await r.json().catch(() => ({}));
      if (!r.ok) { this.notify(body.error || "delete failed"); return; }
      const results = body.results || {};
      const deletedIds = new Set(ids.filter(id => results[id] === "deleted"));
      this.jobs = this.jobs.filter(j => !deletedIds.has(j.id));
      if (deletedIds.has(this.selectedId)) {
        this.selectedId = null; this.summary = null; this.closeSSE();
      }
      this.deleteSelected = this.deleteSelected.filter(id => !deletedIds.has(id));
      if (deletedIds.size < ids.length) this.notify('Some selected scans could not be deleted (still active).');
    },

    // Binaries (ELF, strings from the RE loader) plus non-binary files
    // (scripts/config files, from the full file listing) that carry their
    // own extracted strings -- so Strings/Sensitive-strings hunting isn't
    // limited to ELF binaries the way it used to be. Files without strings
    // (empty, oversized, or symlinks) are filtered out here.
    get stringsSources() {
      const extra = this.filesStringsAll.filter(f => (f.strings || []).length);
      return [...this.binariesStringsAll, ...extra];
    },
    onStringsTab() {
      if (!this.stringsSources.some(b => b.path === this.stringsBinary)) {
        this.stringsBinary = this.stringsSources[0] ? this.stringsSources[0].path : "";
      }
    },
    get totalStrings() {
      return this.stringsSources.reduce((n,b) => n + ((b.strings && b.strings.length) || 0), 0);
    },
    get currentBinaryStrings() {
      const b = this.stringsSources.find(x => x.path === this.stringsBinary);
      return (b && b.strings) || [];
    },
    get filteredStrings() {
      const q = (this.stringsQuery||"").toLowerCase();
      if (!q) return this.currentBinaryStrings;
      return this.currentBinaryStrings.filter(s => s.toLowerCase().includes(q));
    },
    get stringsText() { return this.filteredStrings.slice(0, 2000).join("\n"); },
    get stringsTruncated() { return this.filteredStrings.length > 2000; },

    persistKeywords() {
      storage.setItem("defile-sensitive-keywords", JSON.stringify(this.sensitiveKeywords));
    },
    addKeyword() {
      const k = (this.newKeyword||"").trim();
      this.newKeyword = "";
      if (!k) return;
      if (!this.sensitiveKeywords.some(x => x.toLowerCase() === k.toLowerCase())) {
        this.sensitiveKeywords.push(k);
        this.persistKeywords();
      }
      this.computeSensitive();
    },
    removeKeyword(k) {
      this.sensitiveKeywords = this.sensitiveKeywords.filter(x => x !== k);
      this.persistKeywords();
      this.computeSensitive();
    },
    resetKeywords() {
      this.sensitiveKeywords = DEFAULT_SENSITIVE_KEYWORDS.slice();
      this.persistKeywords();
      this.computeSensitive();
    },
    computeSensitive() {
      const kws = this.sensitiveKeywords.map(k => k.toLowerCase()).filter(Boolean);
      const cap = 3000;
      const out = [];
      outer:
      for (const b of this.stringsSources) {
        if (this.sensitiveBinary && b.path !== this.sensitiveBinary) continue;
        for (const s of (b.strings || [])) {
          const low = s.toLowerCase();
          for (const k of kws) {
            if (low.includes(k)) {
              out.push({ binary: b.path, keyword: k, text: s.length > 200 ? s.slice(0, 200)+"…" : s });
              if (out.length >= cap) break outer;
              break;
            }
          }
        }
      }
      this.sensitiveResults = out;
      this.sensitivePage.offset = 0;
    },
    get sensitiveTruncated() { return this.sensitiveResults.length >= 3000; },
    // Free-text filter on top of the keyword-dictionary match -- narrows the
    // (potentially thousands-long) dictionary hit list down to a specific
    // credential/host/path without editing the dictionary itself.
    get filteredSensitiveResults() {
      const q = (this.sensitiveQuery||"").trim().toLowerCase();
      if (!q) return this.sensitiveResults;
      return this.sensitiveResults.filter(r =>
        r.text.toLowerCase().includes(q) || r.keyword.toLowerCase().includes(q) || r.binary.toLowerCase().includes(q));
    },
    filterSensitive() {
      this.sensitivePage.offset = 0;
    },
    get sensitivePageItems() {
      return this.filteredSensitiveResults.slice(this.sensitivePage.offset, this.sensitivePage.offset + this.sensitivePage.limit);
    },

    // Jump to Findings from a dashboard number, pre-filtered so the drill-down
    // actually shows what was clicked (a fresh filter set, not whatever the
    // user had left over from a previous visit to the tab).
    goToFindings(opts = {}) {
      this.tab = "findings";
      this.resetFilters();
      if (opts.sevOnly) {
        this.f.sev = {critical:false,high:false,medium:false,low:false,info:false};
        this.f.sev[opts.sevOnly] = true;
      }
      this.f.vclass = opts.vclass || "";
      this.f.q = opts.q || "";
      this.loadFindings();
    },
    // CVE findings aren't matched by vuln_class alone in a useful way for a
    // per-binary drill-down, so this stays a thin wrapper: known_cve class,
    // optionally narrowed to one binary via the text search over evidence.
    goToCves(binaryPath) {
      this.goToFindings({ vclass: "known_cve", q: binaryPath || "" });
    },
    shortPath(p) { const parts=p.split("/"); return parts.length>3 ? ".../"+parts.slice(-2).join("/") : p; },
    // Every count in the interface goes through this so thousands separators
    // are consistent and the caller doesn't have to remember .toLocaleString().
    fmtNum(n) { const v = Number(n); return Number.isFinite(v) ? v.toLocaleString() : "0"; },
    baseOf(p) { if (!p) return ""; const i = p.lastIndexOf("/"); return i < 0 ? p : p.slice(i+1); },
    dirOf(p)  { if (!p) return ""; const i = p.lastIndexOf("/"); return i < 0 ? "" : p.slice(0, i+1); },
    // One line, not four: "arm 32 little (lib)" wrapped in a narrow column.
    archLabel(b) {
      if (!b || !b.arch) return "—";
      const end = b.endian === "little" ? "LE" : b.endian === "big" ? "BE" : "";
      return [b.arch, b.bits ? b.bits+'-bit' : '', end, b.is_library ? "(lib)" : ""].filter(Boolean).join(" ");
    },
    // Six fixed slots, always the same order and the same width, so the column
    // reads down the table as a matrix instead of reflowing per row.
    hardStrip(m) {
      if (!m) return `<span class="na" title="unknown">··</span>`.repeat(6);
      const cell = (k, state, title) =>
        `<span class="${state}" title="${title}">${k}</span>`;
      const yn = (k, v, label) => v
        ? cell(k, "on",  `${label}: on`)
        : cell(k, "off", `${label}: off`);
      const relro = m.relro === "full"    ? cell("RL","on","RELRO: full")
                  : m.relro === "partial" ? cell("RL","part","RELRO: partial")
                  :                         cell("RL","off","RELRO: off");
      return [
        yn("NX", m.nx, "no-execute"),
        yn("CN", m.canary, "stack canary"),
        relro,
        yn("PI", m.pie, "PIE"),
        yn("FT", m.fortify, "FORTIFY"),
        m.stripped ? cell("SY","off","symbols: stripped") : cell("SY","on","symbols: kept"),
      ].join("");
    },
    // ---- tab grouping ----
    // The inventory and string views are no longer top-level tabs; these keep
    // the primary tab lit while one of its children is showing.
    inventoryTotal() {
      return (this.binariesPage.total||0) + (this.scriptsPage.total||0) +
             (this.componentsPage.total||0) + (this.services.length||0);
    },
    goInventory() { if (!INVENTORY_TABS.includes(this.tab)) this.tab = "binaries"; },
    goStrings()   { if (!STRING_TABS.includes(this.tab)) { this.tab = "strings"; this.onStringsTab(); } },
    // Facts pinned next to the image name in the header, in place of the old
    // static tagline. Only the ones this report actually carries.
    headerFacts() {
      const s = this.summary || {}, out = [];
      if (s.arch_summary) out.push(this.archChip(s));
      if (s.kernel_version) out.push("Linux " + s.kernel_version);
      if (s.firmware_size) out.push(this.formatSize(s.firmware_size));
      return out;
    },
    archChip(s) {
      const end = s.endian_summary === "little" ? "LE" : s.endian_summary === "big" ? "BE" : "";
      return [s.arch_summary, end].filter(Boolean).join(" ");
    },
    // ---- finding groups ----
    // Findings are paged server-side, so this groups the page you are looking
    // at. That is exactly where the repetition hurts: a severity-sorted page of
    // known_cve findings is long runs of the same component, one card each.
    toggleGroup(key) {
      this.collapsedGroups = this.collapsedGroups.includes(key)
        ? this.collapsedGroups.filter(k => k !== key)
        : [...this.collapsedGroups, key];
    },
    // Groups larger than this start collapsed, which is the whole point: a run
    // of forty-eight tcpdump CVEs should be one line until you ask for it.
    GROUP_AUTOCOLLAPSE: 5,
    // component may arrive as "busybox@1.25.1" or as a bare name with the
    // version in its own field; both end up as one name + one version.
    splitComponent(f) {
      const raw = (f && f.component) || "";
      if (raw.includes("@")) {
        const i = raw.lastIndexOf("@");
        return { name: raw.slice(0, i), version: raw.slice(i + 1) };
      }
      const bin = this.baseOf((f && f.evidence && f.evidence[0] && f.evidence[0].binary) || "");
      return { name: raw || bin || "—", version: (f && f.component_version) || "" };
    },
    // Inside a group the component name is already on the band above, so
    // "busybox 1.25.1: CVE-2018-1000517" collapses to the part that differs.
    rowLabel(f, g) {
      const title = (f && f.title) || "";
      if (!g) return title;
      for (const pre of [g.name + " " + g.version + ": ", g.name + "@" + g.version + ": ", g.name + ": "]) {
        if (pre.trim() !== ":" && title.startsWith(pre)) return title.slice(pre.length);
      }
      return title;
    },
    groupFindings() {
      const order = [], byKey = new Map();
      for (const f of (this.findings || [])) {
        const { name, version } = this.splitComponent(f);
        const key = name + "@" + version;
        let g = byKey.get(key);
        if (!g) {
          g = { key, name, version, count:0, path:"",
                sev:{critical:0,high:0,medium:0,low:0,info:0}, items:[] };
          byKey.set(key, g); order.push(g);
        }
        g.count++;
        if (g.sev[f.severity] !== undefined) g.sev[f.severity]++;
        if (!g.path && f.evidence && f.evidence[0] && f.evidence[0].binary) g.path = f.evidence[0].binary;
        g.items.push(f);
      }
      return order;
    },
    // Called once per loaded page rather than from findingRows(), so rendering
    // stays a pure read of state.
    seedCollapsedGroups() {
      if (!this.groupBy) { this.collapsedGroups = []; return; }
      this.collapsedGroups = this.groupFindings()
        .filter(g => g.count > this.GROUP_AUTOCOLLAPSE)
        .map(g => g.key);
    },
    findingRows() {
      const list = this.findings || [];
      if (!this.groupBy) {
        return list.map((f, i) => ({ type:"finding", key:"f"+i+"-"+f.id, f, label:f.title }));
      }
      const rows = [];
      for (const g of this.groupFindings()) {
        const open = !this.collapsedGroups.includes(g.key);
        rows.push({ type:"group", key:g.key, name:g.name, version:g.version,
                    count:g.count, sev:g.sev, path:g.path, open,
                    collapsedNote: open ? "" : 'collapsed' });
        if (open) g.items.forEach((f, i) => rows.push(
          { type:"finding", key:g.key+"-"+i+"-"+f.id, f, label:this.rowLabel(f, g) }));
      }
      return rows;
    },
    // Splits a scan target into a bold "name" (last path segment) + a muted
    // "dir" (everything before it), so two jobs against similarly-long paths
    // (a common case when re-scanning sibling directories of one firmware
    // extraction) are distinguishable at a glance instead of both truncating
    // to an identical "...long/common/prefix" ellipsis.
    targetName(p) {
      if (!p) return "";
      const parts = p.replace(/\/+$/, "").split("/");
      return parts[parts.length - 1] || p;
    },
    targetDir(p) {
      if (!p) return "";
      const parts = p.replace(/\/+$/, "").split("/");
      parts.pop();
      return parts.join("/") || "/";
    },
    // Jobs are IDed "job-<seq>-<8 hex chars>"; the hex suffix is the part
    // that actually disambiguates re-scans of the same/similarly-named
    // target, so surface that instead of the sequence number.
    jobIdShort(id) {
      if (!id) return "";
      const parts = id.split("-");
      return "#" + (parts[parts.length - 1] || id);
    },
    timeAgo(iso) {
      if (!iso) return "";
      const s = Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 1000));
      if (s < 60) return "just now";
      const m = Math.floor(s / 60);
      if (m < 60) return `${m}m ago`;
      const h = Math.floor(m / 60);
      if (h < 24) return `${h}h ago`;
      const d = Math.floor(h / 24);
      if (d < 30) return `${d}d ago`;
      return new Date(iso).toLocaleDateString("en-US");
    },
    logTime(t) {
      if (!t) return "";
      const d = new Date(t);
      return d.toLocaleTimeString("en-US", {hour12:false}) + "." + String(d.getMilliseconds()).padStart(3,"0");
    },
    cvesFor(path) {
      // CVE findings set component to "pkg@version" (SBOM identity), not the
      // binary path, so this can't match against `findings` directly (now
      // paginated/filtered anyway, not guaranteed to hold every CVE finding
      // at once). Components already carry the binary<->CVE link (same data
      // that feeds the SBOM export), and are loaded in full, so use that.
      return [...new Set(this.components
        .filter(c => (c.binaries||[]).includes(path))
        .flatMap(c => c.cve_ids||[]))];
    },
    // NVD's detail page for one CVE id -- every place a CVE number is shown
    // links here (opened in a new tab, not navigating away from the scan).
    cveUrl(cve) { return `https://nvd.nist.gov/vuln/detail/${encodeURIComponent(cve)}`; },
  };
}
