const utilisateursRepository = require('../repositories/utilisateursRepository')
const UserNotFoundError = require('../errors/utilisateursError').UserNotFoundError;

exports.getAllUsers = async function() {
    return await utilisateursRepository.getAllUsers();
}

exports.getTiersByUserId = async function(id) {
    const result = await utilisateursRepository.getTiersByUserId(id);

    if (result.length === 0) {
        throw new UserNotFoundError(id);
    }

    return result;
}