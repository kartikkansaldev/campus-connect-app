-- Drop existing trigger and table
DROP TRIGGER IF EXISTS club_reviews_rating_trigger ON club_reviews;
DROP TABLE IF EXISTS club_reviews CASCADE;

-- Add review_count column to campus_clubs if it doesn't exist
ALTER TABLE campus_clubs ADD COLUMN IF NOT EXISTS review_count integer DEFAULT 0;

-- Reset mock ratings to 0 so that they reflect actual reviews
UPDATE campus_clubs SET rating = 0, review_count = 0;

-- Create club_reviews table with correct columns for ClubDetail.jsx
CREATE TABLE IF NOT EXISTS club_reviews (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  club_id uuid REFERENCES campus_clubs(id) ON DELETE CASCADE,
  author text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Function to update the average rating of a club
CREATE OR REPLACE FUNCTION update_club_rating()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    UPDATE campus_clubs
    SET rating = COALESCE((
      SELECT ROUND(AVG(rating)::numeric, 1)
      FROM club_reviews
      WHERE club_id = NEW.club_id
    ), 0),
    review_count = (
      SELECT COUNT(*)
      FROM club_reviews
      WHERE club_id = NEW.club_id
    )
    WHERE id = NEW.club_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE campus_clubs
    SET rating = COALESCE((
      SELECT ROUND(AVG(rating)::numeric, 1)
      FROM club_reviews
      WHERE club_id = OLD.club_id
    ), 0),
    review_count = (
      SELECT COUNT(*)
      FROM club_reviews
      WHERE club_id = OLD.club_id
    )
    WHERE id = OLD.club_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER club_reviews_rating_trigger
AFTER INSERT OR UPDATE OR DELETE ON club_reviews
FOR EACH ROW EXECUTE FUNCTION update_club_rating();
