const db = require('../config/db'); // uses your MySQL connection pool

const Application = {
  // Create a new job application
  create: async (data) => {
    const {
      user_id,
      job_id,
      resume_path,
      cover_letter,
      ats_score
    } = data;

    const [result] = await db.query(
      `INSERT INTO applications (user_id, job_id, resume_path, cover_letter, ats_score)
       VALUES (?, ?, ?, ?, ?)`,
      [user_id, job_id, resume_path, cover_letter, ats_score]
    );
    return { id: result.insertId, ...data };
  },

  // Get applications by user (applicant)
  getByUser: async (user_id) => {
    const [rows] = await db.query(
      `SELECT a.*, j.title AS job_title, j.company_name
       FROM applications a
       JOIN jobs j ON a.job_id = j.id
       WHERE a.user_id = ?`,
      [user_id]
    );
    return rows;
  },

  // Get applications for a recruiter’s jobs
  getByRecruiter: async (recruiter_id) => {
    const [rows] = await db.query(
      `SELECT a.*, j.title AS job_title, u.full_name AS applicant_name
       FROM applications a
       JOIN jobs j ON a.job_id = j.id
       JOIN users u ON a.user_id = u.id
       WHERE j.recruiter_id = ?`,
      [recruiter_id]
    );
    return rows;
  },

  // Update status (recruiter)
  updateStatus: async (application_id, status) => {
    await db.query(
      `UPDATE applications SET status = ? WHERE id = ?`,
      [status, application_id]
    );
    return { message: 'Status updated successfully' };
  }
};

module.exports = Application;
