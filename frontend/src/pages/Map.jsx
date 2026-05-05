import React, { useState } from 'react';
import {
  MapPin,
  Search,
  Shield,
  Phone,
  Navigation,
  Filter,
  Star,
  Hospital,
  ShieldAlert,
  Info,
  Loader2
} from 'lucide-react';
import CustomMapContainer from '../components/Map/MapContainer';
import useLocation from '../hooks/useLocation';

const FILTERS = [
  { label: 'All', icon: Shield },
  { label: 'Police', icon: ShieldAlert },
  { label: 'Hospital', icon: Hospital },
  { label: 'Safe Zone', icon: Star }
];

export default function MapPage() {
  const { location, pois, isLoading: isLoadingGeo, error, refresh } = useLocation({ radius: 5000, maxEach: 6 });
  const [mapCenter, setMapCenter] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);

  // Show toast when there's a location error
  const handleRefresh = () => {
    refresh();
  };

  // Use mapCenter (when user clicks a place) or the geolocated position
  const center = mapCenter || location;

  const filteredPois = pois.filter(p => {
    const matchesFilter = activeFilter === 'All' || p.type.toLowerCase().includes(activeFilter.toLowerCase());
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="h-[calc(100vh-70px)] flex flex-col lg:flex-row overflow-hidden bg-white">

      {/* Toast Notification for Default Location */}
      {error && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[2000] bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-4">
          <Info className="w-5 h-5 text-yellow-400" />
          <span className="font-label text-sm font-semibold">{error}</span>
        </div>
      )}

      {/* Sidebar: Search & Places */}
      <aside className="w-full lg:w-[400px] border-r border-gray-100 flex flex-col bg-white z-20 shadow-xl lg:shadow-none flex-shrink-0">
        <div className="p-6 border-b border-gray-100 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold font-serif text-[#2D1B2E]">Safety Explorer</h2>
            {/* Sidebar location button */}
            <button
              onClick={handleRefresh}
              className="p-2 bg-[#8B4A6A]/10 rounded-lg text-[#8B4A6A] hover:bg-[#8B4A6A]/20 transition-colors"
              title="Refresh Location"
            >
              <Navigation className="w-5 h-5 fill-current" />
            </button>
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search safe locations..."
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#8B4A6A] transition-all outline-none text-sm font-medium text-[#2D1B2E]"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {FILTERS.map(f => (
              <button
                key={f.label}
                onClick={() => setActiveFilter(f.label)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${activeFilter === f.label
                    ? 'bg-[#8B4A6A] text-white shadow-lg'
                    : 'bg-gray-100 text-[#6B5B6B] hover:bg-gray-200'
                  }`}
              >
                <f.icon className="w-3.5 h-3.5" />
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#6B5B6B]">Nearby Safe Locations</p>
            <Filter className="w-4 h-4 text-gray-400 cursor-pointer" />
          </div>

          <div className="space-y-4">
            {isLoadingGeo ? (
              <div className="text-center py-10 px-4">
                <Loader2 className="w-8 h-8 text-[#8B4A6A] mx-auto mb-3 animate-spin" />
                <p className="text-gray-400 font-medium text-sm">Finding safe places near you…</p>
              </div>
            ) : filteredPois.length === 0 ? (
              <div className="text-center py-10 px-4">
                <ShieldAlert className="w-8 h-8 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-400 font-medium text-sm">
                  {searchQuery ? `No results found for "${searchQuery}"` : 'No safe places found nearby'}
                </p>
              </div>
            ) : (
              filteredPois.map((place) => (
                <div
                  key={place.id}
                  onClick={() => {
                    setMapCenter([place.lat, place.lon]);
                    setSelectedPlaceId(place.id);
                  }}
                  className={`group p-4 rounded-2xl border transition-all cursor-pointer ${selectedPlaceId === place.id
                      ? 'border-[#8B4A6A] bg-[#8B4A6A]/5'
                      : 'border-gray-100 hover:border-[#8B4A6A] hover:bg-[#8B4A6A]/5'
                    }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={`font-bold transition-colors ${selectedPlaceId === place.id ? 'text-[#8B4A6A]' : 'text-[#2D1B2E] group-hover:text-[#8B4A6A]'}`}>
                      {place.name}
                    </h3>
                    <span className="text-[10px] font-black text-[#8B4A6A] bg-[#8B4A6A]/10 px-2 py-0.5 rounded-full whitespace-nowrap ml-2">
                      {place.distance}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="flex items-center gap-1 text-[#6B5B6B] font-medium">
                      <Shield className="w-3 h-3" /> {place.type}
                    </span>
                    <span className="flex items-center gap-1 text-green-600 font-bold">
                      <Star className="w-3 h-3 fill-current" /> {place.rating}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-[10px] font-bold text-gray-400 italic">{place.status}</p>
                    <div className="flex gap-2">
                      <button
                        className="p-2 bg-white rounded-lg border border-gray-100 text-gray-400 hover:text-[#8B4A6A] shadow-sm transition-colors"
                        onClick={(e) => { e.stopPropagation(); /* handle call */ }}
                      >
                        <Phone className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 bg-[#8B4A6A] rounded-lg text-white shadow-md hover:shadow-lg transition-all"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (place.googleMapsUrl) {
                            window.open(place.googleMapsUrl, '_blank');
                          } else {
                            setMapCenter([place.lat, place.lon]);
                          }
                        }}
                        title={place.googleMapsUrl ? "Open in Google Maps" : "Go to location"}
                      >
                        <Navigation className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Community Alert Strip */}
        <div className="p-6 bg-[#2D1B2E] text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-2 bg-white/10 rounded-lg">
              <Shield className="w-5 h-5 text-[#C94A7D]" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#C94A7D]">Community Alert</p>
              <p className="text-xs font-body opacity-80">Connaught Place area verified safe by 42 users today.</p>
            </div>
          </div>
          <button className="w-full py-3 bg-[#8B4A6A] rounded-xl font-bold text-sm hover:bg-[#C94A7D] transition-all">
            Report Safety Concern
          </button>
        </div>
      </aside>

      {/* Main Content: Map */}
      <main className="flex-1 relative bg-gray-50 flex items-center justify-center">

        {/* Loading State or Map */}
        {isLoadingGeo ? (
          <div className="flex flex-col items-center gap-4 text-[#8B4A6A]">
            <Loader2 className="w-10 h-10 animate-spin" />
            <p className="font-bold text-sm animate-pulse">Locating your safe zone...</p>
          </div>
        ) : (
          <div className="absolute inset-0 z-0">
            <CustomMapContainer location={center} pois={filteredPois} />
          </div>
        )}

        {/* Floating Map Controls (My Location) */}
        {!isLoadingGeo && (
          <div className="absolute top-8 right-8 z-[1000] flex flex-col gap-4">
            <button
              onClick={() => { setMapCenter(null); handleRefresh(); }}
              className="p-4 bg-white rounded-full shadow-2xl text-[#8B4A6A] hover:bg-[#8B4A6A] hover:text-white transition-all group"
              title="Go to My Location"
            >
              <Navigation className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        )}

        {/* SOS Floating Action (Mobile only) */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[1000] w-full max-w-sm px-4 lg:hidden pointer-events-none">
          <button className="w-full bg-[#DC2626] text-white py-4 rounded-2xl flex items-center justify-center gap-3 shadow-2xl animate-pulse pointer-events-auto">
            <ShieldAlert className="w-6 h-6" />
            <span className="text-sm font-bold uppercase tracking-widest">Trigger Emergency SOS</span>
          </button>
        </div>

      </main>
    </div>
  );
}
