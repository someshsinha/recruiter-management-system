const express = require('express');
const {
    createClient,
    getClients,
    getClientById,
    updateClient,
    deleteClient,
} = require('../controllers/client.controller');
const {
    validateCreateClient,
    validateUpdateClient,
} = require('../validators/client.validator');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// All client routes require authentication
router.use(authMiddleware);

// Create a new client (recruiters only)
router.post('/', validateCreateClient, createClient);

// Get all clients for the logged-in recruiter
router.get('/', getClients);

// Get a specific client
router.get('/:clientId', getClientById);

// Update a client
router.put('/:clientId', validateUpdateClient, updateClient);

// Delete a client
router.delete('/:clientId', deleteClient);

module.exports = router;