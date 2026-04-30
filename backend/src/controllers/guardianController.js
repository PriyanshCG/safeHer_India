const Guardian = require('../models/Guardian');

const addGuardian = async (req, res, next) => {
    try {
        const { guardianName, guardianPhone, relationship } = req.body;
        
        // Input validation
        if (!guardianName || !guardianPhone || !relationship) {
            return res.status(400).json({
                success: false,
                message: 'Guardian name, phone, and relationship are required'
            });
        }

        // Name validation
        if (guardianName.length < 2 || guardianName.length > 50) {
            return res.status(400).json({
                success: false,
                message: 'Guardian name must be between 2 and 50 characters'
            });
        }

        // Phone validation
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(guardianPhone)) {
            return res.status(400).json({
                success: false,
                message: 'Phone number must be exactly 10 digits'
            });
        }

        // Relationship validation
        const validRelationships = ['Mom', 'Dad', 'Sister', 'Brother', 'Friend', 'Partner', 'Spouse', 'Guardian', 'Other'];
        if (!validRelationships.includes(relationship)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid relationship type'
            });
        }

        // Check if guardian already exists for this user
        const existingGuardian = await Guardian.findOne({ 
            userId: req.user.userId, 
            guardianPhone 
        });
        
        if (existingGuardian) {
            return res.status(400).json({
                success: false,
                message: 'Guardian already added'
            });
        }

        // Create Guardian
        const guardian = await Guardian.create({
            userId: req.user.userId,
            guardianName,
            guardianPhone,
            relationship,
            status: 'active',
            addedAt: Date.now(),
            isVerified: false
        });

        res.status(201).json({ 
            success: true, 
            message: 'Guardian added successfully', 
            data: guardian 
        });
    } catch (err) {
        next(err);
    }
};

const getGuardians = async (req, res, next) => {
    try {
        const guardians = await Guardian.find({ userId: req.user.userId, status: 'active' });
        res.status(200).json({ 
            success: true, 
            message: 'Guardians retrieved successfully', 
            data: guardians 
        });
    } catch (err) {
        next(err);
    }
};

const removeGuardian = async (req, res, next) => {
    try {
        const { id } = req.params;
        const guardian = await Guardian.findOne({ _id: id, userId: req.user.userId });
        
        if (!guardian) {
            return res.status(404).json({
                success: false,
                message: 'Guardian not found'
            });
        }

        // Soft delete: update status to inactive
        guardian.status = 'inactive';
        await guardian.save();

        res.status(200).json({ 
            success: true, 
            message: 'Guardian removed successfully', 
            data: {} 
        });
    } catch (err) {
        next(err);
    }
};

const updateGuardian = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { guardianName, guardianPhone, relationship } = req.body;

        const guardian = await Guardian.findOne({ _id: id, userId: req.user.userId });
        if (!guardian) {
            return res.status(404).json({
                success: false,
                message: 'Guardian not found'
            });
        }

        // Validate and update fields if provided
        if (guardianName) {
            if (guardianName.length < 2 || guardianName.length > 50) {
                return res.status(400).json({
                    success: false,
                    message: 'Guardian name must be between 2 and 50 characters'
                });
            }
            guardian.guardianName = guardianName;
        }

        if (guardianPhone) {
            const phoneRegex = /^\d{10}$/;
            if (!phoneRegex.test(guardianPhone)) {
                return res.status(400).json({
                    success: false,
                    message: 'Phone number must be exactly 10 digits'
                });
            }
            guardian.guardianPhone = guardianPhone;
        }

        if (relationship) {
            const validRelationships = ['Mom', 'Dad', 'Sister', 'Brother', 'Friend', 'Partner', 'Spouse', 'Guardian', 'Other'];
            if (!validRelationships.includes(relationship)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid relationship type'
                });
            }
            guardian.relationship = relationship;
        }

        await guardian.save();

        res.status(200).json({ 
            success: true, 
            message: 'Guardian updated successfully', 
            data: guardian 
        });
    } catch (err) {
        next(err);
    }
};

module.exports = { addGuardian, getGuardians, removeGuardian, updateGuardian };
