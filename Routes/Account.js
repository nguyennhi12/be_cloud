const jwt=require('jsonwebtoken')
//nhận đối tượng express
var express = require('express');
//Route: bộ định tuyến
var router = express.Router();
//database
const sql = require("../Controller/Account_controller");
//token
var config = require("../Config/dbconfig");
var mssql = require('mssql');
const createHttpError = require('http-errors');
const midleware = require("../Midleware/auth")
var passport= require('passport')
router.route('/login').post((req,res)=>{
  let account = {
    ...req.body
  }
  sql.check_login(account).then(result=>{
    //console.log("result", result)    
    return res.status(result.statusCode).json(result)
  }).catch(err=>{
    console.log(err)
    createHttpError()
    let data={
      statusCode: 500,
      message: "Lỗi server"
    }
    return res.status(500).json(data)
  })
})







module.exports = router;