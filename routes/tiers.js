const express = require('express');
const router = express.Router();
const tiersService = require('../services/tiersService');
const TiersNotFoundError = require('../errors/tiersError').TiersNotFoundError;
const auth = require('../auth');
const comptesService = require("../services/comptesService");

module.exports = router;

router.get('/', auth.verifyToken, async function(req, res, next) {
  try {
    const tiers = await tiersService.getTiersByUserId(req.user.id);

    return res.status(200).send(tiers);
  } catch (error) {
    next(error);
  }
});


router.get('/:id', auth.verifyToken, async function(req, res, next) {
  const id = req.params.id;

  try {
    const tier = await tiersService.getTierById(id, req.user.id);

    return res.status(200).send(tier);
  } catch (error) {
    next(error);
  }
});


router.delete('/:id', auth.verifyToken, async function(req, res, next) {
  const idTiers = req.params.id;
  try {
    const sqlReponse = await tiersService.deleteTiers(req.user.id, idTiers);
    res.status(200).send(sqlReponse);
  } 
  catch (error) {
    next(error);
  }
});
  
router.patch('/:id', auth.verifyToken, async function(req, res, next) {
  const id = req.params.id;

  const tierData = {
    nomTiers: req.body["nomTiers"],
  }

  try {
    const updatedTier = await tiersService.updateTier(id, tierData, req.user.id);

    return res.status(200).send(updatedTier);
  } catch (error) {
    next(error);
  }
});