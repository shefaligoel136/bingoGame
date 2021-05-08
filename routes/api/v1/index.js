const express = require('express');
const router = express.Router();

router.use('/player',require('./player'));
router.use('/game',require('./game'));

module.exports = router;