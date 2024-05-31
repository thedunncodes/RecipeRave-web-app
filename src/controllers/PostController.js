import moment from 'moment';
import dbClient from '../../utils/db';

export default class PostController {
  static article(req, res) {
    const data = {
      title: 'RecipeRave - Article',
    };
    console.log(dbClient.urlStorage);
    console.log(`Article page Session ID -> ${req.session.id}`);
    return res.render('pages/dashboard', { data });
  }

  static async articleData(req, res) {
    console.log('\n\n ----Ongoing---- \n\n');
    // if (req.file) {
    //   res.send(`Image uploaded: ${req.file.path}`);
    // } else {
    //   res.status(400).send('No file uploaded');
    // }
    console.log(req.body);
    console.log(req.file);

    await dbClient.client.db().collection('articles').insertOne({
      user_id: req.user._id,
      title: req.body.title,
      content: req.body.content,
      cover_image: req.file.filename,
      date_created: moment().format('LLL'),
    });
    return res.redirect(302, '/article');
  }
}
