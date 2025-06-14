import Questions from "../modals/questionModels.js";
import { parseQuestions } from "../utils/parseQuestions.js";
import { generateQuestions } from "../utils/generatedPaper.js";

const createQuestions = async (req, res) => {
    try {
        const { subject, difficulty, type, questionNumber } = req.body;

        console.log("Received body:", req.body);

        if (!subject ||
            !difficulty ||
            !type ||
            !Array.isArray(type) ||
            type.length === 0 ||
            !questionNumber
        ) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        let allQuestions = [];

        for (const t of type) {
            const generated = await generateQuestions({
                subject,
                difficulty,
                type: t,
                number: questionNumber,
            });


            const questionList = parseQuestions(generated, {
                subject,
                difficulty,
                type: t,
            });

            allQuestions = allQuestions.concat(questionList);
        }
        const saved = await Questions.insertMany(allQuestions);
        res.status(201).json({ questions: saved });
    } catch (error) {
        console.error("Error creating questions:", error.message);
        res.status(400).json({ message: error.message });
    }
};

export default createQuestions;