const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const config = require('../config');
const User = require('../models/user.model');
const Profile = require('../models/profile.model');
const { sendVerificationEmail } = require('./email.service');

const saltRounds = 10;

// ✅ REGISTER (send Brevo verification email)
const register = async (userData) => {
    const { email, password, role, full_name, domain } = userData;

    if (!role || !['applicant', 'recruiter'].includes(role)) {
        const err = new Error('Role must be either "applicant" or "recruiter"');
        err.status = 400;
        throw err;
    }

    const existing = await User.findByEmail(email);
    if (existing) {
        const err = new Error('Email already registered');
        err.status = 400;
        throw err;
    }

    if (!full_name) {
        const err = new Error('full_name is required');
        err.status = 400;
        throw err;
    }

    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Generate unique verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Create user with verification_token
    const newUser = await User.createWithVerification(
        email,
        passwordHash,
        role,
        verificationToken
    );

    // Create associated profile
    await Profile.create(newUser.id, full_name, role, domain || null);

    // Send verification email
    await sendVerificationEmail(email, verificationToken);

    const completeUser = await User.findById(newUser.id);
    delete completeUser.password_hash;

    return {
        message: 'Registration successful! Please verify your email.',
        user: completeUser
    };
};

// ✅ VERIFY EMAIL
const verifyEmail = async (token) => {
    const user = await User.findByVerificationToken(token);
    if (!user) {
        const err = new Error('Invalid or expired verification token');
        err.status = 400;
        throw err;
    }

    await User.markAsVerified(user.id);
    return { message: 'Email verified successfully' };
};

// ✅ LOGIN (blocked if not verified)
const login = async (email, password) => {
    const user = await User.findByEmail(email);

    if (!user) {
        const err = new Error('Invalid email or password');
        err.status = 401;
        throw err;
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
        const err = new Error('Invalid email or password');
        err.status = 401;
        throw err;
    }

    if (!user.is_verified) {
        const err = new Error('Please verify your email before logging in');
        err.status = 403;
        throw err;
    }

    const token = jwt.sign(
        { id: user.id, role: user.role },
        config.jwt.secret,
        { expiresIn: config.jwt.expiresIn }
    );

    delete user.password_hash;
    return { token, user };
};

// ✅ PROFILE VALIDATION
const validateUser = async (userId) => {
    return await User.findById(userId);
};

module.exports = {
    register,
    login,
    validateUser,
    verifyEmail,
};
