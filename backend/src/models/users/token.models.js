import mongoose from 'mongoose';


const tokenSchema = new mongoose.Schema(
    {
        token: {
            type: Number,
            required: true,
        },
        createdBy: {
            type: mongoose.Schema.Type.ObjectId,
            ref: "User",
        },
        user_id:{
            type: mongoose.Schema.Type.ObjectId,
            ref:'User',
        }
    }, {
        timestamps: true
    }
);

export const Token = mongoose.model("Token", tokenSchema);