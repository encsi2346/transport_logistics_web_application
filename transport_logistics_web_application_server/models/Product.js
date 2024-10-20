import mongoose from 'mongoose';
import {ProductStatus} from "./states/ProductStatus.js";
import ProductCategory from "./ProductCategory.js";
import {Double} from "mongodb";
import {v4 as uuidv4} from "uuid";

const productSchema = new mongoose.Schema({
    productId: {
        type: String,
        default: uuidv4,
    },
    name: String, //termék neve
    description: String, //leírás
    category: ProductCategory, //kategória
    articleNumber: Number, //Cikkszám
    barcode: Number, //Vonalkód
    selfWeight: Number, //Önsúly
    maxNumberOfItems: Number, //Max darabszám
    currentNumberOfItems: Number, //Jelenlegi darabszám
    szazalek: Double, //készletszázalék TODO: angolul
    status: ProductStatus, //Állapot
});

const ProductCategory = mongoose.model('Product', productSchema);

export default ProductCategory;