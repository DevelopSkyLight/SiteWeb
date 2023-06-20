const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../middlewares/auth');

const { signinView } = require('../controllers/pageSigninControllers');
router.get('/signin', signinView);

const { signinPost } = require('../controllers/pageSigninControllers');
router.post('/signin', signinPost);

const { signoff } = require('../controllers/pageSigninControllers');
router.get('/signoff', isAuthenticated, signoff);

module.exports = router;