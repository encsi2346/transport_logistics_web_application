import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
    answerId: String,
    requestId: String,
    status: String, //TODO: enum
    reason: String,
});

const Answer = mongoose.model('Answer', answerSchema);

export default Answer;