const mysql = require('../mysql').client;

exports.getAllCategories = async function() {
    return new Promise(function(resolve) {
        mysql.query('SELECT * FROM categorie', (err, rows) => {
            if (err) throw err;
            resolve(rows);
        })
    })
}

exports.getCategoryById = async function(id) {
    return new Promise(function(resolve) {
        mysql.query('SELECT * FROM categorie WHERE idCategorie = ?', [id], (err, rows) => {
            if (err) throw err;
            resolve(rows);
        })
    })
}

exports.getSubCategoriesByCategoryId = async function(id) {
    return new Promise(function(resolve) {
        mysql.query('SELECT * FROM souscategorie WHERE idCategorie = ?', [id], (err, rows) => {
            if (err) throw err;
            resolve(rows);
        })
    })
}