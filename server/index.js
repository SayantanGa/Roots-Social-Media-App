const express = require("express");
const cors = require('cors');
const path = require('path');
const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(`/api/v1/posts`, postRouter);
app.use(`/api/v1/users`, userRouter);

//const posts = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/posts.json`));
app.use(cors({
  origin: ['https://roots-social-media-app-api.onrender.com', 'https://roots-social-media-app.vercel.app'],
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
  credentials: true
}));
app.options('*', cors());


module.exports = app;


