var express = require('express');
var router = express.Router();
var utilisateursService = require('../services/utilisateursService');

/* GET home page. */
router.get('/', async function(req, res) {
  const sqlReponse = await utilisateursService.getAllUsers();

  console.table(sqlReponse);

  res.status(200).send(sqlReponse);
});



module.exports = router;
