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

router.post('/', auth.verifyToken, async function(req, res, next) {
  const tier = req.body;

  try {
    const result = await tiersService.createTier(tier, req.user.id);
    tier.idTiers = result.insertId; // Inserting the ID

    return res.status(201).send(tier);
  } catch (error) {
    next(error);
  }
});