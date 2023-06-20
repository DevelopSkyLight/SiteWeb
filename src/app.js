const express = require('express');
const path = require('path');
const morgan = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

// initializations
const app = express();

// settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set("layout extractScripts", true);

// middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(expressLayouts);
app.use(cookieParser());


// Global variables
app.use((req, res, next) => {
  app.locals.user = req.user;
  if (!req.user)
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  next();
});

// Environment Variables
dotenv.config({path: './src/env/.env'});

// routes
app.use(require('./routes/homeRoutes'));
app.use(require('./routes/mediaRoutes'));
app.use(require('./routes/signupRoutes'));
app.use(require('./routes/signinRoutes'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../node_modules')));

// starting the server
app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});
