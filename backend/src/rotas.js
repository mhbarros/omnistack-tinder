const express           = require('express');
const devController     = require('./controller/devController');
const likeController    = require('./controller/likeController');
const dislikeController = require('./controller/dislikeController');

const router = express.Router();

router.get('/dev', devController.getDev)
router.post('/dev', devController.cadastraDev);
router.post('/dev/:dev_id/like', likeController.cadastraLike);
router.post('/dev/:dev_id/dislike', dislikeController.cadastraDislike);

module.exports = router;
