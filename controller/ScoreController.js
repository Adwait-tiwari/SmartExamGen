import Score from "../modals/ScoreModal.js";

// POST: Submit a score
export const submitScore = async (req, res) => {
    try {
        const { userId, subject, score } = req.body;

        if (!userId || !subject || score === undefined) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const newScore = new Score({ userId, subject, score });
        await newScore.save();

        res.status(201).json({ message: "Score submitted successfully." });
    } catch (error) {
        console.error("Error in submitScore:", error); // ✅ Print actual backend error
        res.status(500).json({ error: "Error submitting score." });
    }
};

// GET: Get all scores of a user
export const getUserScores = async (req, res) => {
    try {
        const { userId } = req.params;

        const scores = await Score.find({ userId }).sort({ date: 1 });
        res.status(200).json(scores);
    } catch (error) {
        res.status(500).json({ error: "Error fetching user scores." });
    }
};