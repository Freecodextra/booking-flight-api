const express = require('express');

const router = express.Router();
const controller = require('../controllers/flightController');

router
    .get('/', controller.welcome)
    .get('/flights', controller.getBookings)
    .post('/flights', controller.bookFlight)
    .get('/flights/:id', controller.getFlight)
    .put('/flights/:id', controller.updateFlight)
    .delete('/flights/:id', controller.deleteFlight);

module.exports = router;

