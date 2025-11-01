import express from 'express';
import authRoutes from './auth.routes.js';
import recruitersRoutes from './recruiters.routes.js';
import candidatesRoutes from './candidates.routes.js';

const router = express.Router();

// Use authentication routes
router.use('/auth', authRoutes);

// Use recruiter routes
router.use('/recruiters', recruitersRoutes);

// Use candidate routes
router.use('/candidates', candidatesRoutes);

export default router;