const express = require("express");
const cors = require('cors');
const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', userRouter);

//const posts = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/posts.json`));
app.use(cors());
app.options('*', cors());

module.exports = app;


