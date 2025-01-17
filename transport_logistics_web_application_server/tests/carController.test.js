import { describe, expect, test, it, jest } from '@jest/globals';
import { getAllCars, getCar, createCar, updateCar, deleteCar } from "../controllers/car.js";
import Car from "../models/Car.js";

jest.mock("../models/Car.js", () => ({
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
}));

describe("Car Controller", () => {
    let req, res;

    beforeEach(() => {
        req = { params: {}, body: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        jest.clearAllMocks();
    });

    describe("getAllCars", () => {
        it("should return a list of cars", async () => {
            const mockCars = [{ name: "Car A" }, { name: "Car B" }];
            Car.find.mockResolvedValue(mockCars);

            await getAllCars(req, res);

            expect(Car.find).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockCars);
        });

        it("should handle errors", async () => {
            Car.find.mockRejectedValue(new Error("Database error"));

            await getAllCars(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: "Database error" });
        });
    });

    describe("getCar", () => {
        it("should return a single car by ID", async () => {
            req.params.id = "123";
            const mockCar = { id: "123", name: "Car A" };
            Car.findById.mockResolvedValue(mockCar);

            await getCar(req, res);

            expect(Car.findById).toHaveBeenCalledWith("123");
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockCar);
        });

        it("should handle errors", async () => {
            req.params.id = "123";
            Car.findById.mockRejectedValue(new Error("Car not found"));

            await getCar(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "Car not found" });
        });
    });

    describe("createCar", () => {
        it("should create a new car", async () => {
            req.body = { name: "Car A", type: "SUV" };
            const mockCar = { id: "123", name: "Car A", type: "SUV" };
            Car.create.mockResolvedValue(mockCar);

            await createCar(req, res);

            expect(Car.create).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mockCar);
        });

        it("should handle errors", async () => {
            req.body = { name: "Car A" };
            Car.create.mockRejectedValue(new Error("Validation error"));

            await createCar(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "Validation error" });
        });
    });

    describe("updateCar", () => {
        it("should update an existing car", async () => {
            req.params.id = "123";
            req.body = { name: "Updated Car A" };
            const mockCar = { id: "123", name: "Car A", save: jest.fn().mockResolvedValue({ ...mockCar, ...req.body }) };

            Car.findById.mockResolvedValue(mockCar);

            await updateCar(req, res);

            expect(Car.findById).toHaveBeenCalledWith("123");
            expect(mockCar.save).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith({ id: "123", name: "Updated Car A" });
        });

        it("should handle car not found", async () => {
            req.params.id = "123";
            Car.findById.mockResolvedValue(null);

            await updateCar(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "Car not found" });
        });

        it("should handle errors", async () => {
            req.params.id = "123";
            Car.findById.mockRejectedValue(new Error("Database error"));

            await updateCar(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "Database error" });
        });
    });

    describe("deleteCar", () => {
        it("should delete a car by ID", async () => {
            req.params.id = "123";
            const mockCar = { id: "123", deleteOne: jest.fn().mockResolvedValue(true) };

            Car.findById.mockResolvedValue(mockCar);

            await deleteCar(req, res);

            expect(Car.findById).toHaveBeenCalledWith("123");
            expect(mockCar.deleteOne).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith({ message: "Car deleted" });
        });

        it("should handle car not found", async () => {
            req.params.id = "123";
            Car.findById.mockResolvedValue(null);

            await deleteCar(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "Car not found" });
        });

        it("should handle errors", async () => {
            req.params.id = "123";
            Car.findById.mockRejectedValue(new Error("Database error"));

            await deleteCar(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: "Database error" });
        });
    });
});
