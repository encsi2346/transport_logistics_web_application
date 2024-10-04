import { PositionType } from "../../models/enums/PositionType.js";

export const getAllPositionTypes = (req, res) => {
    try {
        const positionTypes = Object.values(PositionType);
        res.status(200).json(positionTypes);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve positionTypes." });
    }
};
