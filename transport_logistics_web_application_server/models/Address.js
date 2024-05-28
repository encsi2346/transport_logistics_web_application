import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
    addressId: String,
    country: String,
    postcode: String,
    city: String,
    nameOfPublicArea: String,
    typeOfPublicArea: String,
    houseNumber: String,
});

const Address = mongoose.model('Address', addressSchema);

export default Address;