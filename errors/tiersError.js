exports.TiersNotFoundError = class TiersNotFoundError extends Error {
    constructor(tiersName = 'unspecified') {
        super(`Tiers '${tiersName}' not found.`);
        this.name = 'TiersNotFoundError';
        this.statusCode = 404; // HTTP status code for Not Found
    }
}

exports.TiersMissingFieldsError = class TiersMissingFieldsError extends Error {
    constructor(fields) {
        super(`Missing required fields for creating a tiers: ${fields.join(', ')}`);
        this.name = 'TiersMissingFieldsError';
        this.statusCode = 400; 
    }
}

exports.TiersNotAuthorizedError = class TiersNotAuthorizedError extends Error {
    constructor(tiersName = 'unspecified') {
        super(`You are not authorized to access tiers '${tiersName}'.`);
        this.name = 'TiersNotAuthorizedError';
        this.statusCode = 403; // HTTP status code for Forbidden
    }
}  