const profileService = require('../services/profile.service');

exports.getProfile = async (req, res) => {
    try {
        const profile = await profileService.getProfile(req.userId);
        res.status(200).json({ profile });
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ message: error.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const profile = await profileService.updateProfile(req.userId, req.body);
        res.status(200).json({ 
            message: 'Profile updated successfully', 
            profile 
        });
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ message: error.message });
    }
};

exports.uploadResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const filePath = `uploads/resumes/${req.file.filename}`;
        const profile = await profileService.uploadResume(req.userId, filePath);
        
        res.status(200).json({ 
            message: 'Resume uploaded successfully', 
            profile 
        });
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ message: error.message });
    }
};

exports.getPublicProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const profile = await profileService.getPublicProfile(userId, req.userId);
        res.status(200).json({ profile });
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ message: error.message });
    }
};