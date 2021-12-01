const jwt=require('jsonwebtoken')
//nhận đối tượng express
var express = require('express');
//Route: bộ định tuyến
var router = express.Router();
//database
const sql = require("../Controller/Subject_controller");
//token
var config = require("../Config/dbconfig");
var mssql = require('mssql');
const createHttpError = require('http-errors');
const midleware = require("../Midleware/auth")
var passport= require('passport')
router.route('/getsubjectbyname').post(midleware.authorization,sql.getsubjectbyname)
router.route('/getdanhmucnganh').get(midleware.authorization,sql.getdanhmucnganh)
router.route('/getsubjectbyid').post(midleware.authorization,sql.getsubjectbyid)
router.route('/getsubjectbynganh').post(midleware.authorization,sql.getsubjectbynganh)
router.route('/getbuoibylop').post(midleware.authorization,sql.getbuoibylop)
router.route('/dangkymonhoc').post(midleware.authorization_dangkyhocphan,sql.dangkymonhoc)
router.route('/getdanhsachdangkymon').post(midleware.authorization,sql.getdanhsachdangkymon)
router.route('/getdanhmucbyid').get(midleware.authorization,sql.getdanhmuc_id)


module.exports = router;