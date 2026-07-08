/* ===== CampusHub Mock Data ===== */

const CampusData = {
  /* ==================== PLACES ==================== */
  places: [
    {
      id: 'p1',
      name: 'Central Library',
      category: 'study',
      icon: '📚',
      gradient: 'gradient-study',
      image: 'assets/images/library_photo_1783357703955.png',
      lat: 28.6139,
      lng: 77.2090,
      description: 'The Central Library is the largest study space on campus, housing over 50,000 books, 200 computer terminals, and dedicated silent study zones across 4 floors. Free Wi-Fi, printing services, and group study rooms available.',
      hours: 'Mon–Fri: 7:00 AM – 11:00 PM | Sat–Sun: 9:00 AM – 8:00 PM',
      location: 'Block A, Ground Floor – 2nd Floor',
      phone: '+91 98765 43210',
      crowdLevel: 'moderate',
      rating: 4.6,
      reviewCount: 142,
      reviews: [
        { user: 'Aarav Sharma', initials: 'AS', rating: 5, text: 'Best place to study for exams. The silent zone on the 2nd floor is incredibly peaceful. Highly recommend the window seats!', date: '2026-06-28' },
        { user: 'Priya Patel', initials: 'PP', rating: 4, text: 'Good collection of books and great ambiance. Sometimes gets crowded during exam week. Wish they had more power outlets.', date: '2026-06-15' },
        { user: 'Rohan Kumar', initials: 'RK', rating: 5, text: 'The group study rooms are a lifesaver for project work. Book them early though — they fill up fast.', date: '2026-06-02' }
      ]
    },
    {
      id: 'p2',
      name: 'The Food Court',
      category: 'food',
      icon: '🍽️',
      gradient: 'gradient-food',
      image: 'assets/images/food_court_photo_1783357713606.png',
      lat: 28.6145,
      lng: 77.2105,
      description: 'A vibrant food court with 8 different vendors serving North Indian, South Indian, Chinese, and continental cuisines. Features a large seating area with indoor and outdoor options.',
      hours: 'Mon–Sat: 8:00 AM – 10:00 PM | Sun: 9:00 AM – 9:00 PM',
      location: 'Student Center, Ground Floor',
      phone: '+91 98765 43211',
      crowdLevel: 'high',
      rating: 4.2,
      reviewCount: 238,
      reviews: [
        { user: 'Sneha Gupta', initials: 'SG', rating: 4, text: 'Great variety of food! The South Indian counter makes the best dosas on campus. Prices are student-friendly too.', date: '2026-07-01' },
        { user: 'Vikram Singh', initials: 'VS', rating: 3, text: 'Gets extremely crowded during lunch hours (12–2 PM). Food quality is decent but the wait times can be frustrating.', date: '2026-06-20' },
        { user: 'Ananya Reddy', initials: 'AR', rating: 5, text: 'Love the new pasta counter! The outdoor seating area with fairy lights is perfect for evening hangouts.', date: '2026-06-10' }
      ]
    },
    {
      id: 'p3',
      name: 'The Brew House',
      category: 'food',
      icon: '☕',
      gradient: 'gradient-food',
      image: 'assets/images/coffee_shop_photo_1783357724237.png',
      lat: 28.6130,
      lng: 77.2085,
      description: 'A cozy campus café serving specialty coffees, fresh pastries, smoothies, and light snacks. Perfect for a quick study break or casual meetup. Has free Wi-Fi and laptop-friendly seating.',
      hours: 'Mon–Sat: 7:30 AM – 9:00 PM | Sun: 9:00 AM – 7:00 PM',
      location: 'Near Main Gate, Block B',
      phone: '+91 98765 43212',
      crowdLevel: 'low',
      rating: 4.7,
      reviewCount: 186,
      reviews: [
        { user: 'Ishaan Mehta', initials: 'IM', rating: 5, text: 'The cold brew here is genuinely excellent. Great ambiance for working on assignments with friends.', date: '2026-06-30' },
        { user: 'Kavya Nair', initials: 'KN', rating: 5, text: 'My favorite spot on campus! The blueberry muffins are to die for. Cozy seating and great playlist always playing.', date: '2026-06-18' },
        { user: 'Arjun Das', initials: 'AD', rating: 4, text: 'Slightly pricier than the food court, but the quality and vibes make up for it. Try the hazelnut latte!', date: '2026-06-05' }
      ]
    },
    {
      id: 'p4',
      name: 'Engineering Block A',
      category: 'academic',
      icon: '🏛️',
      gradient: 'gradient-academic',
      image: 'assets/images/academic_block_photo_1783357767225.png',
      lat: 28.6150,
      lng: 77.2075,
      description: 'The main engineering building housing Computer Science, Electrical, and Mechanical Engineering departments. Features smart classrooms, 3 computer labs, and a maker space on the ground floor.',
      hours: 'Mon–Fri: 8:00 AM – 8:00 PM | Sat: 9:00 AM – 5:00 PM',
      location: 'East Campus, Block A',
      phone: '+91 98765 43213',
      crowdLevel: 'moderate',
      rating: 4.3,
      reviewCount: 97,
      reviews: [
        { user: 'Nikhil Joshi', initials: 'NJ', rating: 4, text: 'Well-maintained labs and classrooms. The new projectors and smart boards are great for presentations.', date: '2026-06-25' },
        { user: 'Meera Iyer', initials: 'MI', rating: 5, text: 'The maker space on the ground floor is amazing! Has 3D printers, soldering stations, and all the tools you need for projects.', date: '2026-06-12' }
      ]
    },
    {
      id: 'p5',
      name: 'Science Complex',
      category: 'academic',
      icon: '🔬',
      gradient: 'gradient-academic',
      image: null,
      lat: 28.6160,
      lng: 77.2095,
      description: 'A state-of-the-art complex for Physics, Chemistry, and Biology departments. Houses advanced research labs, a planetarium, and a botanical garden annexe.',
      hours: 'Mon–Fri: 8:00 AM – 7:00 PM | Sat: 9:00 AM – 4:00 PM',
      location: 'North Campus, Block D',
      phone: '+91 98765 43214',
      crowdLevel: 'low',
      rating: 4.5,
      reviewCount: 64,
      reviews: [
        { user: 'Aditya Rao', initials: 'AR', rating: 5, text: 'The physics lab equipment is top-notch. Prof. Verma\'s lab sessions here are the best part of the semester.', date: '2026-06-22' },
        { user: 'Simran Kaur', initials: 'SK', rating: 4, text: 'Beautiful building with great natural lighting. The botanical garden is a hidden gem for peaceful studying.', date: '2026-06-08' }
      ]
    },
    {
      id: 'p6',
      name: 'Student Health Center',
      category: 'medical',
      icon: '🏥',
      gradient: 'gradient-medical',
      image: 'assets/images/medical_center_photo_1783357757356.png',
      lat: 28.6125,
      lng: 77.2110,
      description: 'Full-service health center with general physicians, a dentist, a psychologist, and basic pathology services. Free consultations for enrolled students. Emergency services available 24/7.',
      hours: 'OPD: Mon–Sat: 9:00 AM – 5:00 PM | Emergency: 24/7',
      location: 'West Campus, Near Hostel Block',
      phone: '+91 98765 43215',
      crowdLevel: 'low',
      rating: 4.1,
      reviewCount: 78,
      reviews: [
        { user: 'Rahul Verma', initials: 'RV', rating: 4, text: 'Quick and professional service. Dr. Saxena is very understanding and helpful. The new online appointment system works well.', date: '2026-06-27' },
        { user: 'Diya Sharma', initials: 'DS', rating: 4, text: 'Glad they added mental health counseling this year. The psychologist is really supportive and the sessions are confidential.', date: '2026-06-14' }
      ]
    },
    {
      id: 'p7',
      name: 'Campus Pharmacy',
      category: 'medical',
      icon: '💊',
      gradient: 'gradient-medical',
      image: null,
      lat: 28.6126,
      lng: 77.2112,
      description: 'Well-stocked pharmacy offering prescribed and over-the-counter medications at subsidized rates for students. Also sells hygiene products and first-aid supplies.',
      hours: 'Mon–Sat: 8:00 AM – 8:00 PM | Sun: 10:00 AM – 4:00 PM',
      location: 'Adjacent to Health Center, West Campus',
      phone: '+91 98765 43216',
      crowdLevel: 'low',
      rating: 4.0,
      reviewCount: 45,
      reviews: [
        { user: 'Tanvi Bhatt', initials: 'TB', rating: 4, text: 'Convenient location next to the health center. Prices are lower than outside pharmacies. Staff is helpful.', date: '2026-06-19' }
      ]
    },
    {
      id: 'p8',
      name: 'Indoor Sports Arena',
      category: 'sports',
      icon: '🏸',
      gradient: 'gradient-sports',
      image: 'assets/images/sports_arena_photo_1783357747601.png',
      lat: 28.6135,
      lng: 77.2125,
      description: 'A multi-sport indoor facility with 4 badminton courts, 2 basketball courts, a table tennis zone, and a rock climbing wall. Equipment rental available at the counter.',
      hours: 'Mon–Sun: 6:00 AM – 10:00 PM',
      location: 'Sports Complex, South Campus',
      phone: '+91 98765 43217',
      crowdLevel: 'moderate',
      rating: 4.8,
      reviewCount: 167,
      reviews: [
        { user: 'Karan Malhotra', initials: 'KM', rating: 5, text: 'Absolutely love the badminton courts! Well-maintained and the lighting is professional grade. Best stress buster on campus.', date: '2026-07-02' },
        { user: 'Pooja Reddy', initials: 'PR', rating: 5, text: 'The rock climbing wall is so fun! They have sessions every evening with trained instructors. A must-try experience.', date: '2026-06-21' },
        { user: 'Amit Chandra', initials: 'AC', rating: 4, text: 'Great facility overall. Weekday mornings are the best time — almost empty. Evenings get packed though.', date: '2026-06-09' }
      ]
    },
    {
      id: 'p9',
      name: 'Olympic Swimming Pool',
      category: 'sports',
      icon: '🏊',
      gradient: 'gradient-sports',
      image: null,
      lat: 28.6138,
      lng: 77.2130,
      description: 'A 50-meter Olympic-standard swimming pool with separate lanes for training and leisure. Includes a kiddie pool, changing rooms, and a poolside lounge.',
      hours: 'Mon–Sat: 6:00 AM – 8:00 PM | Sun: 7:00 AM – 6:00 PM',
      location: 'Sports Complex, South Campus',
      phone: '+91 98765 43218',
      crowdLevel: 'low',
      rating: 4.6,
      reviewCount: 93,
      reviews: [
        { user: 'Shreya Agarwal', initials: 'SA', rating: 5, text: 'The pool is incredibly well-maintained. Early morning laps here are the best way to start the day. Highly recommend!', date: '2026-06-29' },
        { user: 'Dev Kapoor', initials: 'DK', rating: 4, text: 'Great pool! The only downside is the limited evening hours. Would love it if they extended to 9 PM on weekdays.', date: '2026-06-16' }
      ]
    },
    {
      id: 'p10',
      name: 'Cricket Ground',
      category: 'sports',
      icon: '🏏',
      gradient: 'gradient-sports',
      image: null,
      lat: 28.6120,
      lng: 77.2140,
      description: 'A full-size cricket ground with a turf pitch, practice nets, and floodlights for evening matches. Home to the university cricket team. Open for casual games on weekends.',
      hours: 'Mon–Fri: 4:00 PM – 9:00 PM | Sat–Sun: 6:00 AM – 9:00 PM',
      location: 'South Campus, Behind Sports Arena',
      phone: '+91 98765 43219',
      crowdLevel: 'moderate',
      rating: 4.4,
      reviewCount: 121,
      reviews: [
        { user: 'Ravi Shankar', initials: 'RS', rating: 5, text: 'The floodlights make evening cricket so much fun. The pitch is well-rolled and the outfield is green. Love it here!', date: '2026-06-26' },
        { user: 'Neeraj Chopra', initials: 'NC', rating: 4, text: 'Great ground! Weekend matches are a blast. They should add more practice nets though, current ones get too busy.', date: '2026-06-13' }
      ]
    },
    {
      id: 'p11',
      name: 'Quiet Study Hall',
      category: 'study',
      icon: '📖',
      gradient: 'gradient-study',
      image: null,
      lat: 28.6142,
      lng: 77.2088,
      description: 'A dedicated silent study space with 120 individual cubicles, power outlets at every seat, and soft ambient lighting. Strict no-talking policy enforced. Perfect for deep focus work.',
      hours: 'Mon–Sun: 6:00 AM – 12:00 AM',
      location: 'Block C, 3rd Floor',
      phone: '+91 98765 43220',
      crowdLevel: 'high',
      rating: 4.9,
      reviewCount: 203,
      reviews: [
        { user: 'Lakshmi Narayan', initials: 'LN', rating: 5, text: 'The absolute best place to study. The cubicles give you privacy and the 24-hour access during exam season is a blessing.', date: '2026-07-03' },
        { user: 'Yash Gupta', initials: 'YG', rating: 5, text: 'I practically live here during finals week. The ambient lighting is so calming. Just get there early — the good cubicles fill up fast.', date: '2026-06-23' }
      ]
    },
    {
      id: 'p12',
      name: 'Innovation Hub',
      category: 'study',
      icon: '💡',
      gradient: 'gradient-study',
      image: null,
      lat: 28.6148,
      lng: 77.2082,
      description: 'A modern co-working and incubation space for student startups and project teams. Features open desks, private meeting rooms, a pitch stage, whiteboards, and 24/7 access for registered teams.',
      hours: 'Mon–Fri: 8:00 AM – 10:00 PM | Sat: 9:00 AM – 6:00 PM',
      location: 'Block E, Ground Floor',
      phone: '+91 98765 43221',
      crowdLevel: 'low',
      rating: 4.7,
      reviewCount: 88,
      reviews: [
        { user: 'Anika Desai', initials: 'AD', rating: 5, text: 'This place is startup heaven! Got our team registered and we have our own dedicated desk now. The whiteboard walls are amazing.', date: '2026-06-30' },
        { user: 'Varun Krishnan', initials: 'VK', rating: 4, text: 'Great space for brainstorming and team collaboration. The meeting rooms need better soundproofing though.', date: '2026-06-17' }
      ]
    },
    {
      id: 'p13',
      name: 'Admin Block',
      category: 'academic',
      icon: '🏢',
      gradient: 'gradient-academic',
      image: null,
      lat: 28.6135,
      lng: 77.2098,
      description: 'The administrative headquarters housing the Registrar, Admissions, Examination Cell, Finance, and Student Affairs offices. All official paperwork and queries are handled here.',
      hours: 'Mon–Fri: 9:00 AM – 5:00 PM | Sat: 10:00 AM – 2:00 PM',
      location: 'Central Campus, Main Road',
      phone: '+91 98765 43222',
      crowdLevel: 'moderate',
      rating: 3.5,
      reviewCount: 56,
      reviews: [
        { user: 'Deepak Mishra', initials: 'DM', rating: 3, text: 'The new online portal has reduced the need to visit physically. Still, some processes require in-person visits. Staff could be more responsive.', date: '2026-06-24' },
        { user: 'Ritika Bose', initials: 'RB', rating: 4, text: 'Tip: Visit early morning to avoid long queues. The exam cell on the 2nd floor is most efficient around 10 AM.', date: '2026-06-11' }
      ]
    },
    {
      id: 'p14',
      name: 'Open Air Amphitheatre',
      category: 'other',
      icon: '🎭',
      gradient: 'gradient-other',
      image: null,
      lat: 28.6140,
      lng: 77.2115,
      description: 'A beautiful open-air amphitheatre with a capacity of 500+. Hosts cultural festivals, movie screenings, guest lectures, and weekend performances. A campus landmark.',
      hours: 'Open access | Events: As scheduled',
      location: 'Central Campus, Near Lake',
      phone: '+91 98765 43223',
      crowdLevel: 'low',
      rating: 4.8,
      reviewCount: 175,
      reviews: [
        { user: 'Mira Jain', initials: 'MJ', rating: 5, text: 'The sunset view from the amphitheatre steps is magical. Perfect spot for evening hangouts or just unwinding after classes.', date: '2026-07-01' },
        { user: 'Sahil Tiwari', initials: 'ST', rating: 5, text: 'Attended the open-mic night here last week — incredible atmosphere! The acoustic design really carries the sound well.', date: '2026-06-18' }
      ]
    },
    {
      id: 'p15',
      name: 'Fitness Center & Gym',
      category: 'sports',
      icon: '💪',
      gradient: 'gradient-sports',
      image: null,
      lat: 28.6133,
      lng: 77.2128,
      description: 'A fully-equipped gym with cardio machines, free weights, functional training zones, and yoga/aerobics studios. Certified trainers available for guidance. Free for all enrolled students.',
      hours: 'Mon–Sat: 5:30 AM – 10:00 PM | Sun: 7:00 AM – 8:00 PM',
      location: 'Sports Complex, South Campus',
      phone: '+91 98765 43224',
      crowdLevel: 'high',
      rating: 4.5,
      reviewCount: 198,
      reviews: [
        { user: 'Aryan Kapoor', initials: 'AK', rating: 5, text: 'Excellent equipment and the trainers are very knowledgeable. The early morning 6 AM slot is the sweet spot — uncrowded and energizing!', date: '2026-07-02' },
        { user: 'Neha Saxena', initials: 'NS', rating: 4, text: 'Love the yoga studio upstairs! The instructor is amazing. Only issue is that the gym floor gets really packed between 5–7 PM.', date: '2026-06-19' }
      ]
    },
    {
      id: 'p16',
      name: 'Midnight Munchies',
      category: 'food',
      icon: '🌮',
      gradient: 'gradient-food',
      image: null,
      lat: 28.6155,
      lng: 77.2065,
      description: 'A late-night food truck zone near the hostels serving rolls, momos, maggi, sandwiches, and chai. The go-to spot for midnight cravings and late-night study fuel.',
      hours: 'Daily: 8:00 PM – 2:00 AM',
      location: 'Hostel Road, Near Gate 3',
      phone: 'N/A (Walk-in only)',
      crowdLevel: 'moderate',
      rating: 4.3,
      reviewCount: 312,
      reviews: [
        { user: 'Kabir Ahuja', initials: 'KA', rating: 5, text: 'The paneer rolls here are legendary! Perfect fuel for late-night coding sessions. The chai at 1 AM hits different.', date: '2026-07-03' },
        { user: 'Riya Singh', initials: 'RS', rating: 4, text: 'Affordable and tasty. The momos are the best on campus hands down. Gets crowded around 11 PM so go early.', date: '2026-06-22' }
      ]
    }
  ],

  /* Place categories */
  placeCategories: [
    { id: 'all', label: 'All', icon: '✨' },
    { id: 'food', label: 'Food & Café', icon: '🍕' },
    { id: 'study', label: 'Study Spots', icon: '📚' },
    { id: 'sports', label: 'Sports', icon: '⚽' },
    { id: 'medical', label: 'Medical', icon: '🏥' },
    { id: 'academic', label: 'Academic', icon: '🎓' },
    { id: 'other', label: 'Other', icon: '📍' }
  ],

  /* ==================== CLUBS ==================== */
  clubs: [
    {
      id: 'c1',
      name: 'Code Crafters',
      category: 'tech',
      icon: '💻',
      gradient: 'gradient-tech',
      description: 'The premier coding club of Greenfield University. We organize hackathons, competitive programming contests, workshops on latest tech stacks, and collaborative open-source projects. Whether you\'re a beginner or a seasoned developer, there\'s a place for you here.',
      office: 'Block A, Room 204',
      meetingSchedule: 'Every Wednesday, 5:00 PM – 7:00 PM',
      contact: 'Aarav Sharma (President)',
      email: 'codecrafters@greenfield.edu',
      memberCount: 245,
      isRecruiting: true,
      rating: 4.8,
      reviewCount: 45,
      reviews: [
        { user: 'Rohan Kumar', initials: 'RK', rating: 5, text: 'Amazing community for developers!', date: '2026-05-12' }
      ],
      events: [
        { id: 'e1', title: 'HackGreenfield 2026', date: '2026-07-20', time: '9:00 AM – 9:00 PM', venue: 'Innovation Hub', description: '24-hour hackathon with prizes worth ₹1,00,000. Teams of 2–4. Open to all departments.' },
        { id: 'e2', title: 'React Workshop', date: '2026-07-15', time: '4:00 PM – 6:00 PM', venue: 'Lab 3, Block A', description: 'Hands-on workshop on building modern web apps with React.js. Bring your laptop!' },
        { id: 'e3', title: 'CP Weekly Contest #28', date: '2026-07-12', time: '8:00 PM – 10:00 PM', venue: 'Online (HackerRank)', description: 'Weekly competitive programming contest. Solve 5 problems in 2 hours. Leaderboard prizes!' }
      ]
    },
    {
      id: 'c2',
      name: 'Robotics Society',
      category: 'tech',
      icon: '🤖',
      gradient: 'gradient-tech',
      description: 'Building the future, one robot at a time. We design, build, and program robots for national competitions. Members get access to the robotics lab with Arduino kits, Raspberry Pis, sensors, and 3D printers.',
      office: 'Block A, Maker Space',
      meetingSchedule: 'Every Friday, 4:00 PM – 6:00 PM',
      contact: 'Meera Iyer (Captain)',
      email: 'robotics@greenfield.edu',
      memberCount: 89,
      isRecruiting: true,
      rating: 4.6,
      reviewCount: 22,
      reviews: [],
      events: [
        { id: 'e4', title: 'Robo Race Championship', date: '2026-08-05', time: '10:00 AM – 4:00 PM', venue: 'Indoor Sports Arena', description: 'Build and race your line-following robot! Prizes for fastest time and best design.' },
        { id: 'e5', title: 'Arduino Basics Workshop', date: '2026-07-18', time: '3:00 PM – 5:00 PM', venue: 'Maker Space, Block A', description: 'Learn the fundamentals of Arduino programming and circuit building. No prior experience needed.' }
      ]
    },
    {
      id: 'c3',
      name: 'Debating Union',
      category: 'educational',
      icon: '🎙️',
      gradient: 'gradient-educational',
      description: 'Sharpen your argumentation, critical thinking, and public speaking skills. We participate in MUN conferences, parliamentary debates, and host intra-college debate tournaments throughout the year.',
      office: 'Block C, Room 112',
      meetingSchedule: 'Every Tuesday & Thursday, 6:00 PM – 7:30 PM',
      contact: 'Kabir Ahuja (Secretary)',
      email: 'debate@greenfield.edu',
      memberCount: 67,
      isRecruiting: true,
      rating: 4.5,
      reviewCount: 30,
      reviews: [],
      events: [
        { id: 'e6', title: 'Greenfield MUN 2026', date: '2026-08-15', time: 'Full Day Event', venue: 'Admin Block, Seminar Hall', description: 'Annual Model United Nations conference. 6 committees, 200+ delegates from across the country.' },
        { id: 'e7', title: 'Debate Night: AI Ethics', date: '2026-07-22', time: '7:00 PM – 9:00 PM', venue: 'Amphitheatre', description: 'Open debate on the ethics of artificial intelligence. Two teams, audience voting. Come watch or participate!' }
      ]
    },
    {
      id: 'c4',
      name: 'Literary Society',
      category: 'educational',
      icon: '✍️',
      gradient: 'gradient-educational',
      description: 'For the lovers of words — poetry, prose, spoken word, and everything in between. We publish a quarterly campus magazine, host open-mic poetry nights, and run creative writing workshops.',
      office: 'Central Library, Room 108',
      meetingSchedule: 'Every Saturday, 11:00 AM – 1:00 PM',
      contact: 'Kavya Nair (Editor-in-Chief)',
      email: 'litsoc@greenfield.edu',
      memberCount: 52,
      isRecruiting: true,
      rating: 4.7,
      reviewCount: 18,
      reviews: [],
      events: [
        { id: 'e8', title: 'Open Mic Poetry Night', date: '2026-07-25', time: '7:00 PM – 9:00 PM', venue: 'Amphitheatre', description: 'Share your poems, stories, or spoken word pieces. All are welcome — listeners and performers alike!' },
        { id: 'e9', title: 'Magazine Launch: Issue #12', date: '2026-08-01', time: '5:00 PM – 6:30 PM', venue: 'Library Seminar Room', description: 'Launch event for the latest issue of "Inkwell" — our campus literary magazine. Refreshments provided!' }
      ]
    },
    {
      id: 'c5',
      name: 'Nritya Dance Crew',
      category: 'cultural',
      icon: '💃',
      gradient: 'gradient-cultural',
      description: 'The official dance crew of Greenfield University. We cover Bollywood, hip-hop, classical, contemporary, and fusion styles. Regular workshops, flash mobs, and inter-college competition performances.',
      office: 'Student Center, Dance Studio (2nd Floor)',
      meetingSchedule: 'Mon, Wed, Fri: 6:00 PM – 8:00 PM',
      contact: 'Riya Singh (Choreographer)',
      email: 'nritya@greenfield.edu',
      memberCount: 78,
      isRecruiting: false,
      rating: 4.9,
      reviewCount: 65,
      reviews: [],
      events: [
        { id: 'e10', title: 'Flash Mob: Independence Day', date: '2026-08-15', time: '12:00 PM', venue: 'Central Campus Lawn', description: 'A surprise flash mob celebrating Independence Day! If you\'re a member, rehearsals start July 25th.' },
        { id: 'e11', title: 'Hip-Hop Workshop', date: '2026-07-19', time: '5:00 PM – 7:00 PM', venue: 'Dance Studio', description: 'Open workshop on hip-hop basics by guest choreographer DJ Vicky. Open to all!' }
      ]
    },
    {
      id: 'c6',
      name: 'Rangmanch Drama Club',
      category: 'cultural',
      icon: '🎭',
      gradient: 'gradient-cultural',
      description: 'Where the stage comes alive! We produce 2 full-length plays per semester, organize street theatre performances, and run acting workshops. No prior experience needed — just passion.',
      office: 'Student Center, Room 305',
      meetingSchedule: 'Every Tuesday & Saturday, 5:00 PM – 7:00 PM',
      contact: 'Sahil Tiwari (Director)',
      email: 'rangmanch@greenfield.edu',
      memberCount: 45,
      isRecruiting: true,
      rating: 4.4,
      reviewCount: 15,
      reviews: [],
      events: [
        { id: 'e12', title: 'Annual Play: "The Last Sunset"', date: '2026-08-20', time: '7:00 PM – 9:30 PM', venue: 'Amphitheatre', description: 'Our flagship annual production — a gripping drama about friendship and loss. Free entry, limited seating.' },
        { id: 'e13', title: 'Improvisation Workshop', date: '2026-07-16', time: '4:00 PM – 6:00 PM', venue: 'Student Center, Room 305', description: 'Learn the art of improv comedy and theatrical improvisation. Fun, interactive, and great for confidence building!' }
      ]
    },
    {
      id: 'c7',
      name: 'Shutter Club',
      category: 'cultural',
      icon: '📸',
      gradient: 'gradient-cultural',
      description: 'The official photography club. We cover campus events, run photowalks, host exhibitions, and teach photography basics. DSLR or phone camera — all photographers are welcome.',
      office: 'Block B, Room 110',
      meetingSchedule: 'Every Sunday, 10:00 AM – 12:00 PM',
      contact: 'Anika Desai (Head Photographer)',
      email: 'shutter@greenfield.edu',
      memberCount: 112,
      isRecruiting: true,
      rating: 4.7,
      reviewCount: 42,
      reviews: [],
      events: [
        { id: 'e14', title: 'Campus Photowalk', date: '2026-07-13', time: '6:00 AM – 8:00 AM', venue: 'Meet at Main Gate', description: 'Early morning photowalk capturing the golden hour on campus. Bring any camera — phone is fine!' },
        { id: 'e15', title: 'Photo Exhibition: "Perspectives"', date: '2026-08-10', time: '10:00 AM – 6:00 PM', venue: 'Library Gallery', description: 'Exhibition showcasing the best work of our members. Theme: "Perspectives". Open to all.' }
      ]
    },
    {
      id: 'c8',
      name: 'Greenfield Cricket Club',
      category: 'sports',
      icon: '🏏',
      gradient: 'gradient-sports',
      description: 'Representing Greenfield in inter-university cricket tournaments. We run tryouts every semester, have daily net practice, and organize the annual intra-college T20 league.',
      office: 'Sports Complex, Room 5',
      meetingSchedule: 'Daily practice: 4:30 PM – 6:30 PM',
      contact: 'Ravi Shankar (Captain)',
      email: 'cricket@greenfield.edu',
      memberCount: 34,
      isRecruiting: true,
      rating: 4.6,
      reviewCount: 20,
      reviews: [],
      events: [
        { id: 'e16', title: 'Intra-College T20 League', date: '2026-08-01', time: 'Weekends, Full Day', venue: 'Cricket Ground', description: '8-team T20 tournament. Register your department team by July 25th. Trophy + ₹25,000 prize money!' },
        { id: 'e17', title: 'Open Tryouts — Season 2', date: '2026-07-21', time: '4:00 PM – 6:00 PM', venue: 'Cricket Ground', description: 'Open tryouts for the university cricket team. Bring your own kit. All positions available.' }
      ]
    },
    {
      id: 'c9',
      name: 'Basketball Club',
      category: 'sports',
      icon: '🏀',
      gradient: 'gradient-sports',
      description: 'The university basketball team and recreational club. We train 5 days a week, compete at state and national levels, and organize 3v3 street basketball tournaments for casual players.',
      office: 'Sports Complex, Room 7',
      meetingSchedule: 'Mon–Fri: 5:00 PM – 7:00 PM',
      contact: 'Karan Malhotra (Captain)',
      email: 'basketball@greenfield.edu',
      memberCount: 42,
      isRecruiting: true,
      rating: 4.8,
      reviewCount: 33,
      reviews: [],
      events: [
        { id: 'e18', title: '3v3 Street Ball Tournament', date: '2026-07-27', time: '10:00 AM – 5:00 PM', venue: 'Outdoor Basketball Court', description: 'Open 3v3 tournament. Register your squad (3+1 sub). Trophies for top 3 teams!' }
      ]
    },
    {
      id: 'c10',
      name: 'Green Earth Society',
      category: 'social',
      icon: '🌱',
      gradient: 'gradient-social',
      description: 'Dedicated to environmental sustainability on campus. We run tree-planting drives, recycling initiatives, clean-up campaigns, and awareness workshops on climate change and eco-friendly living.',
      office: 'Block C, Room 015 (Basement)',
      meetingSchedule: 'Every Wednesday, 4:00 PM – 5:30 PM',
      contact: 'Simran Kaur (Coordinator)',
      email: 'greenearth@greenfield.edu',
      memberCount: 93,
      isRecruiting: true,
      rating: 4.5,
      reviewCount: 16,
      reviews: [],
      events: [
        { id: 'e19', title: 'Campus Clean-Up Drive', date: '2026-07-14', time: '8:00 AM – 11:00 AM', venue: 'Meet at Amphitheatre', description: 'Monthly campus-wide clean-up drive. Gloves and bags provided. Earn volunteer hours!' },
        { id: 'e20', title: 'Tree Planting: 100 Trees Goal', date: '2026-07-28', time: '7:00 AM – 10:00 AM', venue: 'North Campus Green Belt', description: 'Help us plant 100 trees this monsoon! Saplings and tools provided. Everyone welcome.' }
      ]
    },
    {
      id: 'c11',
      name: 'NSS Chapter',
      category: 'social',
      icon: '🤝',
      gradient: 'gradient-social',
      description: 'The National Service Scheme chapter at Greenfield focuses on community service, rural outreach, blood donation camps, and disaster relief volunteering. Great way to give back and earn NSS credits.',
      office: 'Admin Block, Room 106',
      meetingSchedule: 'Every Saturday, 2:00 PM – 4:00 PM',
      contact: 'Deepak Mishra (Program Officer)',
      email: 'nss@greenfield.edu',
      memberCount: 156,
      isRecruiting: true,
      rating: 4.8,
      reviewCount: 75,
      reviews: [],
      events: [
        { id: 'e21', title: 'Blood Donation Camp', date: '2026-07-17', time: '10:00 AM – 3:00 PM', venue: 'Student Health Center', description: 'Annual blood donation drive in partnership with Red Cross. Refreshments and certificates for all donors.' },
        { id: 'e22', title: 'Rural Outreach Trip', date: '2026-08-08', time: 'Full Day (7 AM departure)', venue: 'Nearby Village', description: '1-day rural outreach: health check-ups, teaching, and awareness programs. Bus transport provided. Sign up by Aug 1.' }
      ]
    },
    {
      id: 'c12',
      name: 'E-Cell',
      category: 'educational',
      icon: '🚀',
      gradient: 'gradient-educational',
      description: 'The Entrepreneurship Cell nurtures startup culture on campus. We run pitch competitions, startup mentoring, investor connects, and a semester-long incubation program for promising ventures.',
      office: 'Innovation Hub, Desk 1-4',
      meetingSchedule: 'Every Thursday, 6:00 PM – 8:00 PM',
      contact: 'Varun Krishnan (President)',
      email: 'ecell@greenfield.edu',
      memberCount: 134,
      isRecruiting: true,
      rating: 4.6,
      reviewCount: 38,
      reviews: [],
      events: [
        { id: 'e23', title: 'Startup Pitch Night', date: '2026-07-24', time: '6:00 PM – 9:00 PM', venue: 'Innovation Hub', description: '5-minute pitch format. Top 3 ideas get seed funding of ₹50,000 each. Register your startup idea by July 20!' },
        { id: 'e24', title: 'Fireside Chat: Founder Series', date: '2026-07-10', time: '5:00 PM – 6:30 PM', venue: 'Amphitheatre', description: 'Conversation with Priya Agarwal, founder of EduTech startup "LearnLoop". Q&A session included.' }
      ]
    }
  ],

  /* Club categories */
  clubCategories: [
    { id: 'all', label: 'All', icon: '✨' },
    { id: 'tech', label: 'Tech', icon: '💻' },
    { id: 'educational', label: 'Educational', icon: '📖' },
    { id: 'cultural', label: 'Cultural', icon: '🎨' },
    { id: 'sports', label: 'Sports', icon: '⚽' },
    { id: 'social', label: 'Social', icon: '🤝' }
  ],

  /* ==================== STAFF DIRECTORY ==================== */
  staff: [
    {
      id: 's1',
      name: 'Dr. Anand Kumar',
      initials: 'AK',
      role: 'Dean of Students',
      department: 'Administration',
      category: 'administration',
      office: 'Admin Block, Room 201',
      phone: '+91 98765 43301',
      email: 'dean.students@greenfield.edu',
      availability: 'available',
      gradient: 'gradient-academic'
    },
    {
      id: 's2',
      name: 'Prof. R.K. Verma',
      initials: 'RV',
      role: 'Head of Physics',
      department: 'Physics',
      category: 'faculty',
      office: 'Science Complex, Room 304',
      phone: '+91 98765 43302',
      email: 'rk.verma@greenfield.edu',
      availability: 'meeting',
      gradient: 'gradient-study'
    },
    {
      id: 's3',
      name: 'Dr. Neha Sharma',
      initials: 'NS',
      role: 'Associate Professor',
      department: 'Computer Science',
      category: 'faculty',
      office: 'Engineering Block A, Room 412',
      phone: '+91 98765 43303',
      email: 'neha.sharma@greenfield.edu',
      availability: 'available',
      gradient: 'gradient-tech'
    },
    {
      id: 's4',
      name: 'Mr. Vikram Singh',
      initials: 'VS',
      role: 'Senior Lab Technician',
      department: 'Computer Science',
      category: 'technical',
      office: 'Engineering Block A, Lab 3',
      phone: '+91 98765 43304',
      email: 'vikram.tech@greenfield.edu',
      availability: 'available',
      gradient: 'gradient-other'
    },
    {
      id: 's5',
      name: 'Dr. Meenakshi Iyer',
      initials: 'MI',
      role: 'Student Mentor (1st Year)',
      department: 'Student Affairs',
      category: 'mentors',
      office: 'Admin Block, Room 105',
      phone: '+91 98765 43305',
      email: 'mentor.firstyear@greenfield.edu',
      availability: 'leave',
      gradient: 'gradient-social'
    },
    {
      id: 's6',
      name: 'Prof. Sanjay Gupta',
      initials: 'SG',
      role: 'Head of Mathematics',
      department: 'Mathematics',
      category: 'faculty',
      office: 'Science Complex, Room 208',
      phone: '+91 98765 43306',
      email: 'sanjay.gupta@greenfield.edu',
      availability: 'available',
      gradient: 'gradient-study'
    },
    {
      id: 's7',
      name: 'Ms. Priya Desai',
      initials: 'PD',
      role: 'Career Counselor',
      department: 'Placement Cell',
      category: 'mentors',
      office: 'Innovation Hub, Office 2',
      phone: '+91 98765 43307',
      email: 'careers@greenfield.edu',
      availability: 'meeting',
      gradient: 'gradient-educational'
    },
    {
      id: 's8',
      name: 'Mr. Rahul Jain',
      initials: 'RJ',
      role: 'Network Administrator',
      department: 'IT Support',
      category: 'technical',
      office: 'Admin Block, Server Room',
      phone: '+91 98765 43308',
      email: 'it.support@greenfield.edu',
      availability: 'available',
      gradient: 'gradient-tech'
    }
  ],

  /* Staff categories */
  staffCategories: [
    { id: 'all', label: 'All', icon: '👥' },
    { id: 'faculty', label: 'Faculty', icon: '👨‍🏫' },
    { id: 'administration', label: 'Admin', icon: '🏢' },
    { id: 'mentors', label: 'Mentors', icon: '🤝' },
    { id: 'technical', label: 'Technical', icon: '🔧' }
  ],

  /* User profile (mock) */
  user: {
    name: 'Alex Johnson',
    initials: 'AJ',
    enrollmentId: 'GFU24CS089',
    department: 'Computer Science & Engineering',
    year: '2nd Year',
    semester: 'Semester 4',
    cgpa: '8.7',
    email: 'alex.johnson@greenfield.edu'
  },

  /* ==================== ACADEMICS ==================== */

  /* Weekly Timetable — CS 2nd Year, Semester 4 */
  timetable: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    periods: [
      // Monday
      { day: 'Monday', subject: 'Data Structures & Algorithms', code: 'CS201', time: '9:00 AM – 10:00 AM', room: 'Room 301, Block A', faculty: 'Dr. Neha Sharma', type: 'lecture' },
      { day: 'Monday', subject: 'Operating Systems', code: 'CS203', time: '10:15 AM – 11:15 AM', room: 'Room 305, Block A', faculty: 'Prof. Sanjay Gupta', type: 'lecture' },
      { day: 'Monday', subject: 'Discrete Mathematics', code: 'MA201', time: '11:30 AM – 12:30 PM', room: 'Room 208, Science Complex', faculty: 'Prof. Sanjay Gupta', type: 'lecture' },
      { day: 'Monday', subject: 'DSA Lab', code: 'CS201L', time: '2:00 PM – 4:00 PM', room: 'Lab 3, Block A', faculty: 'Mr. Vikram Singh', type: 'lab' },

      // Tuesday
      { day: 'Tuesday', subject: 'Computer Networks', code: 'CS205', time: '9:00 AM – 10:00 AM', room: 'Room 302, Block A', faculty: 'Dr. Neha Sharma', type: 'lecture' },
      { day: 'Tuesday', subject: 'Database Management Systems', code: 'CS207', time: '10:15 AM – 11:15 AM', room: 'Room 301, Block A', faculty: 'Dr. Neha Sharma', type: 'lecture' },
      { day: 'Tuesday', subject: 'Operating Systems', code: 'CS203', time: '11:30 AM – 12:30 PM', room: 'Room 305, Block A', faculty: 'Prof. Sanjay Gupta', type: 'lecture' },
      { day: 'Tuesday', subject: 'Soft Skills & Communication', code: 'HS201', time: '2:00 PM – 3:00 PM', room: 'Room 112, Block C', faculty: 'Dr. Meenakshi Iyer', type: 'lecture' },

      // Wednesday
      { day: 'Wednesday', subject: 'Data Structures & Algorithms', code: 'CS201', time: '9:00 AM – 10:00 AM', room: 'Room 301, Block A', faculty: 'Dr. Neha Sharma', type: 'lecture' },
      { day: 'Wednesday', subject: 'Discrete Mathematics', code: 'MA201', time: '10:15 AM – 11:15 AM', room: 'Room 208, Science Complex', faculty: 'Prof. Sanjay Gupta', type: 'lecture' },
      { day: 'Wednesday', subject: 'Computer Networks', code: 'CS205', time: '11:30 AM – 12:30 PM', room: 'Room 302, Block A', faculty: 'Dr. Neha Sharma', type: 'lecture' },
      { day: 'Wednesday', subject: 'CN Lab', code: 'CS205L', time: '2:00 PM – 4:00 PM', room: 'Lab 2, Block A', faculty: 'Mr. Vikram Singh', type: 'lab' },

      // Thursday
      { day: 'Thursday', subject: 'Database Management Systems', code: 'CS207', time: '9:00 AM – 10:00 AM', room: 'Room 301, Block A', faculty: 'Dr. Neha Sharma', type: 'lecture' },
      { day: 'Thursday', subject: 'Operating Systems', code: 'CS203', time: '10:15 AM – 11:15 AM', room: 'Room 305, Block A', faculty: 'Prof. Sanjay Gupta', type: 'lecture' },
      { day: 'Thursday', subject: 'Data Structures & Algorithms', code: 'CS201', time: '11:30 AM – 12:30 PM', room: 'Room 301, Block A', faculty: 'Dr. Neha Sharma', type: 'lecture' },
      { day: 'Thursday', subject: 'DBMS Lab', code: 'CS207L', time: '2:00 PM – 4:00 PM', room: 'Lab 3, Block A', faculty: 'Mr. Vikram Singh', type: 'lab' },

      // Friday
      { day: 'Friday', subject: 'Computer Networks', code: 'CS205', time: '9:00 AM – 10:00 AM', room: 'Room 302, Block A', faculty: 'Dr. Neha Sharma', type: 'lecture' },
      { day: 'Friday', subject: 'Discrete Mathematics', code: 'MA201', time: '10:15 AM – 11:15 AM', room: 'Room 208, Science Complex', faculty: 'Prof. Sanjay Gupta', type: 'lecture' },
      { day: 'Friday', subject: 'Database Management Systems', code: 'CS207', time: '11:30 AM – 12:30 PM', room: 'Room 301, Block A', faculty: 'Dr. Neha Sharma', type: 'lecture' },
      { day: 'Friday', subject: 'OS Lab', code: 'CS203L', time: '2:00 PM – 4:00 PM', room: 'Lab 2, Block A', faculty: 'Mr. Vikram Singh', type: 'lab' },

      // Saturday
      { day: 'Saturday', subject: 'Soft Skills & Communication', code: 'HS201', time: '9:00 AM – 10:00 AM', room: 'Room 112, Block C', faculty: 'Dr. Meenakshi Iyer', type: 'lecture' },
      { day: 'Saturday', subject: 'Discrete Mathematics Tutorial', code: 'MA201T', time: '10:15 AM – 11:15 AM', room: 'Room 208, Science Complex', faculty: 'Prof. Sanjay Gupta', type: 'tutorial' }
    ]
  },

  /* Academic Calendar — Semester 4, 2026 */
  academicCalendar: [
    { id: 'ac1', title: 'Semester 4 Begins', date: '2026-07-01', type: 'milestone', icon: '🎓', description: 'First day of classes for Semester 4. Orientation for new electives.' },
    { id: 'ac2', title: 'Last Date: Course Registration', date: '2026-07-10', type: 'deadline', icon: '📋', description: 'Final day to add/drop courses on the online portal.' },
    { id: 'ac3', title: 'Independence Day', date: '2026-08-15', type: 'holiday', icon: '🇮🇳', description: 'National holiday. Campus closed. Flag hoisting ceremony at 8 AM.' },
    { id: 'ac4', title: 'Mid-Semester Exams Begin', date: '2026-08-25', type: 'exam', icon: '📝', description: 'Mid-semester examinations for all courses. Check exam schedule for details.' },
    { id: 'ac5', title: 'Mid-Semester Exams End', date: '2026-09-03', type: 'exam', icon: '📝', description: 'Last day of mid-semester examinations.' },
    { id: 'ac6', title: 'Gandhi Jayanti', date: '2026-10-02', type: 'holiday', icon: '🕊️', description: 'National holiday. Campus closed.' },
    { id: 'ac7', title: 'Diwali Break Begins', date: '2026-10-19', type: 'holiday', icon: '🪔', description: 'Diwali vacation. Campus reopens October 26.' },
    { id: 'ac8', title: 'Diwali Break Ends', date: '2026-10-25', type: 'holiday', icon: '🪔', description: 'Last day of Diwali break. Classes resume October 26.' },
    { id: 'ac9', title: 'Last Date: Project Submissions', date: '2026-11-05', type: 'deadline', icon: '📦', description: 'Final deadline for all course project submissions via the portal.' },
    { id: 'ac10', title: 'End-Semester Exams Begin', date: '2026-11-15', type: 'exam', icon: '🎯', description: 'End-semester examinations begin. Good luck!' },
    { id: 'ac11', title: 'End-Semester Exams End', date: '2026-11-30', type: 'exam', icon: '✅', description: 'Last day of end-semester examinations.' },
    { id: 'ac12', title: 'Winter Break Begins', date: '2026-12-05', type: 'holiday', icon: '❄️', description: 'Winter vacation starts. Semester 5 begins January 2027.' }
  ],

  /* Exam Schedule — Upcoming Mid-Semester Exams */
  examSchedule: [
    { id: 'ex1', subject: 'Data Structures & Algorithms', code: 'CS201', date: '2026-08-25', time: '9:30 AM – 11:30 AM', venue: 'Exam Hall 1, Block A', type: 'mid-sem' },
    { id: 'ex2', subject: 'Operating Systems', code: 'CS203', date: '2026-08-27', time: '9:30 AM – 11:30 AM', venue: 'Exam Hall 1, Block A', type: 'mid-sem' },
    { id: 'ex3', subject: 'Computer Networks', code: 'CS205', date: '2026-08-28', time: '2:00 PM – 4:00 PM', venue: 'Exam Hall 2, Block A', type: 'mid-sem' },
    { id: 'ex4', subject: 'Database Management Systems', code: 'CS207', date: '2026-08-30', time: '9:30 AM – 11:30 AM', venue: 'Exam Hall 1, Block A', type: 'mid-sem' },
    { id: 'ex5', subject: 'Discrete Mathematics', code: 'MA201', date: '2026-09-01', time: '9:30 AM – 11:30 AM', venue: 'Exam Hall 3, Science Complex', type: 'mid-sem' },
    { id: 'ex6', subject: 'Soft Skills & Communication', code: 'HS201', date: '2026-09-03', time: '2:00 PM – 3:30 PM', venue: 'Room 112, Block C', type: 'mid-sem' }
  ],

  /* Academic Announcements */
  announcements: [
    { id: 'an1', title: 'DSA Assignment 3 Deadline Extended', body: 'The deadline for DSA Assignment 3 has been extended to July 15, 2026. Submit via the online portal. Late submissions will not be accepted.', date: '2026-07-07', priority: 'info', author: 'Dr. Neha Sharma' },
    { id: 'an2', title: 'Lab 3 Maintenance — July 12', body: 'Computer Lab 3 (Block A) will be under maintenance on July 12. All lab sessions will be held in Lab 2. Please plan accordingly.', date: '2026-07-06', priority: 'warning', author: 'Mr. Vikram Singh' },
    { id: 'an3', title: 'Mid-Sem Exam Schedule Released', body: 'The mid-semester exam schedule for Semester 4 has been published. Check the Exam Schedule section or download from the portal.', date: '2026-07-05', priority: 'urgent', author: 'Examination Cell' },
    { id: 'an4', title: 'Guest Lecture: Cloud Computing', body: 'A guest lecture on "Cloud-Native Architecture" by Mr. Rajesh Nair (AWS Solutions Architect) on July 18, 3:00 PM, Seminar Hall. All CS students are encouraged to attend.', date: '2026-07-04', priority: 'info', author: 'Dept. of Computer Science' },
    { id: 'an5', title: 'Library Hours Extended During Exams', body: 'The Central Library will remain open until 1:00 AM during the mid-semester exam period (Aug 20 – Sep 5). ID card mandatory for entry after 11 PM.', date: '2026-07-03', priority: 'info', author: 'Central Library' }
  ],

  /* Quick Links */
  quickLinks: [
    { id: 'ql1', label: 'Student Portal', icon: '🌐', url: '#', description: 'Access grades, attendance & more' },
    { id: 'ql2', label: 'LMS / Moodle', icon: '📖', url: '#', description: 'Course materials & assignments' },
    { id: 'ql3', label: 'Exam Results', icon: '📊', url: '#', description: 'View past semester results' },
    { id: 'ql4', label: 'Fee Payment', icon: '💳', url: '#', description: 'Pay tuition & hostel fees' },
    { id: 'ql5', label: 'Attendance', icon: '✅', url: '#', description: 'Check your attendance records' },
    { id: 'ql6', label: 'E-Library', icon: '📚', url: '#', description: 'Digital books & research papers' }
  ],

  /* Classroom Locations — academic rooms mapped to campus map */
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
