var mssql = require('mssql');
var config = require("../Config/dbconfig");

async function check_soluong_in_lop(id_lop){
   
    let pool = await mssql.connect(config);
        let query = await pool.request()  
                                .input('id_lop', mssql.VarChar, id_lop)                          
                                .query("SELECT soluongtoida, soluonghienco from lopmh where id_lop=@id_lop")  
        let result = query.recordset           
        if(result.soluongtoida<=result.soluonghienco){
            return({
                statusCode: 400,
               
            })
        }else{
            return({
                statusCode: 200,
            })
        }    
}

async function check_dangky(id_lop, id_user){
   console.log("1",id_lop, id_user)
    let pool = await mssql.connect(config);
        let query = await pool.request()  
                                .input('id_lop', mssql.VarChar, id_lop)  
                                .input('id_user', mssql.VarChar, id_user)                          
                                .query("SELECT * from dangkymon where id_lop=@id_lop and id_sinhvien=@id_user")  
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
    check_soluon_in_lop: check_soluong_in_lop,
    check_dangky: check_dangky
}
