const Client = require('../models/client.model');
const User = require('../models/user.model');

const createClient = async (recruiterId, clientData) => {
    // Verify recruiter exists and is a recruiter
    const user = await User.findById(recruiterId);
    if (!user || user.role !== 'recruiter') {
        const err = new Error('Only recruiters can create clients');
        err.status = 403;
        throw err;
    }

    // Add recruiter as account manager
    const dataWithManager = {
        ...clientData,
        account_manager_id: recruiterId
    };

    return await Client.create(dataWithManager);
};

const getClientsByRecruiter = async (recruiterId) => {
    return await Client.findByRecruiter(recruiterId);
};

const getClientById = async (clientId, recruiterId) => {
    const client = await Client.findById(clientId);
    
    if (!client) {
        const err = new Error('Client not found');
        err.status = 404;
        throw err;
    }

    // Verify the client belongs to this recruiter
    if (client.account_manager_id !== recruiterId) {
        const err = new Error('Access denied');
        err.status = 403;
        throw err;
    }

    return client;
};

const updateClient = async (clientId, recruiterId, updates) => {
    // Verify ownership
    const belongs = await Client.belongsToRecruiter(clientId, recruiterId);
    if (!belongs) {
        const err = new Error('Access denied');
        err.status = 403;
        throw err;
    }

    const updated = await Client.update(clientId, updates);
    if (!updated) {
        const err = new Error('No fields to update');
        err.status = 400;
        throw err;
    }

    return updated;
};

const deleteClient = async (clientId, recruiterId) => {
    // Verify ownership
    const belongs = await Client.belongsToRecruiter(clientId, recruiterId);
    if (!belongs) {
        const err = new Error('Access denied');
        err.status = 403;
        throw err;
    }

    const deleted = await Client.delete(clientId);
    if (!deleted) {
        const err = new Error('Client not found');
        err.status = 404;
        throw err;
    }

    return true;
};

module.exports = {
    createClient,
    getClientsByRecruiter,
    getClientById,
    updateClient,
    deleteClient,
};