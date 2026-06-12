-- Track which milestone represents the project's current stage,
-- so the "Update Status" UI can be driven by the milestones the team
-- defines per project instead of a fixed global list.
alter table projects
  add column if not exists current_milestone_id uuid references milestones(id) on delete set null;
