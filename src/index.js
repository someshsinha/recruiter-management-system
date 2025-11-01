const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const { connectDB } = require('./config/db');

// Load environment variables
dotenv.config();

const app = express();

// Security Middleware
app.use(helmet());
app.use(cors());

// Request parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically (for resume downloads)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/profile', require('./routes/profile.routes'));
app.use('/api/clients', require('./routes/client.routes'));
app.use('/api/jobs', require('./routes/job.routes'));

// Placeholder for applications (coming next)
app.get('/api/applications', (req, res) => {
  res.status(200).json({ message: 'Applications routes - Coming soon' });
});

// 404 handler - MUST BE AFTER ALL ROUTES
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    status: 'error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong!'
  });
});

const applicationRoutes = require('./routes/application.routes');
app.use('/api/applications', applicationRoutes);

// Start server
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Connect to database
    await connectDB();
    console.log('✅ Database connected successfully');

    // Start listening
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📍 Health: http://localhost:${PORT}/health`);
      console.log(`🔐 Auth: http://localhost:${PORT}/api/auth`);
      console.log(`👤 Profile: http://localhost:${PORT}/api/profile`);
      console.log(`🏢 Clients: http://localhost:${PORT}/api/clients`);
      console.log(`💼 Jobs: http://localhost:${PORT}/api/jobs`);
      console.log(`📝 Applications: http://localhost:${PORT}/api/applications`);
       console.log(`📧 Email Verification: http://localhost:${PORT}/api/auth/verify-email?token=YOUR_TOKEN_HERE`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});