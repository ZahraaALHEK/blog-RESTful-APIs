const {check , param} = require("express-validator");
const { default: mongoose } = require("mongoose");

const addCategoryValidator = [
    check("title").notEmpty().withMessage("the title is required")
];
const IDValidator = [
  param("id").custom((id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid ID");
    }
    return true;
  }),
];
module.exports = {addCategoryValidator,IDValidator};
