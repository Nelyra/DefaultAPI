exports.SubCategoryNotFoundError = class SubCategoryNotFoundError extends Error {
    constructor(subCategoryName = 'unspecifed') {
        super(`Subcategory '${subCategoryName}' not found.`);
        this.name = 'SubCategoryNotFoundError';
        this.statusCode = 404; // HTTP status code for Not Found
    }
}

exports.InvalidSubCategoryError = class InvalidSubCategoryError extends Error {
    constructor(missingFields = []) {
        super(`Invalid subcategory data. Missing fields: ${missingFields.join(', ')}`);
        this.name = 'InvalidSubCategoryError';
        this.statusCode = 400; // HTTP status code for Bad Request
    }
}

exports.DuplicateSubCategoryError = class DuplicateSubCategoryError extends Error {
    constructor(subCategoryId) {
        super(`Subcategory with ID '${subCategoryId}' already exists.`);
        this.name = 'DuplicateSubCategoryError';
        this.statusCode = 409; // HTTP status code for Conflict
    }
}