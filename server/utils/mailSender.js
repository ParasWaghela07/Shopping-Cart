const nodemailer=require('nodemailer');
require('dotenv').config();

const mailsender=async(email,otp)=>{
    try{
        let transporter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        })

        let info = await transporter.sendMail({
            from:'Shopping Cart | Paras Waghela',
            to:`${email}`,
            subject:"SHOPPING CART | MAIL VERIFICATION",
            html:`YOUR OTP :- <h1>${otp}<h1>`
        })

        // console.log(info);
    }
    catch(e){
        console.log("In Utils " , e.message);
    }
}

module.exports=mailsender;