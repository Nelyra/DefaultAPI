const express = require('express');
const router = express.Router();
const tiersService = require('../services/tiersService');
const TiersNotFoundError = require('../errors/tiersError').TiersNotFoundError;


module.exports = router;

router.get('/', async function(req, res) {
  try {
    const tiers = await tiersService.getAllTiers();
    console.table(tiers);
    return res.status(200).send(tiers);
  } catch (error) {
    console.error(error);
    res.render('error', { error: error });
    return res.status(500).send({ message: 'Internal server error' });
  }
});

router.get('/:id', async function(req, res) {
  const id = req.params.id;

  try {
    const tier = await tiersService.getTierById(id);
    console.table(tier);
    return res.status(200).send(tier);
  } catch (error) {
    console.error(error);
    res.render('error', { error: error });
    if (error instanceof TiersNotFoundError) {
      return res.status(404).send({ message: `Tiers with ID ${id} not found` });
    }
    return res.status(500).send({ message: 'Internal server error' });
  }
});