import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { supabase } from '../supabaseClient';

export default function Login() {
  const navigate = useNavigate();
  const { loginUser } = useApp();
  const [name, setName] = useState('');
  const [role, setRole] = useState('student');
  const [isChecking, setIsChecking] = useState(false);

  const handleContinue = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    setIsChecking(true);
    
    try {
      // Check if user already exists
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('name', name.trim())
        .eq('role', role)
        .maybeSingle();
        
      if (data) {
        // User exists! Log them in directly
        localStorage.setItem('cc_session_id', data.id);
        loginUser(data);
        navigate(role === 'club_admin' ? '/admin-dashboard' : '/');
      } else {
        // User doesn't exist, proceed to onboarding
        navigate('/onboarding', { state: { name: name.trim(), role } });
      }
    } catch (err) {
      console.error(err);
      alert("Error checking profile. Try again.");
    } finally {
      setIsChecking(false);
    }
  };

  const handleVisitor = () => {
    // Visitor bypasses onboarding and gets read-only access
    loginUser(null);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white neo-card p-8 animate-in slide-in-from-bottom-4">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[var(--color-accent)] rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-[4px_4px_0_0_var(--color-border)] border-2 border-[var(--color-border)]">
            <span className="text-3xl text-white font-black">CC</span>
          </div>
          <h1 className="text-3xl font-black font-heading mb-2 text-[var(--color-text)]">Campus Connect</h1>
          <p className="text-[var(--color-text-secondary)] font-medium">Join your campus community today.</p>
        </div>

        <form onSubmit={handleContinue} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-[var(--color-text)] mb-2 uppercase tracking-wider">
              Full Name
            </label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name..."
              className="w-full px-4 py-3 rounded-xl border-2 border-[var(--color-border)] bg-[var(--color-bg)] text-base font-medium focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] shadow-[4px_4px_0_0_var(--color-border)] transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[var(--color-text)] mb-2 uppercase tracking-wider">
              I am a...
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button 
                type="button"
                onClick={() => setRole('student')}
                className={`py-3 rounded-xl border-2 border-[var(--color-border)] font-bold transition-all ${
                  role === 'student' ? 'bg-[var(--color-accent)] text-white shadow-[2px_2px_0_0_var(--color-border)] translate-y-[2px] translate-x-[2px]' : 'bg-[var(--color-bg)] text-[var(--color-text)] shadow-[4px_4px_0_0_var(--color-border)] hover:bg-[var(--color-card)]'
                }`}
              >
                Student
              </button>
              <button 
                type="button"
                onClick={() => setRole('club_admin')}
                className={`py-3 rounded-xl border-2 border-[var(--color-border)] font-bold transition-all ${
                  role === 'club_admin' ? 'bg-[var(--color-accent)] text-white shadow-[2px_2px_0_0_var(--color-border)] translate-y-[2px] translate-x-[2px]' : 'bg-[var(--color-bg)] text-[var(--color-text)] shadow-[4px_4px_0_0_var(--color-border)] hover:bg-[var(--color-card)]'
                }`}
              >
                Club Admin
              </button>
            </div>
          </div>

          <button 
            type="submit"
            disabled={isChecking}
            className={`w-full py-4 bg-[var(--color-text)] text-white rounded-xl font-black text-lg uppercase tracking-wider border-2 border-[var(--color-border)] shadow-[4px_4px_0_0_var(--color-border)] transition-all ${isChecking ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[var(--color-accent)] active:translate-y-[4px] active:translate-x-[4px] active:shadow-none'}`}
          >
            {isChecking ? 'Checking...' : 'Continue'}
          </button>
        </form>

        <div className="mt-8 text-center border-t-2 border-[var(--color-border-light)] pt-6">
          <p className="text-[var(--color-text-secondary)] font-medium mb-4">Just looking around?</p>
          <button 
            onClick={handleVisitor}
            className="text-sm font-bold text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] underline underline-offset-4 decoration-2"
          >
            Continue as Visitor (Read Only)
          </button>
        </div>
      </div>
    </div>
  );
}
