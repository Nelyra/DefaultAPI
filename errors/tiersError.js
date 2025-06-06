exports.TiersNotFoundError = class TiersNotFoundError extends Error {
    constructor(tiersName = 'unspecified') {
        super(`Tiers '${tiersName}' not found.`);
        this.name = 'TiersNotFoundError';
        this.statusCode = 404; // HTTP status code for Not Found
    }
}