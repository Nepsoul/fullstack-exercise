const express = require("express");
const app = express();

app.use(express.json()); //json-parser

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
  persons = persons.concat(newData);
  res.json(newData);
});
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
