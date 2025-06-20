const mysql = require('../mysql').client;

exports.getAllSubCategories = async function() {
    return new Promise(function(resolve) {
        mysql.query('SELECT * FROM souscategorie', (err, rows) => {
            if (err) throw err;
            resolve(rows);
        });
    });
}

exports.getSubCategoryById = async function(id) {
    return new Promise(function(resolve) {
        mysql.query('SELECT * FROM souscategorie WHERE idSousCategorie = ?', [id], (err, rows) => {
            if (err) throw err;
            resolve(rows);
        });
    });
}

exports.createSubCategory = async function(nomSousCategorie, idCategorie) {
    fields = 'nomSousCategorie, idCategorie';
    values = '?, ?';
    data = [nomSousCategorie, idCategorie];

    return new Promise(function(resolve) {
        mysql.query(`INSERT INTO souscategorie (${fields}) VALUES (${values})`, data, (err, result) => {
            if (err) throw err;
            resolve(result);
        })
    })
}

exports.deleteSubCategoryById = async function(id) {
    return new Promise(function(resolve) {
        mysql.query('DELETE FROM souscategorie WHERE idSousCategorie = ?', [id], (err, result) => {
            if (err) throw err;
            resolve(result);
        });
    });
}
