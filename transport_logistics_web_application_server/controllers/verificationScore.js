import VerificationScore from "../models/VerificationScore.js";

export const getAllVerificationScores = async (req, res) => {
    try {
        const verificationScores = await VerificationScore.find();
        res.status(200).json(verificationScores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getVerificationScore = async (req, res) => {
    try {
        const { id } = req.params;
        const verificationScore = await VerificationScore.findById(id);
        res.status(200).json(verificationScore);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const createVerificationScore = async (req, res) => {
    console.log('req', req);
    try {
        const {
            userId,
            value,
        } = req.body;
        const newVerificationScore = new VerificationScore({
            userId,
            value,
        });
        const savedVerificationScore = await newVerificationScore.save();
        res.status(201).json(savedVerificationScore);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateVerificationScore = async (req, res) => {
    try {
        const { id } = req.params;
        const verificationScore = await VerificationScore.findById(id);
        if (!verificationScore) {
            return res.status(404).json({ message: 'VerificationScore not found' });
        }
        if (req.body.userId) {
            verificationScore.userId = req.body.userId;
            verificationScore.value = req.body.value;
        }
        const updatedVerificationScore = await verificationScore.save();
        res.json(updatedVerificationScore);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteVerificationScore = async (req, res) => {
    try {
        const { id } = req.params;
        const verificationScore = await VerificationScore.findById(id);
        if (!verificationScore) {
            return res.status(404).json({ message: 'VerificationScore not found' });
        }
        await verificationScore.deleteOne();
        res.json({ message: 'VerificationScore deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};