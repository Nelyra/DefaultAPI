var mysql = require('mysql');
const DATABASE = "default_bdd"

exports.client = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: DATABASE,
})

exports.connectMySQL = () =>
{
    try {
        this.client.connect()
    } catch (e) {
        console.error(e);
    }
}

