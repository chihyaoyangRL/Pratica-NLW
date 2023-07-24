//importar plugin
const Database = require('sqlite-async');

function execute(db) {
    //Criar as tabelas do banco de dados
    return db.exec(`
    CREATE TABLE IF NOT EXISTS proffys(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        avatar TEXT,
        whatsaap TEXT,
        bio TEXT
    );
    CREATE TABLE IF NOT EXISTS classes(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        subject INTEGER,
        cost TEXT,
        proffy_id INTEGER
    );
    CREATE TABLE IF NOT EXISTS class_schedule(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        class_id INTEGER,
        weekday INTEGER,
        time_from INTEGER,
        time_to INTEGER
    );
    `);
}
//Exportando db
module.exports = Database.open(__dirname + '/database.sqlite').then(execute);