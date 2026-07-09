import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CampusMap from '../components/CampusMap';
import PlaceDetail from '../components/PlaceDetail';
import VisitorCategoryModal from '../components/VisitorCategoryModal';
import VisitorAIAssistant from '../components/VisitorAIAssistant';
import EmergencyInterface from '../components/EmergencyInterface';
import { useApp } from '../context/AppContext';

export default function VisitorGuide() {
  const { data } = useApp();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showEmergency, setShowEmergency] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const guideCategories = data.visitorGuideCategories || [];

  const scrollToDirectory = () => document.getElementById('directory-section')?.scrollIntoView({ behavior: 'smooth' });

  const quickActions = [
    { label: 'Navigate Campus', icon: '🧭', action: () => document.getElementById('map-section')?.scrollIntoView({ behavior: 'smooth' }) },
    { label: 'Location', icon: '📍', action: () => window.open('https://www.google.com/maps/search/?api=1&query=Chitkara+University+Punjab', '_blank'), color: 'bg-blue-50 text-blue-700 border-blue-200 hover:border-blue-500 hover:bg-blue-100' },
    { label: 'Emergency', icon: '🚨', action: () => { setShowEmergency(true); scrollToDirectory(); }, color: 'bg-red-50 text-red-700 border-red-200 hover:border-red-500 hover:bg-red-100' },
    { label: 'Parking', icon: '🅿', action: () => { setActiveCategory('services'); scrollToDirectory(); } },
    { label: 'Food', icon: '🍔', action: () => { setActiveCategory('food'); scrollToDirectory(); } },
    { label: 'Stay', icon: '🏨', action: () => { setActiveCategory('hotels'); scrollToDirectory(); } }
  ];

  return (
    <>
      <div className="animate-in pb-12">
        {/* ===== Hero Section ===== */}
      <div className="relative neo-card-static p-8 md:p-12 mb-10 overflow-hidden" style={{ border: '3px solid var(--color-border)' }}>
        {/* Fantasy Background Effects */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Compass Illustration (CSS drawn) */}
        <div className="absolute top-8 right-8 opacity-20 pointer-events-none origin-center" style={{ animation: 'spin 60s linear infinite' }}>
          <svg width="200" height="200" viewBox="0 0 100 100" className="stroke-[var(--color-border)] fill-none">
            <circle cx="50" cy="50" r="45" strokeWidth="2" strokeDasharray="4 4" />
            <circle cx="50" cy="50" r="35" strokeWidth="1" />
            <path d="M50 5 L60 40 L95 50 L60 60 L50 95 L40 60 L5 50 L40 40 Z" strokeWidth="1.5" className="fill-[var(--color-border)] opacity-20" />
          </svg>
        </div>

        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-extrabold font-heading text-[var(--color-text)] mb-3 tracking-tight flex items-center gap-3">
            <span className="text-3xl">🏰</span> Welcome to Chitkara
          </h1>
          <p className="text-lg md:text-xl text-[var(--color-text-secondary)] font-medium mb-8 leading-relaxed max-w-xl">
            Everything a visitor needs in one place. Discover places, find directions, and explore the magic of our campus.
          </p>

          {/* Global Search Bar */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim()) {
                navigate('/explore', { state: { searchQuery: searchQuery.trim() } });
              }
            }}
            className="flex items-center bg-white border-2 border-[var(--color-border-light)] rounded-xl p-2 mb-8 focus-within:border-[var(--color-text)] transition-colors shadow-sm"
          >
            <span className="text-2xl px-3 opacity-70">🔍</span>
            <input 
              type="text"
              placeholder="Search any place inside or around campus..."
              className="flex-1 bg-transparent text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] outline-none font-medium text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="bg-amber-400 text-amber-950 px-6 py-3 rounded-lg font-bold hover:bg-amber-300 transition-colors cursor-pointer">
              Search
            </button>
          </form>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3">
            {quickActions.map((action, i) => (
              <button 
                key={i}
                onClick={action.action}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold border-2 transition-all cursor-pointer hover:-translate-y-1 ${
                  action.color || 'bg-white text-[var(--color-text)] border-[var(--color-border-light)] hover:border-[var(--color-border)] hover:shadow-[4px_4px_0_0_var(--color-border)]'
                }`}
                style={action.color ? { boxShadow: '4px 4px 0px 0px rgba(220, 38, 38, 0.2)' } : {}}
              >
                <span className="text-lg">{action.icon}</span> {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ===== Map Section ===== */}
      <div id="map-section" className="mb-10">
        <CampusMap />
      </div>

      {/* ===== Directory Categories ===== */}
      <div id="directory-section" className="mb-6">
        <div className="relative">
          {showEmergency ? (
            <EmergencyInterface onClose={() => setShowEmergency(false)} />
          ) : activeCategory ? (
            <VisitorCategoryModal 
              categoryId={activeCategory} 
              onClose={() => setActiveCategory(null)} 
              onSelectPlace={(place) => {
                if (activeCategory === 'academic') {
                  navigate('/explore', { state: { placeId: place.id } });
                } else {
                  setActiveCategory(null);
                  setSelectedPlace(place);
                }
              }} 
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
              {/* Emergency Card - Distinctive styling */}
              <div 
                onClick={() => setShowEmergency(true)}
                className="group relative bg-red-50 p-5 cursor-pointer overflow-hidden transition-all hover:-translate-y-2 rounded-xl border-[3px] border-red-200 hover:border-red-500 shadow-[4px_4px_0_0_#fecaca]"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-2xl group-hover:bg-red-500/20 transition-all"></div>
                <div className="w-12 h-12 rounded-xl bg-red-100 border-2 border-red-300 flex items-center justify-center text-2xl mb-4 text-red-600 shadow-sm relative z-10 group-hover:scale-110 transition-transform">
                  ☎
                </div>
                <h3 className="font-extrabold text-lg mb-1 text-red-950 relative z-10 uppercase tracking-tight">Emergency</h3>
                <p className="text-xs font-bold text-red-700 leading-relaxed relative z-10">Security, ambulance, and helpline numbers. Tap immediately in case of emergency.</p>
              </div>

              {/* Standard Categories */}
              {guideCategories.map((item, i) => (
                <div 
                  key={i} 
                  onClick={() => setActiveCategory(item.id)}
                  className="neo-card p-5 flex flex-col group cursor-pointer h-full"
                >
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-card-inner)] border-2 border-[var(--color-border-light)] flex items-center justify-center text-2xl mb-4 group-hover:border-[var(--color-border)] group-hover:-translate-y-1 transition-all shadow-sm">
                    {item.icon}
                  </div>
                  <h3 className="font-extrabold text-lg mb-1 group-hover:text-amber-700 transition-colors">{item.title}</h3>
                  <p className="text-xs text-[var(--color-text-secondary)] font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      </div>

      {/* ===== Modals & Assistants ===== */}
      
      {/* AI Assistant */}
      <VisitorAIAssistant />

      {/* Specific Place Detail Modal */}
      {selectedPlace && (
        <PlaceDetail 
          place={selectedPlace} 
          onClose={() => setSelectedPlace(null)} 
        />
      )}

    </>
  );
}
