const express = require('express');
const { getProfile, updateProfile, changePassword, deleteAccount } = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(verifyToken);

router.route('/profile')
    .get(getProfile)
    .put(updateProfile);

router.put('/change-password', changePassword);
router.delete('/account', deleteAccount);

module.exports = router;
