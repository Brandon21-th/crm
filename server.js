require('dotenv').config();
const express = require('express');
const sequelize = require('./src/config/database');
const empresaRoutes = require('./src/routes/empresaRoutes');
const sucursalRoutes = require('./src/routes/sucursalRoutes');

const app = express();

// Middleware para leer JSON
app.use(express.json());

// Rutas
app.use('/api', empresaRoutes);
app.use('/api', sucursalRoutes);

const PORT = process.env.PORT || 5000;

const path = require('path');

// Servir archivos estáticos desde la carpeta 'src/views'
app.use(express.static(path.join(__dirname, 'src', 'views')));

app.get('/views/empresas', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'views', 'empresas', 'index.html'));
});

// Nueva ruta para servir layout.html
app.get('/views/layout.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'views', 'layout.html'));
});

app.get('/views/sucursales', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'views', 'sucursales', 'index.html'));
})

// Iniciar el servidor
app.listen(PORT, async () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('✅ Base de datos conectada correctamente.');
  } catch (error) {
    console.error('❌ Error al conectar la base de datos:', error);
  }
});