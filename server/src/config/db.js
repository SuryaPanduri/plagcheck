import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false // set true for SQL logs
  }
);

// Optional: test DB connection
export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL connected');
  } catch (err) {
    console.error('❌ DB connection failed:', err);
  }
};

export default sequelize;
