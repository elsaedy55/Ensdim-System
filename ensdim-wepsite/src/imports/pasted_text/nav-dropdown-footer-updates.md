Apply only the following navigation, dropdown, footer, and linking updates.

Do not redesign the website.
Do not regenerate the homepage.
Do not change approved sections, colors, typography, hero, cards, or content unless explicitly mentioned.
Preserve current layout and responsive behavior.

This update is focused on:
- simplifying dropdown navigation
- removing “Overview” labels from dropdowns
- making main menu items open their section landing pages
- improving dropdown usability on desktop and mobile
- showing all website pages clearly in the footer
- removing Problems Library from the Solutions dropdown but keeping it inside the Solutions page
- checking that all links and buttons work
- preserving credits by changing only navigation and linking logic

-----------------------------------
1. REMOVE “OVERVIEW” FROM ALL DROPDOWNS
-----------------------------------

Do not show the word “Overview” under any dropdown.

Instead, the main menu item itself should open the overview/landing page for that section.

Example:
Click “Solutions” → opens /solutions
Do not show “Overview” inside the dropdown.

Click “Services” → opens /services
Do not show “Overview” inside the dropdown.

Click “Products” → opens /products
Do not show “Overview” inside the dropdown.

Click “Resources” → opens /resources
Do not show “Overview” inside the dropdown.

Click “Company” → opens /company
Do not show “Overview” inside the dropdown.

-----------------------------------
2. MAIN MENU CLICK BEHAVIOR
-----------------------------------

Each top-level menu item must be clickable and visually distinct from dropdown links.

Top menu items:
Solutions
Services
Products
Resources
Company

Click behavior:
Solutions → /solutions
Services → /services
Products → /products
Resources → /resources
Company → /company

Design behavior:
- The main menu item should look like a primary section link.
- The dropdown links should look visually secondary.
- Do not make the main menu item feel like just another dropdown item.
- Add a small arrow/chevron for dropdown behavior, but keep the label itself clickable.
- If technically easier, make the whole menu item clickable and show dropdown on hover/click.

-----------------------------------
3. DESKTOP DROPDOWN UX FIX
-----------------------------------

Improve dropdown behavior on desktop.

Current issue:
The dropdown disappears too quickly while moving the mouse from the menu item to the dropdown panel.

Fix:
- Dropdown remains open when hovering over the menu item or the dropdown panel.
- Add hover-safe area between the menu item and dropdown panel.
- Add close delay of 250–400ms.
- Dropdown should not disappear immediately.
- Dropdown opens on hover and also on click.
- Dropdown closes only when the cursor leaves both the menu item and dropdown panel.
- Make the interaction smooth, stable, and premium.

-----------------------------------
4. MOBILE MENU BEHAVIOR
-----------------------------------

On mobile, there is no hover.

Use this structure:

Each main section appears as a row:
Solutions
Services
Products
Resources
Company

Each row has:
- Main label opens the section landing page.
- Chevron opens/closes the submenu.

If this is hard to implement, use this alternative:

Inside each mobile accordion, show the first item as:
Go to Solutions
Go to Services
Go to Products
Go to Resources
Go to Company

But do not call it “Overview”.

Arabic mobile:
Solutions → الحلول
Go to Solutions → انتقل إلى الحلول

Services → الخدمات
Go to Services → انتقل إلى الخدمات

Products → المنتجات
Go to Products → انتقل إلى المنتجات

Resources → الموارد
Go to Resources → انتقل إلى الموارد

Company → الشركة
Go to Company → انتقل إلى الشركة

Mobile requirements:
- all links tappable
- accordion does not overlap content
- no horizontal scroll
- Arabic RTL works correctly
- buttons are readable
- menu closes after selecting a page

-----------------------------------
5. SOLUTIONS DROPDOWN UPDATE
-----------------------------------

Remove “Problems Library” from the Solutions dropdown.

Solutions dropdown should show only:

Build
Start
Growth

Links:
Build → /solutions/build
Start → /solutions/start
Growth → /solutions/growth

The main Solutions menu item opens:
/solutions

Inside the /solutions page, keep and show:
- solution cards
- Build / Start / Growth
- Problems section
- Problems Library link or section

Problems Library should exist inside the Solutions page, not inside the dropdown.

Inside /solutions:
Add a clear section:

Title:
Problems we solve

Subtitle:
Real operating problems that make businesses lose leads, time, visibility, and growth.

