Apply only the following exact fixes.

Do not redesign the website.
Do not regenerate pages.
Do not change approved UI, colors, typography, animations, routes, or page structure unless explicitly required below.
Preserve credits by fixing only these specific issues.

This is a targeted bug-fix pass based on the current screenshots.

====================================================
1. FIX BROKEN SOLUTION CARD TEXT KEYS
====================================================

In the homepage Solutions section, two cards are showing translation keys instead of real content:

solutions.solution5Title
solutions.solution5Desc
solutions.solution6Title
solutions.solution6Desc

Fix these immediately.

Card 5:
Title:
Automation Layers

Description:
Reduce repetitive work and speed up response.

CTA:
Explore Automation Layers

Link:
/solutions/automation-layers

Arabic:
Title:
طبقات الأتمتة

Description:
نقلل العمل المتكرر ونسرّع الاستجابة من خلال تدفقات تشغيل أذكى.

CTA:
استكشف الأتمتة

Card 6:
Title:
AI for Practical Decisions

Description:
Use intelligence to improve follow-up, insights, and performance.

CTA:
Explore AI Solutions

Link:
/solutions/ai-practical-decisions

Arabic:
Title:
ذكاء عملي للقرارات

Description:
نستخدم الذكاء لتحسين المتابعة، الرؤية، والأداء.

CTA:
استكشف حلول الذكاء

Rules:
- Do not show translation keys anywhere.
- Titles and descriptions must be visible.
- Cards must keep equal height.
- Cards must work on desktop and mobile.
- Arabic cards must not overlap or crop text.

====================================================
2. FOOTER SOLUTIONS LINKS — REDUCE ITEMS
====================================================

The footer Solutions column still shows too many links.

Fix footer Solutions column.

On desktop and mobile, under Solutions show only:

Build
Start
Growth

Links:
Build → /solutions/build
Start → /solutions/start
Growth → /solutions/growth

Remove these from the footer Solutions column:
Problems we solve
Customer Journey Systems
Digital Experiences
Follow-Up Systems
Visibility & Insights
Automation Layers
AI for Practical Decisions

Arabic footer:
الحلول
البناء
الانطلاق
النمو

Do not show extra solution detail pages in the footer.

====================================================
3. SERVICES FOOTER LINKS — KEEP ONLY MAIN SERVICES
====================================================

In the footer Services column, keep only the main service categories.

Show only:

Web Design & Digital Experience
AI Chatbots & Automation
Data & Dashboards

Links:
/services/web-design-digital-experience
/services/ai-chatbots-automation
/services/data-dashboards

Arabic:
تصميم الويب والتجارب الرقمية
المحادثات الذكية والأتمتة
البيانات ولوحات المتابعة

Do not overcrowd the footer.

====================================================
4. TECHNOLOGY ECOSYSTEM / PARTNERS SECTION FIX
====================================================

The technology ecosystem section was not updated correctly.

Replace the current title and brand order.

English title:
Built with trusted global technologies

English subtitle:
Technologies we use to build reliable, scalable digital systems.

Arabic title:
منظومة التقنيات الاستراتيجية

Arabic subtitle:
نستخدم منظومة تقنية عالمية موثوقة لبناء حلول قابلة للتوسع، آمنة، ومتصلة بأدوات العمل التي تستخدمها الشركات يوميًا.

Use this exact order:
1. Microsoft Azure
2. AWS
3. Google Cloud
4. OpenAI
5. GitHub
6. Cloudflare
7. Vercel
8. Anthropic
9. n8n
10. LangChain

Rules:
- Use accurate official logos only.
- If the logo cannot be rendered accurately, use a clean premium text chip.
- Do not use fake logos.
- Do not use wrong logos.
- Keep all items aligned.
- Same visual height.
- Same spacing.
- No overlap in Arabic.
- No items behind each other.
- On mobile, use a clean 2-column grid or smooth horizontal scroll.
- Do not imply official partnership.

====================================================
5. JOB ROLE LINKS
====================================================

Career role cards must not open the general Careers page.

Each role opens its own specific page:

AI Engineer → /careers/ai-engineer
Backend Developer → /careers/backend-developer
Frontend Developer → /careers/frontend-developer
UI/UX Designer → /careers/ui-ux-designer
Data Analyst → /careers/data-analyst
Marketing Specialist → /careers/marketing-specialist
Business Developer → /careers/business-developer

Only the general button “View Open Roles” may open:
/careers

====================================================
6. JOB APPLICATION FORM
====================================================

