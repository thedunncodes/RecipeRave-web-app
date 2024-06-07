import dbClient from '../../utils/db';
import indexRange from '../../utils/pagehelper';

export default class AppController {
  static async homeRoute(req, res) {
    const data = {
      title: 'RecipeRave',
      profile_image: (req.user) ? req.user.profile_image : null,
      breakFast: await dbClient.nbCategory('Break Fast'),
      launch: await dbClient.nbCategory('Launch'),
      dinner: await dbClient.nbCategory('Dinner'),
      dessert: await dbClient.nbCategory('Dessert'),
      baking: await dbClient.nbCategory('Baking'),
      drinks: await dbClient.nbCategory('Drinks'),
    };

    const limit = 6;
    let maxPage = await dbClient.nbArticles();
    maxPage = Math.ceil((maxPage / limit));
    const pagination = {
      limit,
      page: ((req.query) ? req.query.page : 1) || 1,
      roll_start: ((req.query) ? req.query.start : 1) || 1,
      roll_end: ((req.query) ? req.query.end : maxPage) || maxPage,
      maxPage,
    };

    const [start, end] = indexRange(pagination.page, pagination.limit);

    const articles = await dbClient.client.db().collection('articles').find().toArray();
    articles.reverse();
    let userArticle = {};
    if (end >= articles.length) {
      userArticle = articles.slice(start);
    } else {
      userArticle = articles.slice(start, end);
    }

    res.render('pages/index', { data, pagination, userArticle });
  }

  static ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    dbClient.urlStorage.url = req.originalUrl;
    return res.redirect('/sign-in');
  }

  static logout(req, res) {
    req.session.destroy();
    return res.redirect('/');
  }
}
