create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  service_type text not null,
  preferred_date date not null,
  preferred_time text not null,
  customer_name text not null,
  customer_phone text not null,
  vehicle_summary text not null,
  notes text,
  status text not null default 'pending',
  source text not null default 'website',
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists appointments_preferred_date_idx
  on public.appointments (preferred_date);

create index if not exists appointments_status_idx
  on public.appointments (status);

alter table public.appointments enable row level security;

create policy "service role can manage appointments"
  on public.appointments
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');
