import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { supabase } from '../supabaseClient';

export default function AdminDashboard() {
  const { currentUser, data, showToast } = useApp();
  const [activeTab, setActiveTab] = useState('members'); // 'members', 'waitlist', 'details'
  const [memberships, setMemberships] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Edit Club State
  const myClub = data.clubs?.find(c => c.id === currentUser?.managed_club_id);
  const [editDesc, setEditDesc] = useState('');
  const [editContact, setEditContact] = useState('');
  const [editOffice, setEditOffice] = useState('');
  const [isRecruiting, setIsRecruiting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (myClub) {
      setEditDesc(myClub.description || '');
      setEditContact(myClub.contact || '');
      setEditOffice(myClub.office || '');
      setIsRecruiting(myClub.isRecruiting || false);
    }
  }, [myClub]);

  useEffect(() => {
    if (myClub) fetchMembers();
  }, [myClub]);

  const fetchMembers = async () => {
    setIsLoading(true);
    // Fetch memberships and join with profiles
    const { data: mems, error } = await supabase
      .from('club_memberships')
      .select('*, profiles(*)')
      .eq('club_id', myClub.id)
      .order('joined_at', { ascending: false });
      
    if (error) {
      console.error(error);
    } else {
      setMemberships(mems || []);
    }
    setIsLoading(false);
  };

  const updateStatus = async (membershipId, newStatus) => {
    const { error } = await supabase
      .from('club_memberships')
      .update({ status: newStatus })
      .eq('id', membershipId);
      
    if (error) {
      showToast('Error updating status');
      return;
    }
    
    // Update locally
    setMemberships(prev => prev.map(m => m.id === membershipId ? { ...m, status: newStatus } : m));
    showToast(`User ${newStatus}!`);
  };

  const saveClubDetails = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const { error } = await supabase
      .from('clubs')
      .update({
        description: editDesc,
        contact: editContact,
        office: editOffice,
        is_recruiting: isRecruiting
      })
      .eq('id', myClub.id);
      
    if (error) {
      showToast("Error updating club");
    } else {
      showToast("Club details saved! Refresh to see changes.");
    }
    setIsSaving(false);
  };

  if (!myClub) return <div className="text-center py-20 text-xl font-bold">Club not found.</div>;

  const pending = memberships.filter(m => m.status === 'pending');
  const accepted = memberships.filter(m => m.status === 'accepted');
  const blocked = memberships.filter(m => m.status === 'blocked');

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in slide-in-from-bottom-4">
      {/* Header */}
      <div className="neo-card p-8 bg-[var(--color-bg)] border-[3px] border-[var(--color-border)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent)] opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="relative z-10 flex flex-col md:flex-row gap-6 items-center md:items-start justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest bg-[var(--color-accent)] text-white px-3 py-1 rounded-full mb-3 inline-block shadow-[2px_2px_0_0_var(--color-border)]">
              Admin Dashboard
            </span>
            <h1 className="text-4xl md:text-5xl font-black font-heading text-[var(--color-text)] mb-2">{myClub.name}</h1>
            <p className="text-[var(--color-text-secondary)] font-medium text-lg">Manage your club roster, settings, and requests.</p>
          </div>
          <div className="flex gap-4 text-center">
            <div className="neo-card-static px-6 py-4 bg-white">
              <div className="text-3xl font-black text-[var(--color-text)]">{accepted.length}</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)]">Active Members</div>
            </div>
            <div className="neo-card-static px-6 py-4 bg-white">
              <div className="text-3xl font-black text-[var(--color-orange)]">{pending.length}</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)]">Waitlisted</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-2 bg-white rounded-2xl border-2 border-[var(--color-border)] neo-card-static w-fit mx-auto md:mx-0">
        <button onClick={() => setActiveTab('members')} className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'members' ? 'bg-[var(--color-text)] text-white shadow-[2px_2px_0_0_var(--color-border)]' : 'hover:bg-[var(--color-bg)]'}`}>
          Roster ({accepted.length})
        </button>
        <button onClick={() => setActiveTab('waitlist')} className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'waitlist' ? 'bg-[var(--color-text)] text-white shadow-[2px_2px_0_0_var(--color-border)]' : 'hover:bg-[var(--color-bg)]'}`}>
          Waitlist {pending.length > 0 && <span className="ml-2 bg-[var(--color-orange)] text-white px-2 py-0.5 rounded-full text-xs">{pending.length}</span>}
        </button>
        <button onClick={() => setActiveTab('details')} className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'details' ? 'bg-[var(--color-text)] text-white shadow-[2px_2px_0_0_var(--color-border)]' : 'hover:bg-[var(--color-bg)]'}`}>
          Club Settings
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white neo-card p-6 md:p-8 min-h-[400px]">
        {isLoading ? (
          <div className="flex justify-center items-center h-40 font-bold text-[var(--color-text-muted)]">Loading data...</div>
        ) : (
          <>
            {activeTab === 'waitlist' && (
              <div className="space-y-4">
                <h2 className="text-xl font-black mb-6 flex items-center gap-2">
                  <span className="text-[var(--color-orange)]">⏳</span> Pending Requests
                </h2>
                {pending.length === 0 ? (
                  <p className="text-[var(--color-text-muted)] font-medium italic">No pending requests.</p>
                ) : pending.map(mem => (
                  <div key={mem.id} className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 bg-[var(--color-bg)] rounded-xl border-2 border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors">
                    <div>
                      <div className="font-bold text-lg">{mem.profiles?.name}</div>
                      <div className="text-sm font-medium text-[var(--color-text-secondary)]">{mem.profiles?.batch} • {mem.profiles?.department}</div>
                      {mem.profiles?.interests && <div className="text-xs mt-1 text-[var(--color-text-muted)]">Interests: {mem.profiles.interests}</div>}
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => updateStatus(mem.id, 'declined')} className="px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider text-red-500 hover:bg-red-50 border-2 border-transparent hover:border-red-500 transition-colors">
                        Decline
                      </button>
                      <button onClick={() => updateStatus(mem.id, 'accepted')} className="px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider bg-[var(--color-green)] text-white border-2 border-[var(--color-border)] shadow-[2px_2px_0_0_var(--color-border)] hover:translate-y-[1px] hover:translate-x-[1px] hover:shadow-[1px_1px_0_0_var(--color-border)]">
                        Accept
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'members' && (
              <div className="space-y-4">
                <h2 className="text-xl font-black mb-6 flex items-center gap-2">
                  <span className="text-[var(--color-green)]">✓</span> Active Members
                </h2>
                {accepted.length === 0 ? (
                  <p className="text-[var(--color-text-muted)] font-medium italic">No members yet.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {accepted.map(mem => (
                      <div key={mem.id} className="flex gap-4 items-center p-4 bg-[var(--color-bg)] rounded-xl border-2 border-[var(--color-border)]">
                        <div className="w-12 h-12 bg-white rounded-full border-2 border-[var(--color-border)] flex items-center justify-center font-black text-[var(--color-accent)]">
                          {mem.profiles?.name?.substring(0, 2).toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <div className="font-bold">{mem.profiles?.name}</div>
                          <div className="text-xs font-medium text-[var(--color-text-secondary)]">{mem.profiles?.batch}</div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <button onClick={() => updateStatus(mem.id, 'declined')} className="text-[10px] font-bold text-orange-500 hover:underline">Remove</button>
                          <button onClick={() => updateStatus(mem.id, 'blocked')} className="text-[10px] font-bold text-red-500 hover:underline">Block</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {blocked.length > 0 && (
                  <div className="mt-8 border-t-2 border-[var(--color-border-light)] pt-6">
                    <h3 className="text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-4">Blocked Users</h3>
                    {blocked.map(mem => (
                       <div key={mem.id} className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
                          <span className="text-sm font-bold text-red-700">{mem.profiles?.name}</span>
                          <button onClick={() => updateStatus(mem.id, 'declined')} className="text-xs font-bold text-red-700 underline">Unblock</button>
                       </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'details' && (
              <div className="max-w-2xl">
                <h2 className="text-xl font-black mb-6">Club Settings</h2>
                <form onSubmit={saveClubDetails} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-2">Club Description</label>
                    <textarea 
                      value={editDesc}
                      onChange={e => setEditDesc(e.target.value)}
                      className="w-full h-32 px-4 py-3 rounded-xl border-2 border-[var(--color-border)] bg-[var(--color-bg)] font-medium focus:ring-2 focus:ring-[var(--color-accent)] outline-none resize-none"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                      <label className="block text-sm font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-2">Contact Link/Number</label>
                      <input 
                        type="text" 
                        value={editContact}
                        onChange={e => setEditContact(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-2 border-[var(--color-border)] bg-[var(--color-bg)] font-medium focus:ring-2 focus:ring-[var(--color-accent)] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-2">Office Location</label>
                      <input 
                        type="text" 
                        value={editOffice}
                        onChange={e => setEditOffice(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-2 border-[var(--color-border)] bg-[var(--color-bg)] font-medium focus:ring-2 focus:ring-[var(--color-accent)] outline-none"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 bg-[var(--color-bg)] rounded-xl border-2 border-[var(--color-border)]">
                    <input 
                      type="checkbox" 
                      id="recruiting"
                      checked={isRecruiting}
                      onChange={e => setIsRecruiting(e.target.checked)}
                      className="w-5 h-5 accent-[var(--color-accent)]"
                    />
                    <label htmlFor="recruiting" className="font-bold cursor-pointer flex-1">Currently Recruiting Members</label>
                  </div>

                  <button 
                    type="submit"
                    disabled={isSaving}
                    className="py-4 px-8 bg-[var(--color-text)] text-white rounded-xl font-black uppercase tracking-wider border-2 border-[var(--color-border)] shadow-[4px_4px_0_0_var(--color-border)] hover:bg-[var(--color-accent)] transition-all"
                  >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </button>
                </form>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
