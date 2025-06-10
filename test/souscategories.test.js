const request = require('supertest');
const app = require('../app.js'); // Adjust the path as necessary
const mysql = require('../mysql.js').client; // Adjust the path as necessary

afterAll(() => {
    return mysql.end();
});

describe('GET /sous-categories', () => {
    test('should return a list of subcategories', async () => {
        const response = await request(app).get('/sous-categories');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        expect(Array.isArray(response.body)).toBe(true);
    });
});

describe('GET /sous-categories/:id', () => {
    test('should return a subcategory by ID', async () => {
        const response = await request(app).get('/sous-categories/1');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body['idSousCategorie']).toBe(1);
    });

    test('should return 404 for non-existent subcategory', async () => {
        const response = await request(app).get('/sous-categories/9999');
        expect(response.statusCode).toBe(404);
    });
});