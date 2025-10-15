const express = require("express");
const router = express.Router();
const isAuth = require("../middlewares/isAuth");
const { fileControllers } = require("../controllers");
const upload = require("../middlewares/upload");

router.post(
  "/upload",
  isAuth,
  upload.single("image"),
  fileControllers.uploadFile
);

router.get("/signed-url", isAuth, fileControllers.getSignedUrl);

router.delete("/delete-file", isAuth, fileControllers.deleteFile);

module.exports = router;