var mssql = require('mssql');
var config = require("../Config/dbconfig");
async function check_id(facebook_id){     
        let pool = await mssql.connect(config);
        let query = await pool.request()
                                .input('facebook_id', mssql.NVarChar, facebook_id)                                
                                .query("SELECT * from accounts where id_user=@facebook_id")  
        let result = query.recordset    
        if(result.length!=0){
            return({
                statusCode: 400,               
            })
        }else{
            return({
                statusCode: 200,
                result
            })
        }       
    
}

async function adduser_loginFB(user){     
    let pool = await mssql.connect(config);
    let query = await pool.request()
                            .input('facebook_id', mssql.NVarChar, user.facebook_id)  
                            .input('name', mssql.NVarChar, user.name) 
                            .input('email', mssql.NVarChar, user.email)                       
                            .query("Insert into Accounts (id_user, username,displayname, email) values(@facebook_id,@facebook_id, @name, @email)")  
    let result = query.recordset    
    if(result.length!=0){
        return({
            statusCode: 400,               
        })
    }else{
        return({
            statusCode: 200,           
        })
    }       

}



module.exports={
    check_id: check_id,
    adduser_loginFB: adduser_loginFB
}
