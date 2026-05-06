const express = require('express');
const router = express.Router();
const {
  getMedicines,
  createMedicine,
  updateMedicine,
  deleteMedicine
} = require('../controllers/medicineController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', getMedicines);
router.post('/', protect, authorize('Admin'), createMedicine);
router.put('/:id', protect, authorize('Admin'), updateMedicine);
router.delete('/:id', protect, authorize('Admin'), deleteMedicine);

module.exports = router;
