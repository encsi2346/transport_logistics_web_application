import Invoice from '../models/Invoice.js';

export const getAllInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find();
        res.status(200).json(invoices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const invoice = await Invoice.findById(id);
        res.status(200).json(invoice);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const createInvoice = async (req, res) => {
    console.log('req', req);
    try {
        const {
            invoiceId,
            orderId,
            companyName,
            dateOfCreation,
            deadlineForPayment,
            price,
            status,
        } = req.body;
        const newInvoice = new Invoice({
            invoiceId,
            orderId,
            companyName,
            dateOfCreation,
            deadlineForPayment,
            price,
            status,
        });
        const savedInvoice = await newInvoice.save();
        res.status(201).json(savedInvoice);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const invoice = await Invoice.findById(id);
        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }
        if (req.body.invoiceId) {
            invoice.invoiceId = req.body.invoiceId;
            invoice.orderId = req.body.orderId;
            invoice.companyName = req.body.companyName;
            invoice.dateOfCreation = req.body.dateOfCreation;
            invoice.deadlineForPayment = req.body.deadlineForPayment;
            invoice.price = req.body.price;
            invoice.status = req.body.status;
        }
        const updatedInvoice = await invoice.save();
        res.json(updatedInvoice);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const invoice = await Invoice.findById(id);
        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }
        await invoice.deleteOne();
        res.json({ message: 'Invoice deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};