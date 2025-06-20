const tiersRepository = require('../repositories/tiersRepository');
const comptesRepository = require("../repositories/comptesRepository");
const {UserNotFoundError} = require("../errors/utilisateursError");
const TiersNotFoundError = require('../errors/tiersError').TiersNotFoundError;
const TiersNotAuthorizedError = require('../errors/tiersError').TiersNotAuthorizedError;


exports.getAllTiers = async function() {
    return await tiersRepository.getAllTiers();
}

exports.getTiersByUserId = async function(id) {
    return await tiersRepository.getTiersByUserId(id);
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
  
exports.updateTier = async function(id, tierData, userId) {
    const allTiers = await tiersRepository.getAllTiers(userId);

    // Check if the id exists in the user's tiers
    const tierExists = allTiers.filter(tier => tier.idTiers == id)[0];

    if (tierExists === undefined) {
        throw new TiersNotFoundError(id);
    }

    if(tierExists.idUtilisateur != userId) {
        throw new TiersNotAuthorizedError(id);
    }

    await tiersRepository.updateTier(id, tierData, userId);

    return await this.getTierById(id, userId);
}

exports.createTier = async function(tier, userId) {
    if (!tier.nomTiers) {
        throw new Error('Tier must have nomTiers');
    }

    return await tiersRepository.createTier(tier, userId);
}