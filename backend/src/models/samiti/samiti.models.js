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
    },
    cover_image:{
        type: String,
        required:true
    }
}, {timestamps: true});

export const Samiti = mongoose.model("Samiti", samitiSchema);