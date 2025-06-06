const express = require('express');
const router = express.Router();
const comptesService = require('../services/comptesService');
const CompteNotFoundError = require('../errors/comptesError').CompteNotFoundError;

module.exports = router;

router.get('/', async function(req, res) {
  try {
    const comptes = await comptesService.getAllComptes();
    
    console.table(comptes);
    res.status(200).send(comptes);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred while fetching comptes.' });
  }
});

router.get('/:id', async function(req, res) {
  const id = req.params.id;

  try {
    const compte = await comptesService.getCompteById(id);
    
    console.table(compte);
    res.status(200).send(compte);
  } catch (error) {
    console.error(error);
    res.render('error', { error: error });

    if (error instanceof CompteNotFoundError)
      return res.status(404).send({ error: 'Compte not found.' });

    return res.status(500).send({ error: 'An error occurred while fetching the compte.' });
  }
});