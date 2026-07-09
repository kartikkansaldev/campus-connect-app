import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { supabase } from '../supabaseClient';

export default function Onboarding() {
  const location = useLocation();
  const navigate = useNavigate();
  const { data, loginUser } = useApp();
  
  // If someone navigates here directly without logging in first, boot them back to login
  const initialState = location.state;
  
  const [batch, setBatch] = useState('');
  const [department, setDepartment] = useState('');
  const [interests, setInterests] = useState('');
  const [managedClubId, setManagedClubId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!initialState) {
    return <Navigate to="/login" replace />;
  }

  const { name, role } = initialState;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!batch || !department) return;
    if (role === 'club_admin' && !managedClubId) return;

    setIsSubmitting(true);
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .insert([{
          name,
          role,
          batch,
          department,
          interests: role === 'student' ? interests : null,
          managed_club_id: role === 'club_admin' ? managedClubId : null
        }])
        .select()
        .single();

      if (error) throw error;

      // Successfully saved to database!
      // Save session locally and update context
      localStorage.setItem('cc_session_id', profile.id);
      loginUser(profile);

      // Redirect based on role
      if (role === 'club_admin') {
        navigate('/admin-dashboard', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    } catch (error) {
      console.error('Error creating profile:', error);
      alert('Failed to create profile. Please check console for details.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white neo-card p-8 animate-in slide-in-from-bottom-4">
        <div className="mb-8">
          <h1 className="text-3xl font-black font-heading mb-2 text-[var(--color-text)]">Complete Profile</h1>
          <p className="text-[var(--color-text-secondary)] font-medium">
            Welcome {name}! Let's get you set up as a {role === 'club_admin' ? 'Club Admin' : 'Student'}.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-[var(--color-text)] mb-2 uppercase tracking-wider">
                Batch Year
              </label>
              <select 
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-[var(--color-border)] bg-[var(--color-bg)] font-medium focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                required
              >
                <option value="" disabled>Select Batch</option>
                <option value="2021-2025">2021-2025</option>
                <option value="2022-2026">2022-2026</option>
                <option value="2023-2027">2023-2027</option>
                <option value="2024-2028">2024-2028</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-[var(--color-text)] mb-2 uppercase tracking-wider">
                Department
              </label>
              <select 
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-[var(--color-border)] bg-[var(--color-bg)] font-medium focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                required
              >
                <option value="" disabled>Select Dept</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Electronics">Electronics</option>
                <option value="Mechanical">Mechanical</option>
                <option value="Business">Business</option>
                <option value="Design">Design</option>
              </select>
            </div>
          </div>

          {role === 'student' ? (
            <div>
              <label className="block text-sm font-bold text-[var(--color-text)] mb-2 uppercase tracking-wider">
                Interests (Optional)
              </label>
              <input 
                type="text" 
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                placeholder="e.g. AI, Robotics, Hackathons"
                className="w-full px-4 py-3 rounded-xl border-2 border-[var(--color-border)] bg-[var(--color-bg)] text-base font-medium focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-all"
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-bold text-[var(--color-text)] mb-2 uppercase tracking-wider text-[var(--color-accent)]">
                Which Club do you manage?
              </label>
              <select 
                value={managedClubId}
                onChange={(e) => setManagedClubId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-[var(--color-border)] bg-[var(--color-accent)] text-white font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-accent)]"
                required
              >
                <option value="" disabled>Select Your Club</option>
                {data.clubs?.map(club => (
                  <option key={club.id} value={club.id} className="bg-white text-black font-medium">
                    {club.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button 
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 bg-[var(--color-text)] text-white rounded-xl font-black text-lg uppercase tracking-wider border-2 border-[var(--color-border)] shadow-[4px_4px_0_0_var(--color-border)] transition-all ${isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-[var(--color-accent)] active:translate-y-[4px] active:translate-x-[4px] active:shadow-none'}`}
          >
            {isSubmitting ? 'Saving Profile...' : 'Complete Profile & Enter'}
          </button>
        </form>
      </div>
    </div>
  );
}
