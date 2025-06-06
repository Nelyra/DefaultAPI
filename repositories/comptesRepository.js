const mysql = require('../mysql').client;

exports.getAllComptes = async function() {
    return new Promise(function(resolve) {
        mysql.query('SELECT * FROM compte', (err, rows) => {
            if (err) throw err;
            resolve(rows);
        });
    });
}

exports.getCompteById = async function(id) {
    return new Promise(function(resolve) {
        mysql.query('SELECT * FROM compte WHERE idCompte = ?', [id], (err, rows) => {
            if (err) throw err;
            resolve(rows);
        });
    });
}