const { pool } = require('../config/db');
const { v4: uuidv4 } = require('uuid');

const Client = {
    // Create a new client
    create: async (clientData) => {
        const id = uuidv4();
        const { name, industry, website, company_size, account_manager_id } = clientData;
        
        const query = `
            INSERT INTO clients (id, name, industry, website, company_size, account_manager_id)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        
        await pool.execute(query, [
            id, 
            name, 
            industry || null, 
            website || null, 
            company_size || null, 
            account_manager_id
        ]);
        
        return { id, ...clientData };
    },

    // Find client by ID
    findById: async (clientId) => {
        const query = `
            SELECT c.*, p.full_name as account_manager_name
            FROM clients c
            LEFT JOIN profiles p ON c.account_manager_id = p.id
            WHERE c.id = ?
        `;
        const [rows] = await pool.execute(query, [clientId]);
        return rows.length > 0 ? rows[0] : null;
    },

    // Find all clients managed by a recruiter
    findByRecruiter: async (recruiterId) => {
        const query = `
            SELECT c.*, p.full_name as account_manager_name
            FROM clients c
            LEFT JOIN profiles p ON c.account_manager_id = p.id
            WHERE c.account_manager_id = ?
            ORDER BY c.created_at DESC
        `;
        const [rows] = await pool.execute(query, [recruiterId]);
        return rows;
    },

    // Update client
    update: async (clientId, updates) => {
        const fields = [];
        const values = [];
        
        if (updates.name !== undefined) {
            fields.push('name = ?');
            values.push(updates.name);
        }
        if (updates.industry !== undefined) {
            fields.push('industry = ?');
            values.push(updates.industry);
        }
        if (updates.website !== undefined) {
            fields.push('website = ?');
            values.push(updates.website);
        }
        if (updates.company_size !== undefined) {
            fields.push('company_size = ?');
            values.push(updates.company_size);
        }

        if (fields.length === 0) return null;

        values.push(clientId);
        const query = `UPDATE clients SET ${fields.join(', ')} WHERE id = ?`;
        await pool.execute(query, values);
        
        return Client.findById(clientId);
    },

    // Delete client
    delete: async (clientId) => {
        const query = `DELETE FROM clients WHERE id = ?`;
        const [result] = await pool.execute(query, [clientId]);
        return result.affectedRows > 0;
    },

    // Check if client belongs to recruiter
    belongsToRecruiter: async (clientId, recruiterId) => {
        const query = `SELECT id FROM clients WHERE id = ? AND account_manager_id = ?`;
        const [rows] = await pool.execute(query, [clientId, recruiterId]);
        return rows.length > 0;
    },
};

module.exports = Client;