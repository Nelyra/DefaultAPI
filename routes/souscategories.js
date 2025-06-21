var express = require('express');
var router = express.Router();
var sousCategoriesService = require('../services/sousCategoriesService.js');
var SubCategoryNotFoundError = require('../errors/sousCategoriesError').SubCategoryNotFoundError;
var errorHandler = require('../error');

module.exports = router;

router.get('/', async function(req, res, next) {
  try {
    const sqlResponse = await sousCategoriesService.getAllSubCategories();

    return res.status(200).send(sqlResponse);
  } catch (error) {
    errorHandler.display(error, req, res);
  }
});

router.post('/', async function(req, res, next) {
  const sousCategorie = req.body;

  try {
    const sqlResponse = await sousCategoriesService.createSubCategory(sousCategorie.nomSousCategorie, sousCategorie.idCategorie);
    sousCategorie.idSousCategorie = sqlResponse.insertId;

    res.status(201).send(sousCategorie);
  } catch (error) {
    errorHandler.display(error, req, res);
  }
});

router.get('/:id', async function(req, res, next) {
    const id = req.params.id;
    
    try {
        const sqlResponse = await sousCategoriesService.getSubCategoryById(id);
        
        res.status(200).send(sqlResponse);
    } catch (error) {
        errorHandler.display(error, req, res);
    }
});
