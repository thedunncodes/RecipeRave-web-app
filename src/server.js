import bodyParser from 'body-parser';
import sha1 from 'sha1';
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';
import dbClient from '../utils/db';

dotenv.config();
const expressLayout = require('express-ejs-layouts');

const app = express();
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 60 * 1000 },
}));

app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');
app.set('layout', 'layouts/layout');
app.use(expressLayout);

// ------------------ This should be in the utils folder and later imported ---------------------

// ------------------------- end ----------------------------------

passport.use(new LocalStrategy(async (username, password, done) => {
  // console.log('Strategy starting');
  // console.log(username);
  const user = await dbClient.client.db().collection('users').findOne({ username });
  console.log(user);
  if (!user) {
    return done(null, false, { message: 'Incorrect username.' });
  }
  if (user.password !== sha1(password)) {
    return done(null, false, { message: 'Incorrect password.' });
  }
  // console.log('user');
  return done(null, user);
}));

passport.serializeUser((user, done) => {
  console.log('Serializing....');
  console.log(`serialized user: ${user}`);
  done(null, user.username);
});

// Deserialize user from session
passport.deserializeUser(async (username, done) => {
  console.log('Deserializing....');
  console.log(username);
  const user = await dbClient.client.db().collection('users').findOne({ username });
  console.log(`DeSerialized user: ${user}`);
  done(null, user);
});

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// app.set('views', path.join(__dirname, 'views'));

app.use(routes);
app.use(express.static('public'));

const port = process.env.PORT || 5000;
// const test = process.env.SECRET_KEY

app.listen(port, () => {
  console.log('Server running on port ', Number(port));
});
