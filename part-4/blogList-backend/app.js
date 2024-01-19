const express = require("express");
const app = express();
const mongoUrl = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");

const mongoose = require("mongoose");

const blogController = require("./controllers/blogs_api");

const userController = require("./controllers/users_api");

const loginRouter = require("./controllers/login");

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
    logger.error("error connecting to mongoDB: ", error.message);
  });

//console of api
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use("/api/blogs", blogController);

app.use("/api/users", userController);

app.use("/api/login", loginRouter);

// handle error if given absolute url is wrong
app.use(middleware.noHandler);

// handler of requests with unknown endpoint
app.use(middleware.unknownEndpoint);

// this has to be the last loaded middleware.
app.use(middleware.errorHandler);

module.exports = app;
