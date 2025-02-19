const sequelize = require('./src/config/database');
const Empresa = require('./src/models/empresa');

async function syncDatabase() {
  try {
    await sequelize.sync({ alter: true }); // ✅ Esto actualiza la estructura sin eliminar datos 
    console.log('✅ Base de datos sincronizada correctamente.');
  } catch (error) {
    console.error('❌ Error al sincronizar la base de datos:', error);
  } finally {
    process.exit();
  }
}

syncDatabase();
