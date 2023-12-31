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
  number: String, //to provide number with character
});

const Person = mongoose.model("Person", personSchema);

mongoose.connect(url).then(() => {
  console.log("connected");
});

if (process.argv.length > 3) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });
  person
    .save()
    .then((result) => {
      console.log(`added ${result.name} number ${result.number} to phonebook`);
      mongoose.connection.close();
    })
    .catch((error) => console.log("promise rejected: ", error.message));
}

if (process.argv.length === 3) {
  Person.find({})
    .then((result) => {
      result.forEach((person) => {
        console.log(person.name, person.number);
      });
      mongoose.connection.close();
    })
    .catch((error) => console.log("error: ", error.message));
}
