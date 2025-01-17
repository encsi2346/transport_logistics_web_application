import { describe, expect, test, it, jest } from '@jest/globals';
import { getAllProduct, getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/product.js';
import Product from '../models/Product.js';
import ProductCategory from '../models/ProductCategory';

jest.mock('../models/Product.js');
jest.mock('../models/ProductCategory.js');

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
};

describe('Product Controller', () => {
    describe('getAllProduct', () => {
        it('should return all products', async () => {
            const req = {};
            const res = mockResponse();

            Product.find.mockResolvedValue([{ name: 'Product 1' }, { name: 'Product 2' }]);

            await getAllProduct(req, res);

            expect(Product.find).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([{ name: 'Product 1' }, { name: 'Product 2' }]);
        });

        it('should handle errors', async () => {
            const req = {};
            const res = mockResponse();

            Product.find.mockRejectedValue(new Error('Database Error'));

            await getAllProduct(req, res);

            expect(Product.find).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Database Error' });
        });
    });

    describe('getProduct', () => {
        it('should return a product by id', async () => {
            const req = { params: { id: '123' } };
            const res = mockResponse();

            Product.findById.mockResolvedValue({ id: '123', name: 'Product 1' });

            await getProduct(req, res);

            expect(Product.findById).toHaveBeenCalledWith('123');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ id: '123', name: 'Product 1' });
        });

        it('should handle product not found', async () => {
            const req = { params: { id: '123' } };
            const res = mockResponse();

            Product.findById.mockResolvedValue(null);

            await getProduct(req, res);

            expect(Product.findById).toHaveBeenCalledWith('123');
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: expect.any(String) });
        });

        it('should handle errors', async () => {
            const req = { params: { id: '123' } };
            const res = mockResponse();

            Product.findById.mockRejectedValue(new Error('Database Error'));

            await getProduct(req, res);

            expect(Product.findById).toHaveBeenCalledWith('123');
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Database Error' });
        });
    });

    describe('createProduct', () => {
        it('should create a new product', async () => {
            const req = {
                body: {
                    productId: '001',
                    name: 'New Product',
                    description: 'Description',
                    category: '123',
                    articleNumber: 'AN001',
                    barcode: 'BC001',
                    selfWeight: 10,
                    maxNumberOfItems: 100,
                    currentNumberOfItems: 50,
                    status: 'available',
                    szazalek: 20
                }
            };
            const res = mockResponse();

            Product.mockImplementation(() => ({
                save: jest.fn().mockResolvedValue(req.body),
            }));

            await createProduct(req, res);

            expect(Product).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(req.body);
        });

        it('should handle errors', async () => {
            const req = { body: {} };
            const res = mockResponse();

            Product.mockImplementation(() => ({
                save: jest.fn().mockRejectedValue(new Error('Validation Error')),
            }));

            await createProduct(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Validation Error' });
        });
    });

    describe('updateProduct', () => {
        it('should update an existing product', async () => {
            const req = {
                params: { id: '123' },
                body: { name: 'Updated Product' },
            };
            const res = mockResponse();

            const mockProduct = {
                save: jest.fn().mockResolvedValue({ id: '123', name: 'Updated Product' }),
            };
            Product.findById.mockResolvedValue(mockProduct);

            await updateProduct(req, res);

            expect(Product.findById).toHaveBeenCalledWith('123');
            expect(mockProduct.save).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith({ id: '123', name: 'Updated Product' });
        });

        it('should handle product not found', async () => {
            const req = { params: { id: '123' }, body: {} };
            const res = mockResponse();

            Product.findById.mockResolvedValue(null);

            await updateProduct(req, res);

            expect(Product.findById).toHaveBeenCalledWith('123');
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Product not found' });
        });

        it('should handle errors', async () => {
            const req = { params: { id: '123' }, body: {} };
            const res = mockResponse();

            Product.findById.mockRejectedValue(new Error('Database Error'));

            await updateProduct(req, res);

            expect(Product.findById).toHaveBeenCalledWith('123');
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Database Error' });
        });
    });

    describe('deleteProduct', () => {
        it('should delete a product by id', async () => {
            const req = { params: { id: '123' } };
            const res = mockResponse();

            const mockProduct = { deleteOne: jest.fn().mockResolvedValue({}) };
            Product.findById.mockResolvedValue(mockProduct);

            await deleteProduct(req, res);

            expect(Product.findById).toHaveBeenCalledWith('123');
            expect(mockProduct.deleteOne).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith({ message: 'Product deleted' });
        });

        it('should handle product not found', async () => {
            const req = { params: { id: '123' } };
            const res = mockResponse();

            Product.findById.mockResolvedValue(null);

            await deleteProduct(req, res);

            expect(Product.findById).toHaveBeenCalledWith('123');
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Product not found' });
        });

        it('should handle errors', async () => {
            const req = { params: { id: '123' } };
            const res = mockResponse();

            Product.findById.mockRejectedValue(new Error('Database Error'));

            await deleteProduct(req, res);

            expect(Product.findById).toHaveBeenCalledWith('123');
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Database Error' });
        });
    });
});
