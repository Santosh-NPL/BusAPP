import mongoose, {Schema} from "mongoose";

const  currency = new Schema(
    {
        name:{
            type: String,
        },
        slug:{
            type:String,
            required: true,
        }
    }
    );


export const Currency = mongoose.model("Currency", currency);