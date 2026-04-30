const Activity = require('../models/Activity');

// Internal function to log activity silently
const logActivity = async (userId, action, details, status = 'success') => {
    try {
        await Activity.create({
            userId,
            action,
            details,
            status
        });
    } catch (err) {
        console.error('Failed to log activity:', err);
    }
};

// GET /api/activities
const getActivityLog = async (req, res, next) => {
    try {
        const activities = await Activity.find({ userId: req.user.userId }).sort({ timestamp: -1 });
        res.status(200).json({ success: true, message: 'Activities retrieved', data: activities });
    } catch (err) {
        next(err);
    }
};

module.exports = { logActivity, getActivityLog };
