var express = require('express');
var router = express.Router();
var categoriesService = require('../services/categoriesService.js');
const CategoryNotFoundError = require('../errors/categoriesError').CategoryNotFoundError;

module.exports = router;

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    const sqlReponse = await categoriesService.getAllCategories();

    console.table(sqlReponse);

    return res.status(200).send(sqlReponse);
  } catch (error) {
    next(error);
  }
  
});

router.get('/:id', async function(req, res, next) {
  const id = req.params.id;

  try {
    const sqlReponse = await categoriesService.getCategoryById(id);
    
    console.table(sqlReponse);
    res.status(200).send(sqlReponse[0]);

  } catch (error) {
    next(error);
  }
});

router.get('/:id/sous-categories', async function(req, res, next) {
  const id = req.params.id;

  try {
    const sqlReponse = await categoriesService.getSubCategoriesByCategoryId(id);
    
    console.table(sqlReponse);
    res.status(200).send(sqlReponse);

  } catch (error) {
    next(error);
  }
});
