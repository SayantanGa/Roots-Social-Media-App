const express = require("express");
const cors = require("cors");
const path = require("path");
const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(`/api/v1/posts`, postRouter);
app.use(`/api/v1/users`, userRouter);
/*
app.use(cors({
  origin: ['https://roots-social-media-app-api.onrender.com', 'https://roots-social-media-app.vercel.app'],
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
  credentials: true
}));
app.options('*', cors());
*/

app.use(function (req, res, next) {
  const allowedOrigins = [
    "https://roots-social-media-app-api.onrender.com",
    "https://roots-social-media-app.vercel.app",
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
  next();
});

module.exports = app;
