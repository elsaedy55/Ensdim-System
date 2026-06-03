-- ═══════════════════════════════════════════════════════════════
-- ENSDIM — Add client_status to profiles
-- Run this in Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════════

alter table profiles
  add column if not exists client_status text
    not null default 'active'
    check (client_status in (
      'lead', 'interested', 'proposal_sent',
      'negotiation', 'active', 'completed', 'lost'
    ));

-- Index for filtering clients by status
create index if not exists idx_profiles_client_status
  on profiles(workspace_id, client_status)
  where role = 'client';

-- Update new clients invited via API to start as 'active'
-- (leads added manually via admin will be updated separately)
comment on column profiles.client_status is
  'CRM pipeline stage for clients: lead → interested → proposal_sent → negotiation → active → completed → lost';
