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

exports.getMouvementsByCompteId = async function(id) {
    return new Promise(function(resolve) {
        mysql.query('SELECT * FROM mouvement WHERE idCompte = ?', [id], (err, rows) => {
            if (err) throw err;
            resolve(rows);
        });
    });
}

exports.getVirementsByCompteId = async function(id, typeMouvement) {
    if(typeMouvement && typeMouvement == 'D') {
        return new Promise(function(resolve) {
            mysql.query('SELECT * FROM virement WHERE idCompteDebit = ?', [id], (err, rows) => {
                if (err) throw err;
                resolve(rows);
            });
        });
    }

    if(typeMouvement && typeMouvement == 'C') {
        return new Promise(function(resolve) {
            mysql.query('SELECT * FROM virement WHERE idCompteCredit = ?', [id], (err, rows) => {
                if (err) throw err;
                resolve(rows);
            });
        });
    }

    return new Promise(function(resolve) {
        mysql.query('SELECT * FROM virement WHERE idCompteDebit = ? OR idCompteCredit = ?', [id, id], (err, rows) => {
            if (err) throw err;
            resolve(rows);
        });
    });
}