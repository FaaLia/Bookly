const router = require('express').Router();
const authorController = require('../controllers/authorController');

router.get('/', authorController.list);
router.get('/:id', authorController.getDetail);

module.exports = router;
