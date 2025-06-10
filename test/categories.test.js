const request = require('supertest');
const app = require('../app.js'); // Adjust the path as necessary
const mysql = require('../mysql.js').client; // Adjust the path as necessary

afterAll(() => {
    return mysql.end();
});

describe('GET /categories', () => {
    test('should return a list of categories', async () => {
        const response = await request(app).get('/categories');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        expect(Array.isArray(response.body)).toBe(true);
    });
});

describe('GET /categories/:id', () => {
    test('should return a category by ID', async () => {
        const response = await request(app).get('/categories/1');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body['idCategorie']).toBe(1);
    });

    test('should return 404 for non-existent category', async () => {
        const response = await request(app).get('/categories/9999');
        expect(response.statusCode).toBe(404);
    });
});

describe('GET /categories/:id/sous-categories', () => {
    test('should return subcategories for a category', async () => {
        const response = await request(app).get('/categories/1/sous-categories');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('should return 404 for non-existent category', async () => {
        const response = await request(app).get('/categories/9999/sous-categories');
        expect(response.statusCode).toBe(404);
    });
});