const { pool } = require('../config/db');
const { v4: uuidv4 } = require('uuid');

const Job = {
    // Create a new job
    create: async (jobData) => {
        const id = uuidv4();
        const {
            recruiter_id,
            client_id,
            title,
            domain,
            location,
            job_type,
            description,
            requirements,
            salary_range,
            status = 'active'
        } = jobData;
        
        const query = `
            INSERT INTO job_adverts 
            (id, recruiter_id, client_id, title, domain, location, job_type, description, requirements, salary_range, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        
        await pool.execute(query, [
            id,
            recruiter_id,
            client_id,
            title,
            domain,
            location,
            job_type,
            description,
            requirements,
            salary_range || null,
            status
        ]);
        
        return Job.findById(id);
    },

    // Find job by ID with client details
    findById: async (jobId) => {
        const query = `
            SELECT 
                j.*,
                c.name as client_name,
                c.industry as client_industry,
                p.full_name as recruiter_name
            FROM job_adverts j
            LEFT JOIN clients c ON j.client_id = c.id
            LEFT JOIN profiles p ON j.recruiter_id = p.id
            WHERE j.id = ?
        `;
        const [rows] = await pool.execute(query, [jobId]);
        return rows.length > 0 ? rows[0] : null;
    },

    // Find all jobs by recruiter
    findByRecruiter: async (recruiterId) => {
        const query = `
            SELECT 
                j.*,
                c.name as client_name,
                c.industry as client_industry
            FROM job_adverts j
            LEFT JOIN clients c ON j.client_id = c.id
            WHERE j.recruiter_id = ?
            ORDER BY j.created_at DESC
        `;
        const [rows] = await pool.execute(query, [recruiterId]);
        return rows;
    },

    // Search jobs by domain (for applicants)
    searchByDomain: async (domain) => {
        const query = `
            SELECT 
                j.*,
                c.name as client_name,
                c.industry as client_industry,
                p.full_name as recruiter_name
            FROM job_adverts j
            LEFT JOIN clients c ON j.client_id = c.id
            LEFT JOIN profiles p ON j.recruiter_id = p.id
            WHERE j.domain = ? AND j.status = 'active'
            ORDER BY j.created_at DESC
        `;
        const [rows] = await pool.execute(query, [domain]);
        return rows;
    },

    // Get all active jobs
    findAllActive: async () => {
        const query = `
            SELECT 
                j.*,
                c.name as client_name,
                c.industry as client_industry,
                p.full_name as recruiter_name
            FROM job_adverts j
            LEFT JOIN clients c ON j.client_id = c.id
            LEFT JOIN profiles p ON j.recruiter_id = p.id
            WHERE j.status = 'active'
            ORDER BY j.created_at DESC
        `;
        const [rows] = await pool.execute(query);
        return rows;
    },

    // Update job
    update: async (jobId, updates) => {
        const fields = [];
        const values = [];
        
        const allowedFields = [
            'title', 'domain', 'location', 'job_type', 
            'description', 'requirements', 'salary_range', 'status'
        ];

        allowedFields.forEach(field => {
            if (updates[field] !== undefined) {
                fields.push(`${field} = ?`);
                values.push(updates[field]);
            }
        });

        if (fields.length === 0) return null;

        values.push(jobId);
        const query = `UPDATE job_adverts SET ${fields.join(', ')} WHERE id = ?`;
        await pool.execute(query, values);
        
        return Job.findById(jobId);
    },

    // Update job status
    updateStatus: async (jobId, status) => {
        const query = `UPDATE job_adverts SET status = ? WHERE id = ?`;
        await pool.execute(query, [status, jobId]);
        return Job.findById(jobId);
    },

    // Delete job
    delete: async (jobId) => {
        const query = `DELETE FROM job_adverts WHERE id = ?`;
        const [result] = await pool.execute(query, [jobId]);
        return result.affectedRows > 0;
    },

    // Check if job belongs to recruiter
    belongsToRecruiter: async (jobId, recruiterId) => {
        const query = `SELECT id FROM job_adverts WHERE id = ? AND recruiter_id = ?`;
        const [rows] = await pool.execute(query, [jobId, recruiterId]);
        return rows.length > 0;
    },
};

module.exports = Job;