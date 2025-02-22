import bodyParser from 'body-parser';
import sha1 from 'sha1';
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import routes from './routes';
import dbClient from '../utils/db';

// dotenv.config();
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

passport.use(new LocalStrategy(async (username, password, done) => {
  const user = await dbClient.client.db().collection('users').findOne({ username });
  if (!user) {
    return done(null, false, { message: 'Incorrect username.' });
  }
  if (user.password !== sha1(password)) {
    return done(null, false, { message: 'Incorrect password.' });
  }
  return done(null, user);
}));

passport.serializeUser((user, done) => {
  done(null, user.username);
});

// Deserialize user from session
passport.deserializeUser(async (username, done) => {

  const user = await dbClient.client.db().collection('users').findOne({ username });
  done(null, user);
});

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});


app.use(routes);
app.use(express.static('public'));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('Server running on port ', Number(port));
});
