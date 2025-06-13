const request = require('supertest');
const app = require('../app.js'); // Adjust the path as necessary
const mysql = require('../mysql.js').client; // Adjust the path as necessary

afterAll(() => {
    return mysql.end();
});

describe('GET /tiers', () => {
    test('should return a list of third parties', async () => {
        const response = await request(app).get('/tiers');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        expect(Array.isArray(response.body)).toBe(true);
    });
});

describe('GET /tiers/:id', () => {
    test('should return a third party by ID', async () => {
        const response = await request(app).get('/tiers/1');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body['idTiers']).toBe(1);
    });

    test('should return 404 for non-existent third party', async () => {
        const response = await request(app).get('/tiers/9999');
        expect(response.statusCode).toBe(404);
    });
});

describe('DELETE /tiers/:id', () => {
    test('should delete a third party by ID', async () => {
        const response = await request(app).delete('/tiers/1');
        expect(response.statusCode).toBe(204);
    });

    test('should return 404 for non-existent third party', async () => {
        const response = await request(app).delete('/tiers/9999');
        expect(response.statusCode).toBe(404);
    });
});