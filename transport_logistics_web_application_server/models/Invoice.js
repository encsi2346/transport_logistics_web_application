import mongoose from 'mongoose';
import {InvoiceStatus} from "./states/InvoiceStatus.js";

const invoiceSchema = new mongoose.Schema({
    invoiceId: String, //számla azonosító
    orderId: String, //rendelés azonosító
    companyId: String, //megrendelő azonosító
    dateOfCreation: Date, //létrehozás dátuma
    deadlineForPayment: Date, //fizetési határidő
    price: String, //összeg
    status: InvoiceStatus, //állapot
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

export default Invoice;