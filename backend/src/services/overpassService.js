/**
 * Overpass API Service
 * Fetches real nearby police stations, hospitals and safe zones
 * from OpenStreetMap via the public Overpass API.
 */

const OVERPASS_URL = 'https://overpass-api.de/api/interpreter';

/**
 * Fetch nearby places from the Overpass API.
 * @param {number} lat    Latitude
 * @param {number} lon    Longitude
 * @param {number} radius Radius in metres (default 5000)
 * @returns {Array}       Array of place objects
 */
const fetchNearbyPlaces = async (lat, lon, radius = 5000) => {
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

    const url = `${OVERPASS_URL}?data=${encodeURIComponent(query)}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Overpass API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.elements || data.elements.length === 0) {
        return [];
    }

    // Haversine distance helper (km)
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

    const places = data.elements.map((el, index) => {
        const isPolice = el.tags?.amenity === 'police';
        const isHospital = el.tags?.amenity === 'hospital';

        let type = 'safe_zone';
        if (isPolice) type = 'police';
        if (isHospital) type = 'hospital';

        const elLat = el.lat || el.center?.lat;
        const elLon = el.lon || el.center?.lon;

        let name = el.tags?.name;
        if (!name) {
            if (isPolice) name = 'Local Police Station';
            else if (isHospital) name = 'Local Hospital';
            else name = 'Public Safe Zone';
        }

        const distance = haversine(lat, lon, elLat, elLon);

        return {
            id: el.id?.toString() || `place-${index}`,
            lat: elLat,
            lon: elLon,
            type,
            name,
            address: el.tags?.['addr:full'] || el.tags?.['addr:street'] || '',
            distance: parseFloat(distance.toFixed(2)),
            phone: el.tags?.phone || el.tags?.['contact:phone'] || null,
            website: el.tags?.website || null,
            openingHours: el.tags?.opening_hours || null,
            googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${elLat},${elLon}`,
        };
    });

    // Sort by distance
    places.sort((a, b) => a.distance - b.distance);

    return places;
};

module.exports = { fetchNearbyPlaces };
