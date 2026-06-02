const db = require('../config/db');

const Resena = {
    getAll: (callback) => db.query('SELECT * FROM resenas', callback),
    getById: (id, callback) => db.query('SELECT * FROM resenas WHERE id = ?', [id], callback),
    create: (data, callback) => db.query('INSERT INTO resenas SET ?', [data], callback),
    update: (id, data, callback) => db.query('UPDATE resenas SET ? WHERE id = ?', [data, id], callback),
    delete: (id, callback) => db.query('DELETE FROM resenas WHERE id = ?', [id], callback),
    // ENDPOINT EXTRA: Calcular el promedio de estrellas de un trabajador
    getPromedio: (prestador_id, callback) => db.query('SELECT AVG(calificacion) as promedio FROM resenas WHERE prestador_id = ?', [prestador_id], callback)
};
module.exports = Resena;