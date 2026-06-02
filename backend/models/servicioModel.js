const db = require('../config/db');

const Servicio = {
    getAll: (callback) => db.query('SELECT * FROM servicios', callback),
    getById: (id, callback) => db.query('SELECT * FROM servicios WHERE id = ?', [id], callback),
    create: (data, callback) => db.query('INSERT INTO servicios SET ?', [data], callback),
    update: (id, data, callback) => db.query('UPDATE servicios SET ? WHERE id = ?', [data, id], callback),
    delete: (id, callback) => db.query('DELETE FROM servicios WHERE id = ?', [id], callback),
    // ENDPOINT EXTRA: Ver todos los servicios de un plomero/prestador específico
    getByPrestador: (prestador_id, callback) => db.query('SELECT * FROM servicios WHERE prestador_id = ?', [prestador_id], callback)
};
module.exports = Servicio;