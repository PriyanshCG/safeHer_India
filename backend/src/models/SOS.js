const mongoose = require('mongoose');

const sosSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['triggered', 'resolved'],
        default: 'triggered'
    },
    triggeredAt: {
        type: Date,
        default: Date.now
    },
    resolvedAt: {
        type: Date
    },
    guardiansNotified: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Guardian'
    }],
    notes: {
        type: String
    }
});

const SOS = mongoose.model('SOS', sosSchema);
module.exports = SOS;
