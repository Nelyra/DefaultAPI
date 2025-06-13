var express = require('express');
var router = express.Router();
var categoriesService = require('../services/categoriesService.js');

module.exports = router;

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    const sqlReponse = await categoriesService.getAllCategories();

    return res.status(200).send(sqlReponse);
  } catch (error) {
    next(error);
  }
  
});

router.post('/', async function(req, res, next) {
  const category = req.body;

  try {
    const result = await categoriesService.createCategory(category);
    category.idCategorie = result.insertId; // Inserting the ID

    res.status(201).send(category);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async function(req, res, next) {
  const id = req.params.id;

  try {
    const sqlReponse = await categoriesService.getCategoryById(id);
    
    res.status(200).send(sqlReponse[0]);

  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async function(req, res, next) {
  const id = req.params.id;

  try {
    const sqlReponse = await categoriesService.deleteCategoryById(id);

    res.status(200).send(); // No content to send back
  } catch (error) {
    next(error);
  }
});

router.get('/:id/sous-categories', async function(req, res, next) {
  const id = req.params.id;

  try {
    const sqlReponse = await categoriesService.getSubCategoriesByCategoryId(id);
    
    res.status(200).send(sqlReponse);

  } catch (error) {
    next(error);
  }
});
