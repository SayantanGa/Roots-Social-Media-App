const mongoose = require("mongoose");

const app = require("./index");

const DB_PASSWORD = "xoMxb14PePquC3h6";

const DB = `mongodb+srv://sayantangarai2017:${DB_PASSWORD}@cluster0.kqmggvr.mongodb.net/?retryWrites=true&w=majority`;

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

app.listen(5000, () => {
  console.log("App running on port 5000...");
});
