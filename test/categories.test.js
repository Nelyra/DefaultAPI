const request = require('supertest');
const app = require('../app.js'); // Adjust the path as necessary
const mysql = require('../mysql.js').client; // Adjust the path as necessary

var testCategoryId = 8080; // This ID should be unique and not conflict with existing data

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

describe('POST /categories', () => {
    test('should create a new category', async () => {
        const newCategory = { nomCategorie: 'Test Category', idCategorie: testCategoryId };

        // Ensure the ID is unique for this test
        const existingCategory = await request(app).get(`/categories/${testCategoryId}`);
        if (existingCategory.statusCode === 200) {
            // If the category already exists, delete it before creating a new one
            await request(app).delete(`/categories/${testCategoryId}`);
        }

        const response = await request(app).post('/categories').send(newCategory);
        expect(response.statusCode).toBe(201);
        expect(response.body).toBeDefined();
        expect(response.body.nomCategorie).toBe(newCategory.nomCategorie);
        expect(response.body.idCategorie).toBeDefined();
        testCategoryId = response.body.idCategorie; // Store the ID for cleanup
    });

    test('should return 409 for duplicate category ID', async () => {
        const duplicateCategory = { nomCategorie: 'Duplicate Category', idCategorie: testCategoryId };
        const response = await request(app).post('/categories').send(duplicateCategory);
        expect(response.statusCode).toBe(409);
    });

    test('should return 400 for invalid category data', async () => {
        const response = await request(app).post('/categories').send({});
        expect(response.statusCode).toBe(400);
    });
});

describe('DELETE /categories/:id', () => {
    test('should delete a category by ID', async () => {
        const response = await request(app).delete(`/categories/${testCategoryId}`);
        expect(response.statusCode).toBe(200);
    });

    test('should return 404 for non-existent category', async () => {
        const response = await request(app).delete('/categories/9999');
        expect(response.statusCode).toBe(404);
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