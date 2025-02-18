const sequelize = require('./src/config/database');
const Empresa = require('./src/models/empresa');

async function syncDatabase() {
  try {
    await sequelize.sync({ force: true }); // ⚠ Esto borrará y recreará las tablas cada vez que se ejecute
    console.log('✅ Base de datos sincronizada correctamente.');
  } catch (error) {
    console.error('❌ Error al sincronizar la base de datos:', error);
  } finally {
    process.exit();
  }
}

syncDatabase();
