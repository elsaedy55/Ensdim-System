# PRD — Ensdim Dashboard ( Admin Panel )

# نظام تشغيل وإدارة شركة البرمجيات

---

# 1) نظرة عامة على المنتج

## اسم المنتج

Ensdim Dashboard

---

## وصف المنتج

لوحة تحكم داخلية متكاملة لإدارة وتشغيل شركة البرمجيات بالكامل، مرتبطة مباشرة بـ:

* الموقع الرسمي
* منصة العملاء
* إدارة الفريق
* إدارة المشاريع
* التحليلات
* التشغيل الداخلي

النظام يسمح للشركة بإدارة:

* المحتوى
* المشاريع
* العملاء
* الفريق
* الاجتماعات
* العقود
* المدفوعات
* التحليلات
* التشغيل الداخلي

من مكان واحد بشكل احترافي وقابل للتوسع.

---

# 2) الهدف من المنتج

الهدف ليس إنشاء Dashboard تقليدية.

الهدف الحقيقي:

> بناء نظام تشغيل كامل لشركة البرمجيات (Agency Operating System)

---

# 3) المشاكل الحالية

معظم شركات البرمجة تعتمد على:

* واتساب
* ملفات مشتتة
* Notion/Trello منفصلين
* تعديل يدوي للموقع
* متابعة غير واضحة
* غياب التحليلات
* عدم وضوح أداء الفريق
* صعوبة متابعة العملاء

وده يسبب:

* فوضى تشغيلية
* بطء التنفيذ
* ضعف تجربة العميل
* تأخير المشاريع
* ضعف الإدارة
* صعوبة التوسع

---

# 4) المستخدمين داخل النظام

---

## 1) Admin

صلاحية كاملة على النظام بالكامل.

يمكنه:

* التحكم الكامل
* إدارة الصلاحيات
* إدارة النظام
* إدارة التحليلات
* إدارة المحتوى
* متابعة كل المشاريع والعملاء

---

## 2) Custom Role Users

أي مستخدم داخلي يتم إنشاؤه بواسطة الأدمن.

الأدمن يحدد:

* اسم المنصب
* الصلاحيات
* ما الذي يستطيع رؤيته
* ما الذي يستطيع تعديله

---

# 5) نظام الصلاحيات (Roles & Permissions)

---

# Architecture

النظام يحتوي فقط على:

* Client
* Admin
* Custom Roles

---

# Custom Role System

الأدمن يستطيع:

* إنشاء أي منصب
* تسمية المنصب
* تحديد الصلاحيات يدويًا
* تعديل الصلاحيات لاحقًا
* ربط المستخدمين بالمناصب

---

# أمثلة مناصب

* Project Manager
* Developer
* UI/UX Designer
* Accountant
* Sales
* Content Editor
* Marketing Manager
* HR

---

# Permission System

كل جزء داخل النظام له صلاحيات مستقلة.

---

## مثال الصلاحيات

### Projects

* View
* Create
* Edit
* Delete
* Assign Team
* Export

---

### CMS

* Edit Home Page
* Edit Services
* Publish Articles
* Manage SEO
* Edit Navigation

---

### Financial

* View Revenue
* Edit Invoices
* Approve Payments
* Export Reports

---

### Team

* View Team
* Add Members
* Edit Members
* Remove Members

---

### Analytics

* View Website Analytics
* View Client Analytics
* View Financial Analytics

---

# Granular Permissions

حتى:

* Button
* Action
* API
* Page

يجب أن تكون مرتبطة بـ Permission مستقلة.

---

# 6) Core Modules

---

# 1) Website CMS Management

## الهدف

إدارة الموقع بالكامل بدون الحاجة لمبرمج.

---

## Features

### إدارة الصفحة الرئيسية

* تغيير ترتيب السكاشن
* إخفاء / إظهار سكشن
* تعديل النصوص
* تعديل الصور
* تعديل الـ CTA
* التحكم في الـ Hero Section

---

### إدارة الخدمات

* إضافة خدمة
* تعديل خدمة
* حذف خدمة
* ترتيب الخدمات

---

### Portfolio Management

* إضافة مشروع
* تعديل مشروع
* صور المشروع
* وصف المشروع
* النتائج
* التقنيات المستخدمة
* روابط المشروع

---

### Case Studies

* إضافة دراسة حالة
* Before / After
* المشكلة
* الحل
* النتائج
* Analytics

---

### Blog CMS

* إنشاء مقال
* Draft System
* Scheduling
* Categories
* Tags
* SEO Settings
* Cover Image
* Rich Text Editor

---

### إدارة صفحات الموقع

* About Us
* Contact
* Careers
* Privacy Policy
* Terms & Conditions

---

# 2) Client Management

---

## Features

* إدارة العملاء
* بيانات التواصل
* Activity History
* المشاريع الخاصة بالعميل
* العقود
* المدفوعات
* الاجتماعات
* حالة العميل

---

## Client Status

* Lead
* Interested
* Proposal Sent
* Negotiation
* Active Client
* Completed
* Lost

---

# 3) Project Management

---

## Features

* إنشاء مشروع
* تقسيم المشروع إلى مراحل
* Assign Team
* Deadlines
* Upload Files
* Project Timeline
* Milestone Tracking
* Progress Tracking

---

## حالات المشروع

* Planning
* UI/UX
* Development
* Review
* Testing
* Delivery
* Maintenance

---

# 4) Tasks & Workflow System

---

## Features

* إنشاء Task
* Assign Member
* Due Date
* Priority
* Attachments
* Comments
* Activity Timeline

---

## حالات التاسكات

* Todo
* In Progress
* Review
* Done
* Blocked

---

# 5) Meetings System

## الهدف

