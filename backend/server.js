const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Cargar variables de entorno

const app = express();

// Middlewares importantes para conectar Frontend y Backend
app.use(cors()); // Habilita peticiones cruzadas (ej. desde el Live Server hacia el localhost:3000)
app.use(express.json()); // Permite procesar los JSON enviados por los fetch() del frontend

// --- Importación de Rutas ---
const authRoutes = require('./routes/auth');
const usuariosRoutes = require('./routes/usuarios');
const prestadoresRoutes = require('./routes/prestadores');
const categoriasRoutes = require('./routes/categorias');
const serviciosRoutes = require('./routes/servicios');
const resenasRoutes = require('./routes/resenas');
const inicioRoutes = require('./routes/inicio');

// --- Registro de Endpoints ---
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/prestadores', prestadoresRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api/servicios', serviciosRoutes);
app.use('/api/resenas', resenasRoutes);
app.use('/api/inicio', inicioRoutes);

// Arrancar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor de FyNe conectado y corriendo en http://localhost:${PORT}`);
});