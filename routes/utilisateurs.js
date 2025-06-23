const express = require('express');
const router = express.Router();
const utilisateursService = require('../services/utilisateursService');
const auth = require('../auth');
const errorHandler = require('../error');

module.exports = router;

router.get('/mouvements', auth.verifyToken, async function(req, res, next) {
  const category = req.query.categorie;
  const subCategory = req.query['sous-categorie'];

  const id = req.user.id;

  try {
    const sqlReponse = await utilisateursService.getUserMouvementsById(id, category, subCategory);

    res.status(200).send(sqlReponse);
  } catch (error) {
    errorHandler.display(error, req, res);
  }
});

router.get('/virements', auth.verifyToken, async function(req, res, next) {
  const typeMouvement = req.query.typeMouvement;

  const id = req.user.id;

  try {
    const sqlReponse = await utilisateursService.getUserVirementsById(id, typeMouvement);

    res.status(200).send(sqlReponse);
  } catch (error) {
    errorHandler.display(error, req, res);
  }
});

router.patch('/', auth.verifyToken, async function(req, res, next) {
  var userData = {};

  if (req.body.prenomUtilisateur)
    userData['prenomUtilisateur'] = req.body.prenomUtilisateur;
  if (req.body.nomUtilisateur)
    userData['nomUtilisateur'] = req.body.nomUtilisateur;
  if (req.body.email)
    userData['email'] = req.body.email;
  if (req.body.mdp)
    userData['mdp'] = req.body.mdp;
  if (req.body.ville)
    userData['ville'] = req.body.ville;
  if (req.body.codePostal)
    userData['codePostal'] = req.body.codePostal;

  try {
    const updatedUser = await utilisateursService.updateUser(req.user.id, userData);

    return res.status(200).send(updatedUser);
  } catch (error) {
    errorHandler.display(error, req, res);
  }

})


router.delete('/', auth.verifyToken, async function(req, res, next) {
  try {
    const sqlReponse = await utilisateursService.deleteUser(req.user.id);
    res.status(204).send(sqlReponse);
  } catch (error) {
    errorHandler.display(error, req, res);
  }
});