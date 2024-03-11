import mongoose, {Schema} from 'mongoose';


const payoutDetailsSchema = new Schema(
    {
        payout_id:{
            type:Schema.Type.ObjectId,
            ref: 'Payout',
        },
        user_id:{
            type:Schema.Type.ObjectId,
            ref: 'User',
        },
        mobile:{
            type:Number,
            default: false,
        },
        bank_name:{
            type:String,
        },
        bank_address:{
            type: String,
        },
        account_holder_name:{
            type: String,
        },
        account_number:{
            type: String,
        },
        
    }
    );


export const PayoutDetailsSchema = mongoose.model("PayoutDetails", payoutDetailsSchema);