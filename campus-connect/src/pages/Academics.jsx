import { useState } from 'react';

const academicData = [
  {
    id: 'overview',
    icon: '🏛️',
    title: 'University Overview & Campus',
    desc: 'Established in 2010. 50-acre campus on NH-64, Punjab.',
    details: [
      { subtitle: 'About', content: 'Established in 2010 under "The Chitkara University Act". Over 13,000 students and 900+ faculty members. Located on Chandigarh-Patiala NH-64 (~30 km from Chandigarh) spanning 50 acres.' },
      { subtitle: 'Accreditation', content: 'UGC recognized, NAAC A+ accredited. Approved by COA, PCI. Member of AIU.' },
      { subtitle: 'Rankings', content: 'QS World 2026: 1201-1400. QS Asia: 399. Top 5 Innovative Institutes by CII.' },
      { subtitle: 'Campus Facilities', content: 'Smart classrooms, high-speed Wi-Fi, separate hostels, sports playgrounds, innovation centres, and simulation labs.' }
    ]
  },
  {
    id: 'programs',
    icon: '🎓',
    title: 'Academic Programs & Degrees',
    desc: '35 core programs across 12 broad streams including UG, PG & PhD.',
    details: [
      { subtitle: 'Engineering Streams', content: 'CSE, AI & Machine Learning, Data Science, Cyber Security, Cloud Computing, Electronics & Communication, Mechanical, Civil, Electrical, Mechatronics, Automobile.' },
      { subtitle: 'Other Disciplines', content: 'Business (BBA/MBA), Pharmacy, Health Sciences, Nursing, Law, Architecture, Interior Design, Fine Arts, Psychology, Hospitality, Mass Communication, Liberal Arts.' },
      { subtitle: 'Degree Formats', content: 'B.E./B.Tech, BCA, MCA, B.Arch, BBA, B.Com, B.A, M.A, B.Sc, B.Pharm, D.Pharm, PhD. Includes Lateral Entry, Online and Distance options.' }
    ]
  },
  {
    id: 'pathways',
    icon: '🌍',
    title: 'Global Pathways',
    desc: 'Transfer credits to international partner universities.',
    details: [
      { subtitle: 'How it works', content: 'Start your degree at Chitkara in Punjab and transfer 100% of eligible credits to a partner institution to earn a foreign degree.' },
      { subtitle: 'Partner Universities', content: '• Arizona State University (USA) - Business\n• Deakin University (Australia) - Engineering / AI\n• York University (Canada) - Engineering\n• George Brown Polytechnic (Canada) - Culinary Management\n• Trent University (Canada) - BBA' }
    ]
  },
  {
    id: 'curriculum',
    icon: '📚',
    title: 'Curriculum & Regulations',
    desc: 'CBCS / NEP 2020 aligned. Real-world projects & certifications.',
    details: [
      { subtitle: 'Curriculum Approach', content: 'Industry-integrated curriculum (e.g. Microsoft/Cisco certs for CSE students). Choice Based Credit System (CBCS) / NEP 2020 framework. Includes Minors, Value Added Courses (VAC), and Skill Enhancement Courses.' },
      { subtitle: 'Academic Calendar', content: 'Defined registration windows, mid-semester, and end-semester examinations. Mandatory pre-final/final year internships and industry-mentored capstone projects.' },
      { subtitle: 'Evaluation & Rules', content: 'Semester-based credit system. SGPA/CGPA calculation. Minimum 75% attendance requirement to be eligible to sit for exams. Strict academic integrity policies.' }
    ]
  },
  {
    id: 'career',
    icon: '💼',
    title: 'Placements & Career Support',
    desc: 'Top recruiters include Amazon, Microsoft, Wipro, and HCL.',
    details: [
      { subtitle: 'Top Recruiters', content: 'Amazon, Wipro, Microsoft, Infosys, HCL. Statistics published annually by the Placement Cell.' },
      { subtitle: 'Career Support Ecosystem', content: 'Placement training, interview preparation, soft-skills workshops, corporate mentorship offering one-on-one professional guidance, and regular industry guest lectures.' },
      { subtitle: 'Entrepreneurship', content: 'Entrepreneurship Cell (EDC) offers seed funding access, mentorship, legal guidance, and incubation access for student startups.' }
    ]
  },
  {
    id: 'research',
    icon: '🔬',
    title: 'Research & Innovation',
    desc: 'Over ₹107 crore funding backing university research activity.',
    details: [
      { subtitle: 'Research Activity', content: 'Dedicated research centres across disciplines. Over ₹107 crore in reported research funding. Sponsored and funded research projects.' },
      { subtitle: 'Outputs', content: 'Faculty and student publications in national/international journals and conferences. Patents filed and granted to faculty and students. IPR Cell for intellectual property guidance.' }
    ]
  },
  {
    id: 'admissions',
    icon: '📝',
    title: 'Admissions 2026-27',
    desc: 'B.E./B.Tech eligibility: 10+2 with 60% aggregate. Apply online.',
    details: [
      { subtitle: 'Eligibility (B.E./B.Tech)', content: '10+2 pass with minimum 60% aggregate, or at least 60% in Physics, Chemistry & Mathematics. Relevant entrance exam (e.g. JEE Main) score/percentile also considered.' },
      { subtitle: 'Application Process', content: 'Apply online at chitkara.edu.in. Application fee approximately ₹1,000–₹2,500 depending on the program. Seat counselling rounds for B.E./B.Tech reported for late May.' },
      { subtitle: 'Other Information', content: '15% seats reserved for candidates with Punjab Domicile. Merit-based, sports-based, and financial-need-based scholarships available for UG and PG programs.' }
    ]
  },
  {
    id: 'resources',
    icon: '📖',
    title: 'Student Resources',
    desc: 'Libraries, ERP, LMS, and Student Achievements.',
    details: [
      { subtitle: 'Digital Tools', content: 'ERP portal for academic administration. Learning Management System (LMS). Academic Bank of Credits (ABC) integration. National Academic Depository (NAD) Cell.' },
      { subtitle: 'Student Life & Achievements', content: 'Participation and wins in hackathons and technical competitions. Strong representation in campus placements. Awards across academic, cultural, and sporting domains.' }
    ]
  }
];

