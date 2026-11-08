const router = require("express").Router();
const reviewController = require("../controllers/reviewController");
const { authenticate } = require("../middleware/authMiddleware");

router.get("/book/:apiBookId", reviewController.listByBook);
router.get("/me", authenticate, reviewController.listMine);
router.post("/", authenticate, reviewController.create);
router.put("/:id", authenticate, reviewController.update);
router.delete("/:id", authenticate, reviewController.remove);

module.exports = router;
