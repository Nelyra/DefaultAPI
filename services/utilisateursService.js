const utilisateursRepository = require('../repositories/utilisateursRepository')

const UserNotFoundError = require('../errors/utilisateursError').UserNotFoundError;

exports.getAllUsers = async function() {
    return await utilisateursRepository.getAllUsers();
}

exports.getUserById = async function(id) {
    return await utilisateursRepository.getUserById(id);
}

exports.getUserAccounts = async function(id) {
    const sqlReponse = await utilisateursRepository.getUserAccounts(id);

    if (sqlReponse.length === 0) {
      throw new UserNotFoundError(id);
    }

    return sqlReponse;
}

exports.getUserAccountMovements = async function(userId, accountId) {
    return await utilisateursRepository.getUserAccountMovements(userId, accountId);
}


exports.getTiersByUserId = async function(id) {
    const result = await utilisateursRepository.getTiersByUserId(id);

    if (result.length === 0) {
        throw new UserNotFoundError(id);
    }

    return result;
}