export default function Academics() {
  const [activeCategory, setActiveCategory] = useState(null);

  const selectedCategory = academicData.find(c => c.id === activeCategory);

  return (
    <div className="animate-in pb-12">
      {/* Hero Header */}
      {!activeCategory && (
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold font-heading text-[var(--color-text)] mb-3 tracking-tight flex items-center gap-3">
            <span className="text-3xl">📚</span> Chitkara Academics
          </h1>
          <p className="text-lg md:text-xl text-[var(--color-text-secondary)] font-medium mb-8 leading-relaxed max-w-2xl">
            Explore comprehensive information about our programs, global pathways, research initiatives, and campus life based on the 2026-27 reference report.
          </p>
        </div>
      )}

      {/* Directory Content */}
      <div id="directory-section" className="mb-6">
        <div className="relative">
          {activeCategory ? (
            <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="flex flex-col relative">
                {/* Header matching PlaceDetail/VisitorCategoryModal */}
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl bg-white w-14 h-14 rounded-xl flex items-center justify-center shadow-sm border-2 border-[var(--color-border-light)]">
                      {selectedCategory.icon}
                    </div>
                    <div>
                      <h2 className="text-3xl font-extrabold font-heading text-[var(--color-text)]">{selectedCategory.title}</h2>
                      <div className="mt-1 text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
                        Information Category
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setActiveCategory(null)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-[var(--color-border)] hover:bg-[var(--color-card-inner)] transition-colors relative z-10 font-bold text-sm bg-white cursor-pointer"
                  >
                    ← Back to Directory
                  </button>
                </div>

                {/* Content Body */}
                <div className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {selectedCategory.details.map((detail, idx) => (
                      <div key={idx} className={`neo-card p-5 stagger-${Math.min(idx + 1, 6)} animate-in flex flex-col h-full bg-[#FAF9F6]`}>
                        <h3 className="font-extrabold text-lg mb-3 pb-2 border-b border-[var(--color-border-light)] text-[var(--color-text)]">{detail.subtitle}</h3>
                        <p className="text-sm text-[var(--color-text-secondary)] font-medium leading-relaxed whitespace-pre-wrap flex-1">
                          {detail.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {academicData.map((item, i) => (
                <div 
                  key={item.id} 
                  onClick={() => setActiveCategory(item.id)}
                  className="neo-card p-5 flex flex-col group cursor-pointer h-full"
                >
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-card-inner)] border-2 border-[var(--color-border-light)] flex items-center justify-center text-2xl mb-4 group-hover:border-[var(--color-border)] group-hover:-translate-y-1 transition-all shadow-sm">
                    {item.icon}
                  </div>
                  <h3 className="font-extrabold text-lg mb-1 group-hover:text-amber-700 transition-colors">{item.title}</h3>
                  <p className="text-xs text-[var(--color-text-secondary)] font-medium leading-relaxed flex-1">{item.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

