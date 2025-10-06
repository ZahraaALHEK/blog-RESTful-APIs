const express = require("express");
const isAuth = require("./../middlewares/isAuth")
const isAdmin = require("./../middlewares/isAdmin")
const { categoryControllers} = require("./../controllers/index");
const validator  = require("./../validators/validator");
const {addCategoryValidator,IDValidator} = require("./../validators/categoryValidator") 
const router = express.Router();
router.post("/",isAuth,isAdmin ,addCategoryValidator,validator,categoryControllers.addCategory);
router.put("/:id",isAuth,isAdmin,IDValidator,validator,categoryControllers.updateCategory);
router.delete("/:id",isAuth,isAdmin,IDValidator,validator,categoryControllers.deleteCategory);
router.get("/",isAuth ,categoryControllers.getCatecories  );
router.get("/:id",isAuth,IDValidator,validator,categoryControllers.getCategory);
module.exports = router;