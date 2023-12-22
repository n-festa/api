const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const swagger = require("./utils/swagger");
const session = require("express-session");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//app.options("*", cors());
const corsOptions = {
  //optionsSuccessStatus: 200, // For legacy browser support
  credentials: true, // This is important.
  origin: "http://localhost:3001",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./models");
const Role = db.role;
db.sequelize.sync().then(() => {});

//session
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
  })
);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Hi there, welcome to this tutoria12312l." });
});

// api routes
app.use("/api/docs", swagger.router);
app.use(require("./routes"));

// set port, listen for requests
//const PORT = config.PORT;
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//Test: repeat-conflit-fixing-2
