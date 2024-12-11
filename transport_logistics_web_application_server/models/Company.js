import mongoose from 'mongoose';
import Address from "./Address.js";
import {v4 as uuidv4} from "uuid";
import {CommentType} from "./enums/CommentType.js";

const companySchema = new mongoose.Schema({
    companyName: String, //megrendelő neve
    email: String, //megrendelő email címe
    phoneNumber: String, //megrendelő telefonszáma
    contactPersonName: String, //kapcsolattartó
    country: String, //ország
    postcode: String, //irányítószám
    city: String, //település
    nameOfPublicArea: String, //közterület neve
    typeOfPublicArea: String, //közterület jellege
    houseNumber: String, //házszám
    isItCarService: Boolean, //autószervíz e
});

const Company = mongoose.model('Company', companySchema);

export default Company;