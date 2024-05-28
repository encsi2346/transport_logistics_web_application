import mongoose from 'mongoose';
import {AnswerOption} from "./enums/AnswerOption.ts";

const answerSchema = new mongoose.Schema({
    answerId: String,
    requestId: String,
    answerOption: AnswerOption,
    reason: String,
    userId: String,
});

const Answer = mongoose.model('Answer', answerSchema);

export default Answer;