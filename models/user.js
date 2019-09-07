const mongoose=require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true
    },
    name: {
        type:String,
        rrquired:true
    }
},{
        timestamps:true
});

const User =mongoose.model('user',userschema);

module.export = User;