import mongoose from "mongoose";

const permissionModels = new mongoose.Schema(
    {
        name: {
            type:String,
            required: true,
        },
        display_name: {
            type: String,
        },
        description: {
            type: String,
        }
    }, {
        timestamps:true
    }
);

export const Permission = mongoose.model("Permission", permissionModels);