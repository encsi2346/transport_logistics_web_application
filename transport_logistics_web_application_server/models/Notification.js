import mongoose from 'mongoose';
import {v4 as uuidv4} from "uuid";

const notificationSchema = new mongoose.Schema({
    notificationId: {
        type: String,
        default: uuidv4,
    },
    timeStamp: Date, //TODO: datetime létrehozás dátum idő
    notificationType: String, //TODO: enum értesítés típusa
    title: String, //tárgy
    description: String, //leírás
    read: Boolean, //olvasott-e
});

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;