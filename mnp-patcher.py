#!/usr/bin/env python3
import sys, re, argparse
from pathlib import Path

HTML_FILES = ["index.html"]

def find_state_pages(root: Path):
    calc = root / "calculate"
    if not calc.exists():
        return []
    return sorted([p for p in calc.rglob("*.html") if p.is_file()])

def guess_bundle(root: Path):
    """Pick a likely calculator bundle from /assets/js by size and name hints."""
    jsdir = root / "assets" / "js"
    if not jsdir.exists():
        return None
    candidates = []
    for p in jsdir.glob("*.js"):
        name = p.name.lower()
        score = 0
        if "calc" in name or "app" in name or "bundle" in name or "main" in name:
            score += 10
        try:
            score += p.stat().st_size / 10000.0  # size bias
        except Exception:
            pass
        candidates.append((score, p))
    if not candidates:
        return None
    candidates.sort(reverse=True)
    return candidates[0][1]

LOADING_STUB = """<script>
(function(){
  const root = document.getElementById('calculator');
  if (!root) return;
  if (!window.__MNP_CALC_LOADED__) {
    root.innerHTML = '<div style="padding:12px;"><strong>Loading calculator…</strong><br>If this message stays, please refresh.</div>';
  }
})();
</script>"""

def ensure_mount(html: str) -> (str, bool):
    """Ensure a #calculator mount exists. If missing, insert before closing </main> or after hero header."""
    if re.search(r'id=["\\\']calculator["\\\']', html):
        return html, False
    # try to insert before </main>
    if "</main>" in html:
        return html.replace("</main>", '\\n<section id="calculator" class="card"></section>\\n</main>'), True
    # else after opening <body>
    return html.replace("<body", "<body>\\n<section id=\\"calculator\\" class=\\"card\\"></section>\\n", 1), True

def insert_scripts(html: str, bundle_src: str, vendor_src: str = None, add_stub: bool = True) -> (str, bool):
    """Insert script tags before </body> if not already present."""
    changed = False
    # Normalize bundle src
    def has_script(src):
        pattern = re.escape(src)
        return re.search(r'<script[^>]+src=["\\\']%s["\\\']' % pattern, html) is not None

    snippets = []
    if vendor_src and not has_script(vendor_src):
        snippets.append(f'<script src="{vendor_src}" defer></script>')
    if not has_script(bundle_src):
        snippets.append(f'<script src="{bundle_src}" defer></script>')
    if add_stub and "Loading calculator" not in html:
        snippets.append(LOADING_STUB)

    if snippets:
        if "</body>" in html:
            html = html.replace("</body>", "\\n" + "\\n".join(snippets) + "\\n</body>")
        else:
            html += "\\n" + "\\n".join(snippets) + "\\n"
        changed = True
    return html, changed

def patch_file(path: Path, bundle_src: str, vendor_src: str = None, add_stub: bool = True):
    original = path.read_text(encoding="utf-8", errors="ignore")
    html = original

    # Ensure mount
    html, mount_added = ensure_mount(html)

    # Insert scripts
    html, scripts_added = insert_scripts(html, bundle_src, vendor_src, add_stub)

    if html != original:
        path.write_text(html, encoding="utf-8")
    return mount_added, scripts_added, html != original

def main():
    ap = argparse.ArgumentParser(description="MyNetProceeds calculator patcher")
    ap.add_argument("--repo", default=".", help="Path to repo root (default: current directory)")
    ap.add_argument("--bundle", help="Calculator bundle path, e.g., /assets/js/calculator.js")
    ap.add_argument("--vendor", help="Optional vendor bundle path, e.g., /assets/js/vendor.js")
    ap.add_argument("--no-stub", action="store_true", help="Do not insert loading fail-safe stub")
    args = ap.parse_args()

    root = Path(args.repo).resolve()
    if not (root / "index.html").exists():
        print(f"[ERROR] index.html not found in {root}. Run this from the repo root or pass --repo.")
        sys.exit(1)

    bundle_src = args.bundle
    if not bundle_src:
        guess = guess_bundle(root)
        if guess:
            bundle_src = "/" + str(guess.relative_to(root)).replace("\\\\", "/")
            print(f"[INFO] Auto-detected bundle: {bundle_src}")
        else:
            print("[ERROR] Could not auto-detect a calculator bundle in /assets/js. Pass --bundle /assets/js/yourfile.js")
            sys.exit(2)

    vendor_src = args.vendor
    if vendor_src and not vendor_src.startswith("/"):
        vendor_src = "/" + vendor_src
    if not bundle_src.startswith("/"):
        bundle_src = "/" + bundle_src

    files = [root / "index.html"]
    files += find_state_pages(root)

    changed_any = False
    summary = []
    for f in files:
        mount_added, scripts_added, changed = patch_file(f, bundle_src, vendor_src, add_stub=not args.no_stub)
        changed_any = changed_any or changed
        summary.append((str(f.relative_to(root)), mount_added, scripts_added, changed))

    print("\\n=== Patch Summary ===")
    for rel, m, s, c in summary:
        print(f"{rel:60}  mount_added={'Y' if m else 'N'}  scripts_added={'Y' if s else 'N'}  changed={'Y' if c else 'N'}")

    if changed_any:
        print("\\n[OK] Changes written. Review diffs, then commit & push to trigger your Netlify deploy.")
    else:
        print("\\n[NOTE] No changes were necessary (files already had a #calculator mount and script includes).")

if __name__ == "__main__":
    main()
