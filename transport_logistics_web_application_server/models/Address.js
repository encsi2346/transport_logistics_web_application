import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
    addressId: String,
    country: String, //ország
    postcode: String, //irányítószám
    city: String, //település
    nameOfPublicArea: String, //közterület neve
    typeOfPublicArea: String, //közterület jellege
    houseNumber: String, //házszám
});

const Address = mongoose.model('Address', addressSchema);

export default Address;