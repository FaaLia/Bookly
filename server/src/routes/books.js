const router = require('express').Router();
const bookController = require('../controllers/bookController');

router.get('/', bookController.list);
router.get('/search', bookController.search);
router.get('/:apiBookId', bookController.getDetail);

module.exports = router;