import mongoose, {Schema} from "mongoose";

const  vehicleInfo = new Schema(
    {
        name:{
            type: String,
            required: null,
        },

    }
    );


export const VehicleInfo = mongoose.model("VehicleInfo", vehicleInfo);