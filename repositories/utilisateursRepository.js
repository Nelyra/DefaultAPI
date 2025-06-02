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
        mysql.client.query('SELECT * FROM utilisateur WHERE id = ?', [id], (err, rows) => {
            if (err) throw err;
            resolve(rows);
        })
    })
}