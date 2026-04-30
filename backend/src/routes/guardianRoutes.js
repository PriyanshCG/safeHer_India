const express = require('express');
const { addGuardian, getGuardians, removeGuardian, updateGuardian } = require('../controllers/guardianController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(verifyToken);

router.route('/')
    .post(addGuardian)
    .get(getGuardians);

router.route('/:id')
    .delete(removeGuardian)
    .put(updateGuardian);

module.exports = router;
