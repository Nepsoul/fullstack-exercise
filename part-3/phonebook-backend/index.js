const express = require("express");
const app = express();
const morgan = require("morgan");
// app.use(morgan("tiny")); //predefined logger middleware(either "tiny" or custom)

const cors = require("cors"); //allow request from other/cross-origin
app.use(cors());

app.use(express.json()); //json-parser (note: without parser, req.body of post api is undefined)
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
let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("<h2>Hello world<h2/>");
});

app.get("/info", (req, res) => {
  res.send(
    `Phonebook has info for ${persons.length} people <br/>  <br/>${new Date()}`
  );
});
app.get("/api/persons", (request, response) => {
  response.json(persons); //express auto convert into json format
  // response.end(JSON.stringify(persons)) //explicitly set res content to manually convert into json format
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((data) => data.id === id);
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
  persons = persons.filter((data) => data.id !== id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  let newData = req.body;
  newData.id = Math.floor(Math.random() * persons.length * 10000000);

  let existedData = persons.find((person) => person.name === newData.name);
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
  persons = persons.concat(newData);
  res.status(201).json(newData);
});
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
