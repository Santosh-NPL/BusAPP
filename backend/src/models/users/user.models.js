import mongoose from "mongoose";


const userSchema: Schema = new mongoose.Schema(
    {
        mobile: {
            type: Number,
            required: true,
            unique: true,
            max: 10,
            min: 10,
        },
        name: {
            type: String,
            required: true,

        },
        password: {
            type: String,
            required: true,
            min: 6,
        },
        token_verify:{
            type:Boolean,
            default: false,
        },
        remember_token:{
            type:String,
            required: null,
        },
        refresh_token:{
            type: String,
        }

    }, {timestamps: true}
);


export const User = mongoose.model("User", userSchema)