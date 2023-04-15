const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { categoryController, contestController } = require('../controllers');

// middleware that is specific to this router

router.get('/', categoryController.getCategories);
router.post('/', auth(), categoryController.createCategory);

router.get('/:categoryId', categoryController.getCategory);
router.put('/:categoryId', auth(), categoryController.subscribe);
router.put('/:categoryId/contests/:contestId', auth(), contestController.editContest);
router.delete('/:categoryId/contests/:contestId', auth(), contestController.deleteContest);

// router.get('/my-trips/:id/reservations', auth(), categoryController.getReservations);

module.exports = router