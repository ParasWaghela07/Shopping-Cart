
exports.logout=async function(req,res){
    try{
        return res.clearCookie('token').json({
            success:true,
            message:"User Logged Out Successfully"
        })
    }
    catch(e){
        return res.json({
            success:false,
            message:"Errors while logging out"
        })
    }
}