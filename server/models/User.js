const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    items:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"itemSchema"
        }
    ]
})

module.exports=mongoose.model('userSchema',userSchema);

