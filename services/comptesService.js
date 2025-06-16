const comptesRepository = require('../repositories/comptesRepository');
const utilisateursRepository = require("../repositories/utilisateursRepository");
const {UserNotFoundError} = require("../errors/utilisateursError");
const CompteNotFoundError = require('../errors/comptesError').CompteNotFoundError;
const CompteUnauthorizedError = require('../errors/comptesError').CompteUnauthorizedError;

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

    return  comptesRepository.getMouvementsByCompteId(id, category, subCategory);
}

exports.getVirementsByCompteId = async function(id, typeMouvement) {
    await this.getCompteById(id); // Ensure the compte exists

    return await comptesRepository.getVirementsByCompteId(id, typeMouvement);
}

exports.updateCompte = async function(id, updatedData, userId) {
    const compte = await this.getCompteById(id); // Ensure the compte exists

    if(!compte) {
        throw new CompteNotFoundError(id);
    }

    if(compte.idUtilisateur !== userId) {
        throw new CompteUnauthorizedError(id);
    }

    await comptesRepository.updateCompte(id, updatedData);

    return await this.getCompteById(id); 
}

exports.deleteAccount = async function(idUser, idCompte) {
    const response =  await comptesRepository.deleteAccount(idUser, idCompte);

    if (response.length === 0) {
        throw new UserNotFoundError(id);
    }

    return response[0];
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