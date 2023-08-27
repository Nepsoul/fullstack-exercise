const express = require("express");
const app = express();

require("dotenv").config(); //to access env file

const morgan = require("morgan");
// app.use(morgan("tiny")); //predefined logger middleware(either "tiny" or custom)

const Person = require("./models/person"); //import Person from database through env

const cors = require("cors"); //allow request from other/cross-origin

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

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) res.json(person);
      else {
        res
          .status(404)
          .json({ error: 404, message: `there is no peroson with id ` + id })
          .end();
      }
    })
    .catch((error) => {
      next(error);
      //   console.log(error.message);
      //   res.status(400).send({ error: "malformatted id" });
    });
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (req, res) => {
  const newData = req.body;
  console.log(newData, "newdata");
  if (newData.name === undefined) {
    return res.status(400).json({ error: "name missing" });
  }

  const person = new Person({
    name: newData.name,
    number: newData.number,
  });

  person.save().then((result) => {
    res.json(result);
  });
  //   newData.id = Math.floor(Math.random() * Person.length * 10000000);

  //   let existedData = Person.find((person) => person.name === newData.name);
  //   console.log(newData);
  //   if (existedData) {
  //     return res.status(400).json({ error: "name must be unique" });
  //   }
  //   if (
  //     newData.name === "" ||
  //     newData.number === "" ||
  //     !newData.hasOwnProperty("name") ||
  //     !newData.hasOwnProperty("number")
  //   ) {
  //     return res.status(400).json({ error: "name or number is missing" });
  //   }
  //   Person = Person.concat(newData);
  //   res.status(201).json(newData);
});

app.put("/api/persons/:id", (req, res, next) => {
  const updatedData = req.body;
  const person = {
    name: updatedData.name,
    number: updatedData.number,
  };
  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then((updatedPerson) => {
      res.json(updatedPerson);
    })
    .catch((error) => next(error));
});

//handle error if given absolut url is wrong
app.use((request, response, next) => {
  response.status(404).send("<h1>No routes found for this request</h1>");
});

//handle error if relative url unknown
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

// handler of requests with unknown endpoint
app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  console.log(error.message);
  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  }
  next(error);
};

// this has to be the last loaded middleware.
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
