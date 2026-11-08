const router = require('express').Router();
const bookController = require('../controllers/bookController');
const bookAdminController = require('../controllers/bookAdminController');
const { authenticate, requireAdmin } = require('../middleware/authMiddleware');

router.get('/', bookController.list);
router.get('/search', bookController.search);
router.get('/:apiBookId', bookController.getDetail);

router.post('/', authenticate, requireAdmin, bookAdminController.create);
router.put('/:id', authenticate, requireAdmin, bookAdminController.update);
router.delete('/:id', authenticate, requireAdmin, bookAdminController.remove);

module.exports = router;