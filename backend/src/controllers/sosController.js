const SOS = require('../models/SOS');
const Guardian = require('../models/Guardian');
const { logActivity } = require('./activityController');

const triggerSOS = async (req, res, next) => {
    try {
        const { latitude, longitude, notes } = req.body;
        if (!latitude || !longitude) {
            res.status(400);
            throw new Error('Latitude and longitude are required to trigger SOS');
        }

        const guardians = await Guardian.find({ userId: req.user.userId, status: 'active' });
        const guardianIds = guardians.map(g => g._id);

        const sos = await SOS.create({
            userId: req.user.userId,
            latitude,
            longitude,
            guardiansNotified: guardianIds,
            notes,
            status: 'triggered'
        });

        await logActivity(req.user.userId, 'sos_triggered', { sosId: sos._id, latitude, longitude });

        res.status(201).json({ success: true, message: 'SOS triggered successfully', data: sos });
    } catch (err) {
        next(err);
    }
};

const getSOSHistory = async (req, res, next) => {
    try {
        const history = await SOS.find({ userId: req.user.userId }).sort({ triggeredAt: -1 }).populate('guardiansNotified');
        res.status(200).json({ success: true, message: 'SOS history fetched', data: history });
    } catch (err) {
        next(err);
    }
};

const resolveSOS = async (req, res, next) => {
    try {
        const { id } = req.params;
        const sos = await SOS.findOne({ _id: id, userId: req.user.userId });

        if (!sos) {
            res.status(404);
            throw new Error('SOS record not found');
        }

        if (sos.status === 'resolved') {
            res.status(400);
            throw new Error('SOS already resolved');
        }

        sos.status = 'resolved';
        sos.resolvedAt = Date.now();
        await sos.save();

        res.status(200).json({ success: true, message: 'SOS resolved', data: sos });
    } catch (err) {
        next(err);
    }
};

const getSOS = async (req, res, next) => {
    try {
        const { id } = req.params;
        const sos = await SOS.findOne({ _id: id, userId: req.user.userId }).populate('guardiansNotified');

        if (!sos) {
            res.status(404);
            throw new Error('SOS record not found');
        }

        res.status(200).json({ success: true, message: 'SOS record fetched', data: sos });
    } catch (err) {
        next(err);
    }
};

module.exports = { triggerSOS, getSOSHistory, resolveSOS, getSOS };
