import mongoose, {Schema} from "mongoose";

const  vehicleType = new Schema(
    {
        name:{
            type: String,
            required: null,
        },
 
    }
    );


export const VehicleType = mongoose.model("VehicleType", vehicleType);