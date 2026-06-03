Flow 1: Authentication & Session Management
Type

Hybrid Flow (User + System)

Goal

Secure access to multi-tenant workspaces with persistent sessions and role-based routing.

Actors

User, Auth Service, DB, Email Service, Frontend

STEP-BY-STEP FLOW
User opens app
System checks local session token
If valid → redirect to workspace dashboard
If invalid → show login screen
Login Flow
User enters email + password
Frontend sends POST /auth/login
Backend:
Validates credentials
Checks rate limits
Checks account status
DB returns user + roles + workspace IDs
System generates:
Access token (JWT)
Refresh token
Frontend stores tokens securely
System routes user based on role:
Client → Client Dashboard
Admin/PM → Internal Dashboard
EDGE CASE FLOWS
Wrong password → increment failed attempt counter
5 failed attempts → temporary lock
Expired session → force re-login
Suspicious login → trigger email alert
Email not verified → redirect to verification screen
ALTERNATIVE FLOWS
Forgot password → email reset link
Multi-device login → allow multiple sessions unless revoked
Logout from all devices → invalidate refresh tokens globally
SYSTEM BEHAVIOR
Logs authentication events
Stores session metadata (IP, device)
Emits USER_LOGIN_EVENT
Triggers security monitoring pipeline
Flow 2: Workspace Access & Multi-Tenant Routing
Type

System Flow

Goal

Ensure strict data isolation between agencies (tenants)

Actors

System, DB, Auth Layer

STEP-BY-STEP FLOW
User requests dashboard
System extracts workspace_id from token
Middleware validates:
user belongs to workspace
Query layer automatically scopes:
WHERE workspace_id = X
Return filtered data only
EDGE CASES
User tries cross-workspace access → 403 Forbidden
Deleted workspace → redirect to "workspace not found"
No workspace assigned → onboarding flow
SYSTEM BEHAVIOR
Enforces tenant isolation at query layer
Logs unauthorized access attempts
Applies global RBAC filter
Flow 3: Onboarding Flow (New Client / User)
Type

User + System Flow

Goal

Create structured workspace + initial project visibility

Actors

User, System, Admin

STEP-BY-STEP FLOW
User registers
System detects "new workspace"
Onboarding wizard starts:
Company name
Role selection (Client/Admin)
System creates:
Workspace
Default roles
Default permissions
Admin invited or auto-assigned
First project visibility created
EDGE CASES
User skips onboarding → restrict access
Duplicate workspace name → suggest alternatives
Invite email fails → retry queue
SYSTEM BEHAVIOR
Creates tenant schema
Seeds default configuration
Emits WORKSPACE_CREATED
Flow 4: Project Creation & Team Assignment
Type

Hybrid Flow

Goal

Initialize project lifecycle and assign internal team

Actors

Admin, PM, System

STEP-BY-STEP FLOW
Admin creates project
Inputs:
Project name
Client
Timeline
System validates client assignment
Project stored in DB
PM assigns:
Developers
Designers
Content roles
System creates default milestones
Notifications sent to team
EDGE CASES
Missing client → block creation
Overlapping timelines → warning
No available team members → backlog state
SYSTEM BEHAVIOR
Creates project entity
Auto-generates milestone template
Emits PROJECT_CREATED_EVENT
Flow 5: Milestone Lifecycle (Core Flow)
Type

Core User + System Flow

Goal

Track progress and enforce structured delivery

Actors

PM, Client, System

STEP-BY-STEP FLOW
PM creates milestone
System sets:
status = "pending"
due date
Team updates progress
Files uploaded → milestone linked
Mark milestone "ready for review"
Client reviews:
Approve OR
Request revision
EDGE CASES
Late milestone → auto "delayed"
Reopened milestone → version increment
Circular dependency detected → block save
SYSTEM BEHAVIOR
Calculates progress %
Updates project health score
Triggers notifications on status change
Flow 6: Revision & Feedback System
Type

User Flow

Goal

Centralize structured feedback loops

Actors

Client, PM, Developer, System

