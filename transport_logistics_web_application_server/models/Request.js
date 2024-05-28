import mongoose from 'mongoose';
import {RequestStatus} from "./enums/RequestStatus.ts";

const requestSchema = new mongoose.Schema({
    requestId: String,
    title: String,
    selectedDate: String,
    reason: String,
    status: RequestStatus,
    answerId: String,
    userId: String,
});

const Request = mongoose.model('Request', requestSchema);

export default Request;