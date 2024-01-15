const bcrypt = require("bcryptjs"); //bcryptjs faster and optimized
const usersRouter = require("express").Router();

const User = require("../models/user");

usersRouter.post("/", async (req, res, next) => {
  const { username, name, password } = req.body;

  try {
    // if (!username || !password) {  //validation handle by mongoose
    //   return res
    //     .status(400)
    //     .send("Both username and password must be provided");
    // }

    if (password.length < 3) {
      return res.status(400).send("Password must be greater than 3 character");
    }

    // const existingUser = await User.findOne({ username }); //validation handle from mongoose
    // if (existingUser) {
    //   return res.status(400).json({ error: "Username must be unique" });
    // }

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
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
  });

  res.json(users);
});

module.exports = usersRouter;
