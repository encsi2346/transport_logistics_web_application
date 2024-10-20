import mongoose from 'mongoose';
import {CommentType} from "./enums/CommentType.js";
import {v4 as uuidv4} from "uuid";

const commentSchema = new mongoose.Schema({
    commentId: {
        type: String,
        default: uuidv4,
    },
    orderId: String,
    userId: String,
    userName: String,
    type: CommentType,
    timeStamp: String,
    description: String,
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;