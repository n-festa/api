
const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes, Op } = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require("../config/config.js");
const db = {};

//let sequelize;

const sequelize = new Sequelize(
    config.db.DB_NAME,
    config.db.DB_USER,
    config.db.DB_PASS,
    
    {
      host: config.db.DB_HOST,
      dialect: config.db.dialect,
      port: 8889,
      operatorsAliases: 0,

      poll: {
        max: config.db.pool.max,
        min: config.db.pool.min,
        acquire: config.db.pool.acquire,
        idle: config.db.pool.idle
      }
    }
);

db.admin = require("./admins.js")(sequelize, Sequelize, DataTypes);
db.user = require("./user.model.js")(sequelize, Sequelize, DataTypes);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
