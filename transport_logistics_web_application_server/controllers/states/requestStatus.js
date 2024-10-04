import { RequestStatus } from "../../models/states/RequestStatus.js";

export const getAllRequestStatus = (req, res) => {
    try {
        const requestStatus = Object.values(RequestStatus);
        res.status(200).json(requestStatus);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve requestStatus." });
    }
};
