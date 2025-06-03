var express = require('express');
var router = express.Router();
var categoriesService = require('../services/categoriesService.js');
const CategoryNotFoundError = require('../errors/categoriesError').CategoryNotFoundError;

module.exports = router;

/* GET users listing. */
router.get('/', async function(req, res) {
  try {
    const sqlReponse = await categoriesService.getAllCategories();

    console.table(sqlReponse);

    return res.status(200).send(sqlReponse);
  } catch (error) {
    console.error('Error fetching categories:', error);
      return res.status(500).send({ message: 'Internal server error' });
  }
  
});

router.get('/:id', async function(req, res) {
  const id = req.params.id;

  try {
    const sqlReponse = await categoriesService.getCategoryById(id);
    
    console.table(sqlReponse);
    res.status(200).send(sqlReponse[0]);

  } catch (error) {
    console.error(error);
    res.render('error', { error: error });

    if (error instanceof CategoryNotFoundError)
      return res.status(404);

    return res.status(500).send({ message: 'Internal server error' });
  }
});
