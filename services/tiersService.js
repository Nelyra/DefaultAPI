const tiersRepo = require('../repositories/tiersRepository');
const TiersNotFoundError = require('../errors/tiersError').TiersNotFoundError;

exports.getAllTiers = async function() {
    return await tiersRepo.getAllTiers();
}

exports.getTierById = async function(id) {
    const result = await tiersRepo.getTierById(id);

    if (result.length === 0) {
        throw new TiersNotFoundError(id);
    }

    return result[0];
}