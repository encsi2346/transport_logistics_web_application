import { AnswerObjectType } from "../../models/enums/AnswerObjectType.js";

export const getAllAnswerObjectTypes = (req, res) => {
    try {
        const answerObjectTypes = Object.values(AnswerObjectType);
        res.status(200).json(answerObjectTypes);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve answerObjectTypes." });
    }
};
