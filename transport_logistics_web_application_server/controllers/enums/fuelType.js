import { FuelType } from "../../models/enums/FuelType.js";

export const getAllFuelTypes = (req, res) => {
    try {
        const fuelTypes = Object.values(FuelType);
        res.status(200).json(fuelTypes);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve fuelTypes." });
    }
};
