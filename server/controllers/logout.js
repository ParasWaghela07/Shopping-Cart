
exports.logout=async function(req,res){
    try{
        return res.clearCookie('token', {
            path: '/',
            secure: true, // Set this to true if your site is HTTPS
            sameSite: 'None' // Adjust according to your needs
        }).json({
            success: true,
            message: "User Logged Out Successfully"
        });
        
    }
    catch(e){
        return res.json({
            success:false,
            message:"Errors while logging out"
        })
    }
}