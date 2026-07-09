-- ==============================================================================
-- ACADEMICS AND VISITOR GUIDE SCHEMA
-- ==============================================================================

-- Create academic_data table
CREATE TABLE IF NOT EXISTS academic_data (
    id TEXT PRIMARY KEY,
    icon TEXT NOT NULL,
    title TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    details JSONB NOT NULL
);

-- Create visitor_guide_categories table
CREATE TABLE IF NOT EXISTS visitor_guide_categories (
    id TEXT PRIMARY KEY,
    icon TEXT NOT NULL,
    title TEXT NOT NULL,
    "desc" TEXT NOT NULL
);

-- ==============================================================================
-- MOCK DATA INSERTION
-- ==============================================================================

-- Insert into academic_data
INSERT INTO academic_data (id, icon, title, "desc", details) VALUES
('overview', '🏛️', 'University Overview & Campus', 'Established in 2010. 50-acre campus on NH-64, Punjab.', '[
    {"subtitle": "About", "content": "Established in 2010 under \"The Chitkara University Act\". Over 13,000 students and 900+ faculty members. Located on Chandigarh-Patiala NH-64 (~30 km from Chandigarh) spanning 50 acres."},
    {"subtitle": "Accreditation", "content": "UGC recognized, NAAC A+ accredited. Approved by COA, PCI. Member of AIU."},
    {"subtitle": "Rankings", "content": "QS World 2026: 1201-1400. QS Asia: 399. Top 5 Innovative Institutes by CII."},
    {"subtitle": "Campus Facilities", "content": "Smart classrooms, high-speed Wi-Fi, separate hostels, sports playgrounds, innovation centres, and simulation labs."}
]'),
('programs', '🎓', 'Academic Programs & Degrees', '35 core programs across 12 broad streams including UG, PG & PhD.', '[
    {"subtitle": "Engineering Streams", "content": "CSE, AI & Machine Learning, Data Science, Cyber Security, Cloud Computing, Electronics & Communication, Mechanical, Civil, Electrical, Mechatronics, Automobile."},
    {"subtitle": "Other Disciplines", "content": "Business (BBA/MBA), Pharmacy, Health Sciences, Nursing, Law, Architecture, Interior Design, Fine Arts, Psychology, Hospitality, Mass Communication, Liberal Arts."},
    {"subtitle": "Degree Formats", "content": "B.E./B.Tech, BCA, MCA, B.Arch, BBA, B.Com, B.A, M.A, B.Sc, B.Pharm, D.Pharm, PhD. Includes Lateral Entry, Online and Distance options."}
]'),
('pathways', '🌍', 'Global Pathways', 'Transfer credits to international partner universities.', '[
    {"subtitle": "How it works", "content": "Start your degree at Chitkara in Punjab and transfer 100% of eligible credits to a partner institution to earn a foreign degree."},
    {"subtitle": "Partner Universities", "content": "• Arizona State University (USA) - Business\n• Deakin University (Australia) - Engineering / AI\n• York University (Canada) - Engineering\n• George Brown Polytechnic (Canada) - Culinary Management\n• Trent University (Canada) - BBA"}
]'),
('curriculum', '📚', 'Curriculum & Regulations', 'CBCS / NEP 2020 aligned. Real-world projects & certifications.', '[
    {"subtitle": "Curriculum Approach", "content": "Industry-integrated curriculum (e.g. Microsoft/Cisco certs for CSE students). Choice Based Credit System (CBCS) / NEP 2020 framework. Includes Minors, Value Added Courses (VAC), and Skill Enhancement Courses."},
    {"subtitle": "Academic Calendar", "content": "Defined registration windows, mid-semester, and end-semester examinations. Mandatory pre-final/final year internships and industry-mentored capstone projects."},
    {"subtitle": "Evaluation & Rules", "content": "Semester-based credit system. SGPA/CGPA calculation. Minimum 75% attendance requirement to be eligible to sit for exams. Strict academic integrity policies."}
]'),
('career', '💼', 'Placements & Career Support', 'Top recruiters include Amazon, Microsoft, Wipro, and HCL.', '[
    {"subtitle": "Top Recruiters", "content": "Amazon, Wipro, Microsoft, Infosys, HCL. Statistics published annually by the Placement Cell."},
    {"subtitle": "Career Support Ecosystem", "content": "Placement training, interview preparation, soft-skills workshops, corporate mentorship offering one-on-one professional guidance, and regular industry guest lectures."},
    {"subtitle": "Entrepreneurship", "content": "Entrepreneurship Cell (EDC) offers seed funding access, mentorship, legal guidance, and incubation access for student startups."}
]'),
('research', '🔬', 'Research & Innovation', 'Over ₹107 crore funding backing university research activity.', '[
    {"subtitle": "Research Activity", "content": "Dedicated research centres across disciplines. Over ₹107 crore in reported research funding. Sponsored and funded research projects."},
    {"subtitle": "Outputs", "content": "Faculty and student publications in national/international journals and conferences. Patents filed and granted to faculty and students. IPR Cell for intellectual property guidance."}
]'),
('admissions', '📝', 'Admissions 2026-27', 'B.E./B.Tech eligibility: 10+2 with 60% aggregate. Apply online.', '[
    {"subtitle": "Eligibility (B.E./B.Tech)", "content": "10+2 pass with minimum 60% aggregate, or at least 60% in Physics, Chemistry & Mathematics. Relevant entrance exam (e.g. JEE Main) score/percentile also considered."},
    {"subtitle": "Application Process", "content": "Apply online at chitkara.edu.in. Application fee approximately ₹1,000–₹2,500 depending on the program. Seat counselling rounds for B.E./B.Tech reported for late May."},
    {"subtitle": "Other Information", "content": "15% seats reserved for candidates with Punjab Domicile. Merit-based, sports-based, and financial-need-based scholarships available for UG and PG programs."}
]'),
('resources', '📖', 'Student Resources', 'Libraries, ERP, LMS, and Student Achievements.', '[
    {"subtitle": "Digital Tools", "content": "ERP portal for academic administration. Learning Management System (LMS). Academic Bank of Credits (ABC) integration. National Academic Depository (NAD) Cell."},
    {"subtitle": "Student Life & Achievements", "content": "Participation and wins in hackathons and technical competitions. Strong representation in campus placements. Awards across academic, cultural, and sporting domains."}
]')
ON CONFLICT (id) DO UPDATE SET 
    icon = EXCLUDED.icon,
    title = EXCLUDED.title,
    "desc" = EXCLUDED."desc",
    details = EXCLUDED.details;


-- Insert into visitor_guide_categories
INSERT INTO visitor_guide_categories (id, icon, title, "desc") VALUES
('academic', '🏫', 'Campus Tour', 'Guided tours and self-guided maps.'),
('services', '🅿', 'Parking', 'Visitor parking zones and permits.'),
('food', '🍔', 'Nearby Restaurants', 'Top food spots just outside campus.'),
('hotels', '🏨', 'Hotels', 'Recommended accommodations for guests.'),
('transport', '🚖', 'Transport', 'Shuttle schedules and taxi stands.'),
('medical', '🏥', 'Medical', 'Nearest hospitals and pharmacies.'),
('printing', '🖨', 'Printing', 'Stationery and print shops on campus.'),
('grocery', '🛒', 'Grocery', 'Supermarkets and daily needs.'),
('events', '📍', 'Important Places', 'Admin block, library, and auditoriums.')
ON CONFLICT (id) DO UPDATE SET 
    icon = EXCLUDED.icon,
    title = EXCLUDED.title,
    "desc" = EXCLUDED."desc";
