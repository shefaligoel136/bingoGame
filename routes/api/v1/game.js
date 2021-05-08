const express = require('express');
const router = express.Router();

const gameApi = require("../../../controllers/api/v1/game_api");

router.get('/',gameApi.index);
// router.get('/createGame',gameApi.createGame);
router.post('/createRoom',gameApi.createRoom);
router.post('/joinRoom',gameApi.joinRoom);
router.get('/startGame',gameApi.startGame);
// router.get('/details',gameApi.details);
// router.get('/startGame',gameApi.startGame);


module.exports = router;