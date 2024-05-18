import { Router } from 'express';
import AppController from '../controllers/AppController';

const router = Router();

router.get('/', AppController.homeRoute);

module.exports = router;