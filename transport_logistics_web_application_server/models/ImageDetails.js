import mongoose from 'mongoose';
import {v4 as uuidv4} from "uuid";

//TODO: konkrét userhez mentse el

const ImageDetailsSchema = new mongoose.Schema({
        image: String,
        userId: {
            type: String,
            default: uuidv4,
            //required: true,
        },
        carId: {
            type: String,
            default: uuidv4,
            //required: true,
        },
        productId: {
            type: String,
            default: uuidv4,
            //required: true,
        },
    },
    {
        collection: "ImageDetails",
    });

const ImageDetails = mongoose.model("ImageDetails", ImageDetailsSchema);

export default ImageDetails;