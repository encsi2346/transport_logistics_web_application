import { describe, expect, test, it, jest } from '@jest/globals';
import {
    getAllCarTypes,
    getCarType,
    createCarType,
    updateCarType,
    deleteCarType,
    paginatedCarType,
    searchCarTypes,
} from '../controllers/carType.js';
import CarType from '../models/CarType';
import CarTypeOfTransportation from '../models/CarTypeOfTransportation';

describe('CarType Controller', () => {
    let req;
    let res;

    beforeEach(() => {
        req = { body: {}, params: {}, query: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
        };
    });

    describe('getAllCarTypes', () => {
        it('should return all car types', async () => {
            const mockCarTypes = [{ id: 1, name: 'SUV' }, { id: 2, name: 'Sedan' }];
            CarType.find = jest.fn().mockResolvedValue(mockCarTypes);

            await getAllCarTypes(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockCarTypes);
        });

        it('should handle errors', async () => {
            CarType.find = jest.fn().mockRejectedValue(new Error('Error fetching car types'));

            await getAllCarTypes(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error fetching car types' });
        });
    });

    describe('getCarType', () => {
        it('should return a car type by ID', async () => {
            const mockCarType = { id: 1, name: 'SUV' };
            req.params.id = '1';
            CarType.findById = jest.fn().mockResolvedValue(mockCarType);

            await getCarType(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockCarType);
        });

        it('should handle errors', async () => {
            req.params.id = '1';
            CarType.findById = jest.fn().mockRejectedValue(new Error('Error fetching car type'));

            await getCarType(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error fetching car type' });
        });
    });

    describe('createCarType', () => {
        it('should create a new car type', async () => {
            const mockCarType = { id: 1, name: 'SUV' };
            req.body = mockCarType;
            CarType.prototype.save = jest.fn().mockResolvedValue(mockCarType);

            await createCarType(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mockCarType);
        });

        it('should handle errors', async () => {
            req.body = { name: 'SUV' };
            CarType.prototype.save = jest.fn().mockRejectedValue(new Error('Error creating car type'));

            await createCarType(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error creating car type' });
        });
    });

    describe('updateCarType', () => {
        it('should update an existing car type', async () => {
            const mockCarType = { id: 1, save: jest.fn().mockResolvedValue({ id: 1, name: 'Updated SUV' }) };
            req.params.id = '1';
            req.body = { name: 'Updated SUV' };
            CarType.findById = jest.fn().mockResolvedValue(mockCarType);

            await updateCarType(req, res);

            expect(res.json).toHaveBeenCalledWith({ id: 1, name: 'Updated SUV' });
        });

        it('should handle errors', async () => {
            req.params.id = '1';
            CarType.findById = jest.fn().mockRejectedValue(new Error('Error updating car type'));

            await updateCarType(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error updating car type' });
        });
    });

    describe('deleteCarType', () => {
        it('should delete an existing car type', async () => {
            const mockCarType = { id: 1, deleteOne: jest.fn().mockResolvedValue() };
            req.params.id = '1';
            CarType.findById = jest.fn().mockResolvedValue(mockCarType);

            await deleteCarType(req, res);

            expect(res.json).toHaveBeenCalledWith({ message: 'CarType deleted' });
        });

        it('should handle errors', async () => {
            req.params.id = '1';
            CarType.findById = jest.fn().mockRejectedValue(new Error('Error deleting car type'));

            await deleteCarType(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error deleting car type' });
        });
    });

    describe('paginatedCarType', () => {
        it('should return paginated car types', async () => {
            const mockCarTypes = [{ id: 1, name: 'SUV' }];
            const mockCount = 10;
            req.query = { page: '1', limit: '5', sortBy: 'asc' };
            CarType.find = jest.fn().mockResolvedValue(mockCarTypes);
            CarType.countDocuments = jest.fn().mockResolvedValue(mockCount);

            await paginatedCarType(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith({
                carTypes: mockCarTypes,
                total: mockCount,
                limit: 5,
                page: 1,
                pages: 2,
                totalPublished: mockCount,
            });
        });

        it('should handle errors', async () => {
            CarType.find = jest.fn().mockRejectedValue(new Error('Error fetching paginated car types'));

            await paginatedCarType(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
        });
    });

    describe('searchCarTypes', () => {
        it('should search car types by brand', async () => {
            const mockCarTypes = [{ id: 1, brand: 'Toyota' }];
            req.query = { brand: 'Toyota' };
            CarType.find = jest.fn().mockResolvedValue(mockCarTypes);

            await searchCarTypes(req, res);

            expect(res.json).toHaveBeenCalledWith({ content: mockCarTypes });
        });

        it('should handle errors', async () => {
            req.query = { brand: 'Toyota' };
            CarType.find = jest.fn().mockRejectedValue(new Error('Error fetching car types'));

            await searchCarTypes(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Server error' });
        });
    });
});
