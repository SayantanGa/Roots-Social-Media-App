const mongoose = require("mongoose");

const app = require("./index");


const DB = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.kqmggvr.mongodb.net/?retryWrites=true&w=majority`;

try {
  mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "RootsSocialMediaApp",
    })
    .then(() => {
      console.log("Database connected");
    });
} catch (err) {
  console.log(err);
}
