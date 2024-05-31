import sha1 from 'sha1';
import dbClient from '../../utils/db';


export default class AppController {
  static signUpRoute(req, res) {
    const message = {
      title: 'RecipeRave - Sign up',
      name: req.query.name,
    };
    if (req.isAuthenticated()) {
      return res.redirect(302, '/');
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
    });
    console.log(data);
    res.redirect(302, `/sign-up?name=${data.username}`);
  }

  static login(req, res) {
    const message = {
      title: 'RecipeRave - sign in',
    };
    console.log('Login ROute running....');
    if (req.isAuthenticated()) {
      res.redirect(302, '/');
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
    return res.redirect(302, redirectTo);

    // return res.redirect(302, `/${req.query.url}`);
  }
}
