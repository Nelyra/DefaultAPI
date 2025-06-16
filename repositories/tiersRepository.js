const mysql = require('../mysql').client;

exports.getAllTiers = async function(idUtilisateur) {
    return new Promise(function(resolve, reject) {
        mysql.query('SELECT * FROM tiers WHERE idUtilisateur = ?', [idUtilisateur], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

exports.getTierById = async function(idTiers,idUtilisateur) {
    return new Promise(function(resolve, reject) {
        mysql.query('SELECT * FROM tiers WHERE idUtilisateur = ? AND idTiers = ?', [idUtilisateur, idTiers], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}