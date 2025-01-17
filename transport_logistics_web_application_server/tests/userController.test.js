/*import { describe, expect, test, jest } from '@jest/globals';
import app from '../index.js';
import request from 'supertest';
import * as users from '../controllers/users.js';

jest.mock('../controllers/users.js', () => ({
    __esModule: true,
    getAllUsers: jest.fn(),
    createUser: jest.fn(),
}));

describe('User Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
    });

    describe('GET /api/users', () => {
        test('should return a list of users', async () => {
            const mockUsers = [{ id: 1, firstName: 'John', familyName: 'Doe', email: 'john@example.com' }];
            users.getAllUsers.mockResolvedValue(mockUsers);

            const response = await request(app).get('/api/users');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockUsers);
        });
    });

    describe('POST /api/users', () => {
        test('should create a new user', async () => {
            const newUser = { id: 2, firstName: 'Jane', familyName: 'Doe', email: 'jane@example.com' };
            users.createUser.mockResolvedValue(newUser);

            const response = await request(app)
                .post('/api/users')
                .send(newUser);

            expect(response.status).toBe(201);
            expect(response.body).toEqual(newUser);
        });
    });
});*/

import { describe, expect, test, it, jest } from '@jest/globals';
import { getAllUsers, getUser, createUser, updateUser, deleteUser, searchUsers } from "../controllers/users.js";
import User from "../models/User.js";

//jest.mock("../models/User.js");
jest.mock("../models/User.js", () => ({
    find: jest.fn(),
    findById: jest.fn(),
    prototype: {
        save: jest.fn(),
    },
}));


describe("User Controller", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("getAllUsers", () => {
        it("should return all users", async () => {
            const mockUsers = [{ name: "John Doe" }, { name: "Jane Doe" }];
            User.find.mockResolvedValue(mockUsers);

            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await getAllUsers(req, res);

            expect(User.find).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockUsers);
        });

        it("should handle errors", async () => {
            User.find.mockRejectedValue(new Error("Database error"));

            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await getAllUsers(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: "Database error" });
        });
    });

    describe("getUser", () => {
        it("should return a user by ID", async () => {
            const mockUser = { id: "1", name: "John Doe" };
            User.findById.mockResolvedValue(mockUser);

            const req = { params: { id: "1" } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await getUser(req, res);

            expect(User.findById).toHaveBeenCalledWith("1");
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockUser);
        });

        it("should handle not found error", async () => {
            User.findById.mockResolvedValue(null);

            const req = { params: { id: "1" } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await getUser(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: expect.any(String) });
        });
    });

    describe("createUser", () => {
        it("should create a new user", async () => {
            const mockUser = { id: "1", name: "John Doe" };
            User.prototype.save = jest.fn().mockResolvedValue(mockUser);

            const req = {
                body: { name: "John Doe", email: "john@example.com" },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await createUser(req, res);

            expect(User.prototype.save).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mockUser);
        });

        it("should handle validation errors", async () => {
            User.prototype.save = jest.fn().mockRejectedValue(new Error("Validation error"));

            const req = {
                body: { name: "John Doe" },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await createUser(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "Validation error" });
        });
    });

    describe("updateUser", () => {
        it("should update an existing user", async () => {
            const mockUser = { save: jest.fn().mockResolvedValue({ name: "Updated User" }) };
            User.findById.mockResolvedValue(mockUser);

            const req = { params: { id: "1" }, body: { name: "Updated User" } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await updateUser(req, res);

            expect(mockUser.save).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith({ name: "Updated User" });
        });

        it("should handle user not found", async () => {
            User.findById.mockResolvedValue(null);

            const req = { params: { id: "1" }, body: { name: "Updated User" } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await updateUser(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
        });
    });

    describe("deleteUser", () => {
        it("should delete a user", async () => {
            const mockUser = { deleteOne: jest.fn().mockResolvedValue({}) };
            User.findById.mockResolvedValue(mockUser);

            const req = { params: { id: "1" } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await deleteUser(req, res);

            expect(mockUser.deleteOne).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith({ message: "User deleted" });
        });

        it("should handle user not found", async () => {
            User.findById.mockResolvedValue(null);

            const req = { params: { id: "1" } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await deleteUser(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
        });
    });

    describe("searchUsers", () => {
        it("should return filtered users", async () => {
            const mockUsers = [{ name: "John Doe" }];
            User.find.mockResolvedValue(mockUsers);

            const req = { query: { firstName: "John" } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await searchUsers(req, res);

            expect(User.find).toHaveBeenCalledWith({ firstName: { $regex: "John", $options: "i" } });
            expect(res.json).toHaveBeenCalledWith({ content: mockUsers });
        });
    });
});
