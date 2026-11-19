# DEFILE project website

`index.html` retains the existing layout, themes, feature sections, architecture
diagram and CSS interface illustration. Copy is native English HTML, without a
translation dictionary, language selector or runtime text-substitution layer.

Preview from the project root so relative documentation links resolve:

```bash
python3 -m http.server 8090 --bind 127.0.0.1
# Open http://localhost:8090/html/
```

Edit English copy directly in the markup. Theme switching, mobile navigation and
feature-category controls remain. `compat-storage.js` migrates old browser
preferences once. The unused Chinese webfont dependency was removed, retaining
the existing system-font fallback.

The CSS interface illustration is a documentation example, not a captured scan.
Keep capability claims aligned with the implementation, including the distinction
between local analysis and optional evidence sent to an external AI provider.
The page uses local documentation links rather than inventing a DEFILE repository
or social-media account. Original provenance is retained in `../NOTICE`.
