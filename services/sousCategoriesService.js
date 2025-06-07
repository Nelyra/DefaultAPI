var sousCategoriesRepository = require('../repositories/sousCategoriesRepository');
var SubCategoryNotFoundError = require('../errors/sousCategoriesError').SubCategoryNotFoundError;

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