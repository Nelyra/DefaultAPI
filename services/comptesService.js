const comptesRepository = require('../repositories/comptesRepository');
const CompteNotFoundError = require('../errors/comptesError').CompteNotFoundError;

exports.getAllComptes = async function(id) {
    return await comptesRepository.getAllComptes(id);
}

exports.getCompteById = async function(id) {
    const result = await comptesRepository.getCompteById(id);

    if (result.length === 0) {
        throw new CompteNotFoundError(id);
    }

    return result[0];
}

exports.getMouvementsByCompteId = async function(id, category, subCategory) {
    await this.getCompteById(id); // Ensure the compte exists

    return await comptesRepository.getMouvementsByCompteId(id, category, subCategory);
}

exports.getVirementsByCompteId = async function(id, typeMouvement) {
    await this.getCompteById(id); // Ensure the compte exists

    return await comptesRepository.getVirementsByCompteId(id, typeMouvement);
}

exports.createCompte = async function(compte) {
    return await comptesRepository.createCompte(compte);
}

exports.createVirement = async function(virement) {
    if (!virement.idCompteCredit || !virement.montant) {
        throw new Error('Virement must have idCompteCredit and montant');
    }

    return await comptesRepository.createVirement(virement);
}

exports.createMouvement = async function(mouvement) {
    if (!mouvement.montant || !mouvement.typeMouvement) {
        throw new Error('Mouvement must have montant and typeMouvement');
    }

    return await comptesRepository.createMouvement(mouvement);
}