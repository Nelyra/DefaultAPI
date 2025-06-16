var express = require('express');
var router = express.Router();
var sousCategoriesService = require('../services/sousCategoriesService.js');
var SubCategoryNotFoundError = require('../errors/sousCategoriesError').SubCategoryNotFoundError;

module.exports = router;

router.get('/', async function(req, res, next) {
  try {
    const sqlResponse = await sousCategoriesService.getAllSubCategories();

    return res.status(200).send(sqlResponse);
  } catch (error) {
    next(error);
  }
});

router.post('/', async function(req, res, next) {
  const { nomSousCategorie, idSousCategorie, idCategorie } = req.body;

  try {
    const sqlResponse = await sousCategoriesService.createSubCategory(nomSousCategorie, idSousCategorie, idCategorie);
    
    res.status(201).send(sqlResponse);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async function(req, res, next) {
    const id = req.params.id;
    
    try {
        const sqlResponse = await sousCategoriesService.getSubCategoryById(id);
        
        res.status(200).send(sqlResponse[0]);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async function(req, res, next) {
    const id = req.params.id;

    try {
        const sqlResponse = await sousCategoriesService.getSubCategoryById(id);
        
        // Assuming a delete function exists in the service
        await sousCategoriesService.deleteSubCategory(id);

        res.status(204).send();
    } catch (error) {
        next(error);
    }
});