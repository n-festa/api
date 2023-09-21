const db = require("../models");
const User = db.user;
const bcrypt = require("bcryptjs");

exports.allAccess = async (req, res) => {
  
  const users = await User.findAll();
  res.status(200).json(users); 
};

exports.findOne = async (req, res) => {
  const users = await User.findOne({
    where: { username: req.params.id },
  });
  res.status(200).json(users); 
 // res.status(200).send("Public Content.");
};

exports.Update = async (req, res) => {
  const users = await User.findOne({
      where: { 
        email: req.params.id, 
      },
  });

  users.set({
      username: req.body.username,
    //  password: bcrypt.hashSync(req.body.password, 18)
  });
  await users.save();

  res.send({ message: " successfully!" });
};

exports.Delete = async (req, res) => {
  const users = await User.destroy({
    where: {
      email: req.params.id
    },
  });
   res.status(200).send("Success.");
};


exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};


