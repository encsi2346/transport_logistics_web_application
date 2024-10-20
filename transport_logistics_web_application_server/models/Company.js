import mongoose from 'mongoose';
import Address from "./Address.js";
import {v4 as uuidv4} from "uuid";

const companySchema = new mongoose.Schema({
    companyId: {
        type: String,
        default: uuidv4,
    },
    companyName: String, //megrendelő neve
    email: String, //megrendelő email címe
    phoneNumber: String, //megrendelő telefonszáma
    address: Address, //megrendelő címe
    contactPersonName: String, //kapcsolattartó
});

const Company = mongoose.model('Company', companySchema);

export default Company;