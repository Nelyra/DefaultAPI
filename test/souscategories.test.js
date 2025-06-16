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

describe('POST /sous-categories', () => {
    test('should create a new subcategory', async () => {
        const newSubCategory = { nomSousCategorie: 'Test Subcategory', idSousCategorie: 1001, idCategorie: 1 };

        // Ensure the ID is unique for this test
        const existingSubCategory = await request(app).get(`/sous-categories/${newSubCategory.idSousCategorie}`);
        if (existingSubCategory.statusCode === 200) {
            // If the subcategory already exists, delete it before creating a new one
            await request(app).delete(`/sous-categories/${newSubCategory.idSousCategorie}`);
        }

        const postResponse = await request(app).post('/sous-categories').send(newSubCategory);
        const getResponse = await request(app).get(`/sous-categories/${newSubCategory.idSousCategorie}`);
        expect(postResponse.statusCode).toBe(201);
        expect(postResponse.body).toBeDefined();
        expect(getResponse.body.nomSousCategorie).toBe(newSubCategory.nomSousCategorie);
        expect(getResponse.body.idSousCategorie).toBeDefined();
    });

    test('should return 409 for duplicate subcategory ID', async () => {
        const duplicateSubCategory = { nomSousCategorie: 'Duplicate Subcategory', idSousCategorie: 1001, idCategorie: 1 };
        const response = await request(app).post('/sous-categories').send(duplicateSubCategory);
        expect(response.statusCode).toBe(409);
    });

    test('should return 400 for invalid subcategory data', async () => {
        const response = await request(app).post('/sous-categories').send({});
        expect(response.statusCode).toBe(400);
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

describe('DELETE /sous-categories/:id', () => {
    test('should delete a subcategory by ID', async () => {
        const response = await request(app).delete('/sous-categories/1001');
        expect(response.statusCode).toBe(204);
    });

    test('should return 404 for non-existent subcategory', async () => {
        const response = await request(app).delete('/sous-categories/9999');
        expect(response.statusCode).toBe(404);
    });
});