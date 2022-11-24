const cluster = require("cluster");
const totalCPUs = require("os").cpus().length;

if (cluster.isMaster) {
  console.log(`Number of CPUs is ${totalCPUs}`);
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    console.log("Let's fork another worker!");
    cluster.fork();
  });
} else {
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
}
