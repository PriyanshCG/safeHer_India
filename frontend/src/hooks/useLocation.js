import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook to get the user's current geolocation and fetch nearby
 * police stations, hospitals and safe zones from the Overpass API.
 *
 * @param {object}  options
 * @param {number}  options.radius  — search radius in metres (default 5 000)
 * @param {number}  options.maxEach — max items per category (default 6)
 * @returns {{ location, pois, isLoading, error, refresh }}
 */
const DEFAULT_LOCATION = [28.6139, 77.2090]; // Delhi fallback

export const useLocation = ({ radius = 5000, maxEach = 6 } = {}) => {
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [pois, setPois] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ── helper: haversine distance (km) ── */
  const haversine = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  /* ── fetch real POIs from Overpass ── */
  const fetchPois = useCallback(
    async (lat, lon) => {
      try {
        const query = `
          [out:json][timeout:15];
          (
            node["amenity"="police"](around:${radius}, ${lat}, ${lon});
            way["amenity"="police"](around:${radius}, ${lat}, ${lon});
            node["amenity"="hospital"](around:${radius}, ${lat}, ${lon});
            way["amenity"="hospital"](around:${radius}, ${lat}, ${lon});
            node["shop"="mall"](around:${radius}, ${lat}, ${lon});
            way["shop"="mall"](around:${radius}, ${lat}, ${lon});
            node["public_transport"="station"](around:${radius}, ${lat}, ${lon});
          );
          out center;
        `;
        const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
        const res = await fetch(url);
        const data = await res.json();

        if (!data.elements?.length) return [];

        const items = data.elements.map((el, idx) => {
          const isPolice = el.tags?.amenity === 'police';
          const isHospital = el.tags?.amenity === 'hospital';
          let type = 'Safe Zone';
          if (isPolice) type = 'Police';
          if (isHospital) type = 'Hospital';

          const elLat = el.lat || el.center?.lat;
          const elLon = el.lon || el.center?.lon;

          let name = el.tags?.name;
          if (!name) {
            if (isPolice) name = 'Local Police Station';
            else if (isHospital) name = 'Local Hospital';
            else name = 'Public Safe Zone';
          }

          const d = haversine(lat, lon, elLat, elLon);

          return {
            id: el.id || idx,
            name,
            type,
            distance: d.toFixed(1) + ' km',
            status: 'Real Location',
            rating: (Math.random() * (5 - 3.8) + 3.8).toFixed(1),
            lat: elLat,
            lon: elLon,
            googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${elLat},${elLon}`,
          };
        });

        items.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));

        const police = items.filter((p) => p.type === 'Police').slice(0, maxEach);
        const hospitals = items.filter((p) => p.type === 'Hospital').slice(0, maxEach);
        const safe = items.filter((p) => p.type === 'Safe Zone').slice(0, maxEach);

        const balanced = [...police, ...hospitals, ...safe];
        balanced.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
        return balanced;
      } catch (err) {
        console.error('Overpass fetch failed:', err);
        return [];
      }
    },
    [radius, maxEach],
  );

  /* ── locate user + fetch POIs ── */
  const locate = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    if (!('geolocation' in navigator)) {
      setError('Geolocation not supported');
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        setLocation([lat, lon]);
        const nearby = await fetchPois(lat, lon);
        setPois(nearby);
        setIsLoading(false);
      },
      (err) => {
        console.warn('Geolocation error:', err.message);
        setError('Location access denied – showing Delhi');
        // Still try fetching POIs for the default location
        fetchPois(DEFAULT_LOCATION[0], DEFAULT_LOCATION[1]).then((nearby) => {
          setPois(nearby);
          setIsLoading(false);
        });
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }, [fetchPois]);

  /* Run on mount */
  useEffect(() => {
    locate();
  }, [locate]);

  return { location, pois, isLoading, error, refresh: locate };
};

export default useLocation;
