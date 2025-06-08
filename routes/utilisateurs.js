const express = require('express');
const router = express.Router();
const utilisateursService = require('../services/utilisateursService');

module.exports = router;

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const sqlReponse = await utilisateursService.getAllUsers();

    console.table(sqlReponse);

    res.status(200).send(sqlReponse);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async function(req, res, next) {
  try {
    const id = req.params.id;
    const sqlReponse = await utilisateursService.getUserById(id);

    if (sqlReponse.length === 0) {
      return res.status(404).send({ message: 'Utilisateur non trouvé' });
    }

    console.table(sqlReponse);

    res.status(200).send(sqlReponse);
  } catch (error) {
    next(error);
  }
});

router.get('/:id/comptes', async function(req, res, next) {
  try {
    const id = req.params.id;
    const sqlReponse = await utilisateursService.getUserAccounts(id);

    console.table(sqlReponse);

    res.status(200).send(sqlReponse);
  } catch (error) {
    next(error);
  }
});

// router.get('/:id/comptes/:accountId/mouvements', async function(req, res, next) {
//   const id = req.params.id;
//   const accountId = req.params.accountId;

//   const user = await utilisateursService.getUserById(id);
//   if (user.length === 0) {
//     return res.status(404).send({ message: 'Utilisateur non trouvé' });
//   }

//   const account = await utilisateursService.getUserAccountById(id, accountId);
//   if (account.length === 0) {
//     return res.status(404).send({ message: 'Compte non trouvé pour cet utilisateur' });
//   }

//   const sqlReponse = await utilisateursService.getUserAccountMovements(accountId);

//   console.table(sqlReponse);

//   res.status(200).send(sqlReponse);
// });

router.get(('/:id/tiers'), async function(req, res, next) {
  const id = req.params.id;

  try {
    const sqlReponse = await utilisateursService.getTiersByUserId(id);

    console.table(sqlReponse);
    res.status(200).send(sqlReponse);
  } catch (error) {
    next(error);
  }
});

router.get('/:id/mouvements', async function(req, res, next) {
  const id = req.params.id;
  const category = req.query.categorie;
  const subCategory = req.query['sous-categorie'];

  try {
    const sqlReponse = await utilisateursService.getUserMouvements(id, category, subCategory);

    res.status(200).send(sqlReponse);
  } catch (error) {
    next(error);
  }
});

router.get('/:id/virements', async function(req, res, next) {
  const id = req.params.id;
  const typeMouvement = req.query.typeMouvement;

  try {
    const sqlReponse = await utilisateursService.getUserVirements(id, typeMouvement);

    res.status(200).send(sqlReponse);
  } catch (error) {
    next(error);
  }
});

