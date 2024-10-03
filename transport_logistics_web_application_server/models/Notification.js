import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    notificationId: String,
    timeStamp: Date, //TODO: datetime létrehozás dátum idő
    notificationType: String, //TODO: enum értesítés típusa
    title: String, //tárgy
    description: String, //leírás
    read: Boolean, //olvasott-e
});

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;