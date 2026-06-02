const db = require('../config/db');

const Prestador = {
    // Obtener todos los prestadores
    getAll: (callback) => {
        db.query('SELECT * FROM prestadores', callback);
    },
    // Obtener prestador por ID usando prepared statement (?)
    getById: (id, callback) => {
        db.query('SELECT * FROM prestadores WHERE id = ?', [id], callback);
    },
    // Crear un nuevo prestador
    create: (data, callback) => {
        db.query('INSERT INTO prestadores SET ?', [data], callback);
    },
    // Actualizar datos del prestador
    update: (id, data, callback) => {
        db.query('UPDATE prestadores SET ? WHERE id = ?', [data, id], callback);
    },
    // Eliminar prestador
    delete: (id, callback) => {
        db.query('DELETE FROM prestadores WHERE id = ?', [id], callback);
    },
    // ENDPOINT EXTRA: Buscar prestadores por zona de cobertura
    getByZona: (zona, callback) => {
        db.query('SELECT * FROM prestadores WHERE zona_cobertura LIKE ?', [`%${zona}%`], callback);
    }
};
module.exports = Prestador;