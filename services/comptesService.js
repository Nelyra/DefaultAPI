const comptesRepository = require('../repositories/comptesRepository');
const tiersService = require('./tiersService');
const categoryService = require('./categoriesService');
const sousCategoriesService = require('./sousCategoriesService');

const { CompteNotFoundError, 
    CompteMissingFieldsError, 
    VirementMissingFieldsError, 
    MouvementMissingFieldsError,
    MouvementTypeInvalid,
    CompteUnauthorizedError,
    NegativeMontantError,
    InvalidMontantError,
    IdenticalCompteError
 } = require('../errors/comptesError');
const { SubCategoryWrongCategoryError} = require("../errors/sousCategoriesError");


exports.getAllComptes = async function(id) {
    return await comptesRepository.getAllComptes(id);
}

exports.getCompteById = async function(id, userId) {
    const result = await comptesRepository.getCompteById(id);

    if (result.length === 0) {
        throw new CompteNotFoundError(id);
    }

    if (result[0].idUtilisateur != userId) {
        throw new CompteUnauthorizedError(id);
    }

    return result[0];
}

exports.getMouvementsByCompteId = async function(id, category, subCategory, userId) {
    console.log("Fetching mouvements for compte ID:", id, "with category:", category, "and subCategory:", subCategory, "for user ID:", userId);
    await this.getCompteById(id, userId); // Ensure the compte exists

    if(category !== undefined) {
        //Verifier que la catégorie existe
        await categoryService.getCategoryById(category);
    }

    if(subCategory !== undefined) {
        //Verifier que la sous catégorie existe
        await sousCategoriesService.getSubCategoryById(subCategory);
    }

    return await comptesRepository.getMouvementsByCompteId(id, category, subCategory);

}

exports.getVirementsByCompteId = async function(id, typeMouvement, userId) {
    await this.getCompteById(id, userId); // Ensure the compte exists

    if ((typeMouvement === undefined) || (typeMouvement === 'C' || typeMouvement === 'D')) {
        return await comptesRepository.getVirementsByCompteId(id, typeMouvement);
    } else {
        throw new MouvementTypeInvalid(typeMouvement);
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

exports.createCompte = async function(compte) {
    if (!compte.descriptionCompte || !compte.nomBanque) {
        throw new CompteMissingFieldsError(['descriptionCompte', 'nomBanque']);
    }
    const result = await comptesRepository.createCompte(compte);

    return await comptesRepository.getCompteById(result.insertId);
}

exports.createVirement = async function(userId, virement) {
    console.log("Virement object:", virement);

    if (!virement.idCompteCredit || !virement.montant || !virement.idCompteDebit) {
        throw new VirementMissingFieldsError(['idCompteCredit', 'montant', 'idCompteDebit']);
    }

    const compteCredit = await this.getCompteById(userId, virement.idCompteCredit);
    const compteDebit = await this.getCompteById(userId, virement.idCompteDebit);

    if (virement.montant === undefined || typeof virement.montant !== 'number') {
        throw new InvalidMontantError(virement.montant);
    }

    if( compteCredit.idCompte === compteDebit.idCompte) {
        throw new IdenticalCompteError(virement.idCompteCredit, virement.idCompteDebit);
    }

    if (virement.montant <= 0) {
        throw new NegativeMontantError(virement.montant);
    }

    if (virement.idTiers) {
        await tiersService.getTierById(virement.idTiers, userId);
    }

    if( virement.idCategorie) {
        await categoryService.getCategoryById(virement.idCategorie);
    }

    return await comptesRepository.createVirement(virement);
}

exports.createMouvement = async function(userId, mouvement) {
    const compte = await this.getCompteById(userId, mouvement.idCompte);

    mouvement = {
        idCompte: compte.idCompte,
        montant: mouvement.montant,
        typeMouvement: mouvement.typeMouvement,
        dateMouvement: mouvement.dateMouvement || new Date(),
        idTiers: mouvement.idTiers || null,
        idSousCategorie: mouvement.idSousCategorie || null,
        idCategorie: mouvement.idCategorie || null,
    }
    
    if (!mouvement.montant || !mouvement.typeMouvement) {
        throw new MouvementMissingFieldsError(['montant', 'typeMouvement']);
    }

    if (mouvement.montant === undefined || typeof mouvement.montant !== 'number') {
        throw new InvalidMontantError(mouvement.montant);
    }

    if (mouvement.montant <= 0) {
        throw new NegativeMontantError(mouvement.montant);
    }

    if (mouvement.typeMouvement !== 'C' && mouvement.typeMouvement !== 'D') {
        throw new MouvementTypeInvalid(mouvement.typeMouvement);
    }

    if(mouvement.idTiers) {
        await tiersService.getTierById(mouvement.idTiers, userId);
    }

    if(mouvement.idCategorie) {
        await categoryService.getCategoryById(mouvement.idCategorie);
    }

    if(mouvement.idSousCategorie) {
        const subCategory = await sousCategoriesService.getSubCategoryById(mouvement.idSousCategorie);

        if (mouvement.idCategorie && subCategory.idCategorie != mouvement.idCategorie) {
            throw new SubCategoryWrongCategoryError(mouvement.idSousCategorie, mouvement.idCategorie);
        }
    }

    return await comptesRepository.createMouvement(mouvement);
}