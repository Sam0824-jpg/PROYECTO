const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/inicio', require('./routes/inicio'));
app.use('/api/prestadores', require('./routes/prestadores'));
app.use('/api/categorias', require('./routes/categorias'));
app.use('/api/resenas', require('./routes/resenas'));
app.use('/api/servicios', require('./routes/servicios'));
app.use('/api/usuarios', require('./routes/usuarios'));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor FyNe corriendo en el puerto ${PORT}`);
});