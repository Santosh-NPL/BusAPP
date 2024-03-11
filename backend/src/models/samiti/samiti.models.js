import mongoose, {Schema} from "mongoose";


const samitiSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true,
        trim:true,
        lowercase:true,
        index: true,
    },
    address:{
        type: String,
       
        trim: true,
    },
    mobile:{
        type: Number,
        required: true,
        max: 10,
        min:10,
    }
}, {timestamps: true});

export const Samiti = mongoose.model("Samiti", samitiSchema);