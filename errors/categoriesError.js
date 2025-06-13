exports.CategoryNotFoundError = class CategoryNotFoundError extends Error {
    constructor(categoryName = 'unspecifed') {
        super(`Category '${categoryName}' not found.`);
        this.name = 'CategoryNotFoundError';
        this.statusCode = 404; // HTTP status code for Not Found
    }
}

exports.InvalidCategoryError = class InvalidCategoryError extends Error {
    constructor(missingFields = []) {
        super(`Invalid category data. Missing fields: ${missingFields.join(', ')}`);
        this.name = 'InvalidCategoryError';
        this.statusCode = 400; // HTTP status code for Bad Request
    }
}

exports.DuplicateCategoryError = class DuplicateCategoryError extends Error {
    constructor(categoryId) {
        super(`Category with ID '${categoryId}' already exists.`);
        this.name = 'DuplicateCategoryError';
        this.statusCode = 409; // HTTP status code for Conflict
    }
}