-- Auth & Roles Schema for Campus Connect (Mock Auth)

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('student', 'club_admin')),
  batch TEXT,
  department TEXT,
  managed_club_id TEXT REFERENCES clubs(id),
  interests TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Club Memberships Table (Waitlist & Roster)
CREATE TABLE IF NOT EXISTS club_memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  club_id TEXT NOT NULL REFERENCES clubs(id) ON DELETE CASCADE,
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN ('pending', 'accepted', 'declined', 'blocked')),
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  UNIQUE(club_id, profile_id) -- A user can only have one membership record per club
);

-- 3. Dummy Data: Insert 3 Students
INSERT INTO profiles (id, name, role, batch, department, interests)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'Rahul Sharma', 'student', '2022-2026', 'Computer Science', 'AI, Robotics, Hackathons'),
  ('22222222-2222-2222-2222-222222222222', 'Priya Singh', 'student', '2023-2027', 'Electronics', 'IoT, Coding, Hardware'),
  ('33333333-3333-3333-3333-333333333333', 'Amit Patel', 'student', '2021-2025', 'Mechanical', 'Design, 3D Printing')
ON CONFLICT (id) DO NOTHING;

-- 4. Dummy Data: Add Students to Robotics Society (c2) and CYPS (c1)
-- Rahul is accepted in Robotics Society, pending in CYPS
INSERT INTO club_memberships (club_id, profile_id, status)
VALUES 
  ('c2', '11111111-1111-1111-1111-111111111111', 'accepted'),
  ('c1', '11111111-1111-1111-1111-111111111111', 'pending'),
  -- Priya is accepted in CYPS
  ('c1', '22222222-2222-2222-2222-222222222222', 'accepted'),
  -- Amit is blocked from Robotics Society
  ('c2', '33333333-3333-3333-3333-333333333333', 'blocked')
ON CONFLICT (club_id, profile_id) DO NOTHING;
