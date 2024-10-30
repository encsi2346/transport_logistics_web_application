import { MedicalVisitStatus } from "../../models/states/MedicalVisitStatus.js";

export const getAllMedicalVisitStatus = (req, res) => {
    try {
        const medicalVisitStatus = Object.values(MedicalVisitStatus);
        res.status(200).json(medicalVisitStatus);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve medicalVisitStatus." });
    }
};