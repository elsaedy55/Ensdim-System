-- ═══════════════════════════════════════════════════════════════════
-- ENSDIM — Project progress auto-calculated from milestones
-- projects.progress becomes derived from its milestones instead of a
-- manually-set value that nothing ever updated.
--
-- The admin UI only ever changes a milestone's `status` (dropdown) —
-- `progress` itself has no editable field anywhere and stays 0 forever.
-- So each milestone's effective completion is the greater of its stored
-- `progress` and a weight derived from its `status`, and the project's
-- progress is the average of that across its milestones.
-- ═══════════════════════════════════════════════════════════════════

create or replace function milestone_status_weight(p_status text)
returns integer
language sql
immutable
as $$
  select case p_status
    when 'completed'   then 100
    when 'approved'    then 100
    when 'review'      then 85
    when 'in_progress' then 50
    when 'delayed'     then 25
    else 0 -- pending
  end;
$$;

create or replace function recompute_project_progress(p_project_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_avg integer;
begin
  select round(avg(greatest(progress, milestone_status_weight(status))))::integer
  into v_avg
  from milestones
  where project_id = p_project_id;

  update projects
  set progress = coalesce(v_avg, 0)
  where id = p_project_id;
end;
$$;

create or replace function trg_recompute_project_progress()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'DELETE' then
    perform recompute_project_progress(old.project_id);
    return old;
  end if;

  perform recompute_project_progress(new.project_id);

  -- project_id changed: also refresh the milestone's previous project
  if tg_op = 'UPDATE' and old.project_id is distinct from new.project_id then
    perform recompute_project_progress(old.project_id);
  end if;

  return new;
end;
$$;

drop trigger if exists milestones_recompute_project_progress on milestones;
create trigger milestones_recompute_project_progress
  after insert or update of progress, status, project_id or delete on milestones
  for each row execute function trg_recompute_project_progress();

-- Backfill: sync existing projects with their current milestones state
do $$
declare
  r record;
begin
  for r in select id from projects loop
    perform recompute_project_progress(r.id);
  end loop;
end;
$$;
