
const express = require('express');
const { getEvent, addEvent, updateEvent, deleteEvent } = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getEvent).post(protect, addEvent);
router.route('/:id').put(protect, updateEvent).delete(protect, deleteEvent);

module.exports = router;