DELETE FROM places;

INSERT INTO places (id, name, category, icon, gradient, lat, lng, description, hours, location, phone, crowd_level, rating, review_count, wait_time, price, signature) VALUES
('p17', 'Galileo Block', 'academic', '🏛️', 'from-violet-500 to-indigo-500', 30.515694, 76.65915, 'The block hosts the students of nursing & Physiotherapy', 'Mon–Fri: 9 AM – 5 PM | Sat–Sun: Closed', 'Galileo Block', '9877886686', 'moderate', 4.5, 24, NULL, NULL, 'Nursing & Physiotherapy labs'),
('p_7yu5l', 'Fleming Block', 'academic', '🏛️', 'from-violet-500 to-indigo-500', 30.515633, 76.660415, 'This block serves administrative and Academic purposes housing the Chancellor''s Office and Departments of Law & Pharmacy', 'Mon–Fri: 9 AM – 5 PM', 'Fleming Block', '9877886686', 'moderate', 4.5, 1, NULL, NULL, 'Chancellor''s Office & Law/Pharmacy'),
('p_b8s8m', 'Central Library', 'study', '📚', 'from-blue-500 to-indigo-500', 30.515875, 76.660469, 'The official central library of Chitkara University', 'Mon–Fri: 9 AM – 8 PM', 'Central Library', '9877886686', 'moderate', 4.7, 12, NULL, NULL, 'University Library & Study Rooms'),
('p_fa0gt', 'Chitkara Law School', 'academic', '⚖️', 'from-violet-500 to-indigo-500', 30.515533, 76.661225, 'The school of law, featuring a mock-up Moot Court Room for practical courtroom training', 'Mon–Fri: 9 AM – 5 PM', 'Chitkara Law School', '9877886686', 'moderate', 4.6, 8, NULL, NULL, 'Moot Court Room & Law School'),
('p_wq90c', 'Beta Zone', 'sports', '⚽', 'from-green-500 to-teal-500', 30.515619, 76.65968, 'The smaller football field of the campus', 'Mon–Sun: 6 AM – 9 PM', 'Beta Zone Sports Field', '9877886686', 'moderate', 4.5, 14, NULL, 'Free', 'Football Field'),
('p_aizdf', 'Medical Room (Dispensary)', 'medical', '🏥', 'from-red-500 to-pink-500', 30.516017, 76.660332, 'Often called "Dispensary", doctors from Neelam Hospital are stationed here 24/7', '24/7 Emergency & Care', 'Medical Room', '9877886686', 'low', 4.8, 19, '~2min', 'Free for Students', '24/7 Neelam Hospital Station'),
('p_slbwc', 'Babbage Block', 'academic', '💻', 'from-violet-500 to-indigo-500', 30.516237, 76.660353, 'The block hosts the College of BCA and is connected to Turing Block', 'Mon–Fri: 9 AM – 5 PM', 'Babbage Block', '9877886686', 'moderate', 4.5, 11, NULL, NULL, 'BCA & IT Labs'),
('p_qd2hi', 'Square 1 Food Court', 'food', '🍔', 'from-orange-500 to-red-500', 30.515258, 76.659862, 'The biggest Food Court on campus. Outlets like Domino''s, La Pino''z, and Veny''s serve here', 'Mon–Sat: 8 AM – 10 PM', 'Square 1 Food Court', '9877886686', 'high', 4.6, 45, '~5min', '₹150', 'Domino''s, La Pino''z & Veny''s'),
('p_bnv48', 'Tuck Shop 1', 'other', '🛒', 'from-gray-500 to-gray-600', 30.515011, 76.659631, 'A stationery shop that also sells essential electronics and daily supplies—a one-stop shop for students', 'Mon–Sat: 9 AM – 7 PM', 'Tuck Shop 1', '9877886686', 'moderate', 4.5, 18, NULL, NULL, 'Stationery & Electronics'),
('p_djaqs', 'Blue Tokai Coffee Roasters', 'food', '☕', 'from-amber-500 to-orange-500', 30.514816, 76.659802, 'One of the most high-end cafés on campus—the fine-dining spot with specialty coffee and a quiet ambiance', 'Mon–Sat: 8 AM – 9 PM', 'Blue Tokai Coffee Roasters', '9877886686', 'low', 4.8, 32, '~4min', '₹200', 'Specialty Coffee & Fine Ambiance'),
('p_l64bw', 'Subway', 'food', '🥪', 'from-green-500 to-yellow-500', 30.515014, 76.65962, 'One of the largest food chains in the world serving fresh subs, salads, and wraps', 'Mon–Sat: 9 AM – 9 PM', 'Subway', '9877886686', 'moderate', 4.5, 28, '~3min', '₹180', 'Fresh Subs & Wraps'),
('p_fbcc3', 'Radius Elevate (Apple Store)', 'other', '🍎', 'from-gray-700 to-gray-900', 30.514834, 76.660161, 'The in-house Apple Store of the campus featuring exclusive student discounts and offers', 'Mon–Fri: 10 AM – 6 PM', 'Radius Elevate', '9877886686', 'low', 4.7, 15, NULL, NULL, 'Campus Apple Store'),
('p_rzakm', 'Dohful', 'food', '🍪', 'from-yellow-600 to-amber-700', 30.515047, 76.660319, 'A cult-favorite shop specializing in artisanal craft cookies and coffee', 'Mon–Sat: 10 AM – 8 PM', 'Dohful', '9877886686', 'moderate', 4.8, 39, '~2min', '₹120', 'Craft Cookies & Coffee'),
('p_qoomy', 'First Coffee', 'food', '☕', 'from-orange-500 to-red-500', 30.515118, 76.659524, 'A favorite spot featuring outdoor seating, delicious appetizers, and top-tier coffee', 'Mon–Sat: 8 AM – 9 PM', 'First Coffee', '9877886686', 'moderate', 4.7, 26, '~3min', '₹150', 'Top-Tier Coffee & Outdoor Seating'),
('p_4tg9e', 'Holy Scoop', 'food', '🍦', 'from-pink-500 to-rose-500', 30.515191, 76.65966, 'The most famous and affordable ice cream parlor on campus', 'Mon–Sun: 11 AM – 10 PM', 'Holy Scoop', '9877886686', 'high', 4.6, 52, '~2min', '₹60', 'Affordable Ice Cream Parlor'),
('p_r8gls', 'Bev Caffe', 'food', '🥤', 'from-teal-500 to-blue-500', 30.515266, 76.65966, 'Your neighborhood store selling packaged eatables, quick snacks, and refreshing beverages', 'Mon–Sat: 8 AM – 8 PM', 'Bev Caffe', '9877886686', 'moderate', 4.4, 19, NULL, '₹50', 'Snacks & Packaged Eatables'),
('p_js5qd', 'Grab & Go', 'food', '🍉', 'from-green-500 to-emerald-500', 30.515376, 76.65971, 'Fresh fruit juices, shakes, and healthy snacks on the go', 'Mon–Sat: 8 AM – 8 PM', 'Grab & Go', '9877886686', 'moderate', 4.5, 21, '~2min', '₹80', 'Fresh Fruits & Juices'),
('p_9me1t', 'Explore Hub', 'academic', '🚀', 'from-blue-500 to-indigo-500', 30.515394, 76.659451, 'The training and skill enhancement center for entrepreneurship—the launchpad for student startups', 'Mon–Fri: 9 AM – 6 PM', 'Explore Hub', '9877886686', 'moderate', 4.8, 17, NULL, NULL, 'Entrepreneurship & Startup Launchpad'),
('p_7xlay', 'Pythagoras Block', 'academic', '⚙️', 'from-violet-500 to-indigo-500', 30.515321, 76.659295, 'Academic block hosting mechanical engineering workshops and labs', 'Mon–Fri: 9 AM – 5 PM', 'Pythagoras Block', '9877886686', 'moderate', 4.5, 14, NULL, NULL, 'Mechanical Workshops & Academic Block'),
('p_1roq4', 'Chitkara Woods', 'other', '🌲', 'from-emerald-500 to-green-600', 30.516003, 76.659267, 'The lush green botanical garden and relaxing woodland area of Chitkara University', 'Open Daily', 'Chitkara Woods', '9877886686', 'low', 4.9, 64, NULL, 'Free', 'Botanical Garden & Green Space'),
('p_t6k4f', 'Gollzzaaaa', 'food', '🥙', 'from-amber-500 to-red-500', 30.516151, 76.659238, 'The campus Golgappa & street food parlor', 'Mon–Sat: 12 PM – 8 PM', 'Gollzzaaaa', '9877886686', 'high', 4.7, 41, '~3min', '₹40', 'Golgappa Parlor'),
('p_6d06k', 'Newton Block', 'academic', '🏛️', 'from-violet-500 to-indigo-500', 30.516411, 76.659563, 'The first ever block of the University', 'Mon–Fri: 9 AM – 5 PM', 'Newton Block', '9877886686', 'moderate', 4.6, 22, NULL, NULL, 'First University Block'),
('p_2b7yu', 'Edison Block', 'academic', '🏛️', 'from-violet-500 to-indigo-500', 30.516426, 76.659824, 'The College of Electrical and Communications Engineering', 'Mon–Fri: 9 AM – 5 PM', 'Edison Block', '9877886686', 'moderate', 4.5, 19, NULL, NULL, 'Electrical & ECE Block'),
('p_2mrgw', 'Alpha Zone', 'events', '🎭', 'from-purple-500 to-pink-500', 30.51696, 76.659519, 'The biggest park and premier open-air event venue of the campus', 'Open Daily: 6 AM – 9 PM', 'Alpha Zone', '9877886686', 'moderate', 4.8, 54, NULL, NULL, 'Main Campus Park & Events'),
('p_1c6u1', 'iOS Development Center', 'academic', '🍎', 'from-violet-500 to-indigo-500', 30.516558, 76.65922, 'Dedicated Apple iOS lab for Software Engineering students learning iOS app development', 'Mon–Fri: 9 AM – 6 PM', 'iOS Development Center', '9877886686', 'moderate', 4.9, 31, NULL, NULL, 'Apple iOS Development Lab'),
('p_kd0ql', 'Explore Stars', 'events', '🎭', 'from-purple-500 to-pink-500', 30.516468, 76.659005, 'A creative performance studio showcasing the cultural talent of the campus', 'Mon–Fri: 9 AM – 7 PM', 'Explore Stars Studio', '9877886686', 'moderate', 4.7, 18, NULL, NULL, 'Creative Talent Studio'),
('p_5od87', 'Happiness Center', 'services', '🛠', 'from-gray-600 to-slate-700', 30.516625, 76.659016, 'The headquarters for all Office of Student Affairs (OSA) clubs and campus happiness initiatives', 'Mon–Fri: 9 AM – 5 PM', 'Happiness Center', '9877886686', 'moderate', 4.8, 25, NULL, NULL, 'OSA & Student Clubs HQ'),
('p_awfoy', 'Bloom Block', 'academic', '🤖', 'from-violet-500 to-indigo-500', 30.516812, 76.659033, 'The College of Artificial Intelligence and Future Technologies', 'Mon–Fri: 9 AM – 5 PM', 'Bloom Block', '9877886686', 'moderate', 4.7, 29, NULL, NULL, 'Artificial Intelligence & Future Tech'),
('p_p9a4q', 'Picasso Block', 'academic', '🎨', 'from-violet-500 to-indigo-500', 30.517263, 76.659012, 'The College of Design and Visual Arts', 'Mon–Fri: 9 AM – 5 PM', 'Picasso Block', '9877886686', 'moderate', 4.6, 21, NULL, NULL, 'College of Design'),
('p_yh29n', 'D''Art Gallery', 'study', '🖼️', 'from-blue-500 to-indigo-500', 30.517012, 76.65893, 'Dedicated art exhibition studio and creative workspace for design students', 'Mon–Fri: 9 AM – 6 PM', 'D''Art Gallery', '9877886686', 'low', 4.8, 16, NULL, NULL, 'Design Exhibition Gallery'),
('p_wgbgz', 'Campus Pharmacy', 'medical', '💊', 'from-red-500 to-pink-500', 30.51773, 76.658852, 'The official pharmacy and medical store on campus', 'Mon–Sat: 8 AM – 8 PM', 'Campus Pharmacy', '9877886686', 'low', 4.5, 14, '~2min', 'Subsidized', 'Subsidized Medication & Supplies'),
('p_g6m56', 'Chai Vyanjan', 'food', '☕', 'from-orange-500 to-red-500', 30.517412, 76.658529, 'The favorite campus chai parlor serving hot tea, snacks, and refreshments', 'Mon–Sat: 8 AM – 8 PM', 'Chai Vyanjan', '9877886686', 'high', 4.7, 68, '~3min', '₹30', 'Campus Chai Parlor'),
('p_dfm6z', 'Hello Future (Admissions)', 'services', '🏢', 'from-gray-600 to-slate-700', 30.517706, 76.659091, 'The official welcome office and admissions center of Chitkara University', 'Mon–Fri: 9 AM – 5 PM', 'Hello Future Office', '9877886686', 'moderate', 4.6, 12, NULL, NULL, 'Admissions & Welcome Center'),
('p_co755', 'Babbage Block (Admin)', 'services', '🏢', 'from-gray-600 to-slate-700', 30.51742, 76.660011, 'Administrative section hosting university staff and faculty offices', 'Mon–Fri: 9 AM – 5 PM', 'Babbage Block Admin', '9877886686', 'moderate', 4.5, 11, NULL, NULL, 'Administrative Offices'),
('p_witou', 'Open Air Theatre (OAT)', 'events', '🎭', 'from-purple-500 to-pink-500', 30.517375, 76.660529, 'The open-air amphitheater hosting university fests, concerts, and gatherings', 'Open Daily', 'Open Air Theatre', '9877886686', 'moderate', 4.9, 88, NULL, NULL, 'Amphitheater & Fest Venue'),
('p_da1gu', 'Square 2 Food Court', 'food', '🍕', 'from-orange-500 to-red-500', 30.517389, 76.660755, 'Vibrant food court located near the School of Planning and Architecture', 'Mon–Sat: 8 AM – 9 PM', 'Square 2 Food Court', '9877886686', 'high', 4.6, 42, '~4min', '₹140', 'North Campus Food Court'),
('p_rb6vj', 'Darwin Block', 'services', '🛠', 'from-gray-600 to-slate-700', 30.517494, 76.660813, 'Administrative block hosting departmental offices and staff facilities', 'Mon–Fri: 9 AM – 5 PM', 'Darwin Block', '9877886686', 'moderate', 4.5, 13, NULL, NULL, 'Administrative Block'),
('p_k9hgd', 'School of Planning & Architecture', 'academic', '📐', 'from-violet-500 to-indigo-500', 30.517183, 76.660317, 'Chitkara School of Planning and Architecture housing design studios and drafting halls', 'Mon–Fri: 9 AM – 5 PM', 'School of Planning & Architecture', '9877886686', 'moderate', 4.7, 24, NULL, NULL, 'Architecture & Planning Studios'),
('p_raqa8', 'Campus Parking', 'services', '🚗', 'from-gray-600 to-slate-700', 30.516914, 76.66043, 'Dedicated car and two-wheeler parking area for students, staff, and visitors', '24/7 Monitored', 'Campus Parking Zone', '9877886686', 'moderate', 4.5, 15, NULL, 'Free', '24/7 Monitored Parking'),
('p_unykq', 'Main Gate', 'services', '🛡️', 'from-gray-600 to-slate-700', 30.517936, 76.659283, 'The primary entrance and security checkpoint of Chitkara University', '24/7 Security', 'Main Gate Entrance', '9877886686', 'moderate', 4.7, 32, NULL, NULL, 'University Main Entrance'),
('p_rpv4c', 'Studio 401 (Radio Chitkara)', 'events', '🎙️', 'from-purple-500 to-pink-500', 30.516442, 76.660261, 'The official radio station studio and recording hub—The Voice of Chitkara', 'Mon–Fri: 9 AM – 6 PM', 'Studio 401', '9877886686', 'low', 4.9, 27, NULL, NULL, 'The Voice of Chitkara'),
('p_o0g6d', 'Turing Block', 'academic', '💻', 'from-violet-500 to-indigo-500', 30.516588, 76.660572, 'The College of Computer Science & Engineering housing CSE lecture halls and labs', 'Mon–Fri: 9 AM – 5 PM', 'Turing Block', '9877886686', 'moderate', 4.8, 45, NULL, NULL, 'Computer Science & Engineering'),
('p_x6lt7', 'Pi Girls Hostel', 'residential', '🏠', 'from-amber-500 to-yellow-600', 30.514798, 76.662323, 'On-campus residential block for female students featuring 24/7 security and high-speed Wi-Fi', 'Residential / 24-7 Security', 'Pi Girls Hostel', '9877886686', 'moderate', 4.6, 28, NULL, NULL, 'Girls Hostel'),
('p_77t2q', 'IBN Girls Hostel', 'residential', '🏠', 'from-amber-500 to-yellow-600', 30.514934, 76.662677, 'On-campus residential block for female students with common rooms and laundry facilities', 'Residential / 24-7 Security', 'IBN Girls Hostel', '9877886686', 'moderate', 4.5, 21, NULL, NULL, 'Girls Hostel'),
('p_u1wuy', 'NGH Girls Hostel', 'residential', '🏠', 'from-amber-500 to-yellow-600', 30.514938, 76.662956, 'On-campus residential block for female students featuring study lounges and mess halls', 'Residential / 24-7 Security', 'NGH Girls Hostel', '9877886686', 'moderate', 4.6, 24, NULL, NULL, 'Girls Hostel'),
('p_cv0zs', 'Vasco Da Gama Girls Hostel', 'residential', '🏠', 'from-amber-500 to-yellow-600', 30.514153, 76.66218, 'Residential block for female students with recreation rooms and 24/7 security', 'Residential / 24-7 Security', 'Vasco Da Gama Girls Hostel', '9877886686', 'moderate', 4.7, 19, NULL, NULL, 'Girls Hostel'),
('p_lj1f4', 'Columbus Girls Hostel', 'residential', '🏠', 'from-amber-500 to-yellow-600', 30.513984, 76.661454, 'Residential block for female students equipped with study areas and modern amenities', 'Residential / 24-7 Security', 'Columbus Girls Hostel', '9877886686', 'moderate', 4.6, 22, NULL, NULL, 'Girls Hostel'),
('p_x6leg', 'Marco Polo Boys Hostel', 'residential', '🏠', 'from-amber-500 to-yellow-600', 30.513709, 76.661092, 'On-campus residential block for male students featuring high-speed Wi-Fi and mess facilities', 'Residential / 24-7 Security', 'Marco Polo Boys Hostel', '9877886686', 'moderate', 4.5, 31, NULL, NULL, 'Boys Hostel'),
('p_b6jze', 'Armstrong Boys Hostel', 'residential', '🏠', 'from-amber-500 to-yellow-600', 30.513452, 76.661519, 'On-campus residential block for male students equipped with recreation and sports facilities', 'Residential / 24-7 Security', 'Armstrong Boys Hostel', '9877886686', 'moderate', 4.6, 27, NULL, NULL, 'Boys Hostel'),
('p_gkiuy', 'Magellan Boys Hostel', 'residential', '🏠', 'from-amber-500 to-yellow-600', 30.513205, 76.6615, 'Residential block for male students with dedicated study rooms and 24/7 security', 'Residential / 24-7 Security', 'Magellan Boys Hostel', '9877886686', 'moderate', 4.5, 18, NULL, NULL, 'Boys Hostel'),
('p_42o36', 'Aristotle Boys Hostel', 'residential', '🏠', 'from-amber-500 to-yellow-600', 30.513226, 76.662069, 'Residential block for male students featuring common halls and high-speed Wi-Fi', 'Residential / 24-7 Security', 'Aristotle Boys Hostel', '9877886686', 'moderate', 4.6, 23, NULL, NULL, 'Boys Hostel'),
('p_qxftu', 'Archimedes Boys Hostel', 'residential', '🏠', 'from-amber-500 to-yellow-600', 30.512911, 76.662219, 'Residential block for male students with study lounges and laundry services', 'Residential / 24-7 Security', 'Archimedes Boys Hostel', '9877886686', 'moderate', 4.5, 20, NULL, NULL, 'Boys Hostel'),
('p_0z9fg', 'Franklin Boys Hostel', 'residential', '🏠', 'from-amber-500 to-yellow-600', 30.512525, 76.662292, 'Residential block for male students featuring modern rooms and mess halls', 'Residential / 24-7 Security', 'Franklin Boys Hostel', '9877886686', 'moderate', 4.6, 17, NULL, NULL, 'Boys Hostel'),
('p_lwk6z', 'Alfred Nobel Boys Hostel', 'residential', '🏠', 'from-amber-500 to-yellow-600', 30.512206, 76.662182, 'Residential block for male students with 24/7 security and recreational facilities', 'Residential / 24-7 Security', 'Alfred Nobel Boys Hostel', '9877886686', 'moderate', 4.7, 29, NULL, NULL, 'Boys Hostel'),
('p_w44x7', 'Martin Luther Block', 'academic', '🤖', 'from-violet-500 to-indigo-500', 30.514039, 76.660641, 'The College of Artificial Intelligence and advanced computing studies', 'Mon–Fri: 9 AM – 5 PM', 'Martin Luther Block', '9877886686', 'moderate', 4.8, 38, NULL, NULL, 'College of Artificial Intelligence'),
('p_i5enj', 'Rockefeller Block', 'academic', '💼', 'from-violet-500 to-indigo-500', 30.514067, 76.66012, 'Chitkara Business School housing MBA and BBA lecture halls and executive seminars', 'Mon–Fri: 9 AM – 5 PM', 'Rockefeller Block', '9877886686', 'moderate', 4.7, 41, NULL, NULL, 'Chitkara Business School'),
('p_ge21m', 'Bus Parking Area', 'services', '🚌', 'from-gray-600 to-slate-700', 30.514528, 76.659861, 'Dedicated parking and transport hub for university buses and shuttle services', 'Mon–Sat: 7 AM – 7 PM', 'Bus Parking Hub', '9877886686', 'moderate', 4.5, 14, NULL, NULL, 'University Bus Transport Hub'),
('p_r1o1p', 'Sportorium', 'sports', '🏆', 'from-green-500 to-teal-500', 30.515834, 76.658557, 'The indoor Sports Complex featuring badminton courts, table tennis, and indoor arenas', 'Mon–Sat: 6 AM – 9 PM', 'Sportorium Complex', '9877886686', 'high', 4.9, 76, NULL, 'Free for Students', 'Indoor Sports Complex'),
('p_07q49', 'Campus Gym & Fitness Center', 'sports', '🏋️', 'from-green-500 to-teal-500', 30.515871, 76.657709, 'Modern university fitness center equipped with cardio machines and weight training facilities', 'Mon–Sat: 6 AM – 9 PM', 'Campus Gym', '9877886686', 'moderate', 4.8, 62, NULL, NULL, 'Campus Gym & Fitness Center'),
('p_cbsq3', 'Exploretorium & Guest House', 'events', '🏛️', 'from-purple-500 to-pink-500', 30.515898, 76.657495, 'Premier university auditorium hosting major conferences, convocations, and guest suites', 'Event Based / 9 AM – 6 PM', 'Exploretorium', '9877886686', 'moderate', 4.9, 84, NULL, NULL, 'Auditorium & Guest House'),
('p_8rd5n', 'West Car Parking', 'services', '🚗', 'from-gray-600 to-slate-700', 30.516353, 76.657252, 'Additional car and vehicle parking zone located near the western sports complex', '24/7 Monitored', 'West Car Parking', '9877886686', 'moderate', 4.5, 12, NULL, 'Free', 'West Campus Parking'),
('p_oshmq', 'Tesla Block', 'academic', '⚓', 'from-violet-500 to-indigo-500', 30.515961, 76.65664, 'Academic block dedicated to maritime studies, mechanical, and multidisciplinary engineering fields', 'Mon–Fri: 9 AM – 5 PM', 'Tesla Block', '9877886686', 'moderate', 4.7, 33, NULL, NULL, 'Maritime Studies & Engineering'),
('p_6aq3n', 'Omega Zone (Cricket Ground)', 'sports', '🏏', 'from-green-500 to-teal-500', 30.515064, 76.661091, 'The premier campus cricket ground and outdoor sports arena', 'Open Daily: 6 AM – 7 PM', 'Omega Zone', '9877886686', 'moderate', 4.9, 58, NULL, 'Free for Students', 'Cricket Ground & Stadium');

-- Trigger Function for Auto-Rating
CREATE OR REPLACE FUNCTION update_place_rating()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    UPDATE places
    SET rating = (
      SELECT COALESCE(ROUND(AVG(rating)::numeric, 1), 0)
      FROM place_reviews
      WHERE place_id = NEW.place_id
    ),
    review_count = (
      SELECT COUNT(*)
      FROM place_reviews
      WHERE place_id = NEW.place_id
    )
    WHERE id = NEW.place_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE places
    SET rating = COALESCE((
      SELECT ROUND(AVG(rating)::numeric, 1)
      FROM place_reviews
      WHERE place_id = OLD.place_id
    ), 0),
    review_count = (
      SELECT COUNT(*)
      FROM place_reviews
      WHERE place_id = OLD.place_id
    )
    WHERE id = OLD.place_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS place_reviews_rating_trigger ON place_reviews;

CREATE TRIGGER place_reviews_rating_trigger
AFTER INSERT OR UPDATE OR DELETE ON place_reviews
FOR EACH ROW EXECUTE FUNCTION update_place_rating();
