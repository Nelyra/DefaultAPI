const request = require('supertest');
const app = require('../app.js'); // Adjust the path as necessary
const mysql = require('../mysql.js').client; // Adjust the path as necessary

var token = null;

beforeAll(async () => {
    const auth = await request(app).post('/authenticate').send({
        username: 'jdupont',
        password: '1234'
    }); 
    token = auth.body.token;
})
afterAll(() => {
    return mysql.end();
});

describe('GET /tiers', () => {
    test('should return a list of tiers', async () => {
        const response = await request(app).get('/tiers').set('Authorization', token);
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        expect(Array.isArray(response.body)).toBe(true);
    });
});

describe('GET /tiers/:id', () => {
    test('should return a tiers', async () => {
        const response = await request(app).get('/tiers/1').set('Authorization', token);
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body['idTiers']).toBe(1);
    });

    test('should return 404 for non-existent third party', async () => {
        const response = await request(app).get('/tiers/9999').set('Authorization', token);
        expect(response.statusCode).toBe(404);
    });
});

describe('DELETE /tiers/:id', () => {
    // test('should delete a third party by ID', async () => {
    //     const response = await request(app).delete('/tiers/1');
    //     expect(response.statusCode).toBe(204);
    // });

    test('should return 404 for non-existent third party', async () => {
        const response = await request(app).delete('/tiers/9999').set('Authorization', token);
        expect(response.statusCode).toBe(404);
    });
});