import { RouteStatus } from "../../models/states/RouteStatus.js";

export const getAllRouteStatus = (req, res) => {
    try {
        const routeStatus = Object.values(RouteStatus);
        res.status(200).json(routeStatus);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve routeStatus." });
    }
};
