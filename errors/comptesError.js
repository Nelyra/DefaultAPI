exports.CompteNotFoundError = class CompteNotFoundError extends Error {
    constructor(compteName = 'unspecified') {
        super(`Compte '${compteName}' not found.`);
        this.name = 'CompteNotFoundError';
        this.statusCode = 404; // HTTP status code for Not Found
    }
}

exports.CompteUnauthorizedError = class CompteUnauthorizedError extends Error {
    constructor(compteName = 'unspecified') {
        super(`Unauthorized access to compte '${compteName}'.`);
        this.name = 'CompteUnauthorizedError';
        this.statusCode = 403; // HTTP status code for Forbidden
    }
}