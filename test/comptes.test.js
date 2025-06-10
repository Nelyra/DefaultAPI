const request = require('supertest');
const app = require('../app.js'); // Adjust the path as necessary
const mysql = require('../mysql.js').client; // Adjust the path as necessary

afterAll(() => {
    return mysql.end();
});

describe('GET /comptes', () => {
    test('should return a list of accounts', async () => {
        const response = await request(app).get('/comptes');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        expect(Array.isArray(response.body)).toBe(true);
    });
});

describe('GET /comptes/:id', () => {
    test('should return an account by ID', async () => {
        const response = await request(app).get('/comptes/1');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body['idCompte']).toBe(1);
    });

    test('should return 404 for non-existent account', async () => {
        const response = await request(app).get('/comptes/9999');
        expect(response.statusCode).toBe(404);
    });
});

describe('GET /comptes/:id/mouvements', () => {
    test('should return movements for an account', async () => {
        const response = await request(app).get('/comptes/1/mouvements');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('should return 404 for non-existent account', async () => {
        const response = await request(app).get('/comptes/9999/mouvements');
        expect(response.statusCode).toBe(404);
    });
});

describe('GET /comptes/:id/virements', () => {
    test('should return transfers for an account', async () => {
        const response = await request(app).get('/comptes/1/virements');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('should return 404 for non-existent account', async () => {
        const response = await request(app).get('/comptes/9999/virements');
        expect(response.statusCode).toBe(404);
    });
});