CTA:
Explore Problems

Link:
Explore Problems → /solutions/problems

Arabic:
Title:
مشكلات نحلها

Subtitle:
مشكلات تشغيلية حقيقية تجعل الأعمال تخسر عملاء محتملين، وقتًا، وضوحًا، وفرص نمو.

CTA:
استكشف المشكلات

-----------------------------------
6. SERVICES DROPDOWN UPDATE
-----------------------------------

Do not show “Overview”.

Main Services menu item opens:
/services

Services dropdown should show:

Web Design & Digital Experience
CRM & Internal Systems
AI Chatbots & Automation
Data & Dashboards
Management Data Chatbot
Mobile & Web Applications
Growth & Marketing Systems

Links:
/services/web-design-digital-experience
/services/crm-internal-systems
/services/ai-chatbots-automation
/services/data-dashboards
/services/management-data-chatbot
/services/mobile-web-applications
/services/growth-marketing-systems

-----------------------------------
7. PRODUCTS DROPDOWN UPDATE
-----------------------------------

Do not show “Overview”.

Main Products menu item opens:
/products

Products dropdown should show:

Clinics Workspace
Real Estate Flow
Operations Workspace

Links:
/products/clinics-workspace
/products/real-estate-flow
/products/operations-workspace

-----------------------------------
8. RESOURCES DROPDOWN UPDATE
-----------------------------------

Do not show “Overview”.

Main Resources menu item opens:
/resources

Resources dropdown should show:

Research
Case Studies
Careers
Blog

Links:
Research → /research
Case Studies → /case-studies
Careers → /careers
Blog → /blog

Blog must be the last item under Resources.

-----------------------------------
9. COMPANY DROPDOWN UPDATE
-----------------------------------

Do not show “Overview”.

Main Company menu item opens:
/company

Company dropdown should show:

About
Team
Partners
Contact

Links:
About → /about
Team → /team
Partners → /partners
Contact → /contact

Privacy must NOT appear in the Company dropdown.
Privacy appears only in the footer.

-----------------------------------
10. FOOTER FULL SITE MAP
-----------------------------------

Update the footer so it clearly shows all pages from the top menu under their sections.

Footer should include:

Company
- About
- Team
- Partners
- Contact

Solutions
- Build
- Start
- Growth
- Problems we solve
- Customer Journey Systems
- Digital Experiences
- Follow-Up Systems
- Visibility & Insights
- Automation Layers
- AI for Practical Decisions

Services
- Web Design & Digital Experience
- CRM & Internal Systems
- AI Chatbots & Automation
- Data & Dashboards
- Management Data Chatbot
- Mobile & Web Applications
- Growth & Marketing Systems

Products
- Clinics Workspace
- Real Estate Flow
- Operations Workspace

Resources
- Research
- Case Studies
- Careers
- Blog

Client Workspace
- Client Login
- Create Account

Legal
- Privacy Policy
- Terms of Service

Footer logo:
- clicking the footer logo opens Home and scrolls to top.
- ENSDIM wordmark must keep “EN” in red.

Arabic footer must be fully translated and RTL.

-----------------------------------
11. LINK CHECK
-----------------------------------

Check all navigation and footer links.

No dead links.
No placeholder buttons.
No broken pages.

Required links:
Solutions → /solutions
Build → /solutions/build
Start → /solutions/start
Growth → /solutions/growth
Problems section inside Solutions → /solutions/problems

Services → /services
Management Data Chatbot → /services/management-data-chatbot

Products → /products

Resources → /resources
Research → /research
Case Studies → /case-studies
Careers → /careers
Blog → /blog

Company → /company
About → /about
Team → /team
Partners → /partners
Contact → /contact

Privacy Policy → /privacy
Terms of Service → /terms-of-service

Client Login → /client-login
Book Consultation → /book-consultation

-----------------------------------
12. PAGE LOAD BEHAVIOR
-----------------------------------

When clicking any page link:
- open the page from the top.
- do not open at the bottom or previous scroll position.

When using browser Back:
- preserve the previous scroll position where the user was before leaving.

For same-page anchor links:
- use smooth scrolling.

-----------------------------------
13. CREDIT-SAVING RULE
-----------------------------------

Only update:
- navbar dropdown structure
- link behavior
- footer site map
- mobile menu behavior
- required routing checks

Do not regenerate:
- homepage sections
- hero design
- cards
- page content
- animations
- images
- typography

Keep changes minimal and precise.