const mysql = require('../mysql')

exports.getAllUsers = async function() {
    return new Promise(function(resolve) {
        mysql.client.query('SELECT * FROM utilisateur', (err, rows) => {
            if (err) throw err;
            resolve(rows);
        })
    })
}

exports.getTiersByUserId = async function(id) {
    return new Promise(function(resolve, reject) {
        mysql.client.query('SELECT * FROM tiers WHERE idUtilisateur = ?', [id], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        })
    })
}