const mysql = require('mysql2/promise');
const config = require('./index');

const pool = mysql.createPool({
        host: config.db.host,
        user: config.db.user,
        password: config.db.password,
        database: config.db.database,
        waitForConnections: true,
        connectionLimit: config.db.connectionLimit,
        queueLimit: 0
});

const connectDB = async () => {
        try {
                const connection = await pool.getConnection();
                await connection.ping();
                connection.release();
                console.log('Database connected successfully');
        } catch (error) {
                console.error('Database connection failed:', error);
                throw error;
        }
};

module.exports = {pool,connectDB};