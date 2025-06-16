const utilisateursRepository = require('../repositories/utilisateursRepository')
const comptesService = require('../services/comptesService');

const UserNotFoundError = require('../errors/utilisateursError').UserNotFoundError;

exports.getUserbyLogin = async function(username) {
    const response = await utilisateursRepository.getUserByLogin(username);
    if (response.length === 0) {
        throw new UserNotFoundError(username);
    }
    return response[0];
}

exports.getUserById = async function(id) {
    const response =  await utilisateursRepository.getUserById(id);

    if (response.length === 0) {
        throw new UserNotFoundError(id);
    }

    return response[0];
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

exports.getUserMouvementsById = async function(id, category, subCategory) {
    const sqlResponse = await comptesService.getAllComptes(id);

    if (sqlResponse.length === 0) {
        throw new UserNotFoundError(id);
    }

    const promises = [];

    for (const compte of sqlResponse) {
        promises.push(
            comptesService.getMouvementsByCompteId(compte.idCompte, category, subCategory)
        );
    }

    const results = await Promise.all(promises);

    const mouvements = results.flat();

    return {
        idUtilisateur: id,
        mouvements: mouvements
    };
}

exports.getUserVirementsById = async function(id, typeMouvement) {
    const sqlResponse = await comptesService.getAllComptes(id);

    if (sqlResponse.length === 0) {
        throw new UserNotFoundError(id);
    }

    const promises = [];

    for (const compte of sqlResponse) {
        promises.push(
            comptesService.getVirementsByCompteId(compte.idCompte, typeMouvement)
        );
    }

    const results = await Promise.all(promises);

    const virements = results.flat();

    return {
        idUtilisateur: id,
        virements: virements
    };
}


exports.deleteUser = async function(id) {
    const response =  await utilisateursRepository.deleteUser(id);

    if (response.length === 0) {
        throw new UserNotFoundError(id);
    }

    return response[0];
}