require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const router = require("../routes/");
const app = express();
const { ValidationError } = require("joi");

//logg
app.use(morgan("dev"));

//dataParser
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

//router//
app.use("/api/v1/", router);

//404handler
app.use((req, res, next) => {
  res.status(404).json({
    result: null,
    message: "Not Found",
    meta: null,
  });
});

//errorHandler
app.use((error, req, res, next) => {
  console.log("Garbage Collector: ", error);
  let code = error.code ?? 500;
  let message = error.message ?? "Interal erro... . ";
  let result = error.result ?? null;
  //joiError Handler
  if (error instanceof ValidationError) {
    let msg = error.message;
    code = 400;
    message = "validation Error!!";
    result = msg;
  }

  res.status(code).json({
    result: result,
    message: message,
    meta: null,
  });
});

module.exports = app;
