import mongoose from "mongoose";

const QuestionsSchema = mongoose.Schema({
    subject: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    questionNumber: {
        type: Number,
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    options: {
        type: [String],
        default: [],
    },
    answer: {
        type: String,
        required: true,
    }
})

const Questions = mongoose.model('Question', QuestionsSchema);

export default Questions