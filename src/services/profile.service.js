const Profile = require('../models/profile.model');
const User = require('../models/user.model');

const getProfile = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        const err = new Error('User not found');
        err.status = 404;
        throw err;
    }
    
    // Remove password_hash if present
    delete user.password_hash;
    return user;
};

const updateProfile = async (userId, updates) => {
    // Verify user exists
    const user = await User.findById(userId);
    if (!user) {
        const err = new Error('User not found');
        err.status = 404;
        throw err;
    }

    // Only allow updating certain fields
    const allowedUpdates = {
        full_name: updates.full_name,
        domain: updates.domain,
    };

    // Remove undefined values
    Object.keys(allowedUpdates).forEach(key => {
        if (allowedUpdates[key] === undefined) {
            delete allowedUpdates[key];
        }
    });

    // Check if there are any updates
    if (Object.keys(allowedUpdates).length === 0) {
        const err = new Error('No valid fields to update');
        err.status = 400;
        throw err;
    }

    // Update profile
    await Profile.update(userId, allowedUpdates);

    // Return updated profile
    return await getProfile(userId);
};

const uploadResume = async (userId, filePath) => {
    // Verify user exists and is an applicant
    const user = await User.findById(userId);
    if (!user) {
        const err = new Error('User not found');
        err.status = 404;
        throw err;
    }

    if (user.role !== 'applicant') {
        const err = new Error('Only applicants can upload resumes');
        err.status = 403;
        throw err;
    }

    // Update resume_path in profile
    await Profile.update(userId, { resume_path: filePath });

    // Return updated profile
    return await getProfile(userId);
};

const getPublicProfile = async (targetUserId, requestingUserId) => {
    const user = await User.findById(targetUserId);
    if (!user) {
        const err = new Error('User not found');
        err.status = 404;
        throw err;
    }

    // Remove sensitive information
    delete user.password_hash;

    return user;
};

module.exports = {
    getProfile,
    updateProfile,
    uploadResume,
    getPublicProfile,
};