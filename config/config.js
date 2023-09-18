module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  app: {
    port: process.env.DEV_APP_PORT || 9090,
    appName: process.env.APP_NAME || 'iLrn',
    env: process.env.NODE_ENV || 'development',
  },
  /** DATABASE */
  db: {
    /*
    DB_HOST: "localhost",
    DB_USER: "root",
    DB_PASS: "root",
    DB_NAME: "2all-final",
    dialect: "mysql",
    port: 8889,
*/
    DB_HOST: "db-2all-free.cjzo9reiq4bt.ap-southeast-2.rds.amazonaws.com",
    DB_USER: "admin",
    DB_PASS: "Nht123456789",
    DB_NAME: "2all",
    dialect: "3306",
    port: 8889,
    // pool is optional, it will be used for Sequelize connection pool configuration
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },

  /** AUTH KEY */
  auth: {
    secret: "our-secret-key"
  },

  /* Email */
  sendgrid: {
    api_key: process.env.SEND_GRID_API_KEY,
    api_user: process.env.USERNAME,
    from_email: process.env.FROM_EMAIL || 'ntnhan90@gmail.com',
  },
  winiston: {
    logpath: '/iLrnLogs/logs/',
  },
};
