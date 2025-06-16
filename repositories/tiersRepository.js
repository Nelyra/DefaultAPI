const mysql = require('../mysql').client;

exports.getAllTiers = async function() {
    return new Promise(function(resolve, reject) {
        mysql.query('SELECT * FROM tiers', (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

exports.getTiersByUserId = async function(idUtilisateur) {
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

UpdateMouvementForTierDeletion = async function(var_idTier){
    return new Promise(function(resolve, reject) {
        mysql.query('UPDATE mouvement SET idTiers = NULL WHERE idTiers = ?', [var_idTier], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        })
    })
}

exports.deleteTiers = async function(idTiers){
    await UpdateMouvementForTierDeletion(idTiers);

    return new Promise(function(resolve, reject) {
        mysql.query('DELETE FROM tiers WHERE idTiers = ?', [idTiers], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        })
    })
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