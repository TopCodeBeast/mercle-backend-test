require("dotenv").config();

module.exports = {
  url: "mongodb://localhost:27017/mercletest",
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
