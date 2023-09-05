const express = require("express");
const app = express();
const mongoUrl = require("./utils/config");
const logger = require("./utils/logger");

const {
  unknownEndpoint,
  errorHandler,
  noHandler,
  requestLogger,
} = require("./utils/middleware");
const mongoose = require("mongoose");

const blogController = require("./controllers/blogs_api");

app.use(express.json()); //json-parser (note: without parser, req.body of post api is undefined)

mongoose.set("strictQuery", false);
logger.info("connecting to url ", mongoUrl.MONGODB_URI);

mongoose.connect(mongoUrl.MONGODB_URI);

mongoose
  .connect(mongoUrl.MONGODB_URI)
  .then(() => {
    logger.info("connected to mongoDB");
  })
  .catch((error) => {
    logger.info("error connecting to mongoDB: ", error.message);
  });

//console of api
app.use(requestLogger);

app.use("/api/blogs", blogController);

//handle error if given absolut url is wrong
app.use(noHandler);

// handler of requests with unknown endpoint
app.use(unknownEndpoint);

// this has to be the last loaded middleware.
app.use(errorHandler);

module.exports = app;
