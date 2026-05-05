const express = require('express');
const { getNearbyPlaces, searchPlaces, getPlaceDetails } = require('../controllers/locationController');

const router = express.Router();

router.get('/nearby', getNearbyPlaces);
router.get('/search', searchPlaces);
router.get('/:id', getPlaceDetails);

module.exports = router;
