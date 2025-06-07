const comptesRepository = require('../repositories/comptesRepository');
const CompteNotFoundError = require('../errors/comptesError').CompteNotFoundError;

exports.getAllComptes = async function() {
    return await comptesRepository.getAllComptes();
}

exports.getCompteById = async function(id) {
    const result = await comptesRepository.getCompteById(id);

    if (result.length === 0) {
        throw new CompteNotFoundError(id);
    }

    return result;
}

exports.getMouvementsByCompteId = async function(id) {
    await this.getCompteById(id); // Ensure the compte exists

    return await comptesRepository.getMouvementsByCompteId(id);
}

exports.getVirementsByCompteId = async function(id, typeMouvement) {
    await this.getCompteById(id); // Ensure the compte exists

    return await comptesRepository.getVirementsByCompteId(id, typeMouvement);
}