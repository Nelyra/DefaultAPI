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

router.get('/:id', async function(req, res, next) {
    const id = req.params.id;
    
    try {
        const sqlResponse = await sousCategoriesService.getSubCategoryById(id);
        
        res.status(200).send(sqlResponse[0]);
    } catch (error) {
        next(error);
    }
});