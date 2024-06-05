import passport from 'passport';
import { Router } from 'express';
import AppController from '../controllers/AppController';
import UserController from '../controllers/UserController';
import PostController from '../controllers/PostController';
import upload from '../../utils/multer';

const router = Router();

router.get('/', AppController.homeRoute);

router.get('/sign-up', UserController.signUpRoute);

router.post('/sign-up/access', UserController.register);

router.get('/article', AppController.ensureAuthenticated, PostController.article);

router.post('/article/data', upload.single('image'), PostController.articleData);

router.get('/sign-in', UserController.login);

router.post('/sign-in/access', passport.authenticate('local', {
  failureRedirect: '/sign-in',
  failureMessage: true,
}), UserController.loginAccess);

router.get('/recipes/:postId', PostController.getPost);

router.get('/account', AppController.ensureAuthenticated, UserController.account);

router.get('/account/saved', AppController.ensureAuthenticated, UserController.savedArticle);

router.post('/account/profile-update', upload.single('image'), UserController.imageUpload);

router.get('/user/logout', AppController.logout);


module.exports = router;
