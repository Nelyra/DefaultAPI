const categoriesRepository = require('../repositories/categoriesRepository')
const CategoryNotFoundError = require('../errors/categoriesError').CategoryNotFoundError;

exports.getAllCategories = async function() {
    return await categoriesRepository.getAllCategories();
}

exports.getCategoryById = async function(id) {
    const result = await categoriesRepository.getCategoryById(id);

    if (result.length === 0) {
        throw new CategoryNotFoundError(id);
    }

    return result;
}

exports.getSubCategoriesByCategoryId = async function(id) {
    const category = await categoriesRepository.getCategoryById(id);

    if (category.length === 0) {
        throw new CategoryNotFoundError(id);
    }

    return await categoriesRepository.getSubCategoriesByCategoryId(id);
}
