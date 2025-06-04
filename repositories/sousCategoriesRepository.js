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