STEP-BY-STEP FLOW
Client clicks "Request Revision"
System opens form:
description
attachments
category
Submit revision request
System links request to:
milestone
project
PM assigns revision to team member
Developer updates task
Status updated → "resolved"
Client re-review triggered
EDGE CASES
Duplicate revision → merge suggestions
File too large → reject upload
Closed milestone → reopen workflow
SYSTEM BEHAVIOR
Tracks revision history
Logs all changes
Sends real-time updates
Flow 7: File Management & Deliverables
Type

Hybrid Flow

Goal

Centralized secure file storage with versioning

Actors

User, System, Storage Service

STEP-BY-STEP FLOW
User uploads file
System validates:
file type
size
File uploaded to storage (S3-like)
Metadata stored in DB:
version
uploader
linked milestone
File becomes available in project folder
Preview generated (if supported)
EDGE CASES
Upload failure → retry queue
Duplicate filename → auto versioning
Virus detected → quarantine file
SYSTEM BEHAVIOR
Generates signed URLs
Tracks download history
Stores version lineage
Flow 8: Internal Messaging System
Type

Real-time User Flow

Goal

Context-based communication inside projects

Actors

User, Realtime Server, DB

STEP-BY-STEP FLOW
User opens project chat
System loads message history
User sends message
Message sent via WebSocket
Server:
stores message
attaches metadata
Receivers get real-time update
Read receipts updated
EDGE CASES
Offline user → push notification fallback
Message failure → retry queue
Deleted attachment → fallback placeholder
SYSTEM BEHAVIOR
Maintains message sync state
Emits NEW_MESSAGE_EVENT
Flow 9: Smart Notification Engine
Type

System Flow

Goal

Deliver relevant, non-spam notifications

Actors

System, Email Service, Realtime Engine

STEP-BY-STEP FLOW
Event occurs (milestone update, file upload, revision)
Notification engine evaluates rules:
priority
user preferences
deduplication
Notification generated
Routed to:
in-app
email (if enabled)
Stored in notification center
EDGE CASES
Duplicate event → suppress
Notification overload → batch grouping
User disabled emails → fallback to in-app only
SYSTEM BEHAVIOR
Event-driven architecture
Priority queue system
Logs notification delivery
Flow 10: Billing & Invoice Management
Type

Hybrid Flow

Goal

Track financial obligations and improve payment transparency

Actors

Admin, Client, Payment Gateway

STEP-BY-STEP FLOW
Admin generates invoice
System calculates:
totals
taxes (if any)
Invoice linked to project
Client receives notification
Client views invoice
Payment status updated:
pending → paid
Receipt generated
EDGE CASES
Partial payment → split status
Payment failure → retry + alert
Currency mismatch → conversion layer
SYSTEM BEHAVIOR
Syncs with payment provider
Stores financial ledger entries
Emits PAYMENT_UPDATED_EVENT
Flow 11: Role & Permission Management (RBAC Engine)
Type

System Flow

Goal

Enforce secure granular access control

Actors

Admin, System

STEP-BY-STEP FLOW
Admin creates role
Assigns permissions matrix
System validates:
no conflict with system roles
Role assigned to users
Middleware enforces permissions on every request
EDGE CASES
Role deletion with active users → reassignment required
Permission conflict → system resolves hierarchy
Orphan role → auto-disable
SYSTEM BEHAVIOR
Central RBAC engine
Cached permission checks
Audit logging for every change
Flow 12: Activity Tracking & Analytics Pipeline
Type

System Flow

Goal

Capture behavioral + operational insights

Actors

System, Analytics Service

STEP-BY-STEP FLOW
User performs action (view, upload, approve)
Event captured:
event type
timestamp
user_id
Event sent to analytics pipeline
Stored in event store
Aggregated into dashboards:
engagement
approval time
project health
EDGE CASES
Anonymous session → partial tracking
Data loss → retry ingestion
Privacy restrictions → anonymization layer
SYSTEM BEHAVIOR
Event streaming architecture
Batch + real-time processing
GDPR compliance filters