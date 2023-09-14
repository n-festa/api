
const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes, Op } = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/config.json`)[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config, {
    omitNull: true,
  });
}
/*
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
*/
//db.admin = require("./admins.js")(sequelize, Sequelize, DataTypes);
//db.user = require("./user.model.js")(sequelize, Sequelize, DataTypes);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
