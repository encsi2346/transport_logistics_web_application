import mongoose from 'mongoose';
import {CommentType} from "./enums/CommentType.ts";

const commentSchema = new mongoose.Schema({
    commentId: String,
    orderId: String,
    userId: String,
    userName: String,
    type: CommentType,
    timeStamp: String,
    description: String,
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;