-- Taptime schema for Supabase.
-- Run this in the Supabase SQL editor (Dashboard → SQL → New query).
--
-- Auth lives in auth.users. Email confirmation is a project setting, not SQL:
-- Authentication → Providers → Email → Confirm email.
-- Signup stores the display name in raw_user_meta_data.name.

create table if not exists public.profiles (
    id uuid primary key references auth.users (id) on delete cascade,
    name text not null,
    email text not null
);

create table if not exists public.rooms (
    id uuid primary key default gen_random_uuid(),
    name text not null unique,
    times jsonb not null
);

create table if not exists public.bookings (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users (id) on delete cascade,
    room_id uuid not null references public.rooms (id) on delete restrict,
    day text not null,
    time text not null,
    time_id text not null,
    euro_date text not null,
    created_at timestamptz not null default now(),
    unique (room_id, day, time_id)
);

create table if not exists public.errors (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users (id) on delete set null,
    code int,
    error text,
    description text,
    created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.rooms enable row level security;
alter table public.bookings enable row level security;
alter table public.errors enable row level security;

drop policy if exists "profiles are readable by their owner" on public.profiles;
create policy "profiles are readable by their owner"
    on public.profiles
    for select
    to authenticated
    using (id = auth.uid());

drop policy if exists "rooms are readable by signed-in users" on public.rooms;
create policy "rooms are readable by signed-in users"
    on public.rooms
    for select
    to authenticated
    using (true);

drop policy if exists "bookings are readable by signed-in users" on public.bookings;
create policy "bookings are readable by signed-in users"
    on public.bookings
    for select
    to authenticated
    using (true);

drop policy if exists "users insert their own bookings" on public.bookings;
create policy "users insert their own bookings"
    on public.bookings
    for insert
    to authenticated
    with check (user_id = auth.uid());

drop policy if exists "users delete their own bookings" on public.bookings;
create policy "users delete their own bookings"
    on public.bookings
    for delete
    to authenticated
    using (user_id = auth.uid());

drop policy if exists "users insert their own errors" on public.errors;
create policy "users insert their own errors"
    on public.errors
    for insert
    to authenticated
    with check (user_id = auth.uid());

grant select on public.profiles to authenticated;
grant select on public.rooms to authenticated;
grant select, insert, delete on public.bookings to authenticated;
grant insert on public.errors to authenticated;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
    insert into public.profiles (id, name, email)
    values (
        new.id,
        coalesce(new.raw_user_meta_data ->> 'name', split_part(new.email, '@', 1)),
        new.email
    );
    return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
    after insert on auth.users
    for each row
    execute function public.handle_new_user();

insert into public.rooms (name, times)
select seed.name, seed.times
from (
    values
        (
            'Sala 1',
            '[
                {"id":"t0","timeInt":"10-12"},
                {"id":"t1","timeInt":"12-14"},
                {"id":"t2","timeInt":"16-18"},
                {"id":"t3","timeInt":"18-20"}
            ]'::jsonb
        ),
        (
            'Sala 2',
            '[
                {"id":"t0","timeInt":"10-12"},
                {"id":"t1","timeInt":"12-14"},
                {"id":"t2","timeInt":"16-18"},
                {"id":"t3","timeInt":"18-20"}
            ]'::jsonb
        ),
        (
            'Sala 3',
            '[
                {"id":"t0","timeInt":"10-12"},
                {"id":"t1","timeInt":"12-14"},
                {"id":"t2","timeInt":"16-18"},
                {"id":"t3","timeInt":"18-20"}
            ]'::jsonb
        )
) as seed(name, times)
where not exists (
    select 1 from public.rooms where rooms.name = seed.name
);
