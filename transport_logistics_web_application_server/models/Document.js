import mongoose from 'mongoose';
import {DocumentStatus} from "./states/DocumentStatus.js";
import {DocumentType} from "./enums/DocumentType.js";
import {v4 as uuidv4} from "uuid";

const documentSchema = new mongoose.Schema({
    documentType: {
        type: String,
        enum: Object.values(DocumentType), //dokumentum típus
    },
    title: String, //dokumentum neve -- ez lesz a feltöltött valami
    timeStampOfUploading: String, //létrehozás dátuma
    statusOfDocumentUploading: {
        type: String,
        enum: Object.values(DocumentStatus), //állapot
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    size: Number,
    carId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car",
    },
});

const Document = mongoose.model('Document', documentSchema);

export default Document;