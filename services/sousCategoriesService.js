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

exports.createSubCategory = async function(nomSousCategorie, idCategorie) {
    if (!nomSousCategorie || !idCategorie) {
        const missingFields = [];
        if (!nomSousCategorie) missingFields.push('nomSousCategorie');
        if (!idCategorie) missingFields.push('idCategorie');

        throw new InvalidSubCategoryError(missingFields);
    }

    return await sousCategoriesRepository.createSubCategory(nomSousCategorie, idCategorie);
}

exports.deleteSubCategory = async function(id) {
    const existingSubCategory = await sousCategoriesRepository.getSubCategoryById(id);

    if (existingSubCategory.length === 0) {
        throw new SubCategoryNotFoundError(id);
    }

    return await sousCategoriesRepository.deleteSubCategoryById(id);
}