const express = require("express");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");
const compression = require("compression");

const app = express();
app.enable("trust proxy");

app.use(cors());
app.options("*", cors());

app.use(express.static(path.join(__dirname, "public")));
app.use(helmet());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());
app.use(compression());
app.use(`/api/v1/posts`, postRouter);
app.use(`/api/v1/users`, userRouter);

module.exports = app;
