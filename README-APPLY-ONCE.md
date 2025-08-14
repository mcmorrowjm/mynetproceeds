
# MyNetProceeds — v3.2 Quick Patch (Phase 1 + Phase 2 Starter)

This patch keeps your current v3 **look & feel** and adds:
- JSON-LD schema + optimized title/description (via one-line include)
- `robots.txt` + `sitemap.xml`
- 10 **state pages** under `/calculate/...`
- No CSS/HTML structure changes to your homepage

## 1) One-line include (activate SEO injection)
Open your `index.html` and add this **one line** inside `<head>` (anywhere before `</head>`):

```html
<script defer src="/assets/js/mnp-seo.js"></script>
```

This safely sets the recommended meta title/description if missing and injects JSON-LD schema for Google.

## 2) Add the "Calculate by State" links (optional but recommended)
Paste this near the bottom of your homepage content (above the footer).

```html
<section class="card" style="margin-top:16px">
  <h2>Calculate Home Sale Proceeds by State</h2>
  <div class="state-grid">
    <a href="/calculate/california-home-sale-calculator/">California</a>
    <a href="/calculate/texas-home-sale-calculator/">Texas</a>
    <a href="/calculate/florida-home-sale-calculator/">Florida</a>
    <a href="/calculate/new-york-home-sale-calculator/">New York</a>
    <a href="/calculate/illinois-home-sale-calculator/">Illinois</a>
    <a href="/calculate/washington-home-sale-calculator/">Washington</a>
    <a href="/calculate/pennsylvania-home-sale-calculator/">Pennsylvania</a>
    <a href="/calculate/massachusetts-home-sale-calculator/">Massachusetts</a>
    <a href="/calculate/arizona-home-sale-calculator/">Arizona</a>
    <a href="/calculate/colorado-home-sale-calculator/">Colorado</a>
  </div>
</section>
```

## 3) Submit sitemap
After you push this patch, open Google Search Console and submit:
```
https://www.mynetproceeds.com/sitemap.xml
```

## 4) Optional: Permanent head meta (replaces JS injection)
If you prefer to hardcode in `<head>` instead of using `mnp-seo.js`, add:

```html
<title>Home Sale Net Proceeds Calculator - After Taxes & Closing Costs | Free Instant Estimate</title>
<meta name="description" content="Calculate exactly what you'll take home from selling your house. Free calculator includes federal & state capital gains taxes, closing costs, and commissions. Instant accurate results for all 50 states.">
<script type="application/ld+json">
{{ JSON-LD from assets/js/mnp-seo.js }}
</script>
```
Then remove the `<script defer src="/assets/js/mnp-seo.js"></script>` line.
