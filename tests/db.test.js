const path = require('path');
require('dotenv').config({ 
    path: path.resolve(__dirname, '../.env'),
    debug: true  // This will help show where dotenv is looking for the file
}); 

// Add this to debug environment variables
console.log('Environment variables:', {
    DB_NAME: process.env.DB_NAME,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER
});

const { pool, connectDB } = require('../src/config/db.js');

async function testConnection() {
    try {
        await connectDB();
        console.log('✅ Initial connection test passed');
        
        // Test query
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT 1 as result');
        console.log('✅ Query test passed:', rows[0].result === 1);
        
        connection.release();
    } catch (error) {
        console.error('❌ Test failed:', error.message);
    } finally {
        await pool.end();
        process.exit();
    }
}

testConnection();