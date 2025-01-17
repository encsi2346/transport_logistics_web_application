import { describe, expect, test, it, jest } from '@jest/globals';
import {
    getAllProductCategories,
    getProductCategory,
    createProductCategory,
    updateProductCategory,
    deleteProductCategory
} from '../controllers/productCategories.js';
import ProductCategory from '../models/ProductCategory.js';

// Mock the ProductCategory model
jest.mock('../models/ProductCategory.js');

describe('ProductCategory Controller', () => {
    let req, res;

    beforeEach(() => {
        req = { params: {}, body: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        jest.clearAllMocks();
    });

    describe('getAllProductCategories', () => {
        it('should return all product categories', async () => {
            const mockCategories = [{ name: 'Category 1' }, { name: 'Category 2' }];
            ProductCategory.find.mockResolvedValue(mockCategories);

            await getAllProductCategories(req, res);

            expect(ProductCategory.find).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockCategories);
        });

        it('should handle errors', async () => {
            ProductCategory.find.mockRejectedValue(new Error('Database error'));

            await getAllProductCategories(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
        });
    });

    describe('getProductCategory', () => {
        it('should return a product category by ID', async () => {
            const mockCategory = { id: '1', name: 'Category 1' };
            req.params.id = '1';
            ProductCategory.findById.mockResolvedValue(mockCategory);

            await getProductCategory(req, res);

            expect(ProductCategory.findById).toHaveBeenCalledWith('1');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockCategory);
        });

        it('should handle errors', async () => {
            req.params.id = '1';
            ProductCategory.findById.mockRejectedValue(new Error('Not Found'));

            await getProductCategory(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Not Found' });
        });
    });

    describe('createProductCategory', () => {
        it('should create a new product category', async () => {
            const mockCategory = { id: '1', name: 'Category 1' };
            req.body = mockCategory;
            ProductCategory.mockImplementation(() => ({
                save: jest.fn().mockResolvedValue(mockCategory),
            }));

            await createProductCategory(req, res);

            expect(ProductCategory).toHaveBeenCalledWith(mockCategory);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mockCategory);
        });

        it('should handle errors', async () => {
            req.body = { name: 'Category 1' };
            ProductCategory.mockImplementation(() => ({
                save: jest.fn().mockRejectedValue(new Error('Validation error')),
            }));

            await createProductCategory(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Validation error' });
        });
    });

    describe('updateProductCategory', () => {
        it('should update a product category', async () => {
            const mockCategory = {
                save: jest.fn().mockResolvedValue({ name: 'Updated Category' }),
            };
            req.params.id = '1';
            req.body = { name: 'Updated Category' };
            ProductCategory.findById.mockResolvedValue(mockCategory);

            await updateProductCategory(req, res);

            expect(ProductCategory.findById).toHaveBeenCalledWith('1');
            expect(mockCategory.save).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith({ name: 'Updated Category' });
        });

        it('should handle errors', async () => {
            req.params.id = '1';
            ProductCategory.findById.mockRejectedValue(new Error('Not Found'));

            await updateProductCategory(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Not Found' });
        });

        it('should return 404 if category is not found', async () => {
            req.params.id = '1';
            ProductCategory.findById.mockResolvedValue(null);

            await updateProductCategory(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'ProductCategory not found' });
        });
    });

    describe('deleteProductCategory', () => {
        it('should delete a product category', async () => {
            const mockCategory = { deleteOne: jest.fn().mockResolvedValue() };
            req.params.id = '1';
            ProductCategory.findById.mockResolvedValue(mockCategory);

            await deleteProductCategory(req, res);

            expect(ProductCategory.findById).toHaveBeenCalledWith('1');
            expect(mockCategory.deleteOne).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith({ message: 'ProductCategory deleted' });
        });

        it('should handle errors', async () => {
            req.params.id = '1';
            ProductCategory.findById.mockRejectedValue(new Error('Database error'));

            await deleteProductCategory(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
        });

        it('should return 404 if category is not found', async () => {
            req.params.id = '1';
            ProductCategory.findById.mockResolvedValue(null);

            await deleteProductCategory(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'ProductCategory not found' });
        });
    });
});
