import mongoose from 'mongoose';

const verificationScoreSchema = new mongoose.Schema({
    userId: String,
    value: String,
});

const VerificationScore = mongoose.model('VerificationScore', verificationScoreSchema);

export default VerificationScore;