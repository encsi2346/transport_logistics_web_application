import { TechnicalExamStatus } from "../../models/states/TechnicalExamStatus.js";

export const getAllTechnicalExamStatus = (req, res) => {
    try {
        const technicalExamStatus = Object.values(TechnicalExamStatus);
        res.status(200).json(technicalExamStatus);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve technicalExamStatus." });
    }
};
