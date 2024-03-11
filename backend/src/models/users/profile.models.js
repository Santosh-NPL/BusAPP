import mongoose from "mongoose";

const  profileModels = new mongoose.Schema(
    {
        mobile:{
            type: Number,
            required: null,
        },
        gender:{
            type:String,
            enum:['M', 'F', 'O'],
            required: true,
        },
        image: {
            type:String,
        },
        user_id:{
            type: mongoose.Schema.Type.ObjectId,
            ref:'User',
        }
    }, { timestamps:true }
);


export const Profile = mongoose.model("Profile", profileModels);