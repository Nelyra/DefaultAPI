const mysql = require('../mysql').client;

exports.getUserById = async function(id) {
    return new Promise(function(resolve) {
        mysql.query('SELECT * FROM utilisateur WHERE idUtilisateur = ?', [id], (err, rows) => {
            if (err) throw err;
            resolve(rows);
        })
    })
}

exports.getUserByLogin = async function(username) {
    return new Promise(function(resolve) {
        mysql.query('SELECT * FROM utilisateur WHERE login = ?', [username], (err, rows) => {
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

exports.deleteUser = async function(userId){
    return new Promise(function(resolve, reject) {
        mysql.query('DELETE FROM utilisateur WHERE idUtilisateur = ?', [userId], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        })
    })
}