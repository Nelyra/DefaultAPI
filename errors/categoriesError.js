exports.CategoryNotFoundError = class CategoryNotFoundError extends Error {
    constructor(categoryName = 'unspecifed') {
        super(`Category '${categoryName}' not found.`);
        this.name = 'CategoryNotFoundError';
        this.statusCode = 404; // HTTP status code for Not Found
    }
}