import mongoose from 'mongoose';
import {RequestStatus} from "./states/RequestStatus.js";
import {v4 as uuidv4} from "uuid";
import {ProductStatus} from "./states/ProductStatus.js";

const requestSchema = new mongoose.Schema({
    requestId: {
        type: String,
        default: uuidv4,
    },
    title: String, //tárgy
    typeOfRequest:{
        type: String,
        enum: Object.values(RequestStatus), //kérés típusa
    },
    selectedDate: String, //érintett munkanap
    reason: String, //indoklás
    status:{
        type: String,
        enum: Object.values(RequestStatus), //állapot
    },
    answerId: String, //feladó
    userId: String, //válasz
});

const Request = mongoose.model('Request', requestSchema);

export default Request;