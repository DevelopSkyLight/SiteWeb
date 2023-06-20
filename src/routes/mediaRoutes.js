const express = require('express');
const router = express.Router();

const { mediaView } = require('../controllers/pageMediaControllers')
router.get('/media', mediaView);

module.exports = router;