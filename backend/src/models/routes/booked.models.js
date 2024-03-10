import mongoose, {Schema} from "mongoose";

const  bookedSeat = new Schema(
    {
        user_id:{
            type:Schema.Type.ObjectId,
            ref: 'User',
        },
        vehicle_route:{
            type:Schema.Type.ObjectId,
            ref: 'VehicleRoutes',
        },
        vehicle_id:{
            type: Schema.Type.ObjectId,
            ref: "VehicleRegistration",
        },
        seat_number:[
            {
                type: Number,
                required: true, 
            }     
        ],
        payment_id:{
            type:Schema.Type.ObjectId,
            ref: 'PassengerPayment',
        },
    }, {timestamps:true}
    );

export const BookedSeat = mongoose.model("BookedSeat", bookedSeat);