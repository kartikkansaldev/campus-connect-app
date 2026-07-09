import React from 'react';

export default function EmergencyInterface({ onClose }) {
  const emergencies = [
    { icon: '🛡️', title: 'Campus Security', number: '01762-507084', description: '24/7 Main Gate & Patrol' },
    { icon: '🚑', title: 'Ambulance', number: '108', description: 'Immediate Medical Transport' },
    { icon: '🏥', title: 'Health Centre', number: '+91-9877886687', description: 'Campus Dispensary & First Aid' },
    { icon: '👩‍⚕️', title: 'Women’s Helpline', number: '1091', description: 'Dedicated Safety Line' },
    { icon: '🚓', title: 'Police', number: '112', description: 'Local Police Station' },
    { icon: '🔥', title: 'Fire', number: '101', description: 'Fire Brigade' },
    { icon: '🚫', title: 'Anti-Ragging', number: '1800-180-5522', description: 'UGC National Helpline' },
    { icon: '🏢', title: 'Reception', number: '01762-507084', description: 'General Enquiries' },
  ];

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div 
        className="w-full bg-white flex flex-col relative rounded-xl overflow-hidden shadow-[6px_6px_0_0_#7f1d1d]"
        style={{ border: '3px solid #7f1d1d' }}
      >
        {/* Header */}
        <div className="bg-red-700 text-white p-6 md:p-8 flex items-center justify-between relative overflow-hidden">
          {/* Danger stripes background */}
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none" 
            style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 10px, transparent 10px, transparent 20px)' }}
          />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
            <div className="w-16 h-16 rounded-full bg-red-600 border-4 border-white flex items-center justify-center text-4xl shadow-lg">
              🚨
            </div>
            <div>
              <h2 className="text-3xl md:text-5xl font-extrabold font-heading tracking-tight uppercase">Emergency Contacts</h2>
              <p className="text-red-100 font-medium mt-1 text-sm md:text-base">Tap any card to call immediately</p>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="relative z-10 flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-red-400 bg-red-800 text-white font-bold hover:bg-red-600 transition-colors"
          >
            ← Back to Directory
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 bg-[#fff5f5]">
          {emergencies.map((em, idx) => (
            <a 
              key={idx}
              href={`tel:${em.number.replace(/[^0-9+]/g, '')}`}
              className="group bg-white border-[3px] border-red-200 p-5 rounded-xl text-center cursor-pointer hover:border-red-600 hover:bg-red-50 hover:-translate-y-1 transition-all flex flex-col items-center gap-3"
              style={{ boxShadow: '4px 4px 0px 0px #fecaca', animationDelay: `${idx * 50}ms` }}
            >
              <div className="text-4xl group-hover:scale-110 transition-transform">{em.icon}</div>
              <div>
                <h3 className="font-extrabold text-red-950 uppercase tracking-tight">{em.title}</h3>
                <p className="text-[10px] uppercase font-bold text-red-400 mt-1 mb-2">{em.description}</p>
                <div className="inline-block bg-red-100 text-red-700 font-mono font-bold px-3 py-1 rounded-full text-sm border border-red-200 group-hover:bg-red-600 group-hover:text-white transition-colors">
                  {em.number}
                </div>
              </div>
            </a>
          ))}
        </div>
        
        {/* Footer */}
        <div className="bg-red-50 p-4 border-t-2 border-red-100 text-center text-xs font-bold text-red-600 uppercase tracking-widest">
          If you are unable to make a call, please reach out to the nearest security guard immediately.
        </div>
      </div>
    </div>
  );
}
