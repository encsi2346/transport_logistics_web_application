import mongoose from 'mongoose';
import {DocumentStatus} from "./states/DocumentStatus.js";
import {DocumentType} from "./enums/DocumentType.js";
import {v4 as uuidv4} from "uuid";

const documentSchema = new mongoose.Schema({
    documentId: {
        type: String,
        default: uuidv4,
    }, //azonosító
    documentType:{
        type: String,
        enum: Object.values(DocumentType), //dokumentum típus
    },
    title: String, //dokumentum neve
    timeStamp: String, //létrehozás dátuma
    status:{
        type: String,
        enum: Object.values(DocumentStatus), //állapot
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to User model for driver
    },
    size: Number, //méret
});

const Document = mongoose.model('Document', documentSchema);

export default Document;