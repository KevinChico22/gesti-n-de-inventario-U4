
const { Pool } = require('pg');

// Conexión con PostgreSQL de Supabase
const db = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// Comprobar conexión
db.connect()
    .then((client) => {
        console.log('Conexión con PostgreSQL establecida correctamente.');
        client.release();
    })
    .catch((error) => {
        console.error('Error al conectar con PostgreSQL:', error.message);
    });

module.exports = db;

