const express = require('express');
const router = express.Router();

const playerApi = require("../../../controllers/api/v1/player_api");

router.get('/',playerApi.index);
router.post('/registerPlayer',playerApi.registerPlayer)

module.exports = router;