const router = require("express").Router();
const favoriteController = require("../controllers/favoriteController");
const { authenticate } = require("../middleware/authMiddleware");

router.use(authenticate);

router.get("/", favoriteController.list);
router.post("/", favoriteController.add);
router.delete("/:bookId", favoriteController.remove);

module.exports = router;
