import Comment from '../models/Comment.js';

export const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find();
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getComment = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findById(id);
        res.status(200).json(comment);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const createComment = async (req, res) => {
    console.log('req', req);
    try {
        const {
            _id,
            orderId,
            userId,
            userName,
            type,
            timeStamp,
            description,
        } = req.body;
        const newComment = new Comment({
            _id,
            orderId,
            userId,
            userName,
            type,
            timeStamp,
            description,
        });
        const savedComment = await newComment.save();
        res.status(201).json(savedComment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        if (req.body._id) {
            comment._id = req.body._id;
            comment.orderId = req.body.orderId;
            comment.userId = req.body.userId;
            comment.userName = req.body.userName;
            comment.type = req.body.type;
            comment.timeStamp = req.body.timeStamp;
            comment.description = req.body.description;
        }
        const updatedComment = await comment.save();
        res.json(updatedComment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        await comment.deleteOne();
        res.json({ message: 'Comment deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};