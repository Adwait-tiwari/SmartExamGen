import express from 'express';
import questionController from '../controller/questionController.js';
import createQuestions from '../controller/createQuestion.js';

const router = express.Router();

router.route('/generate')
    .get(questionController)
    .post(createQuestions);

export default router;