import mongoose, {Schema} from "mongoose";

const  currency = new Schema(
    {
        name:{
            type: String,
            required: null,
        },
        slug:{
            type:String,
            required: true,
        }
    }
    );


export const Currency = mongoose.model("Currency", currency);