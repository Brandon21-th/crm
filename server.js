require('dotenv').config();
const express = require('express');
const sequelize = require('./src/config/database');
const empresaRoutes = require('./src/routes/empresaRoutes');

const app = express();

// Middleware para leer JSON
app.use(express.json());

// Rutas
app.use('/api', empresaRoutes);

const PORT = process.env.PORT || 5000;

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
