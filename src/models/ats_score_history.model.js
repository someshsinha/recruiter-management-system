const db = require('../config/db');

const AtsScoreHistory = {
  // Save ATS score record
  create: async (application_id, score, feedback) => {
    const [result] = await db.query(
      `INSERT INTO ats_score_history (application_id, score, feedback)
       VALUES (?, ?, ?)`,
      [application_id, score, feedback]
    );
    return { id: result.insertId, application_id, score, feedback };
  },

  // Fetch score history for an application
  getByApplicationId: async (application_id) => {
    const [rows] = await db.query(
      `SELECT * FROM ats_score_history WHERE application_id = ? ORDER BY created_at DESC`,
      [application_id]
    );
    return rows;
  }
};

module.exports = AtsScoreHistory;

