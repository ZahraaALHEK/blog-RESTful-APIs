const  express = require("express");
const router = express.Router();
const isAuth = require("./../middlewares/isAuth");
const {upload} = require("./../middlewares")
const {fileControllers} = require("./../controllers")
router.post("/upload",isAuth,upload.single('file'),fileControllers.upload)
router.post("/uploadMul",isAuth,upload.array('file',3),fileControllers.upload)
module.exports = router;