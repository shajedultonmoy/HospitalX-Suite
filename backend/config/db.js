const { Sequelize } = require('sequelize');
const path = require('path');

const dialect = process.env.DB_DIALECT || 'mysql';
const useSsl = process.env.DB_SSL === 'true';

const sequelize =
  dialect === 'sqlite'
    ? new Sequelize({
        dialect: 'sqlite',
        storage: path.join(__dirname, '..', 'hospitalx.sqlite'),
        logging: false
      })
    : new Sequelize(
        process.env.DB_NAME || 'hospitalx_suite',
        process.env.DB_USER || 'root',
        process.env.DB_PASSWORD || '',
        {
          host: process.env.DB_HOST || 'localhost',
          port: Number(process.env.DB_PORT || 3306),
          dialect: 'mysql',
          logging: false,
          define: {
            underscored: true
          },
          pool: {
            max: Number(process.env.DB_POOL_MAX || 10),
            min: Number(process.env.DB_POOL_MIN || 0),
            acquire: Number(process.env.DB_POOL_ACQUIRE || 30000),
            idle: Number(process.env.DB_POOL_IDLE || 10000)
          },
          dialectOptions: useSsl
            ? {
                ssl: {
                  require: true,
                  rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED !== 'false'
                }
              }
            : {}
        }
      );

module.exports = sequelize;
