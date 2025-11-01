const fs = require('fs');
const path = require('path');

// ✅ Basic Keyword Matching ATS Scoring
exports.calculateATSScore = async (resumePath, jobDescription) => {
    try {
        let score = 0;

        // Read resume text
        const text = fs.readFileSync(path.resolve(resumePath), 'utf8').toLowerCase();

        // Extract keywords from job description
        const keywords = jobDescription.toLowerCase().split(/\W+/);

        let matched = 0;
        for (let word of keywords) {
            if (text.includes(word)) matched++;
        }

        score = Math.round((matched / keywords.length) * 100);
        return Math.min(score, 100);
    } catch (err) {
        console.error('ATS scoring failed:', err.message);
        return 0;
    }
};
