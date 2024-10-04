import { AnswerOptionType } from "../../models/enums/AnswerOptionType.js";

export const getAllAnswerOptionTypes = (req, res) => {
    try {
        const answerOptionTypes = Object.values(AnswerOptionType);
        res.status(200).json(answerOptionTypes);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve answerOptionTypes." });
    }
};
