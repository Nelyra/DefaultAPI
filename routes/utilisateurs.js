const express = require('express');
const router = express.Router();
const utilisateursService = require('../services/utilisateursService');
const auth = require('../auth');

module.exports = router;

/* GET home page. */
router.get('/', auth.verifyToken, async function(req, res, next) {
  try {
    const sqlReponse = await utilisateursService.getAllUsers();

    res.status(200).send(sqlReponse);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async function(req, res, next) {
  try {
    const id = req.params.id;
    const sqlReponse = await utilisateursService.getUserById(id);

    res.status(200).send(sqlReponse);
  } catch (error) {
    next(error);
  }
});

router.get('/:id/comptes', async function(req, res, next) {
  try {
    const id = req.params.id;
    const sqlReponse = await utilisateursService.getUserAccounts(id);

    res.status(200).send(sqlReponse);
  } catch (error) {
    next(error);
  }
});

router.get(('/:id/tiers'), async function(req, res, next) {
  const id = req.params.id;

  try {
    const sqlReponse = await utilisateursService.getTiersByUserId(id);

    res.status(200).send(sqlReponse);
  } catch (error) {
    next(error);
  }
});

router.get('/:id/mouvements', async function(req, res, next) {
  const id = req.params.id;
  const category = req.query.categorie;
  const subCategory = req.query['sous-categorie'];

  try {
    const sqlReponse = await utilisateursService.getUserMouvements(id, category, subCategory);

    res.status(200).send(sqlReponse);
  } catch (error) {
    next(error);
  }
});

router.get('/:id/virements', async function(req, res, next) {
  const id = req.params.id;
  const typeMouvement = req.query.typeMouvement;

  try {
    const sqlReponse = await utilisateursService.getUserVirements(id, typeMouvement);

    res.status(200).send(sqlReponse);
  } catch (error) {
    next(error);
  }
});

