import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        mobile: {
            type: String,
            required: true,
            unique: true,

        },
        name: {
            type: String,
            required: true,

        },
        email: {
            type: String,

        },
        username:{
            type:String
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
        },

    }, {timestamps: true}
);

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next();
});

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            mobile: this.mobile,
            name: this.name
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
        )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,

        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
        )
}

export const User = mongoose.model("User", userSchema)