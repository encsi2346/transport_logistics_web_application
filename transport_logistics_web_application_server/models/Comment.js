import mongoose from 'mongoose';
import {CommentType} from "./enums/CommentType.js";
import {v4 as uuidv4} from "uuid";
import {AnswerOptionType} from "./enums/AnswerOptionType.js";

const commentSchema = new mongoose.Schema({
    commentId: {
        type: String,
        default: uuidv4,
    },
    orderId: String,
    userId: String,
    userName: String,
    type:{
        type: String,
        enum: Object.values(CommentType),
    },
    timeStamp: String,
    description: String,
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;