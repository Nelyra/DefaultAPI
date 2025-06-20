exports.CompteNotFoundError = class CompteNotFoundError extends Error {
    constructor(compteName = 'unspecified') {
        super(`Compte '${compteName}' not found.`);
        this.name = 'CompteNotFoundError';
        this.statusCode = 404; // HTTP status code for Not Found
    }
}

exports.CompteMissingFieldsError = class CompteMissingFieldsError extends Error {   
    constructor(fields) {
        super(`Missing required fields for creating a compte: ${fields.join(', ')}`);
        this.name = 'CompteMissingFieldsError';
        this.statusCode = 400;
    }
}

exports.VirementMissingFieldsError = class VirementMissingFieldsError extends Error {
    constructor(fields) {
        super(`Missing required fields for creating a virement: ${fields.join(', ')}`);
        this.name = 'VirementMissingFieldsError';
        this.statusCode = 400;
    }
}

exports.VirementWrongTypeSpecified = class VirementWrongTypeSpecified extends Error {
    constructor(fields) {
        super(`Wrong movement type specified, must be C or D: ${fields.join(', ')}`);
        this.name = 'VirementWrongTypeSpecified';
        this.statusCode = 404;
    }
}

exports.MouvementMissingFieldsError = class MouvementMissingFieldsError extends Error {
    constructor(fields) {
        super(`Missing required fields for creating a mouvement: ${fields.join(', ')}`);
        this.name = 'MouvementMissingFieldsError';
        this.statusCode = 400;
    }
}

exports.CompteUnauthorizedError = class CompteUnauthorizedError extends Error {
    constructor(compteName = 'unspecified') {
        super(`Unauthorized access to compte '${compteName}'.`);
        this.name = 'CompteUnauthorizedError';
        this.statusCode = 403; // HTTP status code for Forbidden
    }
}