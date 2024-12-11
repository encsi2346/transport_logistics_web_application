import mongoose from 'mongoose';
import {InvoiceStatus} from "./states/InvoiceStatus.js";
import {v4 as uuidv4} from "uuid";

const invoiceSchema = new mongoose.Schema({
    orderId:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
    },
    companyId:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
    },
    transportationPlanId:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TransportationPlan",
    },
    dateOfCreation: Date, //létrehozás dátuma
    deadlineForPayment: Date, //fizetési határidő
    price: String, //összeg
    statusOfInvoice: {
        type: String,
        enum: Object.values(InvoiceStatus), //állapot
    },
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

export default Invoice;