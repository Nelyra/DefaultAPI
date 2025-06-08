const express = require('express');
const router = express.Router();
const tiersService = require('../services/tiersService');
const TiersNotFoundError = require('../errors/tiersError').TiersNotFoundError;


module.exports = router;

router.get('/', async function(req, res, next) {
  try {
    const tiers = await tiersService.getAllTiers();

    return res.status(200).send(tiers);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async function(req, res, next) {
  const id = req.params.id;

  try {
    const tier = await tiersService.getTierById(id);
    
    return res.status(200).send(tier);
  } catch (error) {
    next(error);
  }
});