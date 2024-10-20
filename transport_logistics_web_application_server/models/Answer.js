import mongoose from 'mongoose';
import {AnswerOptionType} from "./enums/AnswerOptionType.js";
import {v4 as uuidv4} from "uuid";

const answerSchema = new mongoose.Schema({
    answerId: {
        type: String,
        default: uuidv4,
    },
    requestId: String, //kérés azonosítója
    answerOption: AnswerOptionType, //válasz
    reason: String, //indoklás
    userId: String, //válaszoló user
});

const Answer = mongoose.model('Answer', answerSchema);

export default Answer;