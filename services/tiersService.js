const tiersRepository = require('../repositories/tiersRepository');
const comptesRepository = require("../repositories/comptesRepository");
const {UserNotFoundError} = require("../errors/utilisateursError");
const TiersNotFoundError = require('../errors/tiersError').TiersNotFoundError;

exports.getAllTiers =
    async function(id) {
    return await tiersRepository.getAllTiers(id);
}

exports.getTierById = async function(id, userId) {
    const result = await tiersRepository.getTierById(id, userId);

    if (result.length === 0) {
        throw new TiersNotFoundError(id);
    }

    return result[0];
}

exports.deleteTiers = async function(id) {
    const response =  await tiersRepository.deleteTiers(id);

    if (response.length === 0) {
        throw new UserNotFoundError(id);
    }
    return response[0];
}