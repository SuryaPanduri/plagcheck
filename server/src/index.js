import 'dotenv/config';
import app from './app.js';
import { sequelize } from './models/index.js';

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL connected');
    // in dev you can sync - creates / alters tables
    await sequelize.sync({ alter: true });
    console.log('✅ Models synced');
    app.listen(port, () => console.log(`🚀 API running at http://localhost:${port}`));
  } catch (err) {
    console.error('DB connection failed:', err);
    process.exit(1);
  }
};

start();