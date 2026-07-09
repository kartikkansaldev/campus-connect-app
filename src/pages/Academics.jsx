import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

function FacultyDirectory({ onBack }) {
  const { data } = useApp();
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('All');

  const departments = [
    'All', 'Computer Science', 'Engineering', 'Science', 
    'Management', 'Law', 'Architecture', 'Design'
  ];

  const filteredStaff = data.staff.filter(person => {
    const matchesDept = department === 'All' || person.department.includes(department);
    const matchesSearch = person.name.toLowerCase().includes(search.toLowerCase()) || 
                          person.department.toLowerCase().includes(search.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div className="animate-in">
      <button onClick={onBack} className="flex items-center gap-2 text-sm font-bold text-[var(--color-text-secondary)] hover:text-[var(--color-text)] mb-6 cursor-pointer">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        Back to Academics
      </button>

      <h1 className="text-3xl font-extrabold font-heading mb-6">Faculty Directory</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 neo-card-static flex items-center px-4 py-3 gap-3 bg-white">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-secondary)" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          <input type="text" placeholder="Search by name, department, or subject..." value={search} onChange={e => setSearch(e.target.value)} className="flex-1 bg-transparent outline-none text-sm font-medium placeholder:text-[var(--color-text-muted)]" />
        </div>
        <select value={department} onChange={e => setDepartment(e.target.value)} className="neo-card-static px-4 py-3 text-sm font-bold bg-white cursor-pointer outline-none md:w-64">
          {departments.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredStaff.map(person => (
          <div key={person.id} className="neo-card-static p-5 bg-white flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="w-14 h-14 rounded-full bg-[var(--color-card)] flex items-center justify-center text-xl font-bold border-2 border-[var(--color-border)] text-[var(--color-text-secondary)]">
                  {person.initials}
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest ${person.availability === 'available' ? 'bg-[var(--color-green-bg)] text-[var(--color-green)]' : person.availability === 'meeting' ? 'bg-[var(--color-orange-bg)] text-[var(--color-orange)]' : 'bg-gray-100 text-gray-500'}`}>
                  {person.availability === 'available' ? 'Available' : person.availability === 'meeting' ? 'In Meeting' : 'On Leave'}
                </span>
              </div>
              <h3 className="font-extrabold text-lg mb-1">{person.name}</h3>
              <p className="text-sm font-bold text-[var(--color-accent)] mb-1">{person.role}</p>
              <p className="text-[11px] text-[var(--color-text-secondary)] font-mono uppercase tracking-wider mb-4">{person.department}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
                  <span className="w-4 flex justify-center">🚪</span>
                  <strong>Cabin:</strong> {person.office}
                </div>
                <div className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
                  <span className="w-4 flex justify-center">⏰</span>
                  <strong>Office Hours:</strong> Mon-Wed 2-4 PM
                </div>
                <div className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
                  <span className="w-4 flex justify-center">📚</span>
                  <strong>Subjects:</strong> Algorithms, Data Structures
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button className="flex-1 py-2 border-2 border-[var(--color-border)] rounded-lg text-xs font-bold hover:bg-[var(--color-card)] transition-colors cursor-pointer text-center">
                Email
              </button>
              <button className="flex-1 py-2 bg-[var(--color-border)] text-white border-2 border-[var(--color-border)] rounded-lg text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer text-center">
                Directions
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Academics() {
  const navigate = useNavigate();
  const [view, setView] = useState('dashboard'); // 'dashboard' or 'faculty'

  if (view === 'faculty') {
    return <FacultyDirectory onBack={() => setView('dashboard')} />;
  }

  return (
    <div className="animate-in">
      <h1 className="text-3xl font-extrabold font-heading mb-2">Academics Hub</h1>
      <p className="text-[var(--color-text-secondary)] font-medium mb-8">Your central dashboard for schedules, faculty, and academic resources.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        
        {/* Timetable */}
        <div className="neo-card-static p-6 bg-white flex flex-col justify-between group cursor-pointer hover:border-[var(--color-text)] transition-colors">
          <div>
            <div className="w-12 h-12 rounded-xl bg-[var(--color-card)] flex items-center justify-center text-2xl border-2 border-[var(--color-border-light)] mb-4">📅</div>
            <h3 className="font-extrabold text-lg mb-2">My Timetable</h3>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-4">View your daily class schedule, lab timings, and upcoming assignments.</p>
            <div className="bg-[var(--color-bg)] p-3 rounded-lg border border-[var(--color-border-light)] text-xs">
              <span className="font-bold text-[var(--color-accent)]">Next Class:</span> Data Structures<br/>
              <span className="text-[var(--color-text-muted)]">Room 304 • 11:00 AM</span>
            </div>
          </div>
        </div>

        {/* Faculty Directory */}
        <div onClick={() => setView('faculty')} className="neo-card-static p-6 bg-white flex flex-col justify-between group cursor-pointer hover:border-[var(--color-text)] transition-colors">
          <div>
            <div className="w-12 h-12 rounded-xl bg-[var(--color-card)] flex items-center justify-center text-2xl border-2 border-[var(--color-border-light)] mb-4">👨‍🏫</div>
            <h3 className="font-extrabold text-lg mb-2">Faculty Directory</h3>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-4">Find professors, check office hours, and locate their cabins.</p>
            <button className="w-full py-2 border-2 border-[var(--color-border)] rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-[var(--color-card)] transition-colors pointer-events-none">
              Search Faculty
            </button>
          </div>
        </div>

        {/* Classroom Locations */}
        <div onClick={() => navigate('/explore?cat=academic')} className="neo-card-static p-6 bg-[var(--color-text)] text-white flex flex-col justify-between group cursor-pointer">
          <div>
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-2xl border-2 border-white/20 mb-4">🗺️</div>
            <h3 className="font-extrabold text-lg mb-2">Classroom Locations</h3>
            <p className="text-xs text-white/70 leading-relaxed mb-4">Get walking directions to any academic block, lab, or lecture hall on campus.</p>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/90">
              Open Map <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
          </div>
        </div>

        {/* Academic Calendar & Exams */}
        <div className="neo-card-static p-6 bg-white md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-extrabold text-lg flex items-center gap-2"><span className="text-xl">📆</span> Academic Calendar & Exams</h3>
            <button className="text-xs font-bold text-[var(--color-accent)] uppercase tracking-wider hover:underline cursor-pointer">Full Schedule</button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="border border-[var(--color-border-light)] p-3 rounded-lg">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-orange)] bg-[var(--color-orange-bg)] px-2 py-0.5 rounded-full mb-2 inline-block">Upcoming</span>
              <p className="font-bold text-sm mb-1">Mid-Semester Exams</p>
              <p className="text-xs text-[var(--color-text-secondary)]">Oct 15 - Oct 22, 2026</p>
            </div>
            <div className="border border-[var(--color-border-light)] p-3 rounded-lg">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)] bg-[var(--color-bg)] border border-[var(--color-border-light)] px-2 py-0.5 rounded-full mb-2 inline-block">Deadline</span>
              <p className="font-bold text-sm mb-1">Course Drop/Add Period</p>
              <p className="text-xs text-[var(--color-text-secondary)]">Closes Sept 5, 2026</p>
            </div>
          </div>
        </div>

        {/* Announcements & Links */}
        <div className="space-y-5">
          {/* Announcements */}
          <div className="neo-card-static p-5 bg-[var(--color-card)] border-2 border-dashed border-[var(--color-border-light)]">
            <h3 className="font-bold text-sm uppercase tracking-wider mb-3 flex items-center gap-2 font-mono text-[var(--color-text-secondary)]"><span className="text-lg">📢</span> Notice Board</h3>
            <ul className="space-y-3">
              <li className="text-xs font-medium leading-relaxed border-b border-[var(--color-border-light)] pb-2 last:border-0 last:pb-0">
                Library timing extended till 2 AM for finals week.
              </li>
              <li className="text-xs font-medium leading-relaxed">
                Guest lecture by Dr. Singh moved to Amphitheatre.
              </li>
            </ul>
          </div>

          {/* Official Portal */}
          <a href="#" className="neo-card-static p-4 bg-white flex items-center justify-between group hover:border-[var(--color-accent)] transition-colors cursor-pointer block">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-[var(--color-border)] flex items-center justify-center text-white font-bold text-xs">ERP</div>
              <span className="font-bold text-sm group-hover:text-[var(--color-accent)] transition-colors">Official College Portal</span>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="2" className="group-hover:stroke-[var(--color-accent)]"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          </a>
        </div>
        
      </div>
    </div>
  );
}
