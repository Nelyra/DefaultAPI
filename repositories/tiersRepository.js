const mysql = require('../mysql').client;

exports.getAllTiers = async function(id) {
    return new Promise(function(resolve, reject) {
        mysql.query('SELECT * FROM tiers WHERE idUtilisateur = ?', [id], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

exports.getTierById = async function(id, userId) {
    return new Promise(function(resolve, reject) {
        mysql.query('SELECT * FROM tiers WHERE idTiers = ? AND idUtilisateur = ?', [id, userId], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

exports.updateTier = async function(id, tierData, userId) {
    return new Promise(function(resolve, reject) {
        mysql.query('UPDATE tiers SET ? WHERE idTiers = ? AND idUtilisateur = ?', [tierData, id, userId], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}