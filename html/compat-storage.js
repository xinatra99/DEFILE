// One-time namespace migration. Legacy names are compatibility data only.
// Preserve values verbatim and keep the old keys available for a rollback.
(() => {
  try {
    const marker = "defile-storage-migrated-v1";
    if (localStorage.getItem(marker) === "1") return;
    for (const suffix of ["theme", "site-theme", "actor", "fgroup", "sensitive-keywords", "token", "username"]) {
      const previous = localStorage.getItem("ifda-" + suffix);
      if (previous !== null && localStorage.getItem("defile-" + suffix) === null) {
        localStorage.setItem("defile-" + suffix, previous);
      }
    }
    for (const prefix of ["ifda-", "defile-"]) {
      localStorage.removeItem(prefix + "lang");
      localStorage.removeItem(prefix + "site-lang");
    }
    localStorage.setItem(marker, "1");
  } catch {
    // A browser that blocks storage must not prevent the page from loading.
  }
})();
