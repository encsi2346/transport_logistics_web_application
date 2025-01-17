import { describe, expect, test, it, jest } from '@jest/globals';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import nodemailer from 'nodemailer';
import { registration, login, requestPasswordReset, resetPassword } from '../controllers/auth.js';

jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('nodemailer');
jest.mock('../models/User.js');

describe('Auth Controller Tests', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('registration', () => {
        it('should register a new user and return it', async () => {
            const req = {
                body: {
                    email: 'test@example.com',
                    password: 'password123',
                },
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            bcrypt.genSalt.mockResolvedValue('mockSalt');
            bcrypt.hash.mockResolvedValue('mockHashedPassword');

            User.prototype.save = jest.fn().mockResolvedValue({
                email: 'test@example.com',
                password: 'mockHashedPassword',
            });

            await registration(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                email: 'test@example.com',
                password: 'mockHashedPassword',
            });
        });

        it('should handle errors during registration', async () => {
            const req = { body: { email: 'test@example.com', password: 'password123' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            bcrypt.genSalt.mockRejectedValue(new Error('Salt generation failed'));

            await registration(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Salt generation failed' });
        });
    });

    describe('login', () => {
        it('should log in a user and return a token', async () => {
            const req = {
                body: {
                    email: 'test@example.com',
                    password: 'password123',
                },
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            const mockUser = { email: 'test@example.com', password: 'mockHashedPassword', _id: 'mockUserId' };

            User.findOne.mockResolvedValue(mockUser);
            bcrypt.compare.mockResolvedValue(true);
            jwt.sign.mockReturnValue('mockToken');

            await login(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                token: 'mockToken',
                user: mockUser,
            });
        });

        it('should return error for invalid credentials', async () => {
            const req = {
                body: {
                    email: 'test@example.com',
                    password: 'wrongPassword',
                },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            User.findOne.mockResolvedValue({ email: 'test@example.com', password: 'mockHashedPassword' });
            bcrypt.compare.mockResolvedValue(false);

            await login(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Invalid credentials.' });
        });
    });

    describe('requestPasswordReset', () => {
        it('should send a password reset email', async () => {
            const req = { body: { email: 'test@example.com' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            const mockUser = { email: 'test@example.com', _id: 'mockUserId', password: 'mockHashedPassword' };

            User.findOne.mockResolvedValue(mockUser);
            jwt.sign.mockReturnValue('mockResetToken');

            const mockTransporter = {
                sendMail: jest.fn().mockResolvedValue(true),
            };

            nodemailer.createTransport.mockReturnValue(mockTransporter);

            await requestPasswordReset(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Password reset link sent' });
        });

        it('should handle errors when user does not exist', async () => {
            const req = { body: { email: 'nonexistent@example.com' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            User.findOne.mockResolvedValue(null);

            await requestPasswordReset(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "User doesn't exist" });
        });
    });

    describe('resetPassword', () => {
        it('should reset the user password', async () => {
            const req = {
                query: { id: 'mockUserId', token: 'mockToken' },
                body: { password: 'newPassword' },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            const mockUser = { _id: 'mockUserId', password: 'oldPassword' };

            User.findOne.mockResolvedValue(mockUser);
            jwt.verify.mockReturnValue({ id: 'mockUserId', email: 'test@example.com' });
            bcrypt.hash.mockResolvedValue('mockNewHashedPassword');

            await resetPassword(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Password has been reset' });
        });

        it('should handle errors when user does not exist', async () => {
            const req = { query: { id: 'nonexistentId', token: 'mockToken' }, body: { password: 'newPassword' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            User.findOne.mockResolvedValue(null);

            await resetPassword(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'User not exists!' });
        });
    });
});
