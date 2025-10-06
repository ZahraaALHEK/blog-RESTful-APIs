const Category = require("./../models/Category");
const User = require("./../models/User")
const addCategory = async (req,res,next) => {
    try {
        let {title,desc} = req.body ;
        const id = req.user._id ;
        const CategoryExist = await Category.findOne({title});
        if(CategoryExist){
            error = new Error("this category is already existe");
            error.statusCode = 400;
            return next(err)
        }
        const user = await User.findById(id);
        if(!user){
            error = new Error("user not found");
            error.statusCode = 404;
            return next(err)
        }
        const newCategory = new Category({title,desc,updateBy : id});
        await newCategory.save();
        res.status(200).json({
            code : 200,
            status : true ,
            message: "the category updated successfully",
            data : newCategory
        });
    } catch (error) {
        console.log(error);
        return next(err)
    }
};
const updateCategory = async (req ,res,next) => {
    try {
        const {id} = req.params ; // id of category
        const {_id}=req.user;
        const {title,desc} = req.body;
        let category = await Category.findById(id);
        if (!category) {
            const err = new Error("category not found");
            err.statusCode =404 ;
            return next(err)
        }
        const isCategoryExsist =await Category.findOne({title});
        if(isCategoryExsist && isCategoryExsist.title == category.title && String(isCategoryExsist._id) !==String(category._id))
        {
            const err = new Error("title already exist");
            err.statusCode = 400;
            return next(err)
        }
        category.title = title ?title : category.title;
        category.desc = desc ;
        category.updateBy = _id ;
        await category.save();
        res.status(200).json({
            code : 200,
            status : true ,
            message : "the category updated successfully",
            data : category
        })
    } catch (error) {
        console.log(error);
        return next(error);
    }
}
const deleteCategory = async (req,res,next) => {
    try {
        const {id} = req.params;
        let category = await Category.findById(id);
        if (!category) {
           
            const err = new Error("category not found");
            err.statusCode = 404;
            return next(err)
        }
        await Category.findOneAndDelete({id});
        res.status(200).json({
            code : 200,
            status : true ,
            message : "category deleted successfully"
        })
    } catch (error) {
        console.log(error);
        return next(error);
    }
};
const getCatecories = async (req,res,next) => {
    try {
    const {q , size , page} = req.query ; 
    const sizeNumber = parseInt(size) || 10 ;
    const currentPageNumber = parseInt(page) || 1 ;
    let query = {};
    if (q) {
        const search = RegExp(q,"i");
        query = {$or :[{title:search},{desc :search}]}
    }
    const total = await Category.countDocuments(query);
    const pages = Math.ceil(total/sizeNumber);
    const categories = await Category.find(query)
    .skip((currentPageNumber-1)*(sizeNumber))
    .limit(sizeNumber)
    .sort({updateBy : -1});
    res.status(200).json({
        code : 200 ,
        status : true ,
        data : {categories,
            total ,
            pages
        }
    });
    } catch (error) {
        console.log(error);
        return next(error);
    }

};
const getCategory = async (req,res,next) => {
    try {
                const {id} = req.params;
        let category = await Category.findById(id);
        if (!category) {
            const err = new Error("category not found");
            err.statusCode = 404;
            return next(err)
        }
         res.status(200).json({
            code : 200,
            status : true ,
            data : category
        })
    } catch (error) {
        console.log(error);
        return next(error);
    }
}
module.exports = {addCategory , updateCategory, deleteCategory, getCatecories , getCategory}