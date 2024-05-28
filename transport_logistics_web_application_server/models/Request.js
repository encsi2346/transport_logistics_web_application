import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
    requestId: String,
    title: String,
    selectedDate: String, //TODO: datetime
    reason: String,
    status: String, //TODO: enum
    answerId: String,
    userId: String,
});

const Request = mongoose.model('Request', requestSchema);

export default Request;