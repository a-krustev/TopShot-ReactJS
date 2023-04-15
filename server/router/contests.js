const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { contestController } = require('../controllers');

// middleware that is specific to this router

router.post('/', auth(), contestController.createContest);
router.get('/list', contestController.getLatestsContests);
router.get('/detail/:contestId', contestController.getContest);
router.post('/add-photo', auth(), contestController.addPhoto);
router.put('/like', auth(), contestController.likePhoto);

module.exports = router