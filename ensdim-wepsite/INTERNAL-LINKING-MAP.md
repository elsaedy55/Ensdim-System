# ENSDIM — Internal Linking Map
**Date:** 2026-06-07

---

## Hub Pages (High Authority)

| Page | URL | Links To |
|---|---|---|
| Homepage | `/` | /services, /solutions, /products, /case-studies, /blog, /about, /book-consultation |
| Services | `/services` | /services/[6 slugs], /book-consultation |
| Solutions | `/solutions` | /solutions/[6 slugs], /solutions/problems, /book-consultation |
| About | `/about` | /book-consultation, /services |
| Company | `/company` | /about, /team |

---

## Content Clusters

### AI Automation Cluster
- Hub: `/services/ai-chatbots-automation`
- Supports: `/ai-agency-egypt`, `/ai-agency-saudi-arabia`, `/ai-agency-uae`
- Blog support: `/blog/automation-response-time`, `/blog/does-your-business-need-automation`
- Solution link: `/solutions/automation-layers`

### CRM Cluster
- Hub: `/services/crm-internal-systems`
- Supports: `/crm-development-egypt`, `/crm-development-saudi-arabia`, `/crm-development-uae`
- Blog support: `/blog/crm-vs-manual-follow-up`, `/blog/whatsapp-alone-not-enough`
- Solution link: `/solutions/follow-up-systems`

### SaaS Cluster
- Hub: `/products`
- Supports: `/saas-development-egypt`, `/saas-development-saudi-arabia`, `/saas-development-uae`
- Product links: `/products/clinics-workspace`, `/products/real-estate-flow`, `/products/operations-workspace`

### Web Design Cluster
- Hub: `/services/web-design-digital-experience`
- Solution link: `/solutions/digital-experiences`
- Blog support: `/blog/website-vs-conversion-system`

---

## Breadcrumb Hierarchy (Implemented)

```
Home (/)
├── Services (/services)
│   ├── Web Design (/services/web-design-digital-experience)
│   ├── CRM (/services/crm-internal-systems)
│   ├── AI Chatbots (/services/ai-chatbots-automation)
│   ├── Data Dashboards (/services/data-dashboards)
│   ├── Mobile Apps (/services/mobile-web-applications)
│   └── Growth Marketing (/services/growth-marketing-systems)
├── Solutions (/solutions)
│   ├── Customer Journey (/solutions/customer-journey-systems)
│   ├── Digital Experiences (/solutions/digital-experiences)
│   ├── Follow-Up Systems (/solutions/follow-up-systems)
│   ├── Visibility (/solutions/visibility-insights)
│   ├── Automation (/solutions/automation-layers)
│   └── AI Decisions (/solutions/ai-practical-decisions)
├── Products (/products)
│   ├── Clinics (/products/clinics-workspace)
│   ├── Real Estate (/products/real-estate-flow)
│   └── Operations (/products/operations-workspace)
├── Case Studies (/case-studies)
│   └── [5 case study detail pages]
├── Blog (/blog)
│   └── [10 article detail pages]
├── Careers (/careers)
│   └── [18 role detail pages]
├── About (/about)
├── Company (/company)
├── Contact (/contact)
└── Local SEO Pages
    ├── /ai-agency-egypt
    ├── /ai-agency-saudi-arabia
    ├── /ai-agency-uae
    ├── /crm-development-egypt
    ├── /crm-development-saudi-arabia
    ├── /crm-development-uae
    ├── /saas-development-egypt
    ├── /saas-development-saudi-arabia
    └── /saas-development-uae
```

---

## Cross-Linking Opportunities (Recommended Next)

1. **Blog → Service pages**: Each blog article should link to the relevant service page
   - `lose-leads-after-first-message` → `/services/crm-internal-systems`
   - `automation-response-time` → `/services/ai-chatbots-automation`
   - `website-vs-conversion-system` → `/services/web-design-digital-experience`

2. **Local pages → Service detail**: Each local page should link to the service detail page
   - `/ai-agency-egypt` → `/services/ai-chatbots-automation`
   - `/crm-development-egypt` → `/services/crm-internal-systems`

3. **Case studies → Solutions**: Each case study should link to the relevant solution
   - Already implemented via `relatedSolution` field in case study data

4. **FAQ answers → relevant pages**: FAQ answers can include contextual links
   - AboutPage FAQ → /services
   - ServicesPage FAQ → /book-consultation

---

## PageRank Flow Priority

High priority pages (most internal links pointing to them):
1. `/book-consultation` — CTA on every page
2. `/services` — linked from homepage, navigation, all detail pages
3. `/about` — linked from company, navigation
4. `/solutions` — linked from homepage, navigation
5. `/contact` — linked from navigation, footer
