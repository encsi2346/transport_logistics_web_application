import Company from '../models/Company.js';

export const getAllCompanies = async (req, res) => {
    try {
        const companies = await Company.find();
        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCompany = async (req, res) => {
    try {
        const { id } = req.params;
        const company = await Company.findById(id);
        res.status(200).json(company);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const createCompany = async (req, res) => {
    console.log('req', req);
    try {
        const {
            companyId,
            companyName,
            email,
            phoneNumber,
            contactPersonName,
            address,
        } = req.body;
        const newCompany = new Company({
            companyId,
            companyName,
            email,
            phoneNumber,
            contactPersonName,
            address,
        });
        const savedCompany = await newCompany.save();
        res.status(201).json(savedCompany);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateCompany = async (req, res) => {
    try {
        const { id } = req.params;
        const company = await Company.findById(id);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        if (req.body.companyId) {
            company.companyId = req.body.companyId;
            company.companyName = req.body.companyName;
            company.email = req.body.email;
            company.phoneNumber = req.body.phoneNumber;
            company.contactPersonName = req.body.contactPersonName;
            company.address = req.body.address;
        }
        const updatedCompany = await company.save();
        res.json(updatedCompany);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteCompany = async (req, res) => {
    try {
        const { id } = req.params;
        const company = await Company.findById(id);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        await company.deleteOne();
        res.json({ message: 'Company deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};