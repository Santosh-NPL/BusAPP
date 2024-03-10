import mongoose, {Schema} from "mongoose";

const  passengerPayment = new Schema(
    {
        method:{
            type: String,
            enum: ['Khalti', 'Esewa', 'Bank', 'cash', 'other'],
            required: null,
        },
        user_id:{
            type:Schema.Type.ObjectId,
            ref: 'User',
        },
        status:{
            type: Boolean,
            default: false,
        },
       
        total_amount:{
            type: Double(10, 2),
            required: true,
        }

    }, {timestamps:true}
    );


export const PassengerPayment = mongoose.model("PassengerPayment", passengerPayment);