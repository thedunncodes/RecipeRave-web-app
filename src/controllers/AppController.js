export default class AppController {
  static homeRoute(req, res) {
    res.set('title', 'Home Page');
    res.get('title');
    res.send('Halloe');
    res.render('index');
    //  {message: 'Welcome to the Home Page'
  }
}