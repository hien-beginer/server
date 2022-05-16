const express = require("express");
const router = express.Router();
const postController = require("../controller/doctorController");

router.get("/:id", postController.getAPost);
router.delete("/:id", postController.deletePost);
router.put("/:id", postController.updatePost);
router.post("/", postController.createPost);
router.get("/", postController.showPost);

module.exports = router;
