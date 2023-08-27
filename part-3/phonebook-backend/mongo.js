const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://mangoose:${password}@cluster0.oxhvxoo.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: "Mary",
  number: 23787689,
});

person.save().then((result) => {
  console.log("person data saved!");
  mongoose.connection.close();
});
