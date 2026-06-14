-- Allow logged-in clients (not just the anonymous public website) to submit
-- a "contact us" inquiry from their dashboard, e.g. to request a new project.
create policy "Authenticated can submit inquiries"
  on inquiries for insert
  to authenticated
  with check (type = 'contact');
