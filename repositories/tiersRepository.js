const mysql = require('../mysql').client;

exports.getAllTiers = async function() {
    return new Promise(function(resolve, reject) {
        mysql.query('SELECT * FROM tiers', (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

exports.getTierById = async function(id) {
    return new Promise(function(resolve, reject) {
        mysql.query('SELECT * FROM tiers WHERE idTiers = ?', [id], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}