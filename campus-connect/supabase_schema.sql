-- Supabase Schema for Campus Connect

-- Enable UUID extension if not enabled (Supabase usually has this by default)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Place Categories
CREATE TABLE place_categories (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  icon TEXT
);

-- 2. Places
CREATE TABLE places (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT REFERENCES place_categories(id),
  icon TEXT,
  gradient TEXT,
  image TEXT,
  lat FLOAT,
  lng FLOAT,
  description TEXT,
  hours TEXT,
  location TEXT,
  phone TEXT,
  crowd_level TEXT,
  rating FLOAT,
  review_count INTEGER,
  wait_time TEXT,
  price TEXT,
  signature TEXT
);

-- 3. Place Reviews
CREATE TABLE place_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  place_id TEXT REFERENCES places(id) ON DELETE CASCADE,
  user_name TEXT,
  initials TEXT,
  rating INTEGER,
  text TEXT,
  date DATE
);

-- 4. Club Categories
CREATE TABLE club_categories (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  icon TEXT
);

-- 5. Clubs
CREATE TABLE clubs (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT REFERENCES club_categories(id),
  icon TEXT,
  description TEXT,
  office TEXT,
  meeting_schedule TEXT,
  contact TEXT,
  email TEXT,
  member_count INTEGER,
  is_recruiting BOOLEAN,
  rating FLOAT,
  review_count INTEGER
);

-- 6. Club Events
CREATE TABLE club_events (
  id TEXT PRIMARY KEY,
  club_id TEXT REFERENCES clubs(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  date DATE,
  time TEXT,
  venue TEXT,
  description TEXT
);

-- 7. Club Reviews
CREATE TABLE club_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  club_id TEXT REFERENCES clubs(id) ON DELETE CASCADE,
  user_name TEXT,
  initials TEXT,
  rating INTEGER,
  text TEXT,
  date DATE
);

-- 8. Staff Categories
CREATE TABLE staff_categories (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  icon TEXT
);

-- 9. Staff
CREATE TABLE staff (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  initials TEXT,
  role TEXT,
  department TEXT,
  category TEXT REFERENCES staff_categories(id),
  office TEXT,
  phone TEXT,
  email TEXT,
  availability TEXT
);

-- 10. Classrooms
CREATE TABLE classrooms (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  building TEXT,
  place_id TEXT REFERENCES places(id) ON DELETE SET NULL,
  floor TEXT,
  capacity INTEGER,
  type TEXT
);

-- 11. Announcements
CREATE TABLE announcements (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  body TEXT,
  date DATE,
  priority TEXT,
  author TEXT
);

-- 12. Academic Calendar
CREATE TABLE academic_calendar (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  date DATE,
  type TEXT,
  icon TEXT,
  description TEXT
);

-- 13. Exam Schedule
CREATE TABLE exam_schedule (
  id TEXT PRIMARY KEY,
  subject TEXT NOT NULL,
  code TEXT,
  date DATE,
  time TEXT,
  venue TEXT,
  type TEXT
);

-- 14. Quick Links
CREATE TABLE quick_links (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  icon TEXT,
  url TEXT,
  description TEXT
);
