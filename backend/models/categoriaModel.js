const db = require('../config/db');

const Categoria = {
    getAll: (callback) => {
        db.query('SELECT * FROM categorias', callback);
    },
    create: (data, callback) => {
        db.query('INSERT INTO categorias SET ?', [data], callback);
    },
    getById: (id, callback) => {
        db.query('SELECT * FROM categorias WHERE id = ?', [id], callback);
    },
    update: (id, data, callback) => {
        db.query('UPDATE categorias SET ? WHERE id = ?', [data, id], callback);
    },
    delete: (id, callback) => {
        db.query('DELETE FROM categorias WHERE id = ?', [id], callback);
    },
    // 🔥 EL ENDPOINT EXTRA QUE FALTABA
    buscar: (nombre, callback) => {
        // Usamos LIKE y los % para que encuentre coincidencias parciales (ej. "Plome" encuentra "Plomería")
        db.query('SELECT * FROM categorias WHERE nombre LIKE ?', [`%${nombre}%`], callback);
    }
};

module.exports = Categoria;