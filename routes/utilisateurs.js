var express = require('express');
var router = express.Router();
var utilisateursService = require('../services/utilisateursService');

/* GET home page. */
router.get('/', async function(req, res) {
  const sqlReponse = await utilisateursService.getAllUsers();

  console.table(sqlReponse);

  res.status(200).send(sqlReponse);
});

router.get('/:id', async function(req, res) {
  const id = req.params.id;
  const sqlReponse = await utilisateursService.getUserById(id);

  if (sqlReponse.length === 0) {
    return res.status(404).send({ message: 'Utilisateur non trouvé' });
  }

  console.table(sqlReponse);

  res.status(200).send(sqlReponse);
});

router.get('/:id/comptes', async function(req, res) {
  const id = req.params.id;
  const sqlReponse = await utilisateursService.getUserAccounts(id);

  if (sqlReponse.length === 0) {
    return res.status(404).send({ message: 'Aucun compte trouvé pour cet utilisateur' });
  }

  console.table(sqlReponse);

  res.status(200).send(sqlReponse);
});

router.get('/:id/comptes/:accountId', async function(req, res) {
  const id = req.params.id;
  const accountId = req.params.accountId;

  const sqlReponse = await utilisateursService.getUserAccountById(id, accountId);

  if (sqlReponse.length === 0) {
    return res.status(404).send({ message: 'Compte non trouvé pour cet utilisateur' });
  }

  console.table(sqlReponse);

  res.status(200).send(sqlReponse);
});

router.get('/:id/comptes/:accountId/mouvements', async function(req, res) {
  const id = req.params.id;
  const accountId = req.params.accountId;

  const user = await utilisateursService.getUserById(id);
  if (user.length === 0) {
    return res.status(404).send({ message: 'Utilisateur non trouvé' });
  }

  const account = await utilisateursService.getUserAccountById(id, accountId);
  if (account.length === 0) {
    return res.status(404).send({ message: 'Compte non trouvé pour cet utilisateur' });
  }

  const sqlReponse = await utilisateursService.getUserAccountMovements(accountId);

  console.table(sqlReponse);

  res.status(200).send(sqlReponse);
});

module.exports = router;
