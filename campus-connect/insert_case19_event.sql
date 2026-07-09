-- Create campus_events table if it doesn't exist
CREATE TABLE IF NOT EXISTS campus_events (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  date timestamp with time zone NOT NULL,
  time text NOT NULL,
  venue text NOT NULL,
  description text NOT NULL,
  image_url text,
  link text,
  club_id uuid REFERENCES campus_clubs(id) ON DELETE CASCADE,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Delete existing events to prevent duplicates if run multiple times
DELETE FROM campus_events WHERE title = 'CASE 19';

-- Insert the Enigma Investigation Club event
INSERT INTO campus_events (title, date, time, venue, description, image_url, link)
VALUES (
  'CASE 19',
  '2026-07-19 00:00:00+00',
  'TBD',
  'Office of Student Life',
  'Office of Student Life
ENIGMA INVESTIGATION CLUB presents
 
🕵️🔍CASE 19

The file has been reopened.
The clues are waiting.
The truth won''t reveal itself.

Limited Seats Only!

Join the WhatsApp group to stay updated and be among the first to secure your spot.

COMING SOON...

Regards 
Enigma Club
Office of Student Life',
  '/images/case19.jpg',
  'https://chat.whatsapp.com/GhLIHZNbIpMARrEOZjKIyg'
);
