import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        creatorId: { 
            type: String, 
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
            unique:true,
        },  
        image:{
            type: String,
            default: "https://firebasestorage.googleapis.com/v0/b/ironic-187cb.appspot.com/o/welder.jpg?alt=media&token=74fe5fd8-e848-49e3-b879-902eb52f4605",
        },
        category:{
            type: String,
            default: "uncategorized",
        },
        slug:{
            type: String,
            required: true,
            unique:true,
        },
    }, { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
