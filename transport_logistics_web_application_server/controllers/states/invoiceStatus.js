import { InvoiceStatus } from "../../models/states/InvoiceStatus.js";

export const getAllInvoiceStatus = (req, res) => {
    try {
        const invoiceStatus = Object.values(InvoiceStatus);
        res.status(200).json(invoiceStatus);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve invoiceStatus." });
    }
};
