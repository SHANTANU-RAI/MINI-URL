require('dotenv').config();

const express = require('express');
const path = require('path');
const connectDB = require('./connect');
const MongoStore = require('connect-mongo');
const URL = require('./models/URL');
const {v4: uuidv4} = require('uuid');
const cookieParser = require('cookie-parser');
const {restrictToLoggedinUserOnly , checkAuth} = require('./middlewares/auth');

const urlRoute = require('./routes/url');
const staticRouter = require('./routes/staticRouter');
const userRoute = require('./routes/user');

const app = express();
const port = 8001 || process.env.PORT;

// Connect to DB
connectDB();

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());
app.use(express.static('public'));

app.use("/url", restrictToLoggedinUserOnly, urlRoute);
app.use("/user",checkAuth, userRoute);
app.use("", checkAuth, staticRouter);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});