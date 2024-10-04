import { OrderStatus } from "../../models/states/OrderStatus.js";

export const getAllOrderStatus = (req, res) => {
    try {
        const orderStatus = Object.values(OrderStatus);
        res.status(200).json(orderStatus);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve orderStatus." });
    }
};
