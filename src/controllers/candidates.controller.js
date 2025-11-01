const Candidate = require('../models/candidate.model');

// Create a new candidate
exports.createCandidate = async (req, res) => {
    try {
        const candidateData = req.body;
        const newCandidate = await Candidate.create(candidateData);
        res.status(201).json(newCandidate);
    } catch (error) {
        res.status(500).json({ message: 'Error creating candidate', error });
    }
};

// Get all candidates
exports.getAllCandidates = async (req, res) => {
    try {
        const candidates = await Candidate.findAll();
        res.status(200).json(candidates);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching candidates', error });
    }
};

// Get a candidate by ID
exports.getCandidateById = async (req, res) => {
    try {
        const candidateId = req.params.id;
        const candidate = await Candidate.findById(candidateId);
        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }
        res.status(200).json(candidate);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching candidate', error });
    }
};

// Update a candidate
exports.updateCandidate = async (req, res) => {
    try {
        const candidateId = req.params.id;
        const updatedData = req.body;
        const updatedCandidate = await Candidate.update(candidateId, updatedData);
        if (!updatedCandidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }
        res.status(200).json(updatedCandidate);
    } catch (error) {
        res.status(500).json({ message: 'Error updating candidate', error });
    }
};

// Delete a candidate
exports.deleteCandidate = async (req, res) => {
    try {
        const candidateId = req.params.id;
        const deletedCandidate = await Candidate.delete(candidateId);
        if (!deletedCandidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting candidate', error });
    }
};