import dbClient from '../../utils/db';

export default class AppController {
  static async homeRoute(req, res) {
    const data = {
      title: 'RecipeRave',
      profile_image: (req.user) ? req.user.profile_image : null,
    };
    // console.log(dbClient.isAlive());
    const article = await dbClient.client.db().collection('articles').find().toArray();
    article.reverse();
    console.log(`\n\n\nIndex page Session ID -> ${req.session}\n\n\n`);
    console.log(req.session);
    res.render('pages/index', { data, article });
  }

  static ensureAuthenticated(req, res, next) {
    console.log('ENsure authenticated running....\n');
    if (req.isAuthenticated()) {
      return next();
    }
    dbClient.urlStorage.url = req.originalUrl;
    console.log(dbClient.urlStorage);
    console.log(`Original url -> ${req.session.returnTo}`);
    return res.redirect('/sign-in');
  }

  static logout(req, res) {
    // if (!req.isAuthenticated()) {
    //   return res.redirect('/');
    // }
    console.log('\n\nLogout toute running.....\n\n');
    req.session.destroy();
    return res.redirect('/');
  }
}
