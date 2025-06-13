
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const jwt = require('jsonwebtoken'); // Import jsonwebtoken for token generation

const authenicateRepository = require('../repositories/authenticateRepository');
const utilisateursRepository = require('../repositories/utilisateursRepository');

const UserNotFoundError = require('../errors/utilisateursError').UserNotFoundError;
const AuthError = require('../errors/authenticateError').AuthError;


exports.authenticate = async (username, password) => {
    try {
        const user = (await utilisateursRepository.getUserByLogin(username))[0]; // Get corresponding user by login
        
        if (user === undefined) {
            throw new UserNotFoundError(username); // If user is not found, throw an error
        }

        const isPasswordValid = await bcrypt.compare(password, user.hashcode); // Compare the provided password with the stored hashed password

        if (!isPasswordValid) {
            throw new AuthError(); // If password is invalid, throw an authentication error
        }

        // If authentication is successful, create a session or token as needed
        const token = jwt.sign({ id: user.idUtilisateur, username: user.login }, process.env.SECRET_KEY, { expiresIn: '1h' }); // Generate a JWT token

        return {
            id: user.idUtilisateur,
            username: user.login,
            token: token // Return the user ID, username, and token
        };
        
    } catch (error) {
        throw error; // Propagate the error to be handled by the calling function
    }
}