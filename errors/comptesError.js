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

exports.MouvementTypeInvalid = class MouvementTypeInvalid extends Error {
    constructor(typeMouvement) {
        super(`Wrong movement type specified, must be C or D. Given ${typeMouvement}`);
        this.name = 'MouvementTypeInvalid';
        this.statusCode = 400;
    }
}

exports.InvalidMontantError = class InvalidMontantError extends Error {
    constructor(montant) {
        super(`Invalid montant: ${montant}. Montant must be a number.`);
        this.name = 'InvalidMontantError';
        this.statusCode = 400; // HTTP status code for Bad Request
    }
}

exports.IdenticalCompteError = class IdenticalCompteError extends Error {
    constructor(idCompteCredit, idCompteDebit) {
        super(`Cannot create a virement between the same compte: ${idCompteCredit} and ${idCompteDebit}.`);
        this.name = 'IdenticalCompteError';
        this.statusCode = 400; // HTTP status code for Bad Request
    }
}

exports.NegativeMontantError = class NegativeMontantError extends Error {
    constructor(montant) {
        super(`Invalid montant: ${montant}. Montant must be a strictly positive number (above 0).`);
        this.name = 'InvalidMontantError';
        this.statusCode = 400; // HTTP status code for Bad Request
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