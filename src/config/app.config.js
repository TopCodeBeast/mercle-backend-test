require("dotenv").config();

module.exports = {
  port: process.env.PORT || 5000,
  corsOptions: {
    origin: "http://localhost:3000",
  },
};
