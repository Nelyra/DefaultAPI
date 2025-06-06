const express = require('express');
const router = express.Router();
const comptesService = require('../services/comptesService');

module.exports = router;

router.get('/', async function(req, res, next) {
  try {
    const comptes = await comptesService.getAllComptes();
    
    console.table(comptes);
    res.status(200).send(comptes);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async function(req, res, next) {
  const id = req.params.id;

  try {
    const compte = await comptesService.getCompteById(id);
    
    console.table(compte);
    res.status(200).send(compte);
  } catch (error) {
    next(error);
  }
});

router.get('/:id/mouvements', async function(req, res, next) {
  const id = req.params.id;

  try {
    const mouvements = await comptesService.getMouvementsByCompteId(id);
    
    console.table(mouvements);
    res.status(200).send(mouvements);
  } catch (error) {
    next(error);
  }
});

router.get('/:id/virements', async function(req, res, next) {
  const id = req.params.id;
  const typeMouvement = req.query.typeMouvement;

  try {
    const virements = await comptesService.getVirementsByCompteId(id, typeMouvement);
    
    console.table(virements);
    res.status(200).send(virements);
  } catch (error) {
    next(error)
  }
});