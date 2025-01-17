import Product from '../models/Product.js';
import ProductCategory from "../models/ProductCategory.js";

export const getAllProduct = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const createProduct = async (req, res) => {
    console.log('req', req);
    try {
        const {
            productId,
            name,
            description,
            category,
            articleNumber,
            barcode,
            selfWeight,
            maxNumberOfItems,
            currentNumberOfItems,
            status,
            szazalek
        } = req.body;
        const newProduct = new Product({
            productId,
            name,
            description,
            category,
            articleNumber,
            barcode,
            selfWeight,
            maxNumberOfItems,
            currentNumberOfItems,
            status,
            szazalek
        });
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        if (req.body.productId) {
            product.productId = req.body.productId;
            product.name = req.body.name;
            product.description = req.body.description;
            product.category = req.body.category;
            product.articleNumber = req.body.articleNumber;
            product.barcode = req.body.barcode;
            product.selfWeight = req.body.selfWeight;
            product.maxNumberOfItems = req.body.maxNumberOfItems;
            product.currentNumberOfItems = req.body.currentNumberOfItems;
            product.status = req.body.status;
            product.szazalek = req.body.szazalek;
        }
        const updatedProduct = await Product.save();
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        await product.deleteOne();
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const paginatedProduct = async (req, res) => {
    try {
        const { featured, name, category, sortBy, priceRange, page = 1, limit = 10 } = req.query;
        const query = {};

        if (featured) {
            query.featured = true;
        }
        if (category) {
            try {
                const categoryData = await ProductCategory.findOne({ _id: category });

                if (!categoryData) {
                    return res.status(400).json({ error: 'Category not found' });
                }
                query.category = categoryData._id;
            } catch (err) {
                console.error('Error while fetching category:', err);
                return res.status(500).json({ error: 'Error retrieving category data' });
            }
        }
        if (name) {
            query.name = name;
        }
        if (priceRange) {
            const [minPrice, maxPrice] = String(priceRange).split('-').map(Number);
            query.price = { $gte: minPrice, $lte: maxPrice };
        }

        const parsedPage = parseInt(page, 10) || 1;  // Default page to 1 if invalid
        const parsedLimit = parseInt(limit, 10) || 10;  // Default limit to 10 if invalid

        const options = {
            skip: (parsedPage - 1) * parsedLimit,
            limit: parsedLimit,
            sort: sortBy === "asc" ? { name: 1 } : { name: -1 },
        };

        const products = await Product.find(query, null, options).populate({ path: 'category', select: 'name', strictPopulate: false });
        const total = await Product.countDocuments(query);
        const totalPublished = await Product.countDocuments({ isDisplayed: true, ...query });

        const totalPages = Math.ceil(total / parsedLimit);
        const paginatedProducts = {
            products,
            total,
            limit: parsedLimit,
            page: parsedPage,
            pages: totalPages,
            totalPublished
        };
        return res.status(200).send(paginatedProducts);
    } catch (error) {
        console.error('Error in getPaginatedProducts middleware:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const productsByCategory = async (req, res) => {
    try {
        const { featured, name, category } = req.query;
        const query = {};

        if (featured) {
            query.featured = true;
        }
        if (category) {
            try {
                // Find the category by ID
                const categoryData = await ProductCategory.findOne({ _id: category });

                // Check if category data is found
                if (!categoryData) {
                    return res.status(400).json({ error: 'Category not found' });
                }
                query.category = categoryData._id;
            } catch (err) {
                console.error('Error while fetching category:', err);
                return res.status(500).json({ error: 'Error retrieving category data' });
            }
        }
        if (name) {
            query.name = name;
        }

        const products = await Product.find(query, null).populate({ path: 'category', select: 'name', strictPopulate: false });

        return res.status(200).send(products);
    } catch (error) {
        console.error('Error in getPaginatedProducts middleware:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
