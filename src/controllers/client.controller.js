const clientService = require('../services/client.service');

exports.createClient = async (req, res) => {
    try {
        const client = await clientService.createClient(req.userId, req.body);
        res.status(201).json({ 
            message: 'Client created successfully', 
            client 
        });
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ message: error.message });
    }
};

exports.getClients = async (req, res) => {
    try {
        const clients = await clientService.getClientsByRecruiter(req.userId);
        res.status(200).json({ clients });
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ message: error.message });
    }
};

exports.getClientById = async (req, res) => {
    try {
        const client = await clientService.getClientById(req.params.clientId, req.userId);
        res.status(200).json({ client });
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ message: error.message });
    }
};

exports.updateClient = async (req, res) => {
    try {
        const client = await clientService.updateClient(
            req.params.clientId, 
            req.userId, 
            req.body
        );
        res.status(200).json({ 
            message: 'Client updated successfully', 
            client 
        });
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ message: error.message });
    }
};

exports.deleteClient = async (req, res) => {
    try {
        await clientService.deleteClient(req.params.clientId, req.userId);
        res.status(200).json({ message: 'Client deleted successfully' });
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ message: error.message });
    }
};