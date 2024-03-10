import mongoose, {Schema} from "mongoose";

const  driver = new Schema(
    {
        name:{
            type: String,
            required: null,
        },
        drive_license:[
            {
                type, String,
                required: true,
            }
            ],
        user_id:{
            type:Schema.Type.ObjectId,
            ref: 'User',
        },
        vehicle_id:{
            type:Schema.Type.ObjectId,
            ref: 'VehicleRegistration'
        },
        

    }
    );


export const Driver = mongoose.model("Driver", vehicleType);