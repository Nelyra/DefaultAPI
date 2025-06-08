const request = require('supertest');
const app = require('../app.js'); // Adjust the path as necessary
const mysql = require('../mysql.js').client; // Adjust the path as necessary

afterAll(() => {
    mysql.end();
});

describe('GET /categories', () => {
    test('should return a list of categories', async () => {
        const response = await request(app).get('/categories');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        expect(Array.isArray(response.body)).toBe(true);
    });
});