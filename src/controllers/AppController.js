import dbClient from '../../utils/db';

export default class AppController {
  static async homeRoute(req, res) {
    const data = {
      title: 'RecipeRave',
    };
    console.log(dbClient.isAlive());
    console.log(await dbClient.nbUsers());
    res.render('pages/index', { data });
  }
}
