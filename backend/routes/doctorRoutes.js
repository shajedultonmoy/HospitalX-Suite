const express = require('express');
const router = express.Router();
const { getDoctors, createDoctor, updateDoctor, deleteDoctor } = require('../controllers/doctorController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', getDoctors);
router.post('/', protect, authorize('Admin'), createDoctor);
router.put('/:id', protect, authorize('Admin'), updateDoctor);
router.delete('/:id', protect, authorize('Admin'), deleteDoctor);

module.exports = router;
