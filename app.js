const express = require("express")
const dotenv = require("dotenv")
const DB = require("./init/mongodb")
const app = express()
const {authRouter,categoryRouter , fileRouter} = require("./routes")
const {errorHandel} = require("./middlewares")
const notFound = require("./controllers/notFound")
const morgan = require("morgan")
dotenv.config()
DB();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan("dev"));


app.use("/api/v1/auth",authRouter);
app.use("/api/v1/category",categoryRouter);
app.use("/api/v1/file",fileRouter);
app.use(notFound);
app.use(errorHandel);
module.exports = app;
