
async function sendMail(token, email){  
  try{
    var nodemailer = require('nodemailer')
    let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "timtro365@gmail.com",
        pass: "Huy@3011"
    }
   
  });
  var link=`https://timtroapp365.herokuapp.com/account/verifyaccount?token=${token}`
  let info = await transporter.sendMail({
    from: '"TimTroApp" <timtroapp@gmail.com>', // sender address
    to: ` ${email}`, // list of receivers
    subject: "Xác nhận đăng kí app", // Subject line
    
    html: `<b>Xin chào!!</b> 
          <b>Cảm ơn vì đã tin tưởng và sử dụng ứng dụng Tìm trọ của chúng tôi!</b>
          <b>Để xác nhận email đăng ký, bạn hãy click vào link </b>
          <a href=${link}> Đường dẫn xác nhận</a>`, // html body
  });
  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  return({
    statusCode:200,
    message: "Đã gửi email xác nhận đăng ký"
  });
  
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }catch(error){
    return({
      statusCode:400,
      message:error,
    });

  }

}
async function sendMail_ForgotPass(token, email){ 
  try{
    var nodemailer = require('nodemailer')
  let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: "timtro365@gmail.com",
          pass: "Huy@3011"
      }     
    });
    var link=`https://timtroapp365.herokuapp.com/account/abcxyz?token=${token}`
    let info = await transporter.sendMail({
      from: '"TimTroApp" <timtroapp@gmail.com>', // sender address
      to: `${email}`, // list of receivers
      subject: "Xác nhận quên mật khẩu", // Subject line
      
      html: `<b>Xin chào!!</b> 
            <b>Cảm ơn vì đã tin tưởng và sử dụng ứng dụng Tìm trọ của chúng tôi!</b>
            <b>Để xác nhận email quên mật khẩu, bạn hãy click vào link </b>
            <a href=${link}> Đường dẫn xác nhận</a>`, // html body
    });
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    return({
      statusCode:200,
      message: "Đã gửi email xác nhận đăng ký"
    });
    
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  } catch (error){
    return({
      statusCode:400,
      message:error,
    });
  }  
  
  }
module.exports ={ sendMail:sendMail,
                  sendMail_ForgotPass:sendMail_ForgotPass};