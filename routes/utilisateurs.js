const express = require('express');
const router = express.Router();
const utilisateursService = require('../services/utilisateursService');
const auth = require('../auth');
const errorHandler = require('../error');

module.exports = router;

router.get('/mouvements', auth.verifyToken, async function(req, res, next) {
  const category = req.query.categorie;
  const subCategory = req.query['sous-categorie'];

  const id = req.user.id;

  try {
    const sqlReponse = await utilisateursService.getUserMouvementsById(id, category, subCategory);

    res.status(200).send(sqlReponse);
  } catch (error) {
    errorHandler.display(error, req, res);
  }
});

router.get('/virements', auth.verifyToken, async function(req, res, next) {
  const typeMouvement = req.query.typeMouvement;

  const id = req.user.id;

  try {
    const sqlReponse = await utilisateursService.getUserVirementsById(id, typeMouvement);

    res.status(200).send(sqlReponse);
  } catch (error) {
    errorHandler.display(error, req, res);
  }
});


router.delete('/', auth.verifyToken, async function(req, res, next) {
  try {
    const sqlReponse = await utilisateursService.deleteUser(req.user.id);
    res.status(200).send(sqlReponse);
  } catch (error) {
    errorHandler.display(error, req, res);
  }
});