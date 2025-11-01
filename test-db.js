const mysql = require('mysql2/promise');

(async () => {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Ss@062004',
      database: 'recruiterdb',
    });

    await connection.ping();
    console.log('✅ Database connection successful!');

    const [rows] = await connection.query('SELECT 1 AS result');
    console.log('✅ Query result:', rows[0].result);

    await connection.end();
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
  }
})();

