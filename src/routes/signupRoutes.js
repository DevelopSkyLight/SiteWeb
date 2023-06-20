const express = require('express');
const router = express.Router();

const { signupView } = require('../controllers/pageSignupControllers');
router.get('/signup', signupView);
router.get('/signup/:sponsorcode', signupView);

const { signupPost } = require('../controllers/pageSignupControllers');
router.post('/signup', signupPost);


module.exports = router;