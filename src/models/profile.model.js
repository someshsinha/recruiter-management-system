const { pool } = require('../config/db');

const Profile = {
    // Create a new profile (linked to user via same ID)
    create: async (userId, fullName, userType, domain = null) => {
        const query = `
            INSERT INTO profiles (id, full_name, user_type, domain)
            VALUES (?, ?, ?, ?)
        `;
        await pool.execute(query, [userId, fullName, userType, domain]);
        return { id: userId, full_name: fullName, user_type: userType, domain };
    },

    // Update profile
    update: async (userId, updates) => {
        const fields = [];
        const values = [];
        
        if (updates.full_name !== undefined) {
            fields.push('full_name = ?');
            values.push(updates.full_name);
        }
        if (updates.domain !== undefined) {
            fields.push('domain = ?');
            values.push(updates.domain);
        }
        if (updates.resume_path !== undefined) {
            fields.push('resume_path = ?');
            values.push(updates.resume_path);
        }

        if (fields.length === 0) return null;

        values.push(userId);
        const query = `UPDATE profiles SET ${fields.join(', ')} WHERE id = ?`;
        await pool.execute(query, values);
        
        return Profile.findById(userId);
    },

    // Find profile by user ID
    findById: async (userId) => {
        const query = `SELECT * FROM profiles WHERE id = ?`;
        const [rows] = await pool.execute(query, [userId]);
        return rows.length > 0 ? rows[0] : null;
    },
};

module.exports = Profile;