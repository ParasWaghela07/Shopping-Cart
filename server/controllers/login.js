const userSchema=require('../models/User');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');

exports.login=async(req,res)=>{
    try{
        const {email,password}=req.body;

    if(!email || !password){
        return res.status(333).json({
            success:false,
            message:"All fields are required"
        })
    }

    const prevEntry=await userSchema.findOne({email});
    if(!prevEntry){
        return res.status(404).json({
            success:false,
            message:"Email id is not registered"
        })
    }

    if(await bcrypt.compare(password,prevEntry.password)){
        const payload={
            id:prevEntry._id,
            name:prevEntry.name,
            email:prevEntry.email
        }

        let token=jwt.sign(payload,process.env.JWT_SECRET);

        const options={
            expires:new Date(Date.now()+3*24*60*60*1000),
            httpOnly:true,
            secure:true,
            sameSite:'None',
            // domain:'.onrender.com',
            path:'/'
        }
        return res.cookie('token',token,options).status(200).json({
            success:true,
            message:"Login Successful"
        })
    }
    else{
        return res.status(400).json({
            success:false,
            message:"Incorrect Password"
        })
    }
    }
    catch(e){
        return res.status(500).json({
            success:false,
            message:"login failed"
        })
    }
}