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