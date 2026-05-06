const express = require('express');
const router = express.Router();
const { getServices, createService, updateService, deleteService } = require('../controllers/serviceController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', getServices);
router.post('/', protect, authorize('Admin'), createService);
router.put('/:id', protect, authorize('Admin'), updateService);
router.delete('/:id', protect, authorize('Admin'), deleteService);

module.exports = router;
