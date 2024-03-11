import mongoose from 'mongoose';


const accountSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Type.ObjectId,
            ref: "User",
        },
        payout_id: {
            type: mongoose.Schema.Type.ObjectId,
            ref: "Payout",
        },
        amount: {
            type: Number,
            required: true,
        }
    }, {
        timestamps: true
    }
    );

export const Account = mongoose.model("Account", accountSchema);