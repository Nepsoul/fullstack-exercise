const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();

const User = require("../models/user");

usersRouter.post("/", async (req, res, next) => {
  const { username, name, password } = req.body;

  try {
    if (!username || !password) {
      return res
        .status(400)
        .send("Both username and password must be provided");
    }

    if (username.length < 3 || password.length < 3) {
      return res
        .status(400)
        .send("Username and password must be greater than 3 character");
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds); //one-way hash
    const user = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await user.save();

    res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/", async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

module.exports = usersRouter;
