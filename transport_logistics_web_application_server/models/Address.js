import mongoose from 'mongoose';
import {v4 as uuidv4} from "uuid";

const addressSchema = new mongoose.Schema({
    addressId: {
        type: String,
        default: uuidv4,
    },
    country: String, //ország
    postcode: String, //irányítószám
    city: String, //település
    nameOfPublicArea: String, //közterület neve
    typeOfPublicArea: String, //közterület jellege
    houseNumber: String, //házszám
    raktar: Boolean, //TODO: raktár-e, angol
});

const Address = mongoose.model('Address', addressSchema);

export default Address;