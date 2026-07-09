import { useEffect, useRef, useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { campusData } from '../data/campusData';

/* ===== Category helpers ===== */
const CATEGORY_COLORS = {
  academic: '#6366f1',
  study: '#2563eb',
  food: '#f97316',
  sports: '#10b981',
  medical: '#ef4444',
  other: '#6b7280',
};

const CATEGORY_LABELS = {
  academic: 'ACADEMIC',
  study: 'STUDY',
  food: 'FOOD',
  sports: 'SPORTS',
  medical: 'HEALTH',
  other: 'OTHER',
};

/* Pin SVG path for markers (teardrop pin with inner circular hole) */
const PIN_PATH = 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z';

/* ===== CampusMap Component ===== */
export default function CampusMap() {
  const { data } = useApp();
  const mapRef = useRef(null);         // DOM ref for the map container
  const mapInstanceRef = useRef(null); // Google Map instance
  const markersRef = useRef([]);       // Store marker references
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [mapReady, setMapReady] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

  const mappablePlaces = useMemo(() => {
    // Map places from Supabase to use the updated local coordinates
    let places = data.places.map(p => {
      const localPlace = campusData.places.find(lp => lp.id === p.id);
      return {
        ...p,
        lat: localPlace ? localPlace.lat : p.lat,
        lng: localPlace ? localPlace.lng : p.lng
      };
    }).filter(p => p.lat && p.lng);

    if (activeCategory !== 'all') {
      places = places.filter(p => p.category === activeCategory);
    }
    return places;
  }, [data.places, activeCategory]);

  /* Wait for Google Maps API to load, then initialize */
  useEffect(() => {
    let interval;
    if (window.google && window.google.maps) {
      setMapReady(true);
    } else {
      interval = setInterval(() => {
        if (window.google && window.google.maps) {
          setMapReady(true);
          clearInterval(interval);
        }
      }, 200);
    }
    return () => clearInterval(interval);
  }, []);

  /* Initialize map once API is ready */
  useEffect(() => {
    if (!mapReady || !mapRef.current) return;
    if (mapInstanceRef.current) return; // already initialized

    // Center map directly on Chitkara University Punjab campus
    const chitkaraCenter = { lat: 30.5160865, lng: 76.6597778 };

    mapInstanceRef.current = new google.maps.Map(mapRef.current, {
      center: chitkaraCenter,
      zoom: 18,
      mapTypeId: 'hybrid',
      mapTypeControl: true,
      fullscreenControl: true,
      streetViewControl: false,
      zoomControl: true,
    });
  }, [mapReady]);

  /* Place/update markers whenever filter changes */
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear old markers
    markersRef.current.forEach(m => m.setMap(null));
    markersRef.current = [];

    mappablePlaces.forEach(place => {
      const color = CATEGORY_COLORS[place.category] || CATEGORY_COLORS.other;

      const marker = new google.maps.Marker({
        position: { lat: place.lat, lng: place.lng },
        map: mapInstanceRef.current,
        title: place.name,
        icon: {
          path: PIN_PATH,
          fillColor: color,
          fillOpacity: 1,
          strokeColor: '#1C2331',
          strokeWeight: 1.5,
          scale: 1.6,
          anchor: new google.maps.Point(12, 22),
        },
      });

      marker.addListener('click', () => {
        mapInstanceRef.current.panTo(marker.getPosition());
        setSelectedPlace(place);
      });

      markersRef.current.push(marker);
    });
  }, [mappablePlaces, mapReady, data.placeCategories]);

  /* Stars helper */
  function renderStars(rating) {
    return [1, 2, 3, 4, 5].map(i => (
      <span key={i} className={i <= Math.round(rating) ? 'star-filled' : 'star-empty'}>★</span>
    ));
  }

  /* Crowd badge helper */
  function crowdClass(level) {
    if (level === 'low') return 'badge-chill';
    if (level === 'moderate') return 'badge-moderate';
    return 'badge-busy';
  }
  function crowdLabel(level) {
    if (level === 'low') return 'CHILL';
    if (level === 'moderate') return 'MODERATE';
    return 'BUSY';
  }

  return (
    <div className="mb-10 animate-in">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-extrabold font-heading flex items-center gap-2">
            <span>🗺️</span> Campus Map
          </h2>
          <p className="text-xs text-[var(--color-text-secondary)] mt-1 font-mono uppercase tracking-wider">
            Click any pin to view details
          </p>
        </div>
        <div className="flex items-center gap-3">
          {selectedPlace && (
            <button
              onClick={() => setSelectedPlace(null)}
              className="text-xs font-bold text-[var(--color-text-secondary)] hover:text-[var(--color-text)] cursor-pointer font-mono uppercase tracking-wider"
            >
              ✕ Close Panel
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {data.placeCategories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all border-2 ${
              activeCategory === cat.id
                ? 'bg-[var(--color-text)] text-white border-[var(--color-text)]'
                : 'bg-[var(--color-card)] text-[var(--color-text)] border-[var(--color-border-light)] hover:border-[var(--color-border)]'
            }`}
          >
            {cat.icon} {cat.label}
          </button>
        ))}
      </div>

      {/* Map + Detail Card Container */}
      <div className="neo-card-static overflow-hidden" style={{ position: 'relative' }}>
        <div
          ref={mapRef}
          style={{ width: '100%', height: '420px' }}
          className="bg-[var(--color-card-inner)]"
        />

        {/* Loading state */}
        {!mapReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-card)]">
            <div className="text-center">
              <div className="text-3xl mb-2 animate-pulse">🗺️</div>
              <p className="text-sm font-mono text-[var(--color-text-muted)] uppercase tracking-wider">Loading Map...</p>
            </div>
          </div>
        )}

        {/* Detail Panel — slides in from left */}
        {selectedPlace && (
          <div
            className="absolute top-0 left-0 bottom-0 w-[340px] max-w-[85%] bg-[var(--color-card)] border-r-[2.5px] border-[var(--color-border)] overflow-y-auto z-10"
            style={{ animation: 'slideInLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
          >
            {/* Close */}
            <button
              onClick={() => setSelectedPlace(null)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full border-2 border-[var(--color-border)] bg-[var(--color-card)] flex items-center justify-center text-sm cursor-pointer hover:bg-[var(--color-card-inner)] transition-colors z-20"
            >
              ✕
            </button>

            {/* Hero Image */}
            {selectedPlace.image && (
              <div className="h-[160px] overflow-hidden relative">
                <img
                  src={selectedPlace.image}
                  alt={selectedPlace.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-card)] via-transparent to-transparent" />
              </div>
            )}

            {/* Body Content */}
            <div className="p-5">
              {/* Icon + Name */}
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-[var(--color-card-inner)] border-2 border-[var(--color-border-light)] flex items-center justify-center text-lg flex-shrink-0">
                  {selectedPlace.icon}
                </div>
                <div>
                  <h3 className="font-extrabold font-heading text-lg leading-tight">{selectedPlace.name}</h3>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)] font-mono">
                    {selectedPlace.category}
                  </span>
                </div>
              </div>

              {/* Rating + Crowd */}
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="inline-flex items-center gap-1 text-sm">
                  {renderStars(selectedPlace.rating)}
                  <strong className="ml-1">{selectedPlace.rating}</strong>
                  <span className="text-[var(--color-text-muted)] text-xs">({selectedPlace.reviewCount})</span>
                </span>
                <span className={crowdClass(selectedPlace.crowdLevel)}>
                  {crowdLabel(selectedPlace.crowdLevel)}
                </span>
              </div>

              {/* Description */}
              <p className="text-[13px] text-[var(--color-text-secondary)] leading-relaxed mb-4">
                {selectedPlace.description}
              </p>

              {/* Info Items */}
              <div className="space-y-3 mb-5">
                {[
                  { icon: '🕐', label: 'Hours', value: selectedPlace.hours },
                  { icon: '📍', label: 'Location', value: selectedPlace.location },
                  { icon: '📞', label: 'Contact', value: selectedPlace.phone },
                ].map((info, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[var(--color-card-inner)] border border-[var(--color-border-light)] flex items-center justify-center text-sm flex-shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)] font-mono">{info.label}</div>
                      <div className="text-xs font-medium text-[var(--color-text)]">{info.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Directions CTA */}
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${selectedPlace.lat},${selectedPlace.lng}&travelmode=walking`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full justify-center"
              >
                🚶 Get Walking Directions
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Map Legend */}
      <div className="flex items-center gap-4 mt-3 flex-wrap">
        {Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
          <div key={cat} className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[var(--color-text-muted)]">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
            {CATEGORY_LABELS[cat] || cat}
          </div>
        ))}
      </div>
    </div>
  );
}
