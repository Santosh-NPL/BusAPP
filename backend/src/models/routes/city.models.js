import mongoose, {Schema} from "mongoose";

const  city = new Schema(
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


export const City = mongoose.model("City", city);