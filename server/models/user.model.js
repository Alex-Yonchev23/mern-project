import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim: true,
    },
    lastName:{
        type:String,
        required:true,
        trim: true,
    },
    email:{
        type:String,
        required:true,
        trim: true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    avatar:{
        type:String,
        default: "https://firebasestorage.googleapis.com/v0/b/ironic-187cb.appspot.com/o/default_user.png?alt=media&token=237f979d-2523-42b8-960c-308df24e82cb",
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },


}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;