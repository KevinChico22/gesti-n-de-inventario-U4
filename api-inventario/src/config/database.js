
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Crear o conectar con la base de datos
const db = new sqlite3.Database(
    path.join(__dirname, '../../inventario.db'),
    (error) => {
        if (error) {
            console.error('Error al conectar con la base de datos:', error.message);
        } else {
            console.log('Conexión con SQLite establecida correctamente.');
        }
    }
);

// Crear tabla de productos
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS productos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            categoria TEXT NOT NULL,
            precio REAL NOT NULL,
            stock INTEGER NOT NULL
        )
    `, (error) => {
        if (error) {
            console.error('Error al crear la tabla:', error.message);
        } else {
            console.log('Tabla productos creada correctamente.');
        }
    });
});

module.exports = db;
