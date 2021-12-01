const jwt = require("jsonwebtoken");
const helper = require("../helpers/Check_Validation")
 const parseBearer = (bearer) => {
    const [_, token] = bearer.trim().split(" ");
    return token;
  };
function authorization (req, res, next){
    try {
        const authorizationHeader = req.headers.authorization;        
        const token = parseBearer(authorizationHeader);              
        if (!token) return res.status(403).send("Access denied.");
        const decoded = jwt.verify(token, "user");
        req.id_user = decoded.id_user;
        req.authcode=200  
        console.log(decoded)     
        next();
    } catch (error) {
        res.status(401).json({
            statusCode:401,
            message:"Bạn chưa đăng nhập"
        });
    }
}

async function authorization_dangkyhocphan (req, res, next){
    try {        
        const authorizationHeader = req.headers.authorization;        
        const token = parseBearer(authorizationHeader);              
        if (!token) return res.status(403).send("Access denied.");
        const decoded = jwt.verify(token, "user");    
        var id_user=decoded.id_user[0]
        let checkuser= await helper.check_soluon_in_lop(req.body.id_lop) 
        let checkdangky = await helper.check_dangky(req.body.id_lop, id_user)
        console.log(checkuser,checkdangky)
        if(checkuser.statusCode==200 && checkdangky.statusCode==200){
            req.id_user = decoded.id_user;
            req.authcode=200
            console.log(decoded)    
            
        }else{  
            if(checkuser==400){
                return res.status(400).json({
                    statusCode:400,
                    message:"Lớp đủ thành viên"
                });
            }      
            if(checkdangky==400){
                return res.status(400).json({
                    statusCode:400,
                    message:"Bạn đã đăng ký rồi"
                });
            }  
            if(checkdangky==400 && checkuser==400){
                return res.status(400).json({
                    statusCode:400,
                    message:"Lớp đủ thành viên và bạn đã đăng ký rồi"
                });
            }  
            
        }
        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({
            statusCode:401,
            message:"Bạn chưa đăng nhập"
        });
    }
}



module.exports= {
    authorization: authorization,
    authorization_dangkyhocphan:authorization_dangkyhocphan,
};