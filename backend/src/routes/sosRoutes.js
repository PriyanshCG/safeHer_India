const express = require('express');
const { triggerSOS, getSOSHistory, resolveSOS, getSOS } = require('../controllers/sosController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(verifyToken);

router.post('/trigger', triggerSOS);
router.get('/history', getSOSHistory);
router.route('/:id')
    .get(getSOS)
    .put(resolveSOS);
router.put('/:id/resolve', resolveSOS);

module.exports = router;
