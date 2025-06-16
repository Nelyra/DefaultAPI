var sousCategoriesRepository = require('../repositories/sousCategoriesRepository');
var SubCategoryNotFoundError = require('../errors/sousCategoriesError').SubCategoryNotFoundError;
var DuplicateSubCategoryError = require('../errors/sousCategoriesError').DuplicateSubCategoryError;
var InvalidSubCategoryError = require('../errors/sousCategoriesError').InvalidSubCategoryError;


exports.getAllSubCategories = async function() {
    return await sousCategoriesRepository.getAllSubCategories();
}

exports.getSubCategoryById = async function(id) {
    const result = await sousCategoriesRepository.getSubCategoryById(id);

    if (result.length === 0) {
        throw new SubCategoryNotFoundError(id);
    }

    return result;
}

exports.createSubCategory = async function(nomSousCategorie, idSousCategorie, idCategorie) {
    if (!nomSousCategorie || !idSousCategorie || !idCategorie) {
        const missingFields = [];
        if (!nomSousCategorie) missingFields.push('nomSousCategorie');
        if (!idSousCategorie) missingFields.push('idSousCategorie');
        if (!idCategorie) missingFields.push('idCategorie');

        throw new InvalidSubCategoryError(missingFields);
    }

    const existingSubCategory = await sousCategoriesRepository.getSubCategoryById(idSousCategorie);

    if (existingSubCategory.length > 0) {
        throw new DuplicateSubCategoryError(idSousCategorie);
    }

    return await sousCategoriesRepository.createSubCategory(nomSousCategorie, idSousCategorie, idCategorie);
}

exports.deleteSubCategory = async function(id) {
    const existingSubCategory = await sousCategoriesRepository.getSubCategoryById(id);

    if (existingSubCategory.length === 0) {
        throw new SubCategoryNotFoundError(id);
    }

    return await sousCategoriesRepository.deleteSubCategoryById(id);
}