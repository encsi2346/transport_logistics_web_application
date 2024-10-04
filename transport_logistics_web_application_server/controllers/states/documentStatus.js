import { DocumentStatus } from "../../models/states/DocumentStatus.js";

export const getAllDocumentStatus = (req, res) => {
    try {
        const documentStatus = Object.values(DocumentStatus);
        res.status(200).json(documentStatus);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve documentStatus." });
    }
};
