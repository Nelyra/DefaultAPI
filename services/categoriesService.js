const categoriesRepository = require('../repositories/categoriesRepostory')
const CategoryNotFoundError = require('../errors/categoriesError').CategoryNotFoundError;

exports.getAllCategories = async function() {
    return await categoriesRepository.getAllCategories();
}

exports.getCategoryById = async function(id) {
    const result =  await categoriesRepository.getCategoryById(id);

    if (result.length === 0) {
        throw new CategoryNotFoundError(id);
    }

    return result;
}
