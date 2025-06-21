const utilisateursRepository = require('../repositories/utilisateursRepository')
const comptesService = require('../services/comptesService');

const auth = require('../auth');

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

    const comptes = [];

    for (const compte of sqlResponse) {
        comptes.push(
            comptesService.getMouvementsByCompteId(compte.idCompte, category, subCategory, id)
        );
    }

    const results = await Promise.all(comptes);

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
            comptesService.getVirementsByCompteId(compte.idCompte, typeMouvement, id)
        );
    }

    const results = await Promise.all(promises);

    const virements = results.flat();

    return {
        idUtilisateur: id,
        virements: virements
    };
}

exports.updateUser = async function(id, userData) {
    // Format the password if it exists
    if (userData.mdp) {
        userData.hashCode = auth.hashPassword(userData.mdp);
    }

    const response = await utilisateursRepository.updateUser(id, userData);

    if (response.affectedRows === 0) {
        throw new UserNotFoundError(id);
    }

    return await this.getUserById(id);
}


exports.deleteUser = async function(id) {
    const response =  await utilisateursRepository.deleteUser(id);

    if (response.length === 0) {
        throw new UserNotFoundError(id);
    }

    return response[0];
}