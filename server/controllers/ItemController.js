const itemSchema=require('../models/Item');
const userSchema=require('../models/User');

exports.addItem=async(req,res)=>{
    try{
    const item=req.body;
    const id=item.id;
    if(!id){
        return res.status(400).json({
            success:false,
            message:"Item Id is required"
        })
    }

    const newItem=await itemSchema.create({
        id:item.id,
        title:item.title,
        description:item.description,
        image:item.image,
        price:item.price
    })

    const userPayload=req.payload;
    const userid=userPayload.id;


    await userSchema.findByIdAndUpdate(userid,{$push:{items:newItem._id}},{new:true})

    return res.status(200).json({
        success:true,
        message:"Item added successfully"
    })


    }
    catch(e){
        console.log(e.message)
        return res.statu(500).json({
            success:false,
            message:"Error while adding item"
        })
    }
}

exports.removeItem=async(req,res)=>{
    try{
    const item=req.body;
    const id=item.id;
    if(!id){
        return res.status(400).json({
            success:false,
            message:"Item Id is required"
        })
    }

    const oldItem=await itemSchema.findOne({id});

    if(!oldItem){
        return res.status(404).json({
            success:false,
            message:"Item don't exist"
        })
    }

    await itemSchema.findByIdAndDelete(oldItem._id);

    const userPayload=req.payload;
    const userid=userPayload.id;

    await userSchema.findByIdAndUpdate(userid,{$pull:{items:oldItem._id}},{new:true})

    return res.status(200).json({
        success:true,
        message:"Item removed successfully"
    })


    }
    catch(e){
        console.log(e.message)
        return res.statu(500).json({
            success:false,
            message:"Error while removing item"
        })
    }
}