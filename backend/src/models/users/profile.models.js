import mongoose, {Schema} from "mongoose";

const  profileModels = new Schema(
    {
        mobile:{
            type: String,
            required: null,
        },
        gender:{
            type:String,
            enum:['M', 'F', 'O'],
            required: true,
        },
        avatar: {
            type:String,
        },
        user_id:{
            type: Schema.Types.ObjectId,
            ref:'User',
        }
    }, { timestamps:true }
);


export const Profile = mongoose.model("Profile", profileModels);