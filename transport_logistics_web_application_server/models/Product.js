import mongoose from 'mongoose';
import {ProductStatus} from "./states/ProductStatus.js";
import {Double} from "mongodb";
import {v4 as uuidv4} from "uuid";

const productSchema = new mongoose.Schema({
    productId: {
        type: String,
        default: uuidv4,
    },
    name: String, //termék neve
    description: String, //leírás
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductCategory", // kategória
    },
    articleNumber: Number, //Cikkszám
    barcode: Number, //Vonalkód
    selfWeight: Number, //Önsúly
    maxNumberOfItems: Number, //Max darabszám
    currentNumberOfItems: Number, //Jelenlegi darabszám
    szazalek: Number, //készletszázalék TODO: angolul
    status:{
        type: String,
        enum: Object.values(ProductStatus), //állapot
    },

});

const Product = mongoose.model('Product', productSchema);

export default Product;