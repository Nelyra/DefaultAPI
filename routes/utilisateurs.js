const express = require('express');
const router = express.Router();
const utilisateursService = require('../services/utilisateursService');
const auth = require('../auth');

module.exports = router;

router.get('/', auth.verifyToken, async function(req, res, next) {
  try {
    const sqlReponse = await utilisateursService.getUserById(req.user.id);

    res.status(200).send(sqlReponse);
  } catch (error) {
    next(error);
  }
});

router.get(('/tiers'), auth.verifyToken, async function(req, res, next) {
  try {
    const sqlReponse = await utilisateursService.getTiersByUserId(req.user.id);

    res.status(200).send(sqlReponse);
  } catch (error) {
    next(error);
  }
});

router.get('/mouvements', auth.verifyToken, async function(req, res, next) {
  const category = req.query.categorie;
  const subCategory = req.query['sous-categorie'];

  try {
    const sqlReponse = await utilisateursService.getUserMouvements(req.user.id, category, subCategory);

    res.status(200).send(sqlReponse);
  } catch (error) {
    next(error);
  }
});

router.get('/virements', auth.verifyToken, async function(req, res, next) {
  const typeMouvement = req.query.typeMouvement;

  try {
    const sqlReponse = await utilisateursService.getUserVirements(req.user.id, typeMouvement);

    res.status(200).send(sqlReponse);
  } catch (error) {
    next(error);
  }
});


router.delete('/', auth.verifyToken, async function(req, res, next) {
  try {
    const sqlReponse = await utilisateursService.deleteUser(req.user.id);
    res.status(200).send(sqlReponse);
  } catch (error) {
    next(error);
  }
});