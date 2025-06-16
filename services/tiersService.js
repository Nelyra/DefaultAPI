const tiersRepo = require('../repositories/tiersRepository');
const TiersNotFoundError = require('../errors/tiersError').TiersNotFoundError;
const TiersNotAuthorizedError = require('../errors/tiersError').TiersNotAuthorizedError;

exports.getAllTiers = async function(id) {
    return await tiersRepo.getAllTiers(id);
}

exports.getTierById = async function(id, userId) {
    const result = await tiersRepo.getTierById(id, userId);

    if (result.length === 0) {
        throw new TiersNotFoundError(id);
    }

    return result[0];
}

exports.updateTier = async function(id, tierData, userId) {
    const result = await tiersRepo.updateTier(id, tierData, userId);

    if (result.affectedRows === 0) {
        throw new TiersNotFoundError(id);
    }

    return await this.getTierById(id, userId);
}