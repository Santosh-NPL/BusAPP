import mongoose, {Schema} from "mongoose";

const  vehicleRoutes = new Schema(
    {
        vehicle_id:{
            type: Schema.Type.ObjectId,
            ref: "VehicleRegistration",
        },
        departure_city:{
            type: Schema.Type.ObjectId,
            ref: "City"
        },
        destination_city:{
            type: Schema.Type.ObjectId,
            ref: "City"
        },
        departure_day:{
            type: String,
            required: true
        },
        destination_day:{
            type: String,
            required: true
        },
        departure_time:{
            type: String,
            required: true
        },
        destination_time:{
            type: String,
            required: true
        },
        departure_address:{
            type: String,
            required: true
        },
        destination_address:{
            type: String,
            required: true
        },
        currency_id:{
             type: Schema.Type.ObjectId,
            ref: "Currency"
        },
        ticket_price:{
            type: Decimal128,
            required: true,
        }
        
    }
    );


export const vehicleRoutes = mongoose.model("VehicleRoutes", vehicleRoutes);