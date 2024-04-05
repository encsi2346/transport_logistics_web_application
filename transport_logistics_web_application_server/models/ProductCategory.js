import mongoose from 'mongoose';

const productCategorySchema = new mongoose.Schema({
    name: String,
    description: String,
});

const ProductCategory = mongoose.model('ProductCategory', productCategorySchema);

export default ProductCategory;