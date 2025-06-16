const mysql = require('../mysql').client;

exports.getAllComptes = async function(id) {
    return new Promise(function(resolve) {
        mysql.query('SELECT * FROM compte WHERE idUtilisateur = ?', [id], (err, rows) => {
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

exports.getMouvementsByCompteId = async function(id, category, subCategory) {
    return new Promise(function(resolve) {
        let query = 'SELECT * FROM mouvement WHERE idCompte = ?';
        let params = [id];

        if (category) {
            query += ' AND idCategorie = ?';
            params.push(category);
        }

        if (subCategory) {
            query += ' AND idSousCategorie = ?';
            params.push(subCategory);
        }

        mysql.query(query, params, (err, rows) => {
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
deleteMouvementOnAccount = async function(idCompte){
    return new Promise(function(resolve, reject) {
        mysql.query('DELETE FROM mouvement WHERE idCompte = ?', [idCompte], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        })
    })
}

exports.deleteAccount = async function(userId, idCompte){
    await deleteMouvementOnAccount(idCompte);
    return new Promise(function(resolve, reject) {
        mysql.query('DELETE FROM compte WHERE idUtilisateur = ? AND idCompte = ?', [userId, idCompte], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        })
    })
}

exports.createCompte = async function(compte) {
    return new Promise(function(resolve, reject) {
        mysql.query('INSERT INTO compte SET ?', compte, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

exports.createVirement = async function(virement) {
    return new Promise(function(resolve, reject) {
        mysql.query('INSERT INTO virement SET ?', virement, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    }); 
}

exports.createMouvement = async function(mouvement) {
    return new Promise(function(resolve, reject) {
        mysql.query('INSERT INTO mouvement SET ?', mouvement, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}