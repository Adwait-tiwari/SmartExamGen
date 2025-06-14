import Questions from '../modals/questionModels.js';

const getQuestions = async (req, res) => {
    try {
        const { subject, difficulty, type, number } = req.query;

        // Build query dynamically
        const query = {};
        if (subject) query.subject = subject;
        if (difficulty) query.difficulty = difficulty;
        if (type) {
            query.type = {
                $in: Array.isArray(type) ? type : [type]
            };
        }

        const limit = number ? Number(number) : 10;

        const questions = await Questions.find(query).limit(limit);
        res.status(200).json({ subject, questions });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default getQuestions;