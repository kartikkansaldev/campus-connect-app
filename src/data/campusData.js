/* ===== Campus Connect — All Mock Data ===== */

export const campusData = {
  /* ==================== PLACES ==================== */
  places: [
    { id: 'p1', name: 'Central Library', category: 'study', icon: '📚', gradient: 'from-blue-500 to-indigo-500', image: '/images/library_photo_1783357703955.png', lat: 28.6139, lng: 77.2090, description: 'The Central Library is the largest study space on campus, housing over 50,000 books, 200 computer terminals, and dedicated silent study zones across 4 floors.', hours: 'Mon–Fri: 7 AM – 11 PM | Sat–Sun: 9 AM – 8 PM', location: 'Block A, Ground Floor – 2nd Floor', phone: '+91 98765 43210', crowdLevel: 'moderate', rating: 4.6, reviewCount: 142, waitTime: '~5min', price: null, signature: '50,000+ books & silent zones', reviews: [
      { user: 'Aarav Sharma', initials: 'AS', rating: 5, text: 'Best place to study for exams. The silent zone on the 2nd floor is incredibly peaceful.', date: '2026-06-28' },
      { user: 'Priya Patel', initials: 'PP', rating: 4, text: 'Good collection of books and great ambiance. Sometimes gets crowded during exam week.', date: '2026-06-15' },
      { user: 'Rohan Kumar', initials: 'RK', rating: 5, text: 'The group study rooms are a lifesaver for project work.', date: '2026-06-02' }
    ]},
    { id: 'p2', name: 'The Food Court', category: 'food', icon: '🍽️', gradient: 'from-orange-500 to-red-500', image: '/images/food_court_photo_1783357713606.png', lat: 28.6145, lng: 77.2105, description: 'A vibrant food court with 8 different vendors serving North Indian, South Indian, Chinese, and continental cuisines.', hours: 'Mon–Sat: 8 AM – 10 PM | Sun: 9 AM – 9 PM', location: 'Student Center, Ground Floor', phone: '+91 98765 43211', crowdLevel: 'high', rating: 4.2, reviewCount: 238, waitTime: '~4min', price: '₹120', signature: 'Butter Chicken Thali', reviews: [
      { user: 'Sneha Gupta', initials: 'SG', rating: 4, text: 'Great variety of food! The South Indian counter makes the best dosas on campus.', date: '2026-07-01' },
      { user: 'Vikram Singh', initials: 'VS', rating: 3, text: 'Gets extremely crowded during lunch hours (12–2 PM). Food quality is decent.', date: '2026-06-20' },
      { user: 'Ananya Reddy', initials: 'AR', rating: 5, text: 'Love the new pasta counter! The outdoor seating area is perfect.', date: '2026-06-10' }
    ]},
    { id: 'p3', name: 'The Brew House', category: 'food', icon: '☕', gradient: 'from-orange-500 to-red-500', image: '/images/coffee_shop_photo_1783357724237.png', lat: 28.6130, lng: 77.2085, description: 'A cozy campus café serving specialty coffees, fresh pastries, smoothies, and light snacks.', hours: 'Mon–Sat: 7:30 AM – 9 PM | Sun: 9 AM – 7 PM', location: 'Near Main Gate, Block B', phone: '+91 98765 43212', crowdLevel: 'low', rating: 4.7, reviewCount: 186, waitTime: '~3min', price: '₹150', signature: 'Cold Brew + Croissant', reviews: [
      { user: 'Ishaan Mehta', initials: 'IM', rating: 5, text: 'The cold brew here is genuinely excellent.', date: '2026-06-30' },
      { user: 'Kavya Nair', initials: 'KN', rating: 5, text: 'My favorite spot on campus! The blueberry muffins are to die for.', date: '2026-06-18' },
      { user: 'Arjun Das', initials: 'AD', rating: 4, text: 'Slightly pricier than the food court, but the quality makes up for it.', date: '2026-06-05' }
    ]},
    { id: 'p4', name: 'Engineering Block A', category: 'academic', icon: '🏛️', gradient: 'from-violet-500 to-indigo-500', image: '/images/academic_block_photo_1783357767225.png', lat: 28.6150, lng: 77.2075, description: 'The main engineering building housing CS, Electrical, and Mechanical departments.', hours: 'Mon–Fri: 8 AM – 8 PM | Sat: 9 AM – 5 PM', location: 'East Campus, Block A', phone: '+91 98765 43213', crowdLevel: 'moderate', rating: 4.3, reviewCount: 97, waitTime: null, price: null, signature: 'Smart classrooms & maker space', reviews: [
      { user: 'Nikhil Joshi', initials: 'NJ', rating: 4, text: 'Well-maintained labs and classrooms.', date: '2026-06-25' },
      { user: 'Meera Iyer', initials: 'MI', rating: 5, text: 'The maker space on the ground floor is amazing!', date: '2026-06-12' }
    ]},
    { id: 'p5', name: 'Science Complex', category: 'academic', icon: '🔬', gradient: 'from-violet-500 to-indigo-500', image: null, lat: 28.6160, lng: 77.2095, description: 'A state-of-the-art complex for Physics, Chemistry, and Biology departments.', hours: 'Mon–Fri: 8 AM – 7 PM | Sat: 9 AM – 4 PM', location: 'North Campus, Block D', phone: '+91 98765 43214', crowdLevel: 'low', rating: 4.5, reviewCount: 64, waitTime: null, price: null, signature: 'Advanced research labs', reviews: [
      { user: 'Aditya Rao', initials: 'AR', rating: 5, text: 'The physics lab equipment is top-notch.', date: '2026-06-22' },
      { user: 'Simran Kaur', initials: 'SK', rating: 4, text: 'Beautiful building with great natural lighting.', date: '2026-06-08' }
    ]},
    { id: 'p6', name: 'Student Health Center', category: 'medical', icon: '🏥', gradient: 'from-red-500 to-pink-500', image: '/images/medical_center_photo_1783357757356.png', lat: 28.6125, lng: 77.2110, description: 'Full-service health center with general physicians, a dentist, and a psychologist.', hours: 'OPD: Mon–Sat: 9 AM – 5 PM | Emergency: 24/7', location: 'West Campus, Near Hostel Block', phone: '+91 98765 43215', crowdLevel: 'low', rating: 4.1, reviewCount: 78, waitTime: '~10min', price: 'Free', signature: 'Free consultations for students', reviews: [
      { user: 'Rahul Verma', initials: 'RV', rating: 4, text: 'Quick and professional service.', date: '2026-06-27' },
      { user: 'Diya Sharma', initials: 'DS', rating: 4, text: 'Glad they added mental health counseling this year.', date: '2026-06-14' }
    ]},
    { id: 'p7', name: 'Campus Pharmacy', category: 'medical', icon: '💊', gradient: 'from-red-500 to-pink-500', image: null, lat: 28.6126, lng: 77.2112, description: 'Well-stocked pharmacy offering prescribed and OTC medications at subsidized rates.', hours: 'Mon–Sat: 8 AM – 8 PM | Sun: 10 AM – 4 PM', location: 'Adjacent to Health Center', phone: '+91 98765 43216', crowdLevel: 'low', rating: 4.0, reviewCount: 45, waitTime: '~2min', price: 'Subsidized', signature: 'Subsidized medication', reviews: [
      { user: 'Tanvi Bhatt', initials: 'TB', rating: 4, text: 'Convenient location. Prices are lower than outside pharmacies.', date: '2026-06-19' }
    ]},
    { id: 'p8', name: 'Indoor Sports Arena', category: 'sports', icon: '🏸', gradient: 'from-green-500 to-teal-500', image: '/images/sports_arena_photo_1783357747601.png', lat: 28.6135, lng: 77.2125, description: 'A multi-sport indoor facility with badminton courts, basketball courts, and a rock climbing wall.', hours: 'Mon–Sun: 6 AM – 10 PM', location: 'Sports Complex, South Campus', phone: '+91 98765 43217', crowdLevel: 'moderate', rating: 4.8, reviewCount: 167, waitTime: null, price: null, signature: '4 badminton courts + rock climbing', reviews: [
      { user: 'Karan Malhotra', initials: 'KM', rating: 5, text: 'Absolutely love the badminton courts!', date: '2026-07-02' },
      { user: 'Pooja Reddy', initials: 'PR', rating: 5, text: 'The rock climbing wall is so fun!', date: '2026-06-21' },
      { user: 'Amit Chandra', initials: 'AC', rating: 4, text: 'Great facility overall.', date: '2026-06-09' }
    ]},
    { id: 'p9', name: 'Olympic Swimming Pool', category: 'sports', icon: '🏊', gradient: 'from-green-500 to-teal-500', image: null, lat: 28.6138, lng: 77.2130, description: 'A 50-meter Olympic-standard swimming pool with separate lanes for training and leisure.', hours: 'Mon–Sat: 6 AM – 8 PM | Sun: 7 AM – 6 PM', location: 'Sports Complex, South Campus', phone: '+91 98765 43218', crowdLevel: 'low', rating: 4.6, reviewCount: 93, waitTime: null, price: null, signature: '50m Olympic pool', reviews: [
      { user: 'Shreya Agarwal', initials: 'SA', rating: 5, text: 'The pool is incredibly well-maintained.', date: '2026-06-29' }
    ]},
    { id: 'p10', name: 'Cricket Ground', category: 'sports', icon: '🏏', gradient: 'from-green-500 to-teal-500', image: null, lat: 28.6120, lng: 77.2140, description: 'A full-size cricket ground with a turf pitch, practice nets, and floodlights.', hours: 'Mon–Fri: 4 PM – 9 PM | Sat–Sun: 6 AM – 9 PM', location: 'South Campus', phone: '+91 98765 43219', crowdLevel: 'moderate', rating: 4.4, reviewCount: 121, waitTime: null, price: null, signature: 'Floodlit turf pitch', reviews: [
      { user: 'Ravi Shankar', initials: 'RS', rating: 5, text: 'The floodlights make evening cricket so much fun.', date: '2026-06-26' }
    ]},
    { id: 'p11', name: 'Quiet Study Hall', category: 'study', icon: '📖', gradient: 'from-blue-500 to-indigo-500', image: null, lat: 28.6142, lng: 77.2088, description: 'A dedicated silent study space with 120 individual cubicles and power outlets.', hours: 'Mon–Sun: 6 AM – 12 AM', location: 'Block C, 3rd Floor', phone: '+91 98765 43220', crowdLevel: 'high', rating: 4.9, reviewCount: 203, waitTime: null, price: null, signature: '120 private cubicles', reviews: [
      { user: 'Lakshmi Narayan', initials: 'LN', rating: 5, text: 'The absolute best place to study.', date: '2026-07-03' }
    ]},
    { id: 'p12', name: 'Innovation Hub', category: 'study', icon: '💡', gradient: 'from-blue-500 to-indigo-500', image: null, lat: 28.6148, lng: 77.2082, description: 'A modern co-working and incubation space for student startups.', hours: 'Mon–Fri: 8 AM – 10 PM | Sat: 9 AM – 6 PM', location: 'Block E, Ground Floor', phone: '+91 98765 43221', crowdLevel: 'low', rating: 4.7, reviewCount: 88, waitTime: null, price: null, signature: 'Startup incubation space', reviews: [
      { user: 'Anika Desai', initials: 'AD', rating: 5, text: 'This place is startup heaven!', date: '2026-06-30' }
    ]},
    { id: 'p13', name: 'Admin Block', category: 'academic', icon: '🏢', gradient: 'from-violet-500 to-indigo-500', image: null, lat: 28.6135, lng: 77.2098, description: 'Administrative headquarters housing the Registrar, Admissions, and Examination Cell.', hours: 'Mon–Fri: 9 AM – 5 PM | Sat: 10 AM – 2 PM', location: 'Central Campus', phone: '+91 98765 43222', crowdLevel: 'moderate', rating: 3.5, reviewCount: 56, waitTime: '~15min', price: null, signature: 'All official paperwork', reviews: [
      { user: 'Deepak Mishra', initials: 'DM', rating: 3, text: 'The new online portal has reduced the need to visit physically.', date: '2026-06-24' }
    ]},
    { id: 'p14', name: 'Open Air Amphitheatre', category: 'other', icon: '🎭', gradient: 'from-gray-500 to-gray-600', image: null, lat: 28.6140, lng: 77.2115, description: 'A beautiful open-air amphitheatre with a capacity of 500+.', hours: 'Open access | Events: As scheduled', location: 'Central Campus, Near Lake', phone: '+91 98765 43223', crowdLevel: 'low', rating: 4.8, reviewCount: 175, waitTime: null, price: null, signature: '500+ seat venue', reviews: [
      { user: 'Mira Jain', initials: 'MJ', rating: 5, text: 'The sunset view from here is magical.', date: '2026-07-01' }
    ]},
    { id: 'p15', name: 'Fitness Center & Gym', category: 'sports', icon: '💪', gradient: 'from-green-500 to-teal-500', image: null, lat: 28.6133, lng: 77.2128, description: 'A fully-equipped gym with cardio machines, free weights, and yoga studios.', hours: 'Mon–Sat: 5:30 AM – 10 PM | Sun: 7 AM – 8 PM', location: 'Sports Complex, South Campus', phone: '+91 98765 43224', crowdLevel: 'high', rating: 4.5, reviewCount: 198, waitTime: null, price: 'Free', signature: 'Full gym + yoga studio', reviews: [
      { user: 'Aryan Kapoor', initials: 'AK', rating: 5, text: 'Excellent equipment and knowledgeable trainers.', date: '2026-07-02' }
    ]},
    { id: 'p16', name: 'Midnight Munchies', category: 'food', icon: '🌮', gradient: 'from-orange-500 to-red-500', image: null, lat: 28.6155, lng: 77.2065, description: 'A late-night food truck zone near the hostels serving rolls, momos, maggi, and chai.', hours: 'Daily: 8 PM – 2 AM', location: 'Hostel Road, Near Gate 3', phone: 'N/A (Walk-in only)', crowdLevel: 'moderate', rating: 4.3, reviewCount: 312, waitTime: '~3min', price: '₹80', signature: 'Paneer Rolls & Chai', reviews: [
      { user: 'Kabir Ahuja', initials: 'KA', rating: 5, text: 'The paneer rolls here are legendary!', date: '2026-07-03' },
      { user: 'Riya Singh', initials: 'RS', rating: 4, text: 'Affordable and tasty. The momos are the best on campus.', date: '2026-06-22' }
    ]}
  ],

  placeCategories: [
    { id: 'all', label: 'All', icon: '✨' },
    { id: 'study', label: 'Study', icon: '📖' },
    { id: 'academic', label: 'Academic', icon: '🏫' },
    { id: 'food', label: 'Food & Dining', icon: '🍔' },
    { id: 'residential', label: 'Residential', icon: '🏠' },
    { id: 'sports', label: 'Sports', icon: '⚽' },
    { id: 'medical', label: 'Health', icon: '🏥' },
    { id: 'services', label: 'Services', icon: '🛠' },
    { id: 'events', label: 'Event Venues', icon: '🎭' },
    { id: 'other', label: 'Other', icon: '📍' }
  ],

  /* ==================== CLUBS ==================== */
  clubs: [
    { id: 'c1', name: 'Code Crafters', category: 'tech', icon: '💻', description: 'The premier coding club. Hackathons, CP contests, workshops on latest tech stacks, and collaborative open-source projects.', office: 'Block A, Room 204', meetingSchedule: 'Every Wednesday, 5–7 PM', contact: 'Aarav Sharma (President)', email: 'codecrafters@greenfield.edu', memberCount: 245, isRecruiting: true, rating: 4.8, reviewCount: 45, reviews: [{ user: 'Rohan Kumar', initials: 'RK', rating: 5, text: 'Amazing community for developers!', date: '2026-05-12' }], events: [
      { id: 'e1', title: 'HackGreenfield 2026', date: '2026-07-20', time: '9 AM – 9 PM', venue: 'Innovation Hub', description: '24-hour hackathon with prizes worth ₹1,00,000.' },
      { id: 'e2', title: 'React Workshop', date: '2026-07-15', time: '4–6 PM', venue: 'Lab 3, Block A', description: 'Hands-on workshop on building modern web apps with React.js.' },
      { id: 'e3', title: 'CP Weekly Contest #28', date: '2026-07-12', time: '8–10 PM', venue: 'Online (HackerRank)', description: 'Weekly competitive programming contest.' }
    ]},
    { id: 'c2', name: 'Robotics Society', category: 'tech', icon: '🤖', description: 'Building the future, one robot at a time. Design, build, and program robots for national competitions.', office: 'Block A, Maker Space', meetingSchedule: 'Every Friday, 4–6 PM', contact: 'Meera Iyer (Captain)', email: 'robotics@greenfield.edu', memberCount: 89, isRecruiting: true, rating: 4.6, reviewCount: 22, reviews: [], events: [
      { id: 'e4', title: 'Robo Race Championship', date: '2026-08-05', time: '10 AM – 4 PM', venue: 'Indoor Sports Arena', description: 'Build and race your line-following robot!' },
      { id: 'e5', title: 'Arduino Basics Workshop', date: '2026-07-18', time: '3–5 PM', venue: 'Maker Space, Block A', description: 'Learn the fundamentals of Arduino programming.' }
    ]},
    { id: 'c3', name: 'Debating Union', category: 'educational', icon: '🎙️', description: 'Sharpen your argumentation, critical thinking, and public speaking skills.', office: 'Block C, Room 112', meetingSchedule: 'Tue & Thu, 6–7:30 PM', contact: 'Kabir Ahuja (Secretary)', email: 'debate@greenfield.edu', memberCount: 67, isRecruiting: true, rating: 4.5, reviewCount: 30, reviews: [], events: [
      { id: 'e6', title: 'Greenfield MUN 2026', date: '2026-08-15', time: 'Full Day', venue: 'Admin Block, Seminar Hall', description: 'Annual MUN conference. 6 committees, 200+ delegates.' },
      { id: 'e7', title: 'Debate Night: AI Ethics', date: '2026-07-22', time: '7–9 PM', venue: 'Amphitheatre', description: 'Open debate on the ethics of AI.' }
    ]},
    { id: 'c4', name: 'Literary Society', category: 'educational', icon: '✍️', description: 'For lovers of words — poetry, prose, spoken word, and everything in between.', office: 'Central Library, Room 108', meetingSchedule: 'Every Saturday, 11 AM – 1 PM', contact: 'Kavya Nair (Editor-in-Chief)', email: 'litsoc@greenfield.edu', memberCount: 52, isRecruiting: true, rating: 4.7, reviewCount: 18, reviews: [], events: [
      { id: 'e8', title: 'Open Mic Poetry Night', date: '2026-07-25', time: '7–9 PM', venue: 'Amphitheatre', description: 'Share your poems, stories, or spoken word pieces.' },
      { id: 'e9', title: 'Magazine Launch: Issue #12', date: '2026-08-01', time: '5–6:30 PM', venue: 'Library Seminar Room', description: 'Launch event for "Inkwell" campus literary magazine.' }
    ]},
    { id: 'c5', name: 'Nritya Dance Crew', category: 'cultural', icon: '💃', description: 'The official dance crew. Bollywood, hip-hop, classical, contemporary, and fusion styles.', office: 'Student Center, Dance Studio', meetingSchedule: 'Mon, Wed, Fri: 6–8 PM', contact: 'Riya Singh (Choreographer)', email: 'nritya@greenfield.edu', memberCount: 78, isRecruiting: false, rating: 4.9, reviewCount: 65, reviews: [], events: [
      { id: 'e10', title: 'Flash Mob: Independence Day', date: '2026-08-15', time: '12 PM', venue: 'Central Campus Lawn', description: 'A surprise flash mob celebrating Independence Day!' },
      { id: 'e11', title: 'Hip-Hop Workshop', date: '2026-07-19', time: '5–7 PM', venue: 'Dance Studio', description: 'Open workshop on hip-hop basics.' }
    ]},
    { id: 'c6', name: 'Rangmanch Drama Club', category: 'cultural', icon: '🎭', description: 'Where the stage comes alive! Plays, street theatre, and acting workshops.', office: 'Student Center, Room 305', meetingSchedule: 'Tue & Sat, 5–7 PM', contact: 'Sahil Tiwari (Director)', email: 'rangmanch@greenfield.edu', memberCount: 45, isRecruiting: true, rating: 4.4, reviewCount: 15, reviews: [], events: [
      { id: 'e12', title: 'Annual Play: "The Last Sunset"', date: '2026-08-20', time: '7–9:30 PM', venue: 'Amphitheatre', description: 'Our flagship annual production.' },
      { id: 'e13', title: 'Improvisation Workshop', date: '2026-07-16', time: '4–6 PM', venue: 'Student Center, Room 305', description: 'Learn the art of improv comedy.' }
    ]},
    { id: 'c7', name: 'Shutter Club', category: 'cultural', icon: '📸', description: 'The official photography club. Campus events coverage, photowalks, and exhibitions.', office: 'Block B, Room 110', meetingSchedule: 'Every Sunday, 10 AM – 12 PM', contact: 'Anika Desai (Head Photographer)', email: 'shutter@greenfield.edu', memberCount: 112, isRecruiting: true, rating: 4.7, reviewCount: 42, reviews: [], events: [
      { id: 'e14', title: 'Campus Photowalk', date: '2026-07-13', time: '6–8 AM', venue: 'Meet at Main Gate', description: 'Early morning photowalk capturing the golden hour.' },
      { id: 'e15', title: 'Photo Exhibition: "Perspectives"', date: '2026-08-10', time: '10 AM – 6 PM', venue: 'Library Gallery', description: 'Exhibition showcasing the best work of our members.' }
    ]},
    { id: 'c8', name: 'Greenfield Cricket Club', category: 'sports', icon: '🏏', description: 'Representing Greenfield in inter-university cricket tournaments.', office: 'Sports Complex, Room 5', meetingSchedule: 'Daily practice: 4:30–6:30 PM', contact: 'Ravi Shankar (Captain)', email: 'cricket@greenfield.edu', memberCount: 34, isRecruiting: true, rating: 4.6, reviewCount: 20, reviews: [], events: [
      { id: 'e16', title: 'Intra-College T20 League', date: '2026-08-01', time: 'Weekends', venue: 'Cricket Ground', description: '8-team T20 tournament. ₹25,000 prize money!' },
      { id: 'e17', title: 'Open Tryouts — Season 2', date: '2026-07-21', time: '4–6 PM', venue: 'Cricket Ground', description: 'Open tryouts for the university cricket team.' }
    ]},
    { id: 'c9', name: 'Basketball Club', category: 'sports', icon: '🏀', description: 'The university basketball team and recreational club.', office: 'Sports Complex, Room 7', meetingSchedule: 'Mon–Fri: 5–7 PM', contact: 'Karan Malhotra (Captain)', email: 'basketball@greenfield.edu', memberCount: 42, isRecruiting: true, rating: 4.8, reviewCount: 33, reviews: [], events: [
      { id: 'e18', title: '3v3 Street Ball Tournament', date: '2026-07-27', time: '10 AM – 5 PM', venue: 'Outdoor Court', description: 'Open 3v3 tournament. Trophies for top 3 teams!' }
    ]},
    { id: 'c10', name: 'Green Earth Society', category: 'social', icon: '🌱', description: 'Dedicated to environmental sustainability on campus.', office: 'Block C, Room 015', meetingSchedule: 'Every Wednesday, 4–5:30 PM', contact: 'Simran Kaur (Coordinator)', email: 'greenearth@greenfield.edu', memberCount: 93, isRecruiting: true, rating: 4.5, reviewCount: 16, reviews: [], events: [
      { id: 'e19', title: 'Campus Clean-Up Drive', date: '2026-07-14', time: '8–11 AM', venue: 'Meet at Amphitheatre', description: 'Monthly campus-wide clean-up drive.' },
      { id: 'e20', title: 'Tree Planting: 100 Trees Goal', date: '2026-07-28', time: '7–10 AM', venue: 'North Campus Green Belt', description: 'Help us plant 100 trees this monsoon!' }
    ]},
    { id: 'c11', name: 'NSS Chapter', category: 'social', icon: '🤝', description: 'National Service Scheme — community service, rural outreach, and blood donation camps.', office: 'Admin Block, Room 106', meetingSchedule: 'Every Saturday, 2–4 PM', contact: 'Deepak Mishra (Program Officer)', email: 'nss@greenfield.edu', memberCount: 156, isRecruiting: true, rating: 4.8, reviewCount: 75, reviews: [], events: [
      { id: 'e21', title: 'Blood Donation Camp', date: '2026-07-17', time: '10 AM – 3 PM', venue: 'Student Health Center', description: 'Annual blood donation drive with Red Cross.' },
      { id: 'e22', title: 'Rural Outreach Trip', date: '2026-08-08', time: 'Full Day (7 AM departure)', venue: 'Nearby Village', description: '1-day rural outreach program.' }
    ]},
    { id: 'c12', name: 'E-Cell', category: 'educational', icon: '🚀', description: 'The Entrepreneurship Cell nurtures startup culture on campus.', office: 'Innovation Hub, Desk 1-4', meetingSchedule: 'Every Thursday, 6–8 PM', contact: 'Varun Krishnan (President)', email: 'ecell@greenfield.edu', memberCount: 134, isRecruiting: true, rating: 4.6, reviewCount: 38, reviews: [], events: [
      { id: 'e23', title: 'Startup Pitch Night', date: '2026-07-24', time: '6–9 PM', venue: 'Innovation Hub', description: '5-minute pitch format. Top 3 get ₹50,000 seed funding!' },
      { id: 'e24', title: 'Fireside Chat: Founder Series', date: '2026-07-10', time: '5–6:30 PM', venue: 'Amphitheatre', description: 'Conversation with LearnLoop founder.' }
    ]}
  ],

  clubCategories: [
    { id: 'all', label: 'All', icon: '✨' },
    { id: 'tech', label: 'Tech', icon: '💻' },
    { id: 'educational', label: 'Educational', icon: '📖' },
    { id: 'cultural', label: 'Cultural', icon: '🎨' },
    { id: 'sports', label: 'Sports', icon: '⚽' },
    { id: 'social', label: 'Social', icon: '🤝' }
  ],

  /* ==================== STAFF ==================== */
  staff: [
    { id: 's1', name: 'Dr. Anand Kumar', initials: 'AK', role: 'Dean of Students', department: 'Administration', category: 'administration', office: 'Admin Block, Room 201', phone: '+91 98765 43301', email: 'dean.students@greenfield.edu', availability: 'available' },
    { id: 's2', name: 'Prof. R.K. Verma', initials: 'RV', role: 'Head of Physics', department: 'Physics', category: 'faculty', office: 'Science Complex, Room 304', phone: '+91 98765 43302', email: 'rk.verma@greenfield.edu', availability: 'meeting' },
    { id: 's3', name: 'Dr. Neha Sharma', initials: 'NS', role: 'Associate Professor', department: 'Computer Science', category: 'faculty', office: 'Engineering Block A, Room 412', phone: '+91 98765 43303', email: 'neha.sharma@greenfield.edu', availability: 'available' },
    { id: 's4', name: 'Mr. Vikram Singh', initials: 'VS', role: 'Senior Lab Technician', department: 'Computer Science', category: 'technical', office: 'Engineering Block A, Lab 3', phone: '+91 98765 43304', email: 'vikram.tech@greenfield.edu', availability: 'available' },
    { id: 's5', name: 'Dr. Meenakshi Iyer', initials: 'MI', role: 'Student Mentor (1st Year)', department: 'Student Affairs', category: 'mentors', office: 'Admin Block, Room 105', phone: '+91 98765 43305', email: 'mentor.firstyear@greenfield.edu', availability: 'leave' },
    { id: 's6', name: 'Prof. Sanjay Gupta', initials: 'SG', role: 'Head of Mathematics', department: 'Mathematics', category: 'faculty', office: 'Science Complex, Room 208', phone: '+91 98765 43306', email: 'sanjay.gupta@greenfield.edu', availability: 'available' },
    { id: 's7', name: 'Ms. Priya Desai', initials: 'PD', role: 'Career Counselor', department: 'Placement Cell', category: 'mentors', office: 'Innovation Hub, Office 2', phone: '+91 98765 43307', email: 'careers@greenfield.edu', availability: 'meeting' },
    { id: 's8', name: 'Mr. Rahul Jain', initials: 'RJ', role: 'Network Administrator', department: 'IT Support', category: 'technical', office: 'Admin Block, Server Room', phone: '+91 98765 43308', email: 'it.support@greenfield.edu', availability: 'available' }
  ],

  staffCategories: [
    { id: 'all', label: 'All', icon: '👥' },
    { id: 'faculty', label: 'Faculty', icon: '👨‍🏫' },
    { id: 'administration', label: 'Admin', icon: '🏢' },
    { id: 'mentors', label: 'Mentors', icon: '🤝' },
    { id: 'technical', label: 'Technical', icon: '🔧' }
  ],

  /* ==================== USER ==================== */
  user: { name: 'Alex Johnson', initials: 'AJ', enrollmentId: 'GFU24CS089', department: 'Computer Science & Engineering', year: '2nd Year', semester: 'Semester 4', cgpa: '8.7', email: 'alex.johnson@greenfield.edu' },

  /* ==================== TIMETABLE ==================== */
  timetable: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    periods: [
      { day: 'Monday', subject: 'Data Structures & Algorithms', code: 'CS201', time: '9:00 AM – 10:00 AM', room: 'Room 301, Block A', faculty: 'Dr. Neha Sharma', type: 'lecture' },
      { day: 'Monday', subject: 'Operating Systems', code: 'CS203', time: '10:15 AM – 11:15 AM', room: 'Room 305, Block A', faculty: 'Prof. Sanjay Gupta', type: 'lecture' },
      { day: 'Monday', subject: 'Discrete Mathematics', code: 'MA201', time: '11:30 AM – 12:30 PM', room: 'Room 208, Science Complex', faculty: 'Prof. Sanjay Gupta', type: 'lecture' },
      { day: 'Monday', subject: 'DSA Lab', code: 'CS201L', time: '2:00 PM – 4:00 PM', room: 'Lab 3, Block A', faculty: 'Mr. Vikram Singh', type: 'lab' },
      { day: 'Tuesday', subject: 'Computer Networks', code: 'CS205', time: '9:00 AM – 10:00 AM', room: 'Room 302, Block A', faculty: 'Dr. Neha Sharma', type: 'lecture' },
      { day: 'Tuesday', subject: 'Database Management Systems', code: 'CS207', time: '10:15 AM – 11:15 AM', room: 'Room 301, Block A', faculty: 'Dr. Neha Sharma', type: 'lecture' },
      { day: 'Tuesday', subject: 'Operating Systems', code: 'CS203', time: '11:30 AM – 12:30 PM', room: 'Room 305, Block A', faculty: 'Prof. Sanjay Gupta', type: 'lecture' },
      { day: 'Tuesday', subject: 'Soft Skills & Communication', code: 'HS201', time: '2:00 PM – 3:00 PM', room: 'Room 112, Block C', faculty: 'Dr. Meenakshi Iyer', type: 'lecture' },
      { day: 'Wednesday', subject: 'Data Structures & Algorithms', code: 'CS201', time: '9:00 AM – 10:00 AM', room: 'Room 301, Block A', faculty: 'Dr. Neha Sharma', type: 'lecture' },
      { day: 'Wednesday', subject: 'Discrete Mathematics', code: 'MA201', time: '10:15 AM – 11:15 AM', room: 'Room 208, Science Complex', faculty: 'Prof. Sanjay Gupta', type: 'lecture' },
      { day: 'Wednesday', subject: 'Computer Networks', code: 'CS205', time: '11:30 AM – 12:30 PM', room: 'Room 302, Block A', faculty: 'Dr. Neha Sharma', type: 'lecture' },
      { day: 'Wednesday', subject: 'CN Lab', code: 'CS205L', time: '2:00 PM – 4:00 PM', room: 'Lab 2, Block A', faculty: 'Mr. Vikram Singh', type: 'lab' },
      { day: 'Thursday', subject: 'Database Management Systems', code: 'CS207', time: '9:00 AM – 10:00 AM', room: 'Room 301, Block A', faculty: 'Dr. Neha Sharma', type: 'lecture' },
      { day: 'Thursday', subject: 'Operating Systems', code: 'CS203', time: '10:15 AM – 11:15 AM', room: 'Room 305, Block A', faculty: 'Prof. Sanjay Gupta', type: 'lecture' },
      { day: 'Thursday', subject: 'Data Structures & Algorithms', code: 'CS201', time: '11:30 AM – 12:30 PM', room: 'Room 301, Block A', faculty: 'Dr. Neha Sharma', type: 'lecture' },
      { day: 'Thursday', subject: 'DBMS Lab', code: 'CS207L', time: '2:00 PM – 4:00 PM', room: 'Lab 3, Block A', faculty: 'Mr. Vikram Singh', type: 'lab' },
      { day: 'Friday', subject: 'Computer Networks', code: 'CS205', time: '9:00 AM – 10:00 AM', room: 'Room 302, Block A', faculty: 'Dr. Neha Sharma', type: 'lecture' },
      { day: 'Friday', subject: 'Discrete Mathematics', code: 'MA201', time: '10:15 AM – 11:15 AM', room: 'Room 208, Science Complex', faculty: 'Prof. Sanjay Gupta', type: 'lecture' },
      { day: 'Friday', subject: 'Database Management Systems', code: 'CS207', time: '11:30 AM – 12:30 PM', room: 'Room 301, Block A', faculty: 'Dr. Neha Sharma', type: 'lecture' },
      { day: 'Friday', subject: 'OS Lab', code: 'CS203L', time: '2:00 PM – 4:00 PM', room: 'Lab 2, Block A', faculty: 'Mr. Vikram Singh', type: 'lab' },
      { day: 'Saturday', subject: 'Soft Skills & Communication', code: 'HS201', time: '9:00 AM – 10:00 AM', room: 'Room 112, Block C', faculty: 'Dr. Meenakshi Iyer', type: 'lecture' },
      { day: 'Saturday', subject: 'Discrete Mathematics Tutorial', code: 'MA201T', time: '10:15 AM – 11:15 AM', room: 'Room 208, Science Complex', faculty: 'Prof. Sanjay Gupta', type: 'tutorial' }
    ]
  },

  /* ==================== ACADEMIC CALENDAR ==================== */
  academicCalendar: [
    { id: 'ac1', title: 'Semester 4 Begins', date: '2026-07-01', type: 'milestone', icon: '🎓', description: 'First day of classes for Semester 4.' },
    { id: 'ac2', title: 'Last Date: Course Registration', date: '2026-07-10', type: 'deadline', icon: '📋', description: 'Final day to add/drop courses.' },
    { id: 'ac3', title: 'Independence Day', date: '2026-08-15', type: 'holiday', icon: '🇮🇳', description: 'National holiday. Campus closed.' },
    { id: 'ac4', title: 'Mid-Semester Exams Begin', date: '2026-08-25', type: 'exam', icon: '📝', description: 'Mid-semester examinations for all courses.' },
    { id: 'ac5', title: 'Mid-Semester Exams End', date: '2026-09-03', type: 'exam', icon: '📝', description: 'Last day of mid-semester examinations.' },
    { id: 'ac6', title: 'Gandhi Jayanti', date: '2026-10-02', type: 'holiday', icon: '🕊️', description: 'National holiday. Campus closed.' },
    { id: 'ac7', title: 'Diwali Break Begins', date: '2026-10-19', type: 'holiday', icon: '🪔', description: 'Diwali vacation starts.' },
    { id: 'ac8', title: 'Diwali Break Ends', date: '2026-10-25', type: 'holiday', icon: '🪔', description: 'Diwali break ends. Classes resume Oct 26.' },
    { id: 'ac9', title: 'Last Date: Project Submissions', date: '2026-11-05', type: 'deadline', icon: '📦', description: 'Final deadline for course projects.' },
    { id: 'ac10', title: 'End-Semester Exams Begin', date: '2026-11-15', type: 'exam', icon: '🎯', description: 'End-semester examinations begin.' },
    { id: 'ac11', title: 'End-Semester Exams End', date: '2026-11-30', type: 'exam', icon: '✅', description: 'Last day of end-semester examinations.' },
    { id: 'ac12', title: 'Winter Break Begins', date: '2026-12-05', type: 'holiday', icon: '❄️', description: 'Winter vacation starts.' }
  ],

  examSchedule: [
    { id: 'ex1', subject: 'Data Structures & Algorithms', code: 'CS201', date: '2026-08-25', time: '9:30 AM – 11:30 AM', venue: 'Exam Hall 1, Block A', type: 'mid-sem' },
    { id: 'ex2', subject: 'Operating Systems', code: 'CS203', date: '2026-08-27', time: '9:30 AM – 11:30 AM', venue: 'Exam Hall 1, Block A', type: 'mid-sem' },
    { id: 'ex3', subject: 'Computer Networks', code: 'CS205', date: '2026-08-28', time: '2:00 PM – 4:00 PM', venue: 'Exam Hall 2, Block A', type: 'mid-sem' },
    { id: 'ex4', subject: 'Database Management Systems', code: 'CS207', date: '2026-08-30', time: '9:30 AM – 11:30 AM', venue: 'Exam Hall 1, Block A', type: 'mid-sem' },
    { id: 'ex5', subject: 'Discrete Mathematics', code: 'MA201', date: '2026-09-01', time: '9:30 AM – 11:30 AM', venue: 'Exam Hall 3, Science Complex', type: 'mid-sem' },
    { id: 'ex6', subject: 'Soft Skills & Communication', code: 'HS201', date: '2026-09-03', time: '2:00 PM – 3:30 PM', venue: 'Room 112, Block C', type: 'mid-sem' }
  ],

  announcements: [
    { id: 'an1', title: 'DSA Assignment 3 Deadline Extended', body: 'Deadline extended to July 15, 2026. Submit via the online portal.', date: '2026-07-07', priority: 'info', author: 'Dr. Neha Sharma' },
    { id: 'an2', title: 'Lab 3 Maintenance — July 12', body: 'Computer Lab 3 (Block A) will be under maintenance on July 12.', date: '2026-07-06', priority: 'warning', author: 'Mr. Vikram Singh' },
    { id: 'an3', title: 'Mid-Sem Exam Schedule Released', body: 'The mid-semester exam schedule has been published.', date: '2026-07-05', priority: 'urgent', author: 'Examination Cell' },
    { id: 'an4', title: 'Guest Lecture: Cloud Computing', body: 'Guest lecture on "Cloud-Native Architecture" on July 18, 3 PM.', date: '2026-07-04', priority: 'info', author: 'Dept. of Computer Science' },
    { id: 'an5', title: 'Library Hours Extended During Exams', body: 'Central Library open until 1 AM during mid-sem exam period.', date: '2026-07-03', priority: 'info', author: 'Central Library' }
  ],

  quickLinks: [
    { id: 'ql1', label: 'Student Portal', icon: '🌐', url: '#', description: 'Grades, attendance & more' },
    { id: 'ql2', label: 'LMS / Moodle', icon: '📖', url: '#', description: 'Course materials & assignments' },
    { id: 'ql3', label: 'Exam Results', icon: '📊', url: '#', description: 'View past results' },
    { id: 'ql4', label: 'Fee Payment', icon: '💳', url: '#', description: 'Pay tuition & hostel fees' },
    { id: 'ql5', label: 'Attendance', icon: '✅', url: '#', description: 'Check attendance records' },
    { id: 'ql6', label: 'E-Library', icon: '📚', url: '#', description: 'Digital books & papers' }
  ],

  classrooms: [
    { id: 'cr1', name: 'Room 301, Block A', building: 'Engineering Block A', placeId: 'p4', floor: '3rd Floor', capacity: 60, type: 'Smart Classroom' },
    { id: 'cr2', name: 'Room 302, Block A', building: 'Engineering Block A', placeId: 'p4', floor: '3rd Floor', capacity: 60, type: 'Smart Classroom' },
    { id: 'cr3', name: 'Room 305, Block A', building: 'Engineering Block A', placeId: 'p4', floor: '3rd Floor', capacity: 45, type: 'Lecture Hall' },
    { id: 'cr4', name: 'Lab 2, Block A', building: 'Engineering Block A', placeId: 'p4', floor: 'Ground Floor', capacity: 40, type: 'Computer Lab' },
    { id: 'cr5', name: 'Lab 3, Block A', building: 'Engineering Block A', placeId: 'p4', floor: 'Ground Floor', capacity: 40, type: 'Computer Lab' },
    { id: 'cr6', name: 'Room 208, Science Complex', building: 'Science Complex', placeId: 'p5', floor: '2nd Floor', capacity: 80, type: 'Lecture Hall' },
    { id: 'cr7', name: 'Room 112, Block C', building: 'Block C', placeId: null, floor: '1st Floor', capacity: 50, type: 'Seminar Room' },
    { id: 'cr8', name: 'Exam Hall 1, Block A', building: 'Engineering Block A', placeId: 'p4', floor: '1st Floor', capacity: 200, type: 'Examination Hall' },
    { id: 'cr9', name: 'Exam Hall 2, Block A', building: 'Engineering Block A', placeId: 'p4', floor: '1st Floor', capacity: 200, type: 'Examination Hall' },
    { id: 'cr10', name: 'Exam Hall 3, Science Complex', building: 'Science Complex', placeId: 'p5', floor: '1st Floor', capacity: 150, type: 'Examination Hall' }
  ]
};