Each job detail page must include a job-specific application form.

Replace the current generic form with:

Fields:
Full Name
Email
Phone / WhatsApp
Country / City
Position Applied For
Current / Previous Job Title
Years of Experience
Previous Company or Work Experience
Portfolio / LinkedIn URL
Expected Availability
Short Message
Upload CV

CTA:
Submit Application

Arabic:
الاسم الكامل
البريد الإلكتروني
رقم الهاتف / واتساب
الدولة / المدينة
الوظيفة المتقدم لها
المسمى الوظيفي الحالي أو السابق
سنوات الخبرة
الخبرات أو الشركات السابقة
رابط الأعمال / لينكدإن
موعد التفرغ المتوقع
رسالة مختصرة
رفع السيرة الذاتية

CTA Arabic:
إرسال الطلب

Rules:
- Upload CV field must be visible.
- Form must be different from client consultation forms.
- On mobile, all fields full width.
- No cramped labels.
- No overlap.

====================================================
7. FORM CONTEXT TRACKING
====================================================

Every form must include hidden context fields so ENSDIM knows where the user came from.

Add hidden fields:
source_page
source_section
interest_type
clicked_problem
clicked_solution
clicked_case_study
clicked_service
clicked_product
journey_stage
language
country

Apply to:
Book Consultation form
Contact form
Create Account form
Request Access form
Send Business Challenge form
Career Application form

Do not show hidden fields to users.

Examples:
If user comes from /solutions/follow-up-systems:
source_page = /solutions/follow-up-systems
clicked_solution = Follow-Up Systems
interest_type = Follow-up / CRM

If user comes from /careers/backend-developer:
source_page = /careers/backend-developer
interest_type = Career Application
position = Backend Developer

If user comes from /problems/leads-get-lost:
clicked_problem = Leads get lost
interest_type = Follow-up / CRM

====================================================
8. BROWSER BACK SCROLL POSITION
====================================================

Fix back navigation behavior.

Current issue:
When the user is on a section, opens another page, then presses Back, the previous page opens from the top.

Required behavior:
- New page links open from the top.
- Browser Back returns the user to the exact previous scroll position.
- Preserve previous scroll position on:
  desktop
  mobile
  English
  Arabic

Example:
If the user was in the Services section, opened a service page, then pressed Back, return to the Services section, not the top of the page.

====================================================
9. CLIENT FOOTER LINKS
====================================================

The Client section in the footer is not working.

Fix links:

Client Login → /client-login
Create Account → /client-login

Both must work.

Footer CTA and Client Login must look aligned and consistent on desktop and mobile.

Rules:
- no awkward spacing
- no tiny misaligned text
- no broken button layout
- Arabic labels must fit

====================================================
10. MOBILE MENU BEHAVIOR
====================================================

Fix mobile menu behavior.

On mobile:
Tapping the main menu label should expand the submenu only.
It should not open the section page directly.

Main labels:
Solutions
Services
Products
Resources
Company

Solutions submenu must include only:
Build
Start
Growth

Services submenu must include only:
Web Design & Digital Experience
AI Chatbots & Automation
Data & Dashboards

Products submenu:
Clinics Workspace
Real Estate Flow
Operations Workspace

Resources submenu:
Research
Case Studies
Careers
Blog

Company submenu:
About
Team
Contact

If needed, add a small first link:
View all Solutions
View all Services
View all Products
View all Resources
View Company

Arabic:
عرض كل الحلول
عرض كل الخدمات
عرض كل المنتجات
عرض كل الموارد
عرض صفحة الشركة

Do not use the word Overview.

====================================================
11. COMPANY MENU
====================================================

Remove Partners from Company dropdown.

Company dropdown must include only:
About
Team
Contact

Links:
About → /about
Team → /team
Contact → /contact

Privacy and Terms appear only in footer.

====================================================
12. FINAL QA
====================================================

Before finalizing, confirm:

- The two broken solution cards no longer show translation keys.
- Automation Layers card is correct.
- AI for Practical Decisions card is correct.
- Footer Solutions shows only Build, Start, Growth.
- Footer Services shows only Web Design, AI Chatbots & Automation, Data & Dashboards.
- Technology ecosystem title/subtitle/logos/order are correct.
- Arabic technology section does not overlap.
- Career roles open specific job pages.
- Job forms include CV upload.
- All forms include hidden source context fields.
- Browser Back restores previous scroll position.
- Footer Client links work.
- Mobile menu expands submenu only.
- Company dropdown no longer contains Partners.
- No full redesign was applied.