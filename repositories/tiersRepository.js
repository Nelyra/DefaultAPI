const mysql = require('../mysql').client;

exports.getAllTiers = async function(id) {
    return new Promise(function(resolve, reject) {
        mysql.query('SELECT * FROM tiers WHERE userId = ?', [id], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

exports.getTierById = async function(id, userId) {
    return new Promise(function(resolve, reject) {
        mysql.query('SELECT * FROM tiers WHERE idTiers = ? AND userId = ?', [id, userId], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}