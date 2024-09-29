import mongoose from 'mongoose';
import {AnswerOptionType} from "./enums/AnswerOptionType.ts";

const answerSchema = new mongoose.Schema({
    answerId: String,
    requestId: String, //kérés azonosítója
    answerOption: AnswerOptionType, //válasz
    reason: String, //indoklás
    userId: String, //válaszoló user
});

const Answer = mongoose.model('Answer', answerSchema);

export default Answer;