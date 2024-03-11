import mongoose, {Schema} from 'mongoose';


const payoutSchema = new Schema(
    {
        method:{
            type:String,
            required:true,
            enum:['Khalti', 'Esewa', 'Bank']
        },
        user_id:{
            type:Schema.Type.ObjectId,
            ref: 'User',
        },
        primary:{
            type:Boolean,
            default: false,
        }
    }
);


export const Payout = mongoose.model("Payout", payoutSchema);