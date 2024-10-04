import { Roles } from "../../models/enums/Roles.js";

export const getAllRoles = (req, res) => {
    try {
        const roles = Object.values(Roles);
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve roles." });
    }
};
