var mssql = require('mssql');
var config = require("../Config/dbconfig");
const jwt=require('jsonwebtoken')
const formidable = require('formidable')
//sendmail
async function getsubjectbyname(req,res){
    if(req.authcode==200){        
        const search_key =  req.body.search_key; 
        console.log(search_key)
        let pool = await mssql.connect(config);
                let query = await pool.request()                                        
                                        .input('search_key', mssql.NVarChar, search_key)                                  
                                        .query(`select lopmh.id_lop,LopMH.name as name_lop, soluongtoida,soluonghienco,
                                        khoa.name as name_khoa, nganh.name as name_nganh, teacher.name as name_gv, sotuanhoc,hocphi, sochi
                                        from lopmh,Khoa,Nganh,Teacher where lopmh.name like N'%' + replace(@search_key, '%', '[%]') + '%' and lopmh.id_khoa=khoa.Idkhoa
                                        and nganh.id_nganh=lopmh.id_nganh and LopMH.id_giangvien=teacher.id_user`) 
                                        
        console.log(query.recordset)
                return res.status(200).json({
                    statusCode:200,
                    message:"Success fully",
                    data: query.recordset,
                });
 
    }else{
        return res.status(400).json({
            statusCode:400,
            message:"Bạn không có quyền tìm kiếm môn",
           
        });
    }
}

async function getdanhmucnganh(req,res){
    if(req.authcode==200){  
        let pool = await mssql.connect(config);
                let query = await pool.request()                   
                                        .query(`select * from nganh`)                                         
        console.log(query.recordset)
                return res.status(200).json({
                    statusCode:200,
                    message:"successfully",
                    data: query.recordset,
                });
 
    }else{
        return res.status(400).json({
            statusCode:400,
            message:"Bạn không có quyền xem danh mục ngành",
           
        });
    }
}

async function getdanhmuc_id(req,res){
    if(req.authcode==200){  
        let pool = await mssql.connect(config);
                let query = await pool.request()                   
                                        .query(`select id_lop from lopmh`)                                         
        console.log(query.recordset)
                return res.status(200).json({
                    statusCode:200,
                    message:"successfully",
                    data: query.recordset,
                });
 
    }else{
        return res.status(400).json({
            statusCode:400,
            message:"Bạn không có quyền xem danh mục id",
           
        });
    }
}



async function getsubjectbyid(req,res){
    if(req.authcode==200){  
        let pool = await mssql.connect(config);
                let query = await pool.request()  
                                        .input('id_lopmh', mssql.NVarChar, req.body.id_lopmh)                  
                                        .query(`select lopmh.id_lop,LopMH.name as name_lop, soluongtoida,soluonghienco,
                                        khoa.name as name_khoa, nganh.name as name_nganh, teacher.name as name_gv, sotuanhoc,hocphi, sochi
                                        from lopmh,Khoa,Nganh,Teacher where lopmh.id_lop=@id_lopmh and lopmh.id_khoa=khoa.Idkhoa
                                        and nganh.id_nganh=lopmh.id_nganh and LopMH.id_giangvien=teacher.id_user`)                                         
        console.log(query.recordset)
                return res.status(200).json({
                    statusCode:200,
                    message:"successfully",
                    data: query.recordset,
                });
 
    }else{
        return res.status(400).json({
            statusCode:400,
            message:"Bạn không có quyền xem danh mục ngành",
           
        });
    }
}

async function getsubjectbynganh(req,res){
    if(req.authcode==200){  
        let pool = await mssql.connect(config);
                let query = await pool.request()  
                                        .input('id_nganh', mssql.NVarChar, req.body.id_nganh)                  
                                        .query(`select lopmh.id_lop,LopMH.name as name_lop, soluongtoida,soluonghienco,
                                        khoa.name as name_khoa, nganh.name as name_nganh, teacher.name as name_gv, sotuanhoc,hocphi, sochi
                                        from lopmh,Khoa,Nganh,Teacher where lopmh.id_nganh=@id_nganh and lopmh.id_khoa=khoa.Idkhoa
                                        and nganh.id_nganh=lopmh.id_nganh and LopMH.id_giangvien=teacher.id_user`)                                         
        console.log(query.recordset)
                return res.status(200).json({
                    statusCode:200,
                    message:"successfully",
                    data: query.recordset,
                });
 
    }else{
        return res.status(400).json({
            statusCode:400,
            message:"Bạn không có quyền xem danh mục ngành",
           
        });
    }
}

