import mongoose, {Schema} from "mongoose";

const  vehicleRegistration = new Schema(
    {
        type_id:{
            type: Schema.Type.ObjectId,
            ref: "VehicleType",
        },
        model_id:{
            type: Schema.Type.ObjectId,
            ref: "VehicleModel",
        },
        plate_no:{
            type: String,
            required:true,
        },
        fule_type:{
            type:String,
            enum: ['Diesel', 'Petrol', 'Gas'],
            required: true,
        },
        date_of_manufacture:{
            type: Date,
            required: true,
        },
        date_of_registration:{
            type: Date,
            required: true,
        },
        vehicle_info:[
            {
                type:Schema.Type.ObjectId,
                ref:"VehicleInfo",
            }
        ],
        owner_id:{
            type: mongoose.Schema.Type.ObjectId,
            ref:'VehicleOwner',
        },
        samiti_id:{
            type: mongoose.Schema.Type.ObjectId,
            ref:'Samiti',
        },
        total_seats_no:{
            type: Number,
            required: true,
        },
        vehicle_image:[
            {
                type:String,
                required: null
            }
        ],
        vehicle_bill_book:[
            {
                type:String,
                required: null
            }
        ]

    }
    );

export const VehicleRegistration = mongoose.model("VehicleRegistration", vehicleRegistration);