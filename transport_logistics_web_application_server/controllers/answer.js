import Answer from '../models/Answer.js';

export const getAllAnswers = async (req, res) => {
    try {
        const answers = await Answer.find();
        res.status(200).json(answers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAnswer = async (req, res) => {
    try {
        const { id } = req.params;
        const answer = await Answer.findById(id);
        res.status(200).json(answer);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const createAnswer = async (req, res) => {
    console.log('req', req);
    try {
        const {
            answerId,
            requestId,
            answerOption,
            reason,
            userId,
        } = req.body;
        const newAnswer = new Answer({
            answerId,
            requestId,
            answerOption,
            reason,
            userId,
        });
        const savedAnswer = await newAnswer.save();
        res.status(201).json(savedAnswer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateAnswer = async (req, res) => {
    try {
        const { id } = req.params;
        const answer = await Answer.findById(id);
        if (!answer) {
            return res.status(404).json({ message: 'Answer not found' });
        }
        if (req.body.answerId) {
            answer.answerId = req.body.answerId;
            answer.requestId = req.body.requestId;
            answer.answerOption = req.body.answerOption;
            answer.reason = req.body.reason;
            answer.userId = req.body.userId;
        }
        const updatedAnswer = await answer.save();
        res.json(updatedAnswer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteAnswer = async (req, res) => {
    try {
        const { id } = req.params;
        const answer = await Answer.findById(id);
        if (!answer) {
            return res.status(404).json({ message: 'Answer not found' });
        }
        await answer.deleteOne();
        res.json({ message: 'Answer deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};