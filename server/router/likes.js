const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { contestController } = require('../controllers');

// middleware that is specific to this router

router.put('/:postId', auth(), contestController.like);

module.exports = router
