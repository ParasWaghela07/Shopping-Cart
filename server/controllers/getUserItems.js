const userSchema=require('../models/User');

exports.getUserItems=async(req,res)=>{
    try{
        const userPayload=req.payload;
        const userid=userPayload.id;

        const user=await userSchema.findById(userid).populate('items');

        // console.log("Backend :-")
        // console.log(typeof(user.items));
        // console.log(user.items);

        return res.status(200).json({
            success:true,
            message:"All items fetched successfully",
            data:user.items
        })
    }
    catch(e){
        console.log(e)
        return res.status(500).json({
            success:false,
            message:"Error while getting user item details",
            error:e.message
        })
    }
}

