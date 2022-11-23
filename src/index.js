const app = require("./app");
const mongoose = require("mongoose");
const appConfig = require("./config/app.config");
const dbConfig = require("./config/db.config");

app.listen(appConfig.port, () => {
  console.log(`Server is running on port ${appConfig.port}.`);
});

// mongodb connect
mongoose
  .connect(dbConfig.url, dbConfig.options)
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });
