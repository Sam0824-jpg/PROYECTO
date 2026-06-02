const db = require('../config/db');

const Usuario = {
    getAll: (callback) => db.query('SELECT id, nombre, email, rol FROM usuarios', callback), // No devolvemos el password por seguridad
    getById: (id, callback) => db.query('SELECT id, nombre, email, rol FROM usuarios WHERE id = ?', [id], callback),
    update: (id, data, callback) => db.query('UPDATE usuarios SET ? WHERE id = ?', [data, id], callback),
    delete: (id, callback) => db.query('DELETE FROM usuarios WHERE id = ?', [id], callback),
    // ENDPOINT EXTRA: Filtrar usuarios por rol (ej. ver todos los "clientes")
    getByRol: (rol, callback) => db.query('SELECT id, nombre, email FROM usuarios WHERE rol = ?', [rol], callback)
};
module.exports = Usuario;