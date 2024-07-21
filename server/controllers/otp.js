const otpSchema=require('../models/Otp');
const userSchema=require('../models/User');
const otpGenerator=require('otp-generator');
const mailsender=require('../utils/mailSender');

exports.sendotp=async(req,res)=>{
    const {name,email}=req.body;

    if(!name || !email){
        return res.status(400).json({
            success:false,
            message:"All fields are required"
        })
    }

    const alreadyExist=await userSchema.findOne({email});

    if(alreadyExist){
        return res.status(400).json({
            success:false,
            message:"Email id is already registered"
        })
    }

    const otp=otpGenerator.generate(6,{
        upperCaseAlphabets:false,
        specialChars:false,
        lowerCaseAlphabets:false
    })

    const mailResponse=await mailsender(email,otp);

    // const newOtp=await otpSchema.create({
    //     email:email,
    //     otp:otp
    // }
    return res.status(200).json({
        success:true,
        message:"Otp sent to your email",
        otp:otp
    })

    
}

exports.matchOtp=async(req,res)=>{
    try{
        const user=req.body;
        const email=user.email;
        const {otp}=req.body;

        const dbEntry=await otpSchema.findOne({email});
        
        if(dbEntry.otp==otp){
            return res.status(200).json({
                success:true,
                message:"Otp matched !"
            })
        }
        else{
            return res.status(400).json({
                success:false,
                message:"Incorrect Otp"
            })
        }


    }
    catch(e){
        return res.status(500).json({
            success:false,
            message:"Error while matching otp",
            error:e.message
        })
    }
}