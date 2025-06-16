const mysql = require('mysql');
const DATABASE = "default_bdd"

exports.client = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'jdevienne',
    password: 'Kirby42',
    database: 'Money_API',
})
