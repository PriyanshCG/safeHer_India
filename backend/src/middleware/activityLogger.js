const { logActivity } = require('../controllers/activityController');

const logUserActivity = async (req, res, next) => {
    try {
        if (req.user && req.user.userId) {
            // Create a map or basic logic to determine action from route
            let action = 'unknown_action';
            const path = req.path;
            const method = req.method;

            if (path.includes('/profile') && method === 'PUT') action = 'profile_updated';
            if (path.includes('/change-password') && method === 'PUT') action = 'password_changed';
            if (path.includes('/guardians') && method === 'POST') action = 'guardian_added';
            if (path.includes('/guardians') && method === 'DELETE') action = 'guardian_removed';
            if (path.includes('/sos/trigger') && method === 'POST') action = 'sos_triggered';
            if (path.includes('/sos/') && path.includes('/resolve') && method === 'PUT') action = 'sos_resolved';
            if (path.includes('/locations') && method === 'GET') action = 'map_opened';

            if (action !== 'unknown_action') {
                // Activity logger controller function handles errors internally, fire and forget
                logActivity(req.user.userId, action, { path, method }, req.ip);
            }
        }
    } catch (error) {
        // Silent fail, don't block the request
        console.error('Activity logging error:', error.message);
    }
    next();
};

module.exports = logUserActivity;
