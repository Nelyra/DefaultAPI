exports.AuthError = class AuthError extends Error {
    constructor(message = 'Authentication failed') {
        super(message);
        this.name = 'AuthenticationError';
        this.statusCode = 401; // HTTP status code for Unauthorized
    }
}