import mongoose from 'mongoose';
import {DocumentStatus} from "./enums/DocumentStatus.ts";

const documentSchema = new mongoose.Schema({
    documentId: String,
    documentType: DocumentType,
    title: String,
    timeStamp: String,
    status: DocumentStatus,
});

const Document = mongoose.model('Document', documentSchema);

export default Document;