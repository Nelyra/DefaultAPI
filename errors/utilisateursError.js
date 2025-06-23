exports.UserNotFoundError = class UserNotFoundError extends Error {
    constructor(userName = 'unspecifed') {
        super(`User '${userName}' not found.`);
        this.name = 'UserNotFoundError';
        this.statusCode = 404; // HTTP status code for Not Found
    }
}