exports.TiersNotFoundError = class TiersNotFoundError extends Error {
    constructor(tiersName = 'unspecified') {
        super(`Tiers '${tiersName}' not found.`);
        this.name = 'TiersNotFoundError';
        this.statusCode = 404; // HTTP status code for Not Found
    }
}

exports.TiersNotAuthorizedError = class TiersNotAuthorizedError extends Error {
    constructor(tiersName = 'unspecified') {
        super(`You are not authorized to access tiers '${tiersName}'.`);
        this.name = 'TiersNotAuthorizedError';
        this.statusCode = 403; // HTTP status code for Forbidden
    }
}  