// async function getbuoibylop(req,res){
//     if(req.authcode==200){  
//         console.log(req.body.id_lop)
//         let pool = await mssql.connect(config);
//                 let query = await pool.request()  
//                                         .input('id_lop', mssql.NVarChar, req.body.id_lop)                  
//                                         .query(`select A.id_tiet, A.id_lop, tietbd, B.tietketthuc, A.ngaybatdauhoc, tgbatdau, tgketthuc  from (select id_tiet, id_lop, tietbd, tietketthuc, ngaybatdauhoc,  tgbatdau  
//                                             from buoihoc, tiet where buoihoc.tietbd=tiet.name
//                                             and buoihoc.id_lop=@id_lop  )as A, 
//                                             (select id_tiet, id_lop,  BuoiHoc.tietketthuc, ngaybatdauhoc, tgketthuc  
//                                             from buoihoc, tiet where buoihoc.tietbd=tiet.name and buoihoc.id_lop=@id_lop ) as B where A.id_tiet=B.id_tiet`)                                         
//         console.log(query.recordset)
//                 return res.status(200).json({
//                     statusCode:200,
//                     message:"successfully",
//                     data: query.recordset,
//                 });
 
//     }else{
//         return res.status(400).json({
//             statusCode:400,
//             message:"Bạn không có quyền xem danh mục ngành",
           
//         });
//     }
// }

async function dangkymonhoc(req,res){
    if(req.authcode==200){  
        console.log(req.body.id_lop)
        let pool = await mssql.connect(config);
        try{
            let query = await pool.request()  
                                        .input('id_user', mssql.NVarChar, req.id_user[0])    
                                        .input('id_lop',mssql.NVarChar, req.body.id_lop)              
                                        .query(`insert into Dangkymon values (@id_lop,@id_user,getdate())`)     
            let query2 = await pool.request()                                         
                                        .input('id_lop',mssql.NVarChar, req.body.id_lop)              
                                        .query(`update lopmh set soluonghienco = soluonghienco+1 where id_lop=@id_lop`)                                  
            console.log(query.recordset)
                return res.status(200).json({
                    statusCode:200,
                    message:"successfully",
                    data: query.recordset,
                });

        }catch(err){
            return res.status(400).json({
                statusCode:400,
                message:"successfully",
                data: err,
            });


        }
                
 
    }else{
        return res.status(400).json({
            statusCode:400,
            message:"Bạn không có quyền đăng ký môn học",
           
        });
    }
}

async function getdanhsachdangkymon(req,res){
    if(req.authcode==200){ 
       
        let pool = await mssql.connect(config);
                let query = await pool.request()  
                                        .input('id_user', mssql.NVarChar, req.id_user[0])                  
                                        .query(`select id_sinhvien, dangkymon.id_lop, time_dangky,lopmh.name as lop_name, khoa.name as khoa_name , 
                                        nganh.name as nganh_name, teacher.name as name_gv, lopmh.sochi
                                        from dangkymon,lopmh,khoa,nganh,Teacher
                                        where id_sinhvien=@id_user and Dangkymon.id_lop=LopMH.id_lop
                                        and lopmh.id_khoa=Khoa.Idkhoa and lopmh.id_nganh=nganh.id_nganh and Teacher.id_user=lopmh.id_giangvien`)                                         
        console.log(query.recordset)
                return res.status(200).json({
                    statusCode:200,
                    message:"successfully",
                    data: query.recordset,
                });
 
    }else{
        return res.status(400).json({
            statusCode:400,
            message:"Bạn không có quyền xem danh mục ngành",

           
        });
    }
}



module.exports ={   
    getsubjectbyname:getsubjectbyname,
    getdanhmucnganh: getdanhmucnganh,
    getsubjectbyid:getsubjectbyid,
    getsubjectbynganh:getsubjectbynganh,
    // getbuoibylop: getbuoibylop,
    dangkymonhoc: dangkymonhoc,
    getdanhsachdangkymon: getdanhsachdangkymon,
    getdanhmuc_id:getdanhmuc_id
}
