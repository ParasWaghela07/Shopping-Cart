const mongoose=require('mongoose');

const itemSchema=mongoose.Schema({
    id:{
        type:Number,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true
    }
})

module.exports=mongoose.model('itemSchema',itemSchema);