const mysql = require('../mysql').client;

exports.getUserById = async function(id) {
    return new Promise(function(resolve) {
        mysql.query('SELECT * FROM utilisateur WHERE idUtilisateur = ?', [id], (err, rows) => {
            if (err) throw err;
            resolve(rows);
        })
    })
}

exports.getUserAccounts = async function(id) {
    return new Promise(function(resolve) {
        mysql.query('SELECT * FROM compte WHERE idUtilisateur = ?', [id], (err, rows) => {
            if (err) throw err;
            resolve(rows);
        })
    })
}

exports.getUserAccountMovements = async function(userId, accountId) {
    return new Promise(function(resolve) {
        mysql.query(
            `SELECT m.* FROM mouvement m
             JOIN compte c ON m.idCompte = c.idCompte
             WHERE c.idUtilisateur = ? AND m.idCompte = ?`,
            [userId, accountId],
            (err, rows) => {
            if (err) throw err;
            resolve(rows);
            }
        )
    })
}

exports.getAllUsers = async function() {
    return new Promise(function(resolve) {
        mysql.query('SELECT * FROM utilisateur', (err, rows) => {
            if (err) throw err;
            resolve(rows);
        })
    })
}

exports.getTiersByUserId = async function(id) {
    return new Promise(function(resolve, reject) {
        mysql.query('SELECT * FROM tiers WHERE idUtilisateur = ?', [id], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        })
    })
}