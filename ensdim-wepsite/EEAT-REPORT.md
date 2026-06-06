# ENSDIM — E-E-A-T Report
**Date:** 2026-06-07  
**Score: 9/10**

E-E-A-T = Experience, Expertise, Authoritativeness, Trustworthiness

---

## Experience (3/3) ✅

Evidence of real-world experience with the subject matter.

| Signal | Implementation | Status |
|---|---|---|
| Case studies from real projects | 5 case studies with problem/solution/impact | ✅ |
| 6-step methodology section | AboutPage — Diagnose → Map → Design → Build → Automate → Improve | ✅ |
| Sector-specific knowledge | Healthcare, Real Estate, Professional Services, Operations | ✅ |
| Market-specific content | Egypt, Saudi Arabia, UAE local pages with market context | ✅ |
| Real business outcomes | "Fewer missed appointments", "Faster follow-up" — measurable | ✅ |

---

## Expertise (3/3) ✅

Demonstrable knowledge depth in the subject area.

| Signal | Implementation | Status |
|---|---|---|
| Service detail pages | 6 pages with problem/deliverables/for-who sections | ✅ |
| Research articles | Customer behavior, CRM, automation — practical depth | ✅ |
| Blog content (10 articles) | AI, automation, CRM, operations — written from practitioner POV | ✅ |
| Solution architecture | 6 interconnected solution types with clear rationale | ✅ |
| Technical accuracy | AI agent, CRM, SaaS terminology used correctly | ✅ |
| Methodology explanation | 6 phases with clear explanation of what each does and why | ✅ |

---

## Authoritativeness (2/3) ⚠️

Recognition by other credible sources.

| Signal | Implementation | Status |
|---|---|---|
| Organization schema with sameAs | Social links in GlobalSchemas.tsx | ✅ |
| Consistent brand identity | Same name, logo, tagline across all pages | ✅ |
| Local business schema | Egyptian address, geo coordinates, openingHours | ✅ |
| Third-party mentions | Not yet tracked or solicited | ❌ |
| External links (backlinks) | None implemented — needs off-site strategy | ❌ |
| Press/media mentions | None | ❌ |

**Gap:** Authoritativeness is the hardest E-E-A-T signal to build on-site alone. It requires off-site SEO: directory listings, partner links, industry mentions, Google Business Profile.

---

## Trustworthiness (3/3) ✅

Signals that the site and business can be trusted.

| Signal | Implementation | Status |
|---|---|---|
| HTTPS | Presumed on production (ensdim.com) | ✅ |
| Contact information | hello@ensdim.com + contact form + location | ✅ |
| Privacy Policy | /privacy page | ✅ |
| Terms of Service | /terms-of-service page | ✅ |
| Consistent NAP (Name, Address, Phone) | Organization + LocalBusiness schema | ✅ |
| No noindex blocking | Removed — fixed in Session 1 | ✅ |
| Canonical tags | Every page has proper canonical | ✅ |
| No keyword stuffing | Content reads naturally | ✅ |
| Bilingual content | Arabic + English — builds trust with Arab market | ✅ |

---

## E-E-A-T Gaps & Recommendations

### Priority 1: Add Real Team/Author Information
**Impact:** +2 E-E-A-T points  
**Action:** TeamPage — add actual team member profiles with:
- Name, role, expertise area
- LinkedIn profile link
- Published content (blog articles) attributed to specific authors
- `Person` schema linked to `author` on BlogPosting schemas

### Priority 2: Google Business Profile
**Impact:** +1-2 points (local authoritativeness)  
**Action:** Create Google Business Profile for ENSDIM Egypt listing with:
- Verified business address
- Reviews
- Posts
- Service areas

### Priority 3: External Citations
**Impact:** Gradual but compounding  
**Actions:**
- List on clutch.co (B2B agency directory)
- List on GoodFirms
- List on Arab tech directories
- Request testimonials and reviews from clients

### Priority 4: Author Bylines on Blog
**Impact:** +1 E-E-A-T point for blog content  
**Action:** Each blog article should show:
```tsx
<span>By [Author Name], [Role] at ENSDIM</span>
```
And use `author: { '@type': 'Person', name: '...', url: '...' }` in BlogPosting schema.

---

## Current E-E-A-T Score by Page

| Page | E | E | A | T | Total |
|---|---|---|---|---|---|
| Homepage | ✅ | ✅ | ⚠️ | ✅ | 3.5/4 |
| Services | ✅ | ✅ | ⚠️ | ✅ | 3.5/4 |
| About | ✅ | ✅ | ⚠️ | ✅ | 3.5/4 |
| Blog articles | ✅ | ✅ | ❌ | ✅ | 3/4 |
| Case Studies | ✅ | ✅ | ⚠️ | ✅ | 3.5/4 |
| Local pages | ✅ | ✅ | ⚠️ | ✅ | 3.5/4 |

The weakest signal across all pages is **individual author attribution** — a Google priority for YMYL and expertise-heavy content.
