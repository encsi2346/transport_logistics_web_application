import mongoose from 'mongoose';
import {InvoiceStatus} from "./states/InvoiceStatus.js";
import {v4 as uuidv4} from "uuid";

const invoiceSchema = new mongoose.Schema({
    invoiceId: {
        type: String,
        default: uuidv4,
    }, //számla azonosító
    orderId: String, //rendelés azonosító
    companyId: String, //megrendelő azonosító
    dateOfCreation: Date, //létrehozás dátuma
    deadlineForPayment: Date, //fizetési határidő
    price: String, //összeg
    status: InvoiceStatus, //állapot
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

export default Invoice;