require("dotenv").config(); //to access env file

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;

module.exports = {
  PORT,
  MONGODB_URI,
};
