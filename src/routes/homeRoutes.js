const express = require('express');
const router = express.Router();

const { homeView } = require('../controllers/pageHomeControllers')
router.get('/', homeView);

module.exports = router;