var express = require('express');
var router = express.Router();
var utilisateursService = require('../services/utilisateursService');
var UserNotFoundError = require('../errors/utilisateursError').UserNotFoundError;

/* GET home page. */
router.get('/', async function(req, res) {
  const sqlReponse = await utilisateursService.getAllUsers();

  console.table(sqlReponse);

  res.status(200).send(sqlReponse);
});

router.get(('/:id/tiers'), async function(req, res) {
  const id = req.params.id;

  try {
    const sqlReponse = await utilisateursService.getTiersByUserId(id);

    console.table(sqlReponse);
    res.status(200).send(sqlReponse);
  } catch (error) {
    console.error(error);
    res.render('error', { error: error });

    if (error instanceof UserNotFoundError)
      return res.status(404);

    return res.status(500);
  }
});



module.exports = router;
