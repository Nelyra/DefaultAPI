const express = require('express');
const router = express.Router();
const tiersService = require('../services/tiersService');
const TiersNotFoundError = require('../errors/tiersError').TiersNotFoundError;
const auth = require('../auth');

module.exports = router;

router.get('/', auth.verifyToken, async function(req, res, next) {
  try {
    const tiers = await tiersService.getAllTiers(req.user.id);

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

router.patch('/:id', auth.verifyToken, async function(req, res, next) {
  const id = req.params.id;

  const tierData = {
    nomTiers: req.body["nomTiers"],
  }

  try {
    const updatedTier = await tiersService.updateTier(id, tierData, req.user.id);

    return res.status(200).send(updatedTier);
  } catch (error) {
    if (error instanceof TiersNotFoundError) {
      return res.status(404).send({ message: error.message });
    }
    next(error);
  }
});