const { fetchNearbyPlaces } = require('../services/overpassService');
const { logActivity } = require('./activityController');

/**
 * GET /api/locations/nearby?latitude=...&longitude=...&radius=...&type=all
 * Fetches real nearby police stations, hospitals, and safe zones from OpenStreetMap.
 */
const getNearbyPlaces = async (req, res, next) => {
    try {
        const { latitude, longitude, radius = 5000, type = 'all' } = req.query;

        if (!latitude || !longitude) {
            res.status(400);
            throw new Error('Latitude and longitude are required');
        }

        const lat = parseFloat(latitude);
        const lon = parseFloat(longitude);

        if (isNaN(lat) || isNaN(lon)) {
            res.status(400);
            throw new Error('Latitude and longitude must be valid numbers');
        }

        // Log activity if authenticated
        if (req.user) {
            logActivity(req.user.userId, 'map_opened', { latitude: lat, longitude: lon });
        }

        // Fetch real places from Overpass API
        let places = await fetchNearbyPlaces(lat, lon, parseInt(radius));

        // Filter by type if specified
        if (type !== 'all') {
            places = places.filter(p => p.type === type.toLowerCase());
        }

        res.status(200).json({
            success: true,
            message: `Found ${places.length} nearby places`,
            data: places,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * GET /api/locations/search?query=...&latitude=...&longitude=...
 * Searches for places by name in the nearby results.
 */
const searchPlaces = async (req, res, next) => {
    try {
        const { query, latitude, longitude, radius = 5000 } = req.query;

        if (!query) {
            res.status(400);
            throw new Error('Search query is required');
        }

        const lat = parseFloat(latitude) || 28.6139;
        const lon = parseFloat(longitude) || 77.2090;

        // Fetch places and filter by search query
        const allPlaces = await fetchNearbyPlaces(lat, lon, parseInt(radius));
        const q = query.toLowerCase();
        const places = allPlaces.filter(
            (p) => p.name.toLowerCase().includes(q) || p.type.toLowerCase().includes(q)
        );

        res.status(200).json({
            success: true,
            message: `Found ${places.length} results for "${query}"`,
            data: places,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * GET /api/locations/:id — Not applicable for Overpass data (no persistent IDs).
 * Returns a helpful message.
 */
const getPlaceDetails = async (req, res, next) => {
    try {
        const { id } = req.params;

        res.status(200).json({
            success: true,
            message: 'Use Google Maps for detailed place info',
            data: {
                id,
                googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=place_id:${id}`,
            },
        });
    } catch (err) {
        next(err);
    }
};

module.exports = { getNearbyPlaces, searchPlaces, getPlaceDetails };
