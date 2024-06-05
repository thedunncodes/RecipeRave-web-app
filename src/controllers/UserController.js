import sha1 from 'sha1';
import { ObjectId } from 'mongodb';
import dbClient from '../../utils/db';
import indexRange from '../../utils/pagehelper';


export default class AppController {
  static signUpRoute(req, res) {
    const message = {
      title: 'RecipeRave - Sign up',
      name: req.query.name,
    };
    if (req.isAuthenticated()) {
      return res.redirect('/');
    }
    res.render('pages/register', { message, layout: 'layouts/auth' });
  }

  static async register(req, res) {
    const data = req.body;
    if (!data) {
      return res.status(404).json({ error: 'Unauthorized' });
    }
    const user = await dbClient.client.db().collection('users').findOne({ username: req.body.username });
    if (user) {
      console.log('Breaaaaach!!!......');
      if (user.email === data.email) {
        return res.status(404).json({ error: 'Unauthorized' });
      }
      if (user.password === sha1(data.password)) {
        return res.status(404).json({ error: 'Unauthorized' });
      }

      return res.status(404).json({ error: 'Username taken' });
    }
    await dbClient.client.db().collection('users').insertOne({
      username: data.username,
      fullname: data.fullname,
      email: data.email,
      password: sha1(data.password),
      profile_image: (req.file) ? req.file.filename : 'default.png',
    });
    console.log(data);
    res.redirect(`/sign-up?name=${data.username}`);
  }

  static login(req, res) {
    const message = {
      title: 'RecipeRave - sign in',
    };
    console.log('Login ROute running....');
    if (req.isAuthenticated()) {
      res.redirect('/');
    }
    console.log(`login Page: ${req.session.returnTo}`);
    console.log(`Login Page Session ID -> ${req.session.id}`);
    res.render('pages/login', { message, layout: 'layouts/auth' });
  }

  static loginAccess(req, res) {
    console.log('login access Route running....');
    console.log(`Access page Session ID -> ${req.session.id}`)

    const redirectTo = dbClient.urlStorage.url || '/';
    delete dbClient.urlStorage.url;
    console.log(dbClient.urlStorage);
    console.log(`Redirect to: ${redirectTo}`);
    return res.redirect(redirectTo);
  }

  static async account(req, res) {
    const data = {
      title: 'RecipeRave - Account',
      username: req.user.username,
      fullname: req.user.fullname,
      profile_image: (req.user) ? req.user.profile_image : null,
    };

    const limit = 6;
    let maxPage = await dbClient.nbArticles();
    maxPage = Math.ceil((maxPage / limit));
    const pagination = {
      limit,
      page: ((req.query) ? req.query.page : 1) || 1,
      roll_start: ((req.query) ? req.query.start : 1) || 1,
      roll_end: ((req.query) ? req.query.end : 3) || maxPage,
      maxPage,
    };

    const [start, end] = indexRange(pagination.page, pagination.limit);

    const articles = await dbClient.client.db().collection('articles').find().toArray();
    articles.reverse();
    let userArticle = {};
    console.log(`\n\nEnd: ${end}\n\n`);
    if (end >= articles.length) {
      userArticle = articles.slice(start);
    } else {
      userArticle = articles.slice(start, end);
    }
    if (!req.isAuthenticated()) {
      return res.redirect('/sign-in');
    }
    res.render('pages/account', { data, pagination, userArticle });
  }

  static async savedArticle(req, res) {
    const data = {
      title: 'RecipeRave - Saved Articles',
      username: req.user.username,
      fullname: req.user.fullname,
      profile_image: (req.user) ? req.user.profile_image : null,
    };

    const limit = 6;
    let maxPage = await dbClient.nbArticles();
    maxPage = Math.ceil((maxPage / limit));
    const pagination = {
      limit,
      page: ((req.query) ? req.query.page : 1) || 1,
      roll_start: ((req.query) ? req.query.start : 1) || 1,
      roll_end: ((req.query) ? req.query.end : 3) || maxPage,
      maxPage,
    };

    const [start, end] = indexRange(pagination.page, pagination.limit);

    const articles = await dbClient.client.db().collection('articles').find().toArray();
    articles.reverse();
    let userArticle = {};
    console.log(`\n\nEnd: ${end}\n\n`);
    if (end >= articles.length) {
      userArticle = articles.slice(start);
    } else {
      userArticle = articles.slice(start, end);
    }
    if (!req.isAuthenticated()) {
      return res.redirect('/sign-in');
    }
    res.render('pages/savedarticle', { data, pagination, userArticle });
  }

  static async imageUpload(req, res) {
    // if (req.file) {
    //   res.send(`Image uploaded: ${req.file.path}`);
    // } else {
    //   res.status(400).send('No file uploaded');
    // }

    const image = { profile_image: req.file.filename };
    try {
      const response = await dbClient.client.db().collection('users').updateOne(
        { _id: new ObjectId(req.user._id) },
        { $set: image },
      );

      if (response.matchedCount === 0) {
        return res.status(404).send('User not found');
      };
      res.send('User updated successfully');
    } catch (err) {
      res.status(500).send('Error updating user');
    }

    // res.render('pages/account', { data });
  }
}
