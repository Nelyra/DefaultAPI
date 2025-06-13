const categoriesRepository = require('../repositories/categoriesRepository')
const CategoryNotFoundError = require('../errors/categoriesError').CategoryNotFoundError;
const InvalidCategoryError = require('../errors/categoriesError').InvalidCategoryError;
const DuplicateCategoryError = require('../errors/categoriesError').DuplicateCategoryError;

exports.getAllCategories = async function() {
    return await categoriesRepository.getAllCategories();
}

exports.createCategory = async function(category) 
{
    if (category.idCategorie) {
        // Check if the category with the given ID already exists
        const existingCategory = await categoriesRepository.getCategoryById(category.idCategorie);
        if (existingCategory.length > 0) {
            throw new DuplicateCategoryError(category.idCategorie);
        }
    }

    // Validate the category object
    if (!category || !category.nomCategorie) {
        const missingFields = [];
        if (!category) {
            missingFields.push('category object');
        } else {
            if (!category.nomCategorie) {
                missingFields.push('nomCategorie');
            }
        }
        throw new InvalidCategoryError(missingFields);
    }

    return await categoriesRepository.createCategory(category);
}

exports.deleteCategoryById = async function(id) {
    const result = await categoriesRepository.getCategoryById(id);

    if (result.length === 0) {
        throw new CategoryNotFoundError(id);
    }

    return await categoriesRepository.deleteCategoryById(id);
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
