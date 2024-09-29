import ProductCategory from '../models/ProductCategory.js';

export const getAllProductCategories = async (req, res) => {
    try {
        const productCategories = await ProductCategory.find();
        res.status(200).json(productCategories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProductCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const productCategory = await ProductCategory.findById(id);
        res.status(200).json(productCategory);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const createProductCategory = async (req, res) => {
    console.log('req', req);
    try {
        const {
            productCategoryId,
            name,
            description,
            status
        } = req.body;
        const newProductCategory = new ProductCategory({
            productCategoryId,
            name,
            description,
            status
        });
        const savedProductCategory = await newProductCategory.save();
        res.status(201).json(savedProductCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateProductCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const productCategory = await ProductCategory.findById(id);
        if (!productCategory) {
            return res.status(404).json({ message: 'ProductCategory not found' });
        }
        if (req.body.productCategoryId) {
            productCategory.productCategoryId = req.body.productCategoryId;
            productCategory.name = req.body.name;
            productCategory.description = req.body.description;
            productCategory.status = req.body.status;
        }
        const updatedProductCategory = await productCategory.save();
        res.json(updatedProductCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteProductCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const productCategory = await ProductCategory.findById(id);
        if (!productCategory) {
            return res.status(404).json({ message: 'ProductCategory not found' });
        }
        await productCategory.deleteOne();
        res.json({ message: 'ProductCategory deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};