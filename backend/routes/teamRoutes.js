
const express = require('express');
const { getTeams, addTeam, updateTeam, deleteTeam } = require('../controllers/teamController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getTeams).post(protect, addTeam);
router.route('/:id').put(protect, updateTeam).delete(protect, deleteTeam);

module.exports = router;