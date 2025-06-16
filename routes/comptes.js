const express = require('express');
const router = express.Router();
const comptesService = require('../services/comptesService');
const auth = require('../auth');

module.exports = router;

router.get('/', auth.verifyToken, async function(req, res, next) {
  try {
    const comptes = await comptesService.getAllComptes(req.user.id);
    
    res.status(200).send(comptes);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', auth.verifyToken, async function(req, res, next) {
  const id = req.params.id;

  try {
    const compte = await comptesService.getCompteById(id);
    
    res.status(200).send(compte);
  } catch (error) {
    next(error);
  }
});

router.get('/:id/mouvements', auth.verifyToken, async function(req, res, next) {
  const id = req.params.id;
  const category = req.query.categorie;
  const subCategory = req.query["sous-categorie"];

  try {
    const mouvements = await comptesService.getMouvementsByCompteId(id, category, subCategory);
    
    res.status(200).send(mouvements);
  } catch (error) {
    next(error);
  }
});

router.get('/:id/virements', auth.verifyToken, async function(req, res, next) {
  const id = req.params.id;
  const typeMouvement = req.query.typeMouvement;

  try {
    const virements = await comptesService.getVirementsByCompteId(id, typeMouvement);
    
    res.status(200).send(virements);
  } catch (error) {
    next(error)
  }
});