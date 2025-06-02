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



module.exports = router;
