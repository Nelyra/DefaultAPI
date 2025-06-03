const mysql = require('../mysql')

exports.getAllUsers = async function() {
    return new Promise(function(resolve) {
        mysql.client.query('SELECT * FROM utilisateur', (err, rows) => {
            if (err) throw err;
            resolve(rows);
        })
    })
}