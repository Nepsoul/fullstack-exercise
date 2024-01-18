const { info, errorLog } = require("./logger");
const requestLogger = (request, response, next) => {
  info("Method:", request.method);
  info("Path:  ", request.path);
  info("Body:  ", request.body);
  info("used api method");
  next();
};

const tokenExtractor = (req, res, next) => {
  // console.log("the error", error);
  const authorization = req.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    req.token = authorization.replace("Bearer ", "");
    // req.token = authorization.substring(7);
    // return next();
  }
  // req.token = null;
  next();
};

//handle error if given absolut url is wrong
const noHandler = (request, response) => {
  response.status(404).send("<h1>No routes found for this request</h1>");
};

//handle error if relative url unknown
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  errorLog(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "ReferenceError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "MongoServerError" && error.code === 11000) {
    //worked after using try/catch in controller
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: error.message });
  }
  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  noHandler,
  errorHandler,
  tokenExtractor,
};
