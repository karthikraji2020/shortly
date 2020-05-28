require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const dbConfig =  require('./api/config/database.config')
const port = process.env.PORT || 5000;
const userRouter = require('./api/routes/user.route');
const urlShortenerRouter = require('./api/routes/urlshortener.routes');

const mongooseSets={
    keepAlive: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  };

//middlewares 
app.use(cors());
// app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

  mongoose.Promise = global.Promise;

  // Connecting to the database
  mongoose.connect(dbConfig.url, mongooseSets).then(() => {
      console.log("Successfully connected to the database");    
  }).catch(err => {
      console.log('Could not connect to the database. Exiting now...', err);
      process.exit();
  });

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });
  

// Routes which should handle requests
app.use('/user', userRouter);
app.use('/urlshortener', urlShortenerRouter);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});