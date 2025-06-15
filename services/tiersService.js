const tiersRepo = require('../repositories/tiersRepository');
const TiersNotFoundError = require('../errors/tiersError').TiersNotFoundError;

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