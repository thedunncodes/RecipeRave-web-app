import moment from 'moment';
import { ObjectId } from 'mongodb';
import dbClient from '../../utils/db';
import indexRange from '../../utils/pagehelper';

export default class PostController {
  static article(req, res) {
    const data = {
      title: 'RecipeRave - Article',
      profile_image: (req.user) ? req.user.profile_image : null,
    };
    return res.render('pages/dashboard', { data });
  }

  static async articleData(req, res) {
    await dbClient.client.db().collection('articles').insertOne({
      user_id: req.user._id,
      fullname: req.user.fullname,
      title: req.body.title,
      content: req.body.content,
      cover_image: req.file.filename,
      date_created: moment().format('LLL'),
      category: req.body.category,
      profile_image: (req.file) ? req.file.filename : 'default.png',
    });
    return res.redirect('/');
  }

  static async getPost(req, res) {
    const postID = req.params.postId;

    const data = {
      title: 'RecipeRave - Blogpost',
      profile_image: (req.user) ? req.user.profile_image : null,
      url: (req.query.saved) ? req.query.saved : null,
    };
    const article = await dbClient.client.db().collection('articles').findOne({ _id: new ObjectId(postID) });
    res.render('pages/postblog', { data, article });
  }

  static async recipeCategory(req, res) {
    const data = {
      title: 'RecipeRave - Recipe category',
      profile_image: (req.user) ? req.user.profile_image : null,
      category: req.params.category,
    };

    const limit = 6;
    let maxPage = await dbClient.nbCategory(req.params.category);
    maxPage = Math.ceil((maxPage / limit));
    const pagination = {
      limit,
      page: ((req.query) ? req.query.page : 1) || 1,
      roll_start: ((req.query) ? req.query.start : 1) || 1,
      roll_end: ((req.query) ? req.query.end : maxPage) || maxPage,
      maxPage,
    };

    const [start, end] = indexRange(pagination.page, pagination.limit);

    const articles = await dbClient.client.db().collection('articles').find({ category: req.params.category }).toArray();
    articles.reverse();
    let userArticle = {};
    if (end >= articles.length) {
      userArticle = articles.slice(start);
    } else {
      userArticle = articles.slice(start, end);
    }

    res.render('pages/category', { data, pagination, userArticle });
  }

  static async savePost(req, res) {
    const postId = { saved_post: new ObjectId(req.body.articleId) };

    try {
      const response = await dbClient.client.db().collection('users').updateOne(
        { _id: new ObjectId(req.user._id) },
        { $push: postId },
      );

      if (response.matchedCount === 0) {
        return res.status(404).send('User not found');
      }
    } catch (err) {
      res.status(500).send('Error updating user');
    }

    return res.redirect(req.originalUrl);
  }

  static async removePost(req, res) {
    const postId = { saved_post: new ObjectId(req.body.articleId) };

    try {
      const response = await dbClient.client.db().collection('users').updateOne(
        { _id: new ObjectId(req.user._id) },
        { $pull: postId },
      );

      if (response.matchedCount === 0) {
        return res.status(404).send('User not found');
      }
    } catch (err) {
      return res.status(400).send('No changes made to the user');
    }

    return res.redirect('/account/saved');
  }
}
