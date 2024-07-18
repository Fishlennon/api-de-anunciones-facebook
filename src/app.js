const express = require('express');
const exphbs = require('express-handlebars');
const dotenv = require('dotenv');
const path = require('path');
const config = require('../config/config');

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = config.server.port;

// Configurar Handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
const adRoutes = require('./routes/adRoutes');
app.use('/api/ads', adRoutes);

// Ruta principal
app.get('/', (req, res) => {
  res.render('dashboard');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});