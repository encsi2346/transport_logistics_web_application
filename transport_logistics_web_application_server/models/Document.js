import mongoose from 'mongoose';
import {DocumentStatus} from "./states/DocumentStatus.js";
import User from "./User.js";

const documentSchema = new mongoose.Schema({
    documentId: String, //azonosító
    documentType: DocumentType, //dokumentum típus
    title: String, //dokumentum neve
    timeStamp: String, //létrehozás dátuma
    status: DocumentStatus, //állapot
    creator: User, //létrehozó
    size: Number, //méret
});

const Document = mongoose.model('Document', documentSchema);

export default Document;