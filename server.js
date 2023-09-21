const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config/config.js");

const app = express();
const swagger = require('./utils/swagger');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000/");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.options('http://localhost:3000/', cors())

const corsOptions = {
  optionsSuccessStatus: 200, // For legacy browser support
  credentials: true, // This is important.
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./models");
const Role = db.role;
db.sequelize.sync().then(() => {
  //initial(); // Just use it in development, at the first time execution!. Delete it in production
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Hi there, welcome to this tutoria12312l." });
});

// api routes
//app.set('db', require('../models/index.js'));

app.use('/api/docs', swagger.router);
app.use(require('./routes'));

// set port, listen for requests
//const PORT = config.PORT;
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

