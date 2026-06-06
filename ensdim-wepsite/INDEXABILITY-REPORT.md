# ENSDIM — Indexability Report
**Date:** 2026-06-07

---

## Critical Fix Applied (Session 1)

**Before:** `<meta name="robots" content="noindex, nofollow">` in index.html  
→ 100% of the website was invisible to ALL search engines.

**After:** Removed. All pages now index/follow by default.

---

## Current Indexability Status

| URL | Robots | Canonical | Sitemap | Expected Status |
|---|---|---|---|---|
| `/` | index, follow | ✅ self-referencing | ✅ priority 1.0 | Indexed |
| `/services` | index, follow | ✅ | ✅ priority 0.9 | Indexed |
| `/solutions` | index, follow | ✅ | ✅ priority 0.8 | Indexed |
| `/about` | index, follow | ✅ | ✅ priority 0.8 | Indexed |
| `/blog` | index, follow | ✅ | ✅ priority 0.8 | Indexed |
| `/case-studies` | index, follow | ✅ | ✅ priority 0.7 | Indexed |
| `/products` | index, follow | ✅ | ✅ priority 0.7 | Indexed |
| `/contact` | index, follow | ✅ | ✅ priority 0.6 | Indexed |
| `/careers` | index, follow | ✅ | ✅ priority 0.6 | Indexed |
| `/ai-agency-egypt` | index, follow | ✅ | ✅ priority 0.9 | Indexed |
| `/ai-agency-saudi-arabia` | index, follow | ✅ | ✅ priority 0.9 | Indexed |
| `/ai-agency-uae` | index, follow | ✅ | ✅ priority 0.9 | Indexed |
| `/crm-development-egypt` | index, follow | ✅ | ✅ priority 0.9 | Indexed |
| `/crm-development-saudi-arabia` | index, follow | ✅ | ✅ priority 0.9 | Indexed |
| `/crm-development-uae` | index, follow | ✅ | ✅ priority 0.9 | Indexed |
| `/saas-development-egypt` | index, follow | ✅ | ✅ priority 0.9 | Indexed |
| `/saas-development-saudi-arabia` | index, follow | ✅ | ✅ priority 0.9 | Indexed |
| `/saas-development-uae` | index, follow | ✅ | ✅ priority 0.9 | Indexed |
| `/privacy` | index, follow | ✅ | ✅ priority 0.3 | Indexed |
| `/terms-of-service` | index, follow | ✅ | ✅ priority 0.3 | Indexed |

## Disallowed Paths (robots.txt)

```
/api/
/_next/
/admin/
/client-login
/404
/*.json$
/src/
```

These are correctly excluded from indexing.

---

## SPA Indexability Note

The site is a React 18 SPA. Meta tags are injected client-side via react-helmet-async.

| Crawler | Can Execute JS? | Index Status |
|---|---|---|
| Googlebot | ✅ Yes | Full indexing |
| Bingbot | ✅ Yes | Full indexing |
| GPTBot | ❌ No (static HTML only) | Partial |
| ClaudeBot | ❌ No | Partial |
| PerplexityBot | ❌ No | Partial |
| Social previews (WhatsApp, Twitter) | ❌ No | Shows fallback from index.html |

**Recommendation:** Install `vite-plugin-prerender` to generate static HTML at build time for all routes. This solves the meta tag rendering gap for non-JS crawlers.

---

## Sitemap Statistics

- Total URLs: 69
- Core pages: 20
- Service detail pages: 6
- Solution detail pages: 6
- Blog articles: 10
- Case studies: 5
- Career pages: 10
- Product pages: 3
- Local SEO pages: 9
- Sitemap URL: https://ensdim.com/sitemap.xml

---

## Immediate Actions Required

1. **Submit sitemap** → Google Search Console → Sitemaps → Add `https://ensdim.com/sitemap.xml`
2. **Submit sitemap** → Bing Webmaster Tools
3. **Request indexing** of homepage via Google Search Console URL Inspection tool
4. **Monitor** Coverage report for any indexing errors after first crawl
5. **Verify** canonical tags appear correctly using Google's URL Inspection tool
