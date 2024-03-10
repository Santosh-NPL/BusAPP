import mongoose, {Schema} from "mongoose";

const  ownerInfo = new Schema(
    {
        name:{
            type: String,
            required: null,
        },
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
            required:null,
        },
        user_id:{
            type: mongoose.Schema.Type.ObjectId,
            ref:'User',
        },
        samiti_id:{
            type: mongoose.Schema.Type.ObjectId,
            ref:'Samiti',
        }
    }, { timestamps:true }
    );


export const OwnerInfo = mongoose.model("VehicleOwner", ownerInfo);