import { useNavigate } from 'react-router-dom';

export default function CampusSelect() {
  const navigate = useNavigate();

  const handleSelect = (campusId) => {
    localStorage.setItem('cc_campus', campusId);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white neo-card p-8 md:p-10 animate-in slide-in-from-bottom-4 text-center">
        <div className="w-20 h-20 bg-[var(--color-accent)] rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-[4px_4px_0_0_var(--color-border)] border-[3px] border-[var(--color-border)] transform -rotate-3">
          <span className="text-4xl text-white font-black">CC</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black font-heading mb-3 text-[var(--color-text)] leading-tight">
          Select Your Campus
        </h1>
        <p className="text-[var(--color-text-secondary)] font-medium mb-10 text-lg">
          Welcome to Campus Connect. Choose your university to get started.
        </p>

        <div className="space-y-4">
          <button 
            onClick={() => handleSelect('chitkara')}
            className="w-full p-5 rounded-2xl border-[3px] border-[var(--color-border)] bg-white hover:bg-[var(--color-bg)] hover:-translate-y-1 hover:shadow-[4px_4px_0_0_var(--color-border)] transition-all flex items-center gap-4 text-left group"
          >
            <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-xl shadow-sm border-2 border-red-200 group-hover:scale-110 transition-transform">
              🏫
            </div>
            <div className="flex-1">
              <div className="font-black text-xl text-[var(--color-text)]">Chitkara University</div>
              <div className="text-sm font-bold text-[var(--color-text-muted)]">Punjab Campus</div>
            </div>
            <div className="text-[var(--color-accent)] font-black text-xl opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0">
              →
            </div>
          </button>
          
          <button 
            disabled
            className="w-full p-5 rounded-2xl border-[3px] border-[var(--color-border-light)] bg-gray-50 flex items-center gap-4 text-left opacity-60 cursor-not-allowed"
          >
            <div className="w-12 h-12 rounded-xl bg-gray-200 flex items-center justify-center text-xl grayscale">
              🏢
            </div>
            <div className="flex-1">
              <div className="font-bold text-xl text-[var(--color-text-muted)]">More campuses</div>
              <div className="text-sm font-semibold text-[var(--color-text-muted)]">Coming soon...</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
