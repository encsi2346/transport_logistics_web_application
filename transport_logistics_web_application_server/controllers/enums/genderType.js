import { GenderType } from "../../models/enums/GenderType.js";

export const getAllGenders = (req, res) => {
    try {
        const genders = Object.values(GenderType);
        res.status(200).json(genders);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve genders." });
    }
};
