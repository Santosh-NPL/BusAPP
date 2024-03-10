import mongoose, {Schema} from "mongoose";

const  review = new Schema(
    {
        user_id:{
            type:Schema.Type.ObjectId,
            ref: 'User',
        },
        comments:{
            type: String,
            required: null,
        },
        vehicle_id:{
            type:Schema.Type.ObjectId,
            ref: 'VehicleRegistration'
        },
        rating:{
            type: Number,
            enum: [1,2,3,4,5],
            required:true,
        }

    }, {timestamps:true}
    );


export const Review = mongoose.model("Review", review);