const router = require("express").Router();
const readingListController = require("../controllers/readingListController");
const { authenticate } = require("../middleware/authMiddleware");

router.use(authenticate);

router.get("/", readingListController.list);
router.post("/", readingListController.add);
router.put("/:bookId", readingListController.updateStatus);
router.delete("/:bookId", readingListController.remove);

module.exports = router;
