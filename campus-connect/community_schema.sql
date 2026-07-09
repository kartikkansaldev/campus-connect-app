-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor > New Query)
-- NOTE: If you already ran the previous community_schema.sql, skip the CREATE TABLE and CREATE POLICY sections
-- and only run the INSERT statements at the bottom.

-- Community Posts Table
CREATE TABLE IF NOT EXISTS community_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author TEXT NOT NULL,
  initials TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'General',
  content TEXT NOT NULL,
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Community Comments Table
CREATE TABLE IF NOT EXISTS community_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
  author TEXT NOT NULL,
  initials TEXT NOT NULL,
  text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Community Messages Table (Direct Messaging)
CREATE TABLE IF NOT EXISTS community_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sender TEXT NOT NULL,
  recipient TEXT NOT NULL,
  text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_messages ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read posts and comments
CREATE POLICY "Allow public read of posts" ON community_posts FOR SELECT USING (true);
CREATE POLICY "Allow public read of comments" ON community_comments FOR SELECT USING (true);

-- Allow anyone to insert posts and comments
CREATE POLICY "Allow public insert of posts" ON community_posts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert of comments" ON community_comments FOR INSERT WITH CHECK (true);

-- Allow users to read messages where they are sender or recipient
CREATE POLICY "Allow read own messages" ON community_messages FOR SELECT USING (true); -- For now, public read since we don't have real auth yet

-- Allow users to insert messages
CREATE POLICY "Allow insert messages" ON community_messages FOR INSERT WITH CHECK (true);


-- ============================================================================
-- SEED DATA (Only run this once if you want dummy data to test with)
-- ============================================================================

INSERT INTO community_posts (author, initials, category, content, likes_count, comments_count) VALUES
('Arjun M.', 'AM', 'General', 'Hey everyone! Welcome to Campus Connect 🎉 This is your space to share, ask, and connect with the entire Chitkara community. Drop a hello below!', 38, 12),
('Neha S.', 'NS', 'Freshers', 'Hi seniors! Can anyone tell me where block C is? I got totally lost today trying to find my physics lab 😅', 15, 8),
('Rahul K.', 'RK', 'Academics', 'Does anyone have the past year question papers for Data Structures (CS201)? The mid-terms are approaching and I really need them.', 42, 5),
('Priya T.', 'PT', 'Coding', 'Looking for 2 more members for our Hackathon team! We are planning to build a web3 project. React/Node.js experience preferred. DM me!', 27, 14),
('Vikram S.', 'VS', 'Clubs', 'Auditions for the Drama Club are happening this Friday at the main auditorium! No prior acting experience required, just bring your energy 🎭', 56, 21),
('Ananya R.', 'AR', 'Placements', 'Just had my first mock interview with the placement cell. It was tough but really helpful. Pro tip: Brush up on your DBMS concepts!', 89, 34),
('Karan B.', 'KB', 'Hostel', 'Anyone else in Hostel D facing issues with the Wi-Fi on the 3rd floor? It’s been dropping constantly since last night.', 112, 45),
('Simran K.', 'SK', 'Sports', 'The inter-branch basketball tournament starts next week! Come support the CSE team on Monday at 5 PM 🏀', 67, 18),
('Rohan D.', 'RD', 'Events', 'TEDxChitkaraUniversity early bird tickets are live! Grab them before they sell out. The speaker lineup this year is insane.', 145, 56),
('Aditya P.', 'AP', 'Buy & Sell', 'Selling my drawing board and drafter (used for just one semester, mint condition). DM for price!', 23, 7),
('Meera V.', 'MV', 'Lost & Found', 'I found a blue water bottle (Milton) in the library reading room. I’ve left it at the library reception.', 18, 2),
('Kabir A.', 'KA', 'Memes', 'When you realize the assignment is due at 11:59 PM and it’s currently 11:55 PM 💀', 234, 89);
