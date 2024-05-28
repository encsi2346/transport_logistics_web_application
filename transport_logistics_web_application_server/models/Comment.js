import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    _id: String,
    orderId: String,
    userId: String,
    userName: String,
    type: String, //TODO: enum
    timeStamp: String, //TODO: datetime
    description: String,
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;