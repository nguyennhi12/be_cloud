var mssql = require('mssql');
var config = require("../Config/dbconfig");
const jwt=require('jsonwebtoken')
const formidable = require('formidable')
//sendmail
async function check_login(account){
    try {    
        if(!account.username){
            if(!account.password){
                return({
                    statusCode: 400,
                    message: "username và password là bắt buộc",
                })
            }else{
                return({
                    statusCode: 400,
                    message: "username là bắt buộc",
                })
            }
        }else{
            if(!account.password){
                return({
                    statusCode: 400,
                    message: "password là bắt buộc",
                })
            }else{                
                let pool = await mssql.connect(config);
                let query = await pool.request()
                                        .input('username', mssql.NVarChar, account.username)
                                        .input('password',mssql.NVarChar,account.password)
                                        .query("select * from account,sinhvien where username=@username and password= @password and account.id_user=sinhvien.id_user")
                
                result= query.recordset
                console.log("result", query)
                if(result.length!=0){
                    let data=result[0]
                    console.log("data",data)
                    if(data){ 
                        //console.log(data)                                                                           
                        var token = jwt.sign({
                            id_user: data.id_user
                        },"user", {expiresIn: "14d"})  
                        return ({data:{
                            username: data.username,
                            displayname: data.name,                               
                            phonenumber: data.khoa,                                
                            email: data.email,
                            mssv: data.mssv,
                            id_lop:data.id_lop,
                            id_khoa:data.id_khoa,
                            id_nganh:data.id_nganh, 
                            token:token},          
                            statusCode: 200,
                            message: "Đăng nhập thành công"
                        })                                 
                }else{
                    return({                        
                        statusCode: 400,
                        message: "Username hay password không đúng",
                    })   
                }
                }else{
                    return({                        
                        statusCode: 400,
                        message: "Username hay password không đúng",
                    })   
                }
            }
        }
    } catch (error) {
        console.log("mathus-error:"+error);
        
    }
}

module.exports ={   
    check_login: check_login,
   
}