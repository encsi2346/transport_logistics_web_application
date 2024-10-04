import { DrivingLicenceType } from "../../models/enums/DrivingLicenceType.js";

export const getAllDrivingLicenceTypes = (req, res) => {
    try {
        const drivingLicenceTypes = Object.values(DrivingLicenceType);
        res.status(200).json(drivingLicenceTypes);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve drivingLicenceTypes." });
    }
};
