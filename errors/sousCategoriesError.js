exports.SubCategoryNotFoundError = class SubCategoryNotFoundError extends Error {
    constructor(subCategoryName = 'unspecifed') {
        super(`Subcategory '${subCategoryName}' not found.`);
        this.name = 'SubCategoryNotFoundError';
        this.statusCode = 404; // HTTP status code for Not Found
    }
}