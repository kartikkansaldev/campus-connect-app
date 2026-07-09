-- Insert new place categories needed for the Visitor Guide
INSERT INTO place_categories (id, label, icon) VALUES
('hotels', 'Hotels', '🏨'),
('transport', 'Transport', '🚖'),
('printing', 'Printing', '🖨'),
('grocery', 'Grocery', '🛒'),
('emergency', 'Emergency', '☎')
ON CONFLICT (id) DO NOTHING;

-- Insert ALL missing places from sid-branch
INSERT INTO places (id, name, category, icon, gradient, lat, lng, description, hours, location, phone, crowd_level, rating, review_count, wait_time, price, signature) VALUES

-- Self-Guided Tour
('p_tour', 'Self-Guided Campus Tour Route', 'academic', '🗺️', 'from-blue-500 to-indigo-500', 30.5165, 76.6595, 'Route: Main Gate > Reception > Academic Blocks > Central Library > Auditorium > Student Centre > Innovation Labs > Sports Complex > Hostels > Medical > Parking.', '9 AM - 6 PM', 'Starts at Main Gate', '01762-507084', 'moderate', 4.8, 40, null, 'Free', 'Pedestrian friendly'),

-- Nearby Restaurants
('p_f1', 'Mayur Simran', 'food', '🍛', 'from-orange-500 to-red-500', 30.5185, 76.6600, 'Famous Punjabi meals and authentic local taste.', '10 AM - 11 PM', 'Outside Campus', 'N/A', 'high', 4.6, 150, '~10min', '₹200', 'Punjabi Thali'),
('p_f2', 'Aangan Restaurant', 'food', '🍲', 'from-orange-500 to-red-500', 30.5186, 76.6605, 'Premium family restaurant with excellent ambiance.', '11 AM - 11 PM', 'Near Highway', 'N/A', 'moderate', 4.5, 95, '~15min', '₹400', 'Family Dining'),
('p_f3', 'New Simran Dhaba Gogi', 'food', '🥘', 'from-orange-500 to-red-500', 30.5188, 76.6610, 'Open 24x7, famous among students for late night cravings.', '24/7', 'NH-64', 'N/A', 'moderate', 4.3, 220, '~5min', '₹150', 'Late Night Parathas'),
('p_f4', 'Dhaba', 'food', '🍽️', 'from-orange-500 to-red-500', 30.5182, 76.6598, 'Very close to the university, serving quick and hot meals.', '9 AM - 10 PM', 'Main Gate Proximity', 'N/A', 'high', 4.4, 85, '~5min', '₹120', 'Quick Bites'),

-- HOTELS
('p_h1', 'Hotel Icon', 'hotels', '🏨', 'from-blue-500 to-indigo-500', 30.5200, 76.6650, 'Recommended premium accommodation for guests and parents.', '24/7 Check-in', 'Rajpura Town', 'N/A', 'moderate', 4.7, 110, null, 'Premium', 'Top Rated'),
('p_h2', 'Innbox Farmstay', 'hotels', '🏡', 'from-blue-500 to-indigo-500', 30.5210, 76.6660, 'Relaxing farmstay experience close to the university.', '24/7 Check-in', 'Nearby Village', 'N/A', 'low', 4.8, 65, null, 'Moderate', 'Nature & Relax'),
('p_h3', 'SPOT ON Sukhana Residency', 'hotels', '🏨', 'from-blue-500 to-indigo-500', 30.5190, 76.6620, 'Budget-friendly and convenient accommodation.', '24/7 Check-in', 'Rajpura Town', 'N/A', 'high', 4.0, 200, null, 'Budget', 'Affordable Stay'),

-- TRANSPORT
('p_t1', 'Auto-rickshaw Stand', 'transport', '🛺', 'from-yellow-500 to-orange-500', 30.5178, 76.6593, 'Easily available outside the main gate. Best for Rajpura city commutes.', '6 AM - 10 PM', 'Outside Main Gate', 'N/A', 'high', 4.2, 50, '~5min', 'Depends on route', 'Quick City Commute'),
('p_t2', 'Cab Services (Uber/Ola)', 'transport', '🚕', 'from-yellow-500 to-orange-500', 30.5179, 76.6594, 'Uber available (varies), Ola limited availability. Book via app.', '24/7', 'App Booking', 'N/A', 'moderate', 4.5, 120, '~15min', 'Standard Cab Rates', 'App Based'),
('p_t3', 'Punjab Roadways Bus Stop', 'transport', '🚌', 'from-yellow-500 to-orange-500', 30.5180, 76.6595, 'Buses for Rajpura, Chandigarh, Patiala, and Ambala.', '6 AM - 9 PM', 'Highway NH-7/NH-64', 'N/A', 'high', 4.1, 300, '~20min', 'Budget', 'Intercity Travel'),

