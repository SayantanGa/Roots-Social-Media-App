const express = require("express");
const cors = require("cors");
const path = require("path");
const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.options("*", cors());

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(`/api/v1/posts`, postRouter);
app.use(`/api/v1/users`, userRouter);

module.exports = app;
