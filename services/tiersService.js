var tiersRepo = require('../repositories/tiersRepository');

exports.getAllTiers = async function() {
    return await tiersRepo.getAllTiers();
}

exports.getTierById = async function(id) {
    const result = await tiersRepo.getTierById(id);

    if (result.length === 0) {
        throw new Error(`Tiers with ID ${id} not found`);
    }

    return result[0];
}