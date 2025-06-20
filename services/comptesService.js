const comptesRepository = require('../repositories/comptesRepository');
const utilisateursRepository = require("../repositories/utilisateursRepository");
const {UserNotFoundError} = require("../errors/utilisateursError");
const { CompteMissingFieldsError } = require('../errors/comptesError');
const { VirementMissingFieldsError } = require('../errors/comptesError');
const { MouvementMissingFieldsError } = require('../errors/comptesError');
const {CategoryNotFoundError} = require("../errors/categoriesError");

const VirementWrongTypeSpecified = require('../errors/comptesError').VirementWrongTypeSpecified;
const CompteNotFoundError = require('../errors/comptesError').CompteNotFoundError;
const CompteUnauthorizedError = require('../errors/comptesError').CompteUnauthorizedError;

const getCategoryById = require('../services/categoriesService').getCategoryById;
const getSubCategoryById = require('../services/sousCategoriesService').getSubCategoryById;

exports.getAllComptes = async function(id) {
    return await comptesRepository.getAllComptes(id);
}

exports.getCompteById = async function(userId, id) {
    const result = await comptesRepository.getCompteById(id);

    if (result.length === 0) {
        throw new CompteNotFoundError(id);
    }

    if (result[0].idUtilisateur != userId) {
        throw new CompteUnauthorizedError(id);
    }

    return result[0];
}

exports.getMouvementsByCompteId = async function(id, category, subCategory, user) {
    await this.getCompteById(user, id); // Ensure the compte exists

    if(category !== undefined) {
        //Verifier que la catégorie existe
        await getCategoryById(category);
    }

    if(subCategory !== undefined) {
        //Verifier que la sous catégorie existe
        await getSubCategoryById(subCategory);
    }

    return await comptesRepository.getMouvementsByCompteId(id, category, subCategory);

}

exports.getVirementsByCompteId = async function(id, typeMouvement, userId) {
    await this.getCompteById(userId, id); // Ensure the compte exists

    if ((typeMouvement === undefined) || (typeMouvement === 'C' || typeMouvement === 'D')) {
        return await comptesRepository.getVirementsByCompteId(id, typeMouvement);
    } else {
        throw new VirementWrongTypeSpecified(typeMouvement);
    }
}

exports.updateCompte = async function(id, updatedData, userId) {
    const compte = await this.getCompteById(userId, id); // Ensure the compte exists

    if(!compte) {
        throw new CompteNotFoundError(id);
    }

    if(compte.idUtilisateur !== userId) {
        throw new CompteUnauthorizedError(id);
    }

    await comptesRepository.updateCompte(id, updatedData);

    return await this.getCompteById(userId, id); 
}

exports.deleteAccount = async function(idUser, idCompte) {
    await this.getCompteById(idUser, idCompte); // Ensure the compte exists

    const response =  await comptesRepository.deleteAccount(idUser, idCompte);

    if (response.affectedRows === 0) {
        throw new CompteNotFoundError(idCompte);
    }

    return response[0];
}

exports.createCompte = async function(userId, compte) {

    if (!compte.descriptionCompte || !compte.nomBanque) {
        throw new CompteMissingFieldsError(['descriptionCompte', 'nomBanque']);
    }
    const result = await comptesRepository.createCompte(compte);

    return await comptesRepository.getCompteById(result.insertId);
}

exports.createVirement = async function(virement) {
    if (!virement.idCompteCredit || !virement.montant) {
        throw new VirementMissingFieldsError(['idCompteCredit', 'montant']);
    }

    return await comptesRepository.createVirement(virement);
}

exports.createMouvement = async function(mouvement) {
    if (!mouvement.montant || !mouvement.typeMouvement) {
        throw new MouvementMissingFieldsError(['montant', 'typeMouvement']);
    }

    return await comptesRepository.createMouvement(mouvement);
}