import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
    _id: String,
    documentType: String, //TODO: enum
    title: String,
    timeStamp: String, //TODO: DateTime
    status: String,
});

const Document = mongoose.model('Document', documentSchema);

export default Document;