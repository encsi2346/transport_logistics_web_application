import { ProductStatus } from "../../models/states/ProductStatus.js";

export const getAllProductStatus = (req, res) => {
    try {
        const productStatus = Object.values(ProductStatus);
        res.status(200).json(productStatus);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve productStatus." });
    }
};
