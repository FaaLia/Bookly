const router = require('express').Router();
const authorController = require('../controllers/authorController');
const { authenticate, requireAdmin } = require('../middleware/authMiddleware');

router.get('/', authorController.list);
router.get('/:id', authorController.getDetail);

router.post('/', authenticate, requireAdmin, authorController.create);
router.put('/:id', authenticate, requireAdmin, authorController.update);
router.delete('/:id', authenticate, requireAdmin, authorController.remove);

module.exports = router;