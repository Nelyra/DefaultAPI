var express = require('express');
var router = express.Router();
var utilisateursService = require('../services/utilisateursService');
var UserNotFoundError = require('../errors/utilisateursError').UserNotFoundError;

/* GET home page. */
router.get('/', async function(req, res, next) {
  const sqlReponse = await utilisateursService.getAllUsers();

  console.table(sqlReponse);

  res.status(200).send(sqlReponse);
});

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



module.exports = router;
