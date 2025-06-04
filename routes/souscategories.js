var express = require('express');
var router = express.Router();
var sousCategoriesService = require('../services/sousCategoriesService.js');
var SubCategoryNotFoundError = require('../errors/sousCategoriesError').SubCategoryNotFoundError;

module.exports = router;

router.get('/', async function(req, res) {
  try {
    const sqlResponse = await sousCategoriesService.getAllSubCategories();
    console.table(sqlResponse);
    return res.status(200).send(sqlResponse);
  } catch (error) {
    console.error(error);
    res.render('error', { error: error });
    return res.status(500).send({ message: 'Internal server error' });
  }
});

router.get('/:id', async function(req, res) {
    const id = req.params.id;
    
    try {
        const sqlResponse = await sousCategoriesService.getSubCategoryById(id);
        console.table(sqlResponse);
        res.status(200).send(sqlResponse[0]);
    } catch (error) {
        console.error(error);
        res.render('error', { error: error });
    
        if (error instanceof SubCategoryNotFoundError)
            return res.status(404);
    
        return res.status(500).send({ message: 'Internal server error' });
    }
});