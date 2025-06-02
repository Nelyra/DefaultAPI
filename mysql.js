var mysql = require('mysql');
const DATABASE = "default_bdd"
const client = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: DATABASE,
})

export function connectMySQL()
{
    client.connect(DATABASE, function (err, db) {
        if (err) {
            console.log(err)
        }

        console.log("Database Connected");
    })
}

