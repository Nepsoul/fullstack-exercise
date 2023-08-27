const express = require("express");
const app = express();
const morgan = require("morgan");
// app.use(morgan("tiny")); //predefined logger middleware(either "tiny" or custom)

const cors = require("cors"); //allow request from other/cross-origin

const mongoose = require("mongoose");

const password = process.argv[2];

const url = `mongodb+srv://mangoose:${password}@cluster0.oxhvxoo.mongodb.net/phonebook-app?retryWrites=true&w=majority`;
console.log(url, "ursl");

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String, //to provide number with character
});

const Person = mongoose.model("Person", personSchema);

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

app.use(cors());
app.use(express.json()); //json-parser (note: without parser, req.body of post api is undefined)
app.use(express.static("dist")); //middleware to check dist directory to show frontend and backend(in same url/3001 port)

app.use(
  morgan(function (tokens, req, res) {
    //custom logger/request-logger middleware (in terminal give hitted api)
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
    ].join(" ");
  })
);

app.get("/", (request, response) => {
  response.send("<h2>Hello world<h2/>");
});

app.get("/info", (req, res) => {
  res.send(
    `Phonebook has info for ${Person.length} people <br/>  <br/>${new Date()}`
  );
});
app.get("/api/persons", (request, response) => {
  Person.find({}).then((result) => {
    response.json(result);
  });
  //express auto convert into json format
  // response.end(JSON.stringify(persons)) //explicitly set res content to manually convert into json format
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = Person.find((data) => data.id === id);
  console.log(person);
  if (person) res.json(person);
  else {
    res
      .status(404)
      .json({ error: 404, message: `there is no peroson with id ` + id })
      .end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  Person = Person.filter((data) => data.id !== id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  let newData = req.body;
  newData.id = Math.floor(Math.random() * Person.length * 10000000);

  let existedData = Person.find((person) => person.name === newData.name);
  console.log(newData);
  if (existedData) {
    return res.status(400).json({ error: "name must be unique" });
  }
  if (
    newData.name === "" ||
    newData.number === "" ||
    !newData.hasOwnProperty("name") ||
    !newData.hasOwnProperty("number")
  ) {
    return res.status(400).json({ error: "name or number is missing" });
  }
  Person = Person.concat(newData);
  res.status(201).json(newData);
});
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
