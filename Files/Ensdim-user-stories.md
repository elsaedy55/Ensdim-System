# ENSDIM — User Stories (From Product Backlog)

---

## Epic 1: Multi-Tenant Workspace Isolation

### User Story 1: إنشاء Workspace مع عزل البيانات

**User Story**
As a System Admin, I want to create isolated workspaces for each agency, so that each agency's data is completely separated.

**Description**
كل وكالة لها Workspace مستقل مع عزل كامل على مستوى البيانات.

**Acceptance Criteria**

* GIVEN admin creates workspace WHEN saved THEN workspace_id is generated
* GIVEN user belongs to workspace A WHEN requesting data THEN only workspace A data is returned
* GIVEN user accesses workspace B THEN return 403 Forbidden
* GIVEN DB query executes THEN must include workspace_id filter

**Edge Cases**

* Token tampering
* Missing workspace assignment
* Deleted workspace reference

**Priority** 🔴 Critical

---

### User Story 2: منع Cross-Tenant Access

**User Story**
As a System, I want to prevent cross-workspace access attempts, so that no data leakage happens.

**Acceptance Criteria**

* Mismatch workspace_id → block request
* Log all unauthorized attempts

**Priority** 🔴 Critical

---

## Epic 2: Authentication & Session Management

### User Story 3: تسجيل الدخول

As a User, I want to log in securely, so I can access my workspace.

**Acceptance Criteria**

* Valid login → JWT + refresh token
* Wrong password → 401
* Unverified email → redirect verification

**Edge Cases**

* brute force
* expired reset tokens

**Priority** 🔴 Critical

---

### User Story 4: Session Restoration

As a User, I want session restored automatically.

**Acceptance Criteria**

* valid refresh → auto login
* expired → redirect login

**Priority** 🔴 Critical

---

## Epic 3: RBAC Permission Engine

### User Story 5: Role Creation

As Admin, I want to create roles per workspace.

**Acceptance Criteria**

* role created with permissions
* system roles cannot be deleted

**Priority** 🔴 Critical

---

### User Story 6: Authorization Enforcement

As System, I want to enforce permissions on every request.

**Acceptance Criteria**

* unauthorized → 403
* multi-role → highest privilege applied

**Priority** 🔴 Critical

---

## Epic 4: Project & Milestone System

### User Story 7: Project Creation

As PM, I want to create projects.

**Acceptance Criteria**

* valid client required
* stored in workspace

**Priority** 🔴 Critical

---

### User Story 8: Milestone Creation

As PM, I want to create milestones.

**Acceptance Criteria**

* status = pending
* delayed auto update

**Priority** 🔴 Critical

---

### User Story 9: Progress Calculation

As System, I want auto progress calculation.

**Acceptance Criteria**

* based on milestones
* max 100%

**Priority** 🔴 Critical

---

## Epic 5: File Storage System

### User Story 10: File Upload

As User, I want to upload files securely.

**Acceptance Criteria**

* valid file stored
* size limit enforced

**Priority** 🔴 Critical

---

### User Story 11: Secure File Access

As User, I want signed URLs.

**Acceptance Criteria**

* authorized access only
* expired URL denied

**Priority** 🔴 Critical

---

## Epic 6: Notification Engine

### User Story 12: Event Notifications

As System, I want to send notifications.

**Acceptance Criteria**

* milestone update triggers notification
* duplicates suppressed

**Priority** 🔴 Critical

---

## Epic 7: Client Dashboard

### User Story 13: Dashboard View

As Client, I want to view project progress.

**Acceptance Criteria**

* milestones visible
* updates real-time

**Priority** 🔴 Critical

---

## Epic 8: Revision System

### User Story 14: Request Revision

As Client, I want to request changes.

**Acceptance Criteria**

* linked to milestone
* closed milestone reopens

**Priority** 🟠 High

---

## Epic 9: Billing

### User Story 15: Invoice Visibility

As Client, I want to see invoices.

**Acceptance Criteria**

* only authorized access
* payment status visible

**Priority** 🟠 High

---

# PRODUCT RISKS

* RBAC centralization failure = security risk
* Multi-tenant leakage = critical failure
* Notification overload = UX breakdown
* File storage without lifecycle = cost explosion

---

# MVP SCOPE

IN:

* Auth
* Workspace isolation
* Projects
* Milestones
* Files
* Notifications
* Dashboard

OUT:

* AI
* Analytics
* Automation
* Messaging (advanced)
* CRM

---

# SUGGESTED SPRINTS

Sprint 1: Auth + Workspace + RBAC
Sprint 2: Projects + Milestones
Sprint 3: Files + Notifications
Sprint 4: Revision + Billing
