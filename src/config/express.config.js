require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const router = require("../routes/");
const app = express();

//logg
app.use(morgan("dev"));

//dataParser
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
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
  res.status(code).json({
    result: null,
    message: message,
    meta: null,
  });
});

module.exports = app;
