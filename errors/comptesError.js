exports.CompteNotFoundError = class CompteNotFoundError extends Error {
    constructor(compteName = 'unspecified') {
        super(`Compte '${compteName}' not found.`);
        this.name = 'CompteNotFoundError';
        this.statusCode = 404; // HTTP status code for Not Found
    }
}