-- MEDICAL (Nearby Hospitals)
('p_m1', 'Neelam Hospital', 'medical', '🏥', 'from-red-500 to-pink-500', 30.5205, 76.6625, 'The closest multispeciality hospital to the campus.', '24/7', 'Rajpura', 'N/A', 'moderate', 4.6, 145, null, 'Standard', 'Closest Hospital'),
('p_m2', 'Aanchal Hospital', 'medical', '🏥', 'from-red-500 to-pink-500', 30.5220, 76.6640, 'Reliable healthcare center and hospital.', '24/7', 'Rajpura', 'N/A', 'moderate', 4.4, 90, null, 'Standard', 'Healthcare'),
('p_m3', 'Guru Nanak Hospital', 'medical', '🏥', 'from-red-500 to-pink-500', 30.5230, 76.6650, 'Well-known local hospital providing excellent care.', '24/7', 'Rajpura', 'N/A', 'moderate', 4.5, 110, null, 'Standard', 'Trusted Care'),
('p_m4', 'Future Care Multispeciality', 'medical', '🏥', 'from-red-500 to-pink-500', 30.5240, 76.6660, 'Advanced multispeciality hospital for serious concerns.', '24/7', 'Rajpura', 'N/A', 'moderate', 4.7, 80, null, 'Premium', 'Multispeciality'),

-- PRINTING
('p_pr1', 'Planet99 Document Centre & Stationer', 'printing', '🖨', 'from-gray-500 to-slate-600', 30.5181, 76.6596, 'Printing, photocopy, lamination, and spiral binding.', '9 AM - 8 PM', 'Nearby', 'N/A', 'high', 4.6, 75, '~5min', 'Standard', 'Full Service'),
('p_pr2', 'RJ Printing Hub', 'printing', '🖨', 'from-gray-500 to-slate-600', 30.5182, 76.6597, 'Specializes in project reports and high-volume printing.', '9 AM - 8 PM', 'Nearby', 'N/A', 'moderate', 4.5, 60, '~5min', 'Standard', 'Project Reports'),
('p_pr3', 'Nature Printers', 'printing', '🖨', 'from-gray-500 to-slate-600', 30.5183, 76.6598, 'Eco-friendly and quality printing services.', '9 AM - 8 PM', 'Nearby', 'N/A', 'low', 4.7, 40, '~2min', 'Standard', 'Quality Print'),
('p_pr4', 'Jindal Stationery Store', 'printing', '📏', 'from-gray-500 to-slate-600', 30.5184, 76.6599, 'All types of stationery, plus basic print and photocopy.', '9 AM - 8 PM', 'Nearby', 'N/A', 'moderate', 4.4, 85, '~3min', 'Standard', 'Stationery & Print'),

-- GROCERY
('p_g1', 'More Supermarket - Rajpura', 'grocery', '🛒', 'from-green-500 to-emerald-500', 30.5200, 76.6630, 'Full-size supermarket for all your toiletries, snacks, and daily groceries.', '8 AM - 10 PM', 'Rajpura', 'N/A', 'high', 4.5, 200, '~5min', 'Standard', 'Everything you need'),
('p_g2', 'Reliance Superstore', 'grocery', '🛒', 'from-green-500 to-emerald-500', 30.5210, 76.6640, 'Large grocery and personal care item selection.', '8 AM - 10 PM', 'Rajpura', 'N/A', 'moderate', 4.4, 150, '~5min', 'Standard', 'Wide Selection'),
('p_g3', 'Jamna Grocery Store', 'grocery', '🛒', 'from-green-500 to-emerald-500', 30.5190, 76.6610, 'Convenient local store for water, fruits, and quick snacks.', '7 AM - 9 PM', 'Nearby', 'N/A', 'high', 4.6, 120, '~2min', 'Budget', 'Quick Essentials'),

-- EMERGENCY / PARKING
('p_em1', 'Campus Security & Main Gate', 'emergency', '☎', 'from-red-600 to-red-800', 30.517900, 76.659200, 'Main security checkpoint, visitor reception, and lost & found center.', '24/7', 'Main Gate', '01762-507084', 'low', 5.0, 10, null, 'Free', '24/7 Assistance'),
('p_vp1', 'Visitor Parking', 'services', '🚗', 'from-gray-600 to-slate-700', 30.517850, 76.659350, 'Designated visitor parking area near the main entrance/security gate.', '24/7', 'Near Main Gate', 'N/A', 'moderate', 4.5, 30, null, 'Free', 'Visitor Specific')

ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    icon = EXCLUDED.icon,
    gradient = EXCLUDED.gradient,
    lat = EXCLUDED.lat,
    lng = EXCLUDED.lng,
    hours = EXCLUDED.hours,
    location = EXCLUDED.location,
    phone = EXCLUDED.phone,
    crowd_level = EXCLUDED.crowd_level,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    wait_time = EXCLUDED.wait_time,
    price = EXCLUDED.price,
    signature = EXCLUDED.signature;
