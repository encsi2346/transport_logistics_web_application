import mongoose from 'mongoose';

const carTypeSchema = new mongoose.Schema({
    //TODO márka, típus, szállítóeszköz típusa, vontatás, raktér
    carTypeId: String,
    name: String,
    design: String, //kivitel
    performance: Number, //teljesítmény
    selfWeight: Number, //saját tömeg
    numberOfSeats: Number, //ülések száma
    fuel: String, //üzemanyag
    usefulWeight: Number, //hasznos teher
});

const CarType = mongoose.model('CarType', carTypeSchema);

export default CarType;