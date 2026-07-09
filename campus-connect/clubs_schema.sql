-- Drop existing tables to ensure a clean slate
DROP TABLE IF EXISTS club_members CASCADE;
DROP TABLE IF EXISTS club_reviews CASCADE;
DROP TABLE IF EXISTS campus_clubs CASCADE;

-- Create campus_clubs table
CREATE TABLE IF NOT EXISTS campus_clubs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  category text NOT NULL,
  umbrella_body text,
  department text,
  founded_year text,
  members_count integer DEFAULT 0,
  status text DEFAULT 'Active',
  description text,
  activities text,
  social_links jsonb DEFAULT '{}'::jsonb,
  rating numeric DEFAULT 0,
  is_verified boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create club_reviews table
CREATE TABLE IF NOT EXISTS club_reviews (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  club_id uuid REFERENCES campus_clubs(id) ON DELETE CASCADE,
  author text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create club_members table
CREATE TABLE IF NOT EXISTS club_members (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  club_id uuid REFERENCES campus_clubs(id) ON DELETE CASCADE,
  user_name text NOT NULL,
  joined_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(club_id, user_name)
);

-- Optional: Enable RLS (Row Level Security) if needed later
-- ALTER TABLE campus_clubs ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE club_reviews ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE club_members ENABLE ROW LEVEL SECURITY;

-- Insert Mock Clubs
INSERT INTO campus_clubs (name, category, umbrella_body, department, founded_year, members_count, status, description, activities, social_links, rating) VALUES
-- C2S2 / Cultural
('C2S2 (Chitkara Cultural and Social Society)', 'Cultural', 'OSA', 'University-wide', 'Unknown', 4500, 'Active', 'The OSA''s flagship umbrella for cultural/creative clubs. Stated mission to help students unleash their potential in the co-curricular segments to foster, inculcate and nurture their hobbies.', 'Drama, dance, art, and social activities', '{"website": "chitkara.edu.in/c2s2"}', 4.8),
('Club Reflection', 'Cultural', 'C2S2', 'University-wide', 'Unknown', 120, 'Active', 'Visual art / campus décor. Creates artwork and installations for campus events and fests including Explore and Rangrezz.', 'Artwork, installations, shelter project', '{}', 4.5),
('Club Tasveer', 'Cultural', 'C2S2', 'University-wide', 'Unknown', 85, 'Active', 'Photography club documenting campus events.', 'Event photography, exhibitions', '{}', 4.6),
('The Bhangra Regiment', 'Cultural', 'C2S2', 'University-wide', 'Unknown', 65, 'Active', 'Performs traditional/folk dances. Claims national and state-level competition wins.', 'Bhangra, folk dance competitions', '{}', 4.9),
('The Lethal Giddha Squad', 'Cultural', 'C2S2', 'University-wide', 'Unknown', 50, 'Active', 'Sister group to Bhangra Regiment; claims national and state-level competition wins.', 'Giddha, folk dance competitions', '{}', 4.8),
('Club Natraj', 'Cultural', 'C2S2', 'University-wide', 'Unknown', 40, 'Active', 'Celebrates classical dance forms.', 'Classical dance performances', '{}', 4.4),
('Club Natti', 'Cultural', 'C2S2', 'University-wide', 'Unknown', 45, 'Active', 'Celebrates Himachali folk dance traditions.', 'Himachali folk dance', '{}', 4.3),
('Club Dhwani', 'Cultural', 'C2S2', 'University-wide', 'Unknown', 70, 'Active', 'Music and singing club. Composes original songs and performances.', 'Original compositions, singing', '{}', 4.7),
('Club NatSamrat', 'Cultural', 'C2S2', 'University-wide', 'Unknown', 55, 'Active', 'Dramatic/theatrical performance club.', 'Theatre, drama', '{}', 4.6),
('Club Literayllis', 'Cultural', 'C2S2', 'University-wide', 'Unknown', 60, 'Active', 'Literature, writing, debate for aspiring writers and debaters.', 'Debates, writing workshops', '{}', 4.5),
('Club Panache', 'Cultural', 'C2S2', 'University-wide', 'Unknown', 90, 'Active', 'Fashion shows and modelling platform.', 'Fashion shows, modelling', '{}', 4.8),
('Custody Club', 'Cultural', 'C2S2', 'University-wide', 'Unknown', 50, 'Active', 'Brings non-classical and contemporary dance forms to life.', 'Contemporary dance', '{}', 4.4),

-- Other Cultural / Social
('SUFY', 'Cultural', 'Unknown', 'University-wide', 'Unknown', 30, 'Active', 'Literary/oratory club (speech, drama, journalism). Builds confidence in public speaking and interpersonal skills.', 'Public speaking, journalism', '{}', 4.2),
('PIC IT', 'Cultural', 'Unknown', 'University-wide', 'Unknown', 40, 'Active', 'Photography club of the university.', 'Photography', '{}', 4.1),
('CUTC / TAMASHBEENZ', 'Cultural', 'Unknown', 'University-wide', 'Unknown', 45, 'Active', 'Chitkara University Theatre Club. TAMASHBEENZ performs street plays on social issues on and off campus.', 'Street plays, theatre', '{}', 4.6),

-- Technical / Professional Chapters
('IEEE Student Branch', 'Technical', 'IEEE', 'Computer Science & Engg.', '2009', 197, 'Active', 'Institute of Electrical and Electronics Engineers chapter.', 'Crackle ethical hacking, Youth Parliament, HR Breach', '{"facebook": "facebook.com/ieeeciet", "website": "ieee.chitkara.edu.in"}', 4.8),
('ACM Student Chapter', 'Technical', 'ACM', 'Computer Science & Engg.', '2010', 273, 'Active', 'Association for Computing Machinery chapter. Technical, scientific and research activities.', 'Research, programming', '{"twitter": "@ACM_CHITKARA", "website": "chitkara.acm.org"}', 4.9),
('IETE Chapter', 'Technical', 'IETE', 'Electronics & Communication', '2011', 80, 'Active', 'Institution of Electronics and Telecommunication Engineers chapter.', 'Telecommunication events', '{}', 4.3),
('ISTE', 'Technical', 'ISTE', 'Applied Sciences', '2012', 117, 'Active', 'Indian Society for Technical Education. University/national/international educational-technical events.', 'Technical events', '{}', 4.4),
('IEI (Institution of Engineers India)', 'Technical', 'IEI', 'Computer Science & Engg.', '2010', 107, 'Active', 'Institution of Engineers (India). Open to students across engineering branches.', 'Proactive learning, engineering workshops', '{}', 4.2),
('SAE Collegiate Club', 'Technical', 'SAE', 'Mechanical Engineering', '2008', 19, 'Active', 'Society of Automotive Engineers India chapter.', 'Automotive sector events', '{}', 4.1),
('CSI Chapter', 'Technical', 'CSI', 'Computer Applications', '2013', 356, 'Active', 'Computer Society of India chapter.', 'Technical workshops, expert talks, symposiums, conventions', '{}', 4.7),
('GDG on Campus', 'Technical', 'Google', 'Computer Science & Engg.', '2017', 42, 'Active', 'Formerly DSC/GDSC. Developer community groups, Google developer technology.', 'Octahacks, HacktoberFest, 30 Days of GCP, GDG Hacks 2025', '{"facebook": "facebook.com/gdsc.cu", "github": "github.com/DSC-ChitkaraUniv", "linkedin": "linkedin.com/company/gdsc-ciet"}', 4.9),

-- Entrepreneurship & Innovation
('E-Cell, Chitkara University (Punjab)', 'Entrepreneurship', 'CEED', 'University-wide', 'Unknown', 150, 'Active', 'Non-Profit Student organization promoting entrepreneurship among students.', 'Techstars Startup Weekend, E-Mela', '{"facebook": "facebook.com/ecellcupb", "website": "ecellpb.cuceed.org", "linkedin": "linkedin.com/company/e-cell-chitkara-university"}', 4.7),
('Startup Club', 'Entrepreneurship', 'CIIF', 'University-wide', 'Unknown', 100, 'Active', 'Part of Chitkara Innovation Incubator Foundation. Hosts pan-India roundtables.', 'Startup roundtables', '{"website": "chitkara.edu.in/ciif/startup-club"}', 4.6),
('NewGen IEDC', 'Innovation', 'DST', 'University-wide', 'Unknown', 80, 'Active', 'New Generation Innovation and Entrepreneurship Development Centre, sponsored by DST.', 'Incubation, facilitating E-Cells', '{"website": "newgeniedc.chitkara.edu.in"}', 4.8),
('Chitkara Innovation Incubator (CIIF)', 'Innovation', 'Govt', 'Chandigarh-based', 'Unknown', 200, 'Active', 'Government-recognized Technology Business Incubator (TBI).', 'Startup incubation (35+ startups)', '{"website": "chitkara.edu.in/ideate-innovate-excel"}', 4.9),

-- NSS / Community Service
('NSS Unit', 'Social', 'NSS', 'University-wide', 'Unknown', 1300, 'Active', 'National Service Scheme. Motto "Not Me But You". Program coordinator: Dr. Neelam Verma.', 'National Integration Camp, Pre-Republic Day Parade, Blood donation, Rural development', '{}', 4.9),
('NCC Unit', 'Social', 'NCC', 'University-wide', 'Unknown', 250, 'Active', 'National Cadet Corps.', 'Parades, camps', '{}', 4.8),
('Sports/Recreation Club', 'Sports', 'Sports Council', 'University-wide', 'Unknown', 300, 'Active', 'Organizes intramurals and sports leagues.', 'Cross Country, Kho Kho, 6-on-6 Cricket, Chitkara CPL', '{}', 4.6),

-- Departmental & Academic
('Mathematics/Aptitude Club', 'Academic', 'Unknown', 'University-wide', 'Unknown', 50, 'Active', 'Runs quizzes and panel games on quantitative aptitude.', 'Quizzes, Vedic math', '{}', 4.2),
('Radio Chitkara 107.8 FM', 'Media', 'Media', 'University-wide', 'Unknown', 40, 'Active', 'Campus community radio station.', 'Radio broadcasting', '{}', 4.5),
('ASME Society', 'Technical', 'ASME', 'Mechanical Engineering', '2010', 41, 'Active', 'Knowledge sharing & skill development in engineering.', 'Engineering skill development', '{}', 4.3),
('Mechstein Club', 'Technical', 'Mech', 'Mechanical Engineering', '2002', 28, 'Active', 'Co-curricular (sports & technical events), dept. student magazine.', 'Sports, technical events, magazine', '{}', 4.1),
('MechBots', 'Technical', 'Mech', 'Mechanical Engineering', '2019', 27, 'Active', 'Co-curricular (sports & technical events).', 'Robotics, technical events', '{}', 4.4),
('Seagulls Club', 'Academic', 'Business', 'Chitkara Business School', '2014', 33, 'Active', 'All departmental-level activities.', 'Business events', '{}', 4.2),
('Matrix Club', 'Cultural', 'CA', 'Computer Applications', '2007', 41, 'Active', 'Cultural, literary and social.', 'Cultural events', '{}', 4.1),
('Bits N Bytes Club', 'Technical', 'CSE', 'Computer Science & Engg.', '2003', 24, 'Active', 'Techno-cultural activities.', 'Techno-cultural events', '{}', 4.3),
('E-Buzz', 'Cultural', 'ECE', 'Electronics & Communication', '2004', 0, 'Dormant', 'Cultural and recreational.', 'Recreational events', '{}', 0),
('Evolve AI', 'Technical', 'AI/ML', 'Computer Science (AI)', '2023', 85, 'Active', 'Explore the field of AI and build skills. Hosted AI.Create().', 'AI Summit, Hackathons (HackXios, SIH)', '{"linkedin": "linkedin.com/company/evolveai-cuiet"}', 4.8),
('Debsoc / The Debating Society', 'Cultural', 'Unknown', 'University-wide', '2021', 120, 'Active', 'The premier society for Parliamentary debating and literary arts.', 'Asian Parliamentary Debate, Riwayat', '{"instagram": "instagram.com/debsoc_chitkara", "facebook": "facebook.com/chitkaradebsoc"}', 4.7),
('Chitkara University Toastmasters Club', 'Academic', 'Toastmasters', 'School of Languages', '2013', 45, 'Active', 'Public speaking & leadership. President''s Distinguished Club 2018-19.', 'Public speaking, leadership meetings', '{"website": "chitkara.toastmastersclubs.org"}', 4.8),
('LinkedIn Club', 'Academic', 'OSL', 'University-wide', 'Unknown', 60, 'Active', 'Professional branding / personal networking skills.', 'Personal branding sessions', '{}', 4.5),
('Student Nurses Association', 'Academic', 'Nursing', 'College of Nursing', 'Unknown', 100, 'Active', 'Departmental association for nursing students.', 'Nursing events', '{}', 4.4);

-- Seed some mock reviews
DO $$
DECLARE
    gdg_id uuid;
    ieee_id uuid;
    c2s2_id uuid;
    bhangra_id uuid;
BEGIN
    SELECT id INTO gdg_id FROM campus_clubs WHERE name = 'GDG on Campus' LIMIT 1;
    SELECT id INTO ieee_id FROM campus_clubs WHERE name = 'IEEE Student Branch' LIMIT 1;
    SELECT id INTO c2s2_id FROM campus_clubs WHERE name = 'C2S2 (Chitkara Cultural and Social Society)' LIMIT 1;
    SELECT id INTO bhangra_id FROM campus_clubs WHERE name = 'The Bhangra Regiment' LIMIT 1;

    IF gdg_id IS NOT NULL THEN
        INSERT INTO club_reviews (club_id, author, rating, review_text) VALUES 
        (gdg_id, 'Karthik S.', 5, 'Best developer community on campus! Hackathons are insane.'),
        (gdg_id, 'Priya R.', 4, 'Learnt a lot about GCP during the 30 days of cloud program.');
    END IF;

    IF ieee_id IS NOT NULL THEN
        INSERT INTO club_reviews (club_id, author, rating, review_text) VALUES 
        (ieee_id, 'Arjun M.', 5, 'The Crackle ethical hacking event was a mind-blowing experience.');
    END IF;

    IF c2s2_id IS NOT NULL THEN
        INSERT INTO club_reviews (club_id, author, rating, review_text) VALUES 
        (c2s2_id, 'Sneha T.', 5, 'Amazing umbrella body that truly supports creative arts!'),
        (c2s2_id, 'Rahul K.', 4, 'Rangrezz 2024 was huge. Looking forward to next year.');
    END IF;

    IF bhangra_id IS NOT NULL THEN
        INSERT INTO club_reviews (club_id, author, rating, review_text) VALUES 
        (bhangra_id, 'Deepak S.', 5, 'Energy is always unmatched! We won gold at state level.');
    END IF;
END $$;
