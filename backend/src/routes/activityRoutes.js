const express = require('express');
const { getActivityLog } = require('../controllers/activityController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(verifyToken);
router.get('/', getActivityLog);

module.exports = router;
