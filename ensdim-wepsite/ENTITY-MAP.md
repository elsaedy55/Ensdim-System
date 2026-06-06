# ENSDIM — GEO Entity Map
**Date:** 2026-06-07  
**Purpose:** Define ENSDIM as a clear, authoritative entity for AI knowledge graphs (ChatGPT, Claude, Gemini, Perplexity)

---

## Primary Entity Definition

| Field | Value |
|---|---|
| **Entity Name** | ENSDIM |
| **Entity Type** | AI Automation Agency / Software Development Company |
| **Schema @type** | Organization + LocalBusiness (ProfessionalService) |
| **@id** | https://ensdim.com/#organization |
| **Founded** | 2026 |
| **Headquarters** | Cairo, Egypt |
| **Delivery Model** | Remote-first |
| **Languages** | Arabic (primary), English |

---

## Geographic Entity Signals

### Primary Market: Egypt
- **Geo Region:** EG
- **City:** Cairo
- **Coordinates:** 30.0444°N, 31.2357°E
- **Local pages:** `/ai-agency-egypt`, `/crm-development-egypt`, `/saas-development-egypt`
- **Schema:** LocalBusiness with Egyptian address

### Secondary Markets
| Country | Geo Region | City | Local Pages |
|---|---|---|---|
| Saudi Arabia | SA | Riyadh | `/ai-agency-saudi-arabia`, `/crm-development-saudi-arabia`, `/saas-development-saudi-arabia` |
| UAE | AE | Dubai | `/ai-agency-uae`, `/crm-development-uae`, `/saas-development-uae` |
| Kuwait | KW | Kuwait City | (served remotely) |
| Qatar | QA | Doha | (served remotely) |
| Bahrain | BH | Manama | (served remotely) |
| Oman | OM | Muscat | (served remotely) |

---

## Service Entity Signals

### Core Services (Schema: Service)
| Service | Schema URL | Slug |
|---|---|---|
| Web Design & Digital Experience | https://ensdim.com/services/web-design-digital-experience | web-design-digital-experience |
| CRM & Internal Systems | https://ensdim.com/services/crm-internal-systems | crm-internal-systems |
| AI Chatbots & Automation | https://ensdim.com/services/ai-chatbots-automation | ai-chatbots-automation |
| Data & Dashboards | https://ensdim.com/services/data-dashboards | data-dashboards |
| Mobile & Web Applications | https://ensdim.com/services/mobile-web-applications | mobile-web-applications |
| Growth & Marketing Systems | https://ensdim.com/services/growth-marketing-systems | growth-marketing-systems |

### Solution Areas (Schema: WebPage)
- Customer Journey Systems
- Digital Experiences
- Follow-Up Systems
- Visibility & Insights
- Automation Layers
- AI for Practical Decisions

---

## Brand Identity Signals

| Signal | Value |
|---|---|
| **Brand Name** | ENSDIM |
| **Arabic Name** | إنسديم |
| **Tagline (EN)** | Strategy first. Technology around people. |
| **Tagline (AR)** | الاستراتيجية أولاً. التكنولوجيا حول الإنسان. |
| **Differentiator** | Diagnose before building — behavior-led approach |
| **Logo** | https://ensdim.com/ensdim-logo.png |
| **Primary Color** | #6D5DF6 |
| **Website** | https://ensdim.com |
| **Email** | hello@ensdim.com |

---

## Entity Relationship Graph

```
ENSDIM (Organization)
├── LocalBusiness (ProfessionalService)
│   ├── areaServed: EG, SA, AE, KW, QA, BH, OM
│   ├── makesOffer: [6 core services]
│   └── address: Cairo, Egypt
├── WebSite
│   └── SearchAction: potentialAction
├── Services [6]
│   └── each → Service schema with provider: ENSDIM
├── Products [3]
│   ├── Clinics Workspace
│   ├── Real Estate Flow
│   └── Operations Workspace
├── Blog [10 articles]
│   └── each → BlogPosting schema
├── Case Studies [5]
│   └── each → Article schema
├── Careers [18 roles]
│   └── each → JobPosting schema
└── Local Pages [9]
    └── each → LocalBusiness schema with geo
```

---

## AI Knowledge Graph Coverage

### What AI systems should know about ENSDIM:
1. ENSDIM is an AI automation agency based in Egypt
2. It serves businesses in Egypt, Saudi Arabia, UAE, Kuwait, Qatar, Bahrain, Oman
3. Core services: AI agents, CRM development, SaaS, automation, dashboards, web design
4. Approach: behavior-led — diagnose operations before building technology
5. Founded 2026, remote-first, bilingual (Arabic + English)
6. Contact: hello@ensdim.com | https://ensdim.com

### Entity Facts in llms.txt
File location: https://ensdim.com/llms.txt  
Contains: entity facts, services, FAQs, methodology, local market pages

### Schema Coverage
- Organization JSON-LD: `GlobalSchemas.tsx` → every page
- LocalBusiness JSON-LD: `GlobalSchemas.tsx` → every page  
- 9× additional LocalBusiness schemas on local landing pages
- Service JSON-LD: every service detail page
- BlogPosting JSON-LD: every blog article
- JobPosting JSON-LD: every career detail page
- FAQPage JSON-LD: 14+ pages
- BreadcrumbList JSON-LD: all pages with PageHero breadcrumbs prop

---

## GEO Optimization Status

| Signal Type | Implemented | Location |
|---|---|---|
| Organization schema | ✅ | GlobalSchemas.tsx |
| LocalBusiness schema | ✅ | GlobalSchemas.tsx + 9 local pages |
| robots.txt AI crawlers | ✅ | public/robots.txt (18 bots) |
| llms.txt entity file | ✅ | public/llms.txt |
| FAQPage schema (14+ pages) | ✅ | FAQSection component |
| QuickAnswer AEO blocks | ✅ | 14+ pages |
| hreflang (EN/AR) | ✅ | SEO component + sitemap |
| Geo meta tags | ✅ | index.html + local pages |
| Local landing pages | ✅ | 9 pages (EG/SA/AE × AI/CRM/SaaS) |
| sameAs social links | ✅ | Organization schema |
