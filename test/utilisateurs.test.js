const request = require('supertest');
const app = require('../app.js'); // Adjust the path as necessary
const mysql = require('../mysql.js').client; // Adjust the path as necessary

afterAll(() => {
    return mysql.end();
});

describe('DELETE /utilisateurs/:id', () => {
    // test('should delete a user by ID', async () => {
    //     const response = await request(app).delete('/utilisateurs/1');
    //     expect(response.statusCode).toBe(204);
    // });

    test('should return 404 for non-existent user', async () => {
        const response = await request(app).delete('/utilisateurs/9999');
        expect(response.statusCode).toBe(404);
    });
});

describe('GET /utilisateurs/:id', () => {
    test('should return a user by ID', async () => {
        const response = await request(app).get('/utilisateurs/1');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body['idUtilisateur']).toBe(1);
    });

    test('should return 404 for non-existent user', async () => {
        const response = await request(app).get('/utilisateurs/9999');
        expect(response.statusCode).toBe(404);
    });
});

describe('GET /utilisateurs/:id/mouvements', () => {
    test('should return movements for a user', async () => {
        const response = await request(app).get('/utilisateurs/1/mouvements');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        expect(Array.isArray(response.body["mouvements"])).toBe(true);
    });

    test('should return 404 for non-existent user', async () => {
        const response = await request(app).get('/utilisateurs/9999/mouvements');
        expect(response.statusCode).toBe(404);
    });
});

describe('GET /utilisateurs/:id/tiers', () => {
    test('should return tiers for a user', async () => {
        const response = await request(app).get('/utilisateurs/1/tiers');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('should return 404 for non-existent user', async () => {
        const response = await request(app).get('/utilisateurs/9999/tiers');
        expect(response.statusCode).toBe(404);
    });
});

describe('GET /utilisateurs/:id/virements', () => {
    test('should return virements for a user', async () => {
        const response = await request(app).get('/utilisateurs/1/virements');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        expect(Array.isArray(response.body["virements"])).toBe(true);
    });

    test('should return 404 for non-existent user', async () => {
        const response = await request(app).get('/utilisateurs/9999/virements');
        expect(response.statusCode).toBe(404);
    });
});