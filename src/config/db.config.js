require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URL, {
    dbName: process.env.MONGODB_NAME,
    autoCreate: true,
    autoIndex: true,
  })
  .then((success) => {
    console.log("Db Server Connected...");
  })
  .catch((exception) => {
    console.log("Error Establishing Db Connection");
    process.exit(1);
  });
