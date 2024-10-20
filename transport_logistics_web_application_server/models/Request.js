import mongoose from 'mongoose';
import {RequestStatus} from "./states/RequestStatus.js";
import {v4 as uuidv4} from "uuid";

const requestSchema = new mongoose.Schema({
    requestId: {
        type: String,
        default: uuidv4,
    },
    title: String, //tárgy
    typeOfRequest: RequestStatus, //kérés típusa //TODO
    selectedDate: String, //érintett munkanap
    reason: String, //indoklás
    status: RequestStatus, //állapot
    answerId: String, //feladó
    userId: String, //válasz
});

const Request = mongoose.model('Request', requestSchema);

export default Request;