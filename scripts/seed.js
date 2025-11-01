const db = require('../src/config/db');
const Recruiter = require('../src/models/recruiter.model');
const Candidate = require('../src/models/candidate.model');

const seedRecruiters = async () => {
    const recruiters = [
        { name: 'Tech Corp', email: 'contact@techcorp.com', password: 'securepassword' },
        { name: 'Health Inc', email: 'hr@healthinc.com', password: 'securepassword' },
    ];

    for (const recruiter of recruiters) {
        await Recruiter.create(recruiter);
    }
};

const seedCandidates = async () => {
    const candidates = [
        { name: 'John Doe', email: 'john@example.com', resume: 'link_to_resume' },
        { name: 'Jane Smith', email: 'jane@example.com', resume: 'link_to_resume' },
    ];

    for (const candidate of candidates) {
        await Candidate.create(candidate);
    }
};

const seedDatabase = async () => {
    try {
        await db.connect();
        await seedRecruiters();
        await seedCandidates();
        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await db.disconnect();
    }
};

seedDatabase();