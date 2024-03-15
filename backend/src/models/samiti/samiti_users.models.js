import mongoose, { Schema } from 'mongoose';

const samitiUser = new Schema({
    
    samiti_id:{
        type:Schema.Types.ObjectId,
        ref:"Samiti",
    },
    user_id:{
        type:Schema.Types.ObjectId,
        ref: "User",
    }
    
}, {timestamps:true});

export const SamitiUser = mongoose.model("SamitiUser", samitiUser);