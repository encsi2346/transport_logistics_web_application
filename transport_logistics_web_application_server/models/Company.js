import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
    companyId: String,
    companyName: String,
    email: String,
    phoneNumber: String,
    contactPersonName: String,
});

const Company = mongoose.model('Company', companySchema);

export default Company;