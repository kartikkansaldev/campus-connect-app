import { createClient } from '@supabase/supabase-js';
import { campusData } from '../src/data/campusData.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env file");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedData() {
  console.log('Starting data migration to Supabase...');

  try {
    // 1. Place Categories
    console.log('Inserting place_categories...');
    
    // Extract unique categories from places to ensure all foreign keys are satisfied
    const extractedPlaceCategories = new Set(campusData.places.map(p => p.category));
    const finalPlaceCategories = [...campusData.placeCategories.map(c => ({ id: c.id, label: c.label, icon: c.icon }))];
    
    extractedPlaceCategories.forEach(catId => {
      if (!finalPlaceCategories.find(c => c.id === catId)) {
        finalPlaceCategories.push({ id: catId, label: catId.charAt(0).toUpperCase() + catId.slice(1), icon: '📍' });
      }
    });

    const { error: pcatErr } = await supabase.from('place_categories').upsert(finalPlaceCategories);
    if (pcatErr) throw pcatErr;

    // 2. Places
    console.log('Inserting places...');
    const placesToInsert = campusData.places.map(p => {
      // We will handle reviews separately
      const { reviews, ...placeData } = p;
      return {
        id: placeData.id,
        name: placeData.name,
        category: placeData.category,
        icon: placeData.icon,
        gradient: placeData.gradient,
        image: placeData.image,
        lat: placeData.lat,
        lng: placeData.lng,
        description: placeData.description,
        hours: placeData.hours,
        location: placeData.location,
        phone: placeData.phone,
        crowd_level: placeData.crowdLevel,
        rating: placeData.rating,
        review_count: placeData.reviewCount,
        wait_time: placeData.waitTime,
        price: placeData.price,
        signature: placeData.signature
      };
    });
    const { error: pErr } = await supabase.from('places').upsert(placesToInsert);
    if (pErr) throw pErr;

    // 3. Place Reviews
    console.log('Inserting place reviews...');
    let placeReviews = [];
    campusData.places.forEach(p => {
      if (p.reviews) {
        p.reviews.forEach(r => {
          placeReviews.push({
            place_id: p.id,
            user_name: r.user,
            initials: r.initials,
            rating: r.rating,
            text: r.text,
            date: r.date
          });
        });
      }
    });
    if (placeReviews.length > 0) {
      const { error: prErr } = await supabase.from('place_reviews').insert(placeReviews);
      if (prErr) throw prErr;
    }

    // 4. Club Categories
    console.log('Inserting club_categories...');
    const { error: ccatErr } = await supabase.from('club_categories').upsert(
      campusData.clubCategories.map(c => ({ id: c.id, label: c.label, icon: c.icon }))
    );
    if (ccatErr) throw ccatErr;

    // 5. Clubs
    console.log('Inserting clubs...');
    const clubsToInsert = campusData.clubs.map(c => {
      return {
        id: c.id,
        name: c.name,
        category: c.category,
        icon: c.icon,
        description: c.description,
        office: c.office,
        meeting_schedule: c.meetingSchedule,
        contact: c.contact,
        email: c.email,
        member_count: c.memberCount,
        is_recruiting: c.isRecruiting,
        rating: c.rating,
        review_count: c.reviewCount
      };
    });
    const { error: cErr } = await supabase.from('clubs').upsert(clubsToInsert);
    if (cErr) throw cErr;

    // 6. Club Events
    console.log('Inserting club events...');
    let clubEvents = [];
    campusData.clubs.forEach(c => {
      if (c.events) {
        c.events.forEach(e => {
          clubEvents.push({
            id: e.id,
            club_id: c.id,
            title: e.title,
            date: e.date,
            time: e.time,
            venue: e.venue,
            description: e.description
          });
        });
      }
    });
    if (clubEvents.length > 0) {
      const { error: ceErr } = await supabase.from('club_events').upsert(clubEvents);
      if (ceErr) throw ceErr;
    }

    // 7. Club Reviews
    console.log('Inserting club reviews...');
    let clubReviews = [];
    campusData.clubs.forEach(c => {
      if (c.reviews) {
        c.reviews.forEach(r => {
          clubReviews.push({
            club_id: c.id,
            user_name: r.user,
            initials: r.initials,
            rating: r.rating,
            text: r.text,
            date: r.date
          });
        });
      }
    });
    if (clubReviews.length > 0) {
      const { error: crErr } = await supabase.from('club_reviews').insert(clubReviews);
      if (crErr) throw crErr;
    }

    // 8. Staff Categories
    console.log('Inserting staff categories...');
    const { error: scatErr } = await supabase.from('staff_categories').upsert(
      campusData.staffCategories.map(c => ({ id: c.id, label: c.label, icon: c.icon }))
    );
    if (scatErr) throw scatErr;

    // 9. Staff
    console.log('Inserting staff...');
    const { error: sErr } = await supabase.from('staff').upsert(
      campusData.staff.map(s => ({
        id: s.id,
        name: s.name,
        initials: s.initials,
        role: s.role,
        department: s.department,
        category: s.category,
        office: s.office,
        phone: s.phone,
        email: s.email,
        availability: s.availability
      }))
    );
    if (sErr) throw sErr;

    // 10. Classrooms
    console.log('Inserting classrooms...');
    const { error: crrErr } = await supabase.from('classrooms').upsert(
      campusData.classrooms.map(c => ({
        id: c.id,
        name: c.name,
        building: c.building,
        place_id: c.placeId, // Can be null
        floor: c.floor,
        capacity: c.capacity,
        type: c.type
      }))
    );
    if (crrErr) throw crrErr;

    // 11. Announcements
    console.log('Inserting announcements...');
    const { error: aErr } = await supabase.from('announcements').upsert(
      campusData.announcements.map(a => ({
        id: a.id,
        title: a.title,
        body: a.body,
        date: a.date,
        priority: a.priority,
        author: a.author
      }))
    );
    if (aErr) throw aErr;

    // 12. Academic Calendar
    console.log('Inserting academic calendar...');
    const { error: acErr } = await supabase.from('academic_calendar').upsert(
      campusData.academicCalendar.map(ac => ({
        id: ac.id,
        title: ac.title,
        date: ac.date,
        type: ac.type,
        icon: ac.icon,
        description: ac.description
      }))
    );
    if (acErr) throw acErr;

    // 13. Exam Schedule
    console.log('Inserting exam schedule...');
    const { error: exErr } = await supabase.from('exam_schedule').upsert(
      campusData.examSchedule.map(ex => ({
        id: ex.id,
        subject: ex.subject,
        code: ex.code,
        date: ex.date,
        time: ex.time,
        venue: ex.venue,
        type: ex.type
      }))
    );
    if (exErr) throw exErr;

    // 14. Quick Links
    console.log('Inserting quick links...');
    const { error: qlErr } = await supabase.from('quick_links').upsert(
      campusData.quickLinks.map(ql => ({
        id: ql.id,
        label: ql.label,
        icon: ql.icon,
        url: ql.url,
        description: ql.description
      }))
    );
    if (qlErr) throw qlErr;

    console.log('✅ All data migrated successfully!');
  } catch (err) {
    console.error('❌ Migration failed:', err.message || err);
  }
}

seedData();
