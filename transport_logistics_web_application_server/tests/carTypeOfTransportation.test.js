import { describe, expect, test, it, jest } from '@jest/globals';
import {
    getAllCarTypeOfTransportations,
    getCarTypeOfTransportation,
    createCarTypeOfTransportation,
    updateCarTypeOfTransportation,
    deleteCarTypeOfTransportation
} from '../controllers/carTypeOfTransportation.js';
import CarTypeOfTransportation from '../models/CarTypeOfTransportation.js';

jest.mock('../models/CarTypeOfTransportation.js');

describe('CarTypeOfTransportation Controller', () => {
    let req, res;

    beforeEach(() => {
        req = { body: {}, params: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    describe('getAllCarTypeOfTransportations', () => {
        it('should return all carTypeOfTransportations', async () => {
            const mockData = [
                { id: '1', type: 'Sedan', countOfCars: 10 },
                { id: '2', type: 'SUV', countOfCars: 5 },
            ];
            CarTypeOfTransportation.find.mockResolvedValue(mockData);

            await getAllCarTypeOfTransportations(req, res);

            expect(CarTypeOfTransportation.find).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockData);
        });

        it('should handle errors', async () => {
            const errorMessage = 'Database error';
            CarTypeOfTransportation.find.mockRejectedValue(new Error(errorMessage));

            await getAllCarTypeOfTransportations(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
        });
    });

    describe('getCarTypeOfTransportation', () => {
        it('should return a carTypeOfTransportation by id', async () => {
            const mockData = { id: '1', type: 'Sedan', countOfCars: 10 };
            req.params.id = '1';
            CarTypeOfTransportation.findById.mockResolvedValue(mockData);

            await getCarTypeOfTransportation(req, res);

            expect(CarTypeOfTransportation.findById).toHaveBeenCalledWith('1');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockData);
        });

        it('should handle errors', async () => {
            const errorMessage = 'Not found';
            req.params.id = '1';
            CarTypeOfTransportation.findById.mockRejectedValue(new Error(errorMessage));

            await getCarTypeOfTransportation(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
        });
    });

    describe('createCarTypeOfTransportation', () => {
        it('should create a new carTypeOfTransportation', async () => {
            const mockData = { id: '1', type: 'Sedan', countOfCars: 10 };
            req.body = mockData;
            CarTypeOfTransportation.prototype.save = jest.fn().mockResolvedValue(mockData);

            await createCarTypeOfTransportation(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mockData);
        });

        it('should handle errors', async () => {
            const errorMessage = 'Invalid data';
            req.body = { type: 'Sedan' };
            CarTypeOfTransportation.prototype.save = jest.fn().mockRejectedValue(new Error(errorMessage));

            await createCarTypeOfTransportation(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
        });
    });

    describe('updateCarTypeOfTransportation', () => {
        it('should update a carTypeOfTransportation', async () => {
            const mockData = { id: '1', type: 'Sedan', countOfCars: 10 };
            req.params.id = '1';
            req.body = { type: 'SUV', countOfCars: 5 };

            CarTypeOfTransportation.findById.mockResolvedValue(mockData);
            CarTypeOfTransportation.save = jest.fn().mockResolvedValue({ ...mockData, ...req.body });

            await updateCarTypeOfTransportation(req, res);

            expect(CarTypeOfTransportation.findById).toHaveBeenCalledWith('1');
            expect(res.json).toHaveBeenCalledWith({ ...mockData, ...req.body });
        });

        it('should handle not found errors', async () => {
            req.params.id = '1';
            CarTypeOfTransportation.findById.mockResolvedValue(null);

            await updateCarTypeOfTransportation(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'CarTypeOfTransportation not found' });
        });

        it('should handle other errors', async () => {
            const errorMessage = 'Update error';
            req.params.id = '1';
            CarTypeOfTransportation.findById.mockRejectedValue(new Error(errorMessage));

            await updateCarTypeOfTransportation(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
        });
    });

    describe('deleteCarTypeOfTransportation', () => {
        it('should delete a carTypeOfTransportation', async () => {
            const mockData = { id: '1', type: 'Sedan', countOfCars: 10 };
            req.params.id = '1';
            CarTypeOfTransportation.findById.mockResolvedValue(mockData);
            mockData.deleteOne = jest.fn().mockResolvedValue();

            await deleteCarTypeOfTransportation(req, res);

            expect(CarTypeOfTransportation.findById).toHaveBeenCalledWith('1');
            expect(res.json).toHaveBeenCalledWith({ message: 'CarTypeOfTransportation deleted' });
        });

        it('should handle not found errors', async () => {
            req.params.id = '1';
            CarTypeOfTransportation.findById.mockResolvedValue(null);

            await deleteCarTypeOfTransportation(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'CarTypeOfTransportation not found' });
        });

        it('should handle other errors', async () => {
            const errorMessage = 'Delete error';
            req.params.id = '1';
            CarTypeOfTransportation.findById.mockRejectedValue(new Error(errorMessage));

            await deleteCarTypeOfTransportation(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
        });
    });
});
