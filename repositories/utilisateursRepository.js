const mysql = require('../mysql')

exports.getAllUsers = async function() {
    return new Promise(function(resolve) {
        mysql.client.query('SELECT * FROM utilisateur', (err, rows) => {
            if (err) throw err;
            resolve(rows);
        })
    })
}

exports.getUserById = async function(id) {
    return new Promise(function(resolve) {
        mysql.client.query('SELECT * FROM utilisateur WHERE idUtilisateur = ?', [id], (err, rows) => {
            if (err) throw err;
            resolve(rows);
        })
    })
}

exports.getUserAccounts = async function(id) {
    return new Promise(function(resolve) {
        mysql.client.query('SELECT * FROM compte WHERE idUtilisateur = ?', [id], (err, rows) => {
            if (err) throw err;
            resolve(rows);
        })
    })
}

exports.getUserAccountById = async function(userId, accountId) {
    return new Promise(function(resolve) {
        mysql.client.query('SELECT * FROM compte WHERE idUtilisateur = ? AND idCompte = ?', [userId, accountId], (err, rows) => {
            if (err) throw err;
            resolve(rows);
        })
    })
}

exports.getUserAccountMovements = async function(userId, accountId) {
    return new Promise(function(resolve) {
        mysql.client.query(
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