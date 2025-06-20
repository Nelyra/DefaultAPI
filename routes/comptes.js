const express = require('express');
const router = express.Router();
const comptesService = require('../services/comptesService');
const auth = require('../auth');
const errorHandler = require('../error')

module.exports = router;

router.get('/', auth.verifyToken, async function(req, res, next) {
  try {
    const comptes = await comptesService.getAllComptes(req.user.id);
    
    res.status(200).send(comptes);
  } catch (error) {
    errorHandler.display(error, req, res);
  }
});

router.get('/:id', auth.verifyToken, async function(req, res, next) {
  const id = req.params.id;
  const user = req.user.id;


  try {
    const compte = await comptesService.getCompteById(id, user);
    
    res.status(200).send(compte);
  } catch (error) {
    errorHandler.display(error, req, res);
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
    errorHandler.display(error, req, res);
  }
});

router.get('/:id/virements', auth.verifyToken, async function(req, res, next) {
  const id = req.params.id;
  const typeMouvement = req.query.typeMouvement;

  try {
    const virements = await comptesService.getVirementsByCompteId(id, typeMouvement);
    
    res.status(200).send(virements);
  } catch (error) {
    errorHandler.display(error, req, res);
  }
});

router.patch('/:id', auth.verifyToken, async function(req, res, next) {
  const id = req.params.id;
  const userId = req.user.id;
  var updatedData = {};

  if (req.body["descriptionCompte"]) {
    updatedData.descriptionCompte = req.body["descriptionCompte"];
  }

  if(req.body["nomBanque"]) {
    updatedData.nomBanque = req.body["nomBanque"];
  }

  try {
    // Assuming there's a method in comptesService to update a compte
    const updatedCompte = await comptesService.updateCompte(id, updatedData, userId);
    
    res.status(204).send(updatedCompte);
  } catch (error) {
    errorHandler.display(error, req, res);
  }
});

router.delete('/:id', auth.verifyToken, async function(req, res, next) {
  const idCompte = req.params.id;
  try {
    const sqlReponse = await comptesService.deleteAccount(req.user.id, idCompte);
    res.status(200).send(sqlReponse);
  } catch (error) {
    errorHandler.display(error, req, res);
  }
});

router.post('/', auth.verifyToken, async function(req, res, next) {
  const compte = req.body;

  try {
    compte.idUtilisateur = req.user.id;
    const result = await comptesService.createCompte(compte);
    compte.idCompte = result.insertId; // Inserting the ID

    res.status(201).send(compte);
  } catch (error) {
    errorHandler.display(error, req, res);
  }
});

router.post('/:id/virements', auth.verifyToken, async function(req, res, next) {
  const id = req.params.id;
  const virement = req.body;

  try {
    virement.idCompteDebit = id;
    const result = await comptesService.createVirement(virement);
    virement.idVirement = result.insertId; // Inserting the ID

    res.status(201).send(virement);
  } catch (error) {
    errorHandler.display(error, req, res);
  }
});

router.post('/:id/mouvements', auth.verifyToken, async function(req, res, next) {
  const id = req.params.id;
  const mouvement = req.body;

  try {
    mouvement.idCompte = id;
    const result = await comptesService.createMouvement(mouvement);
    mouvement.idMouvement = result.insertId; // Inserting the ID
    
    console.log('Mouvement created:', mouvement);

    res.status(201).send(mouvement);
  } catch (error) {
    errorHandler.display(error, req, res);
  }
});
