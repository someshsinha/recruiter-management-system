const { pool } = require('../config/db');
const { v4: uuidv4 } = require('uuid');

const User = {
    // 🔹 Create a new user (normal create — still usable)
    create: async (email, passwordHash, role) => {
        const id = uuidv4();
        const query = `
            INSERT INTO users (id, email, password_hash, role)
            VALUES (?, ?, ?, ?)
        `;
        await pool.execute(query, [id, email, passwordHash, role]);
        return { id, email, role };
    },

    // 🔹 Create user with email verification token
    createWithVerification: async (email, passwordHash, role, verificationToken) => {
        const id = uuidv4();
        const query = `
            INSERT INTO users (id, email, password_hash, role, is_verified, verification_token)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        await pool.execute(query, [id, email, passwordHash, role, false, verificationToken]);
        return { id, email, role };
    },

    // 🔹 Find user by email (with profile data)
    findByEmail: async (email) => {
        const query = `
            SELECT 
                u.id, u.email, u.password_hash, u.role, u.created_at,
                u.is_verified, u.verification_token,
                p.full_name, p.user_type, p.domain, p.resume_path
            FROM users u
            LEFT JOIN profiles p ON u.id = p.id
            WHERE u.email = ?
        `;
        const [rows] = await pool.execute(query, [email]);
        return rows.length > 0 ? rows[0] : null;
    },

    // 🔹 Find user by ID (with profile data)
    findById: async (id) => {
        const query = `
            SELECT 
                u.id, u.email, u.role, u.created_at,
                u.is_verified, u.verification_token,
                p.full_name, p.user_type, p.domain, p.resume_path
            FROM users u
            LEFT JOIN profiles p ON u.id = p.id
            WHERE u.id = ?
        `;
        const [rows] = await pool.execute(query, [id]);
        return rows.length > 0 ? rows[0] : null;
    },

    // 🔹 Find user by verification token
    findByVerificationToken: async (token) => {
        const query = `SELECT * FROM users WHERE verification_token = ?`;
        const [rows] = await pool.execute(query, [token]);
        return rows.length > 0 ? rows[0] : null;
    },

    // 🔹 Mark user as verified
    markAsVerified: async (userId) => {
        const query = `
            UPDATE users
            SET is_verified = ?, verification_token = NULL
            WHERE id = ?
        `;
        await pool.execute(query, [true, userId]);
    },
};

module.exports = User;
