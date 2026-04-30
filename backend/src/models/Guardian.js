const mongoose = require('mongoose');

const guardianSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    guardianName: {
        type: String,
        required: [true, 'Guardian name is required'],
        trim: true,
        minlength: [2, 'Guardian name must be at least 2 characters'],
        maxlength: [50, 'Guardian name cannot exceed 50 characters']
    },
    guardianPhone: {
        type: String,
        required: [true, 'Guardian phone is required'],
        trim: true,
        match: [/^\d{10}$/, 'Phone number must be exactly 10 digits']
    },
    relationship: {
        type: String,
        enum: ['Mom', 'Dad', 'Sister', 'Brother', 'Friend', 'Partner', 'Spouse', 'Guardian', 'Other'],
        default: 'Other'
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    addedAt: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationSentAt: {
        type: Date
    }
});

// Index for efficient queries
guardianSchema.index({ userId: 1 });
guardianSchema.index({ status: 1 });

const Guardian = mongoose.model('Guardian', guardianSchema);
module.exports = Guardian;
