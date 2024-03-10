import mongoose, {Schema} from "mongoose";

const  vehicleModel = new Schema(
    {
        name:{
            type: String,
            required: null,
        },

    }
    );

export const VehicleModel = mongoose.model("VehicleModel", vehicleModel);