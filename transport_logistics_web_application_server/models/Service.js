import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
    appointment: String, //szervíz időpontja //TODO datetime
    nameOfServiceCompany: String, //szervíz neve
    driverName: String, //szállító kolléga neve
    dateOfRecording: String, //rögzítés időpontja TODO: datetime
    grossSumPrice: Number, //összes bruttó ár
    netSumPrice: Number, //összes nettó ár
    VAT: Number, //áfa
    title: String, //tárgy
    description: String, //leírás
    reparation: String, //részletek TODO javítás array --> mit-csere/javítás/átnézés-bruttóár-nettóár
    car: String, //szervizelt autó TODO car típus
});

const Service = mongoose.model('Service', serviceSchema);

export default Service;