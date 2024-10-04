import { CommentType } from "../../models/enums/CommentType.js";

export const getAllCommentTypes = (req, res) => {
    try {
        const commentTypes = Object.values(CommentType);
        res.status(200).json(commentTypes);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve commentTypes." });
    }
};
