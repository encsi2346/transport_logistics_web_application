import mongoose from 'mongoose';
import Address from "./Address.js";

const companySchema = new mongoose.Schema({
    companyId: String,
    companyName: String, //megrendelő neve
    email: String, //megrendelő email címe
    phoneNumber: String, //megrendelő telefonszáma
    address: Address, //megrendelő címe
    contactPersonName: String, //kapcsolattartó
});

const Company = mongoose.model('Company', companySchema);

export default Company;