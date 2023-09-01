const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;
console.log("connection to url: ", url);

mongoose.set("strictQuery", false);
mongoose
  .connect(url)
  .then(() => {
    console.log("connected to mongoDB");
  })
  .catch((error) => {
    console.log("error connecting to mongoDB: ", error.message);
  });

const personSchema = new mongoose.Schema({
  name: { type: String, minLength: 5, required: true, unique: true },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        return /\d{2,3}-\d{7,8}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, "User phone number required"],
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