استبدال الشات العشوائي باجتماعات منظمة.

---

## Features

### إنشاء اجتماع

* عنوان الاجتماع
* وصف الاجتماع
* اختيار العميل
* اختيار المشروع
* تحديد التاريخ والوقت

---

### أنواع الاجتماعات

* Video Meeting
* Voice Meeting
* Review Session
* Delivery Meeting
* Consultation

---

### إدارة الاجتماعات

* Upcoming Meetings
* Meeting History
* Reschedule
* Cancel Meeting
* Meeting Notes

---

### داخل الاجتماع

* مشاركة الشاشة
* مشاركة الملفات
* تسجيل الملاحظات
* رفع ملفات

---

### External Integrations

* Google Meet
* Zoom
* Microsoft Teams

---

# 6) Contracts & Proposals

---

## Features

* إنشاء Proposal
* Pricing Blocks
* PDF Export
* إرسال للعميل
* إنشاء العقود
* التوقيع الإلكتروني
* Version History

---

# 7) Payments & Financial System

---

## Features

* متابعة المدفوعات
* الفواتير
* تكلفة التشغيل
* تكلفة الفريق
* الأرباح
* الأرباح الصافية
* المصروفات
* دفعات المشاريع

---

## Financial Dashboard

يعرض:

* الإيرادات
* الأرباح
* المصروفات
* المشاريع المتأخرة
* المدفوعات المعلقة

---

# 8) Full Activity Tracking System

## الهدف

تحليل وتتبع كل حركة يقوم بها العميل داخل:

* الموقع
* منصة العميل
* البروبوزال
* المشروع

---

# Website Tracking

## يتم تتبع:

* الصفحات التي زارها
* مدة الجلسة
* مصدر الزيارة
* الجهاز والمتصفح
* عدد الزيارات
* الـ Clicks
* الـ Scroll Depth
* الـ CTA Clicks

---

# Dashboard Tracking

## يتم تتبع:

* وقت تسجيل الدخول
* مدة الجلسة
* الصفحات التي فتحها
* الملفات التي حملها
* الفواتير التي شاهدها
* النسخ التجريبية التي فتحها
* وقت الموافقات
* طلبات التعديل

---

# Smart Analytics

## أمثلة

* العميل لم يدخل منذ 10 أيام
* العميل فتح الفاتورة 4 مرات ولم يدفع
* العميل يقضي وقتًا طويلًا في صفحة معينة
* أكثر الخدمات طلبًا
* أكثر مصادر العملاء تحويلًا

---

# 9) Analytics Dashboard

---

## Website Analytics

* عدد الزوار
* معدل التحويل
* الصفحات الأكثر زيارة
* مدة الجلسة
* مصادر الزيارات

---

## Client Analytics

* أفضل نوع عملاء
* أكثر الخدمات طلبًا
* العملاء الأكثر نشاطًا
* معدل التحويل

---

## Team Analytics

* سرعة التنفيذ
* أداء الفريق
* المشاريع المكتملة
* متوسط وقت إنهاء التاسكات

---

# 10) Notifications System

---

## إشعارات داخلية

* مشروع جديد
* طلب تعديل
* دفعة جديدة
* اجتماع جديد
* Task متأخرة
* موافقة عميل
* رسالة نظام

---

# 11) Dashboard الرئيسية

---

## Overview Cards

* المشاريع الحالية
* العملاء النشطين
* الأرباح الشهرية
* المشاريع المتأخرة
* Leads الجديدة
* معدل التحويل

---

## Recent Activity

* آخر المشاريع
* آخر الاجتماعات
* آخر المدفوعات
* آخر التحديثات

---

## Quick Actions

* إضافة مشروع
* إضافة عميل
* إنشاء Proposal
* إضافة مقال
* إنشاء اجتماع

---

# 12) Information Architecture

```text
Dashboard
│
├── Website CMS
│   ├── Home Page
│   ├── Services
│   ├── Portfolio
│   ├── Case Studies
│   ├── Blog
│   └── Pages
│
├── Clients
├── Projects
├── Tasks
├── Meetings
├── Team
├── Contracts
├── Payments
├── Analytics
├── Notifications
├── Settings
└── Roles & Permissions
```

---

# 13) UX Philosophy

---

## النظام يجب أن يكون

* سريع
* بسيط
* واضح
* مرن
* قابل للتوسع

---

## أهم نقطة

النظام لا يجب أن يشعر المستخدم أنه ERP معقد.

---

## المطلوب في الـ UX

### سرعة الوصول

أي Action مهم يتم خلال أقل عدد خطوات.

---

### Clarity

كل شيء واضح بدون تعقيد.

---

### Real-time Feeling

النظام يشعر المستخدم أن كل شيء Live.

---

### Modular Design

كل جزء منفصل وقابل للتوسع.

---

# 14) التصميم المطلوب

---

## Style Direction

* Minimal
* Premium
* Modern SaaS
* Clean UI

---

## Inspirations

* Linear
* Notion
* Stripe
* Framer
* Vercel Dashboard

---

# 15) النسخ المستقبلية

---

## V2

* AI Assistant
* Smart Reports
* WhatsApp Automation
* AI Proposal Builder
* Smart Follow-up

---

## V3

* Predictive Analytics
* AI Task Distribution
* Financial Forecasting
* AI Client Insights
* Smart Hiring System

---

# 16) أهم فلسفة للمنتج

المنتج ليس:

> "لوحة تحكم"

المنتج الحقيقي هو:

> "نظام تشغيل كامل لشركة البرمجيات يحتوي على الإدارة والتشغيل والعملاء والمحتوى والتحليلات والمشاريع والاجتماعات في مكان واحد بشكل مرن وقابل للتوسع"
