const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from project root .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const config = {
    app: {
        port: process.env.PORT || 3000,
        env: process.env.NODE_ENV || 'development',
    },
    db: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'recruiterdb',
        connectionLimit: 10
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'your_jwt_secret',
        expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    },
    email: {
        host: process.env.SMTP_HOST || 'smtp-relay.brevo.com',
        port: parseInt(process.env.SMTP_PORT) || 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
        from: {
            email: process.env.SMTP_FROM_EMAIL || 'noreply@example.com',
            name: process.env.SMTP_FROM_NAME || 'Recruiter Platform',
        },
    },
};

module.exports = config;
