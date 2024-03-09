import mongoose from "mongoose";

const permissionModels = new mongoose.Schema(
    {
        name: {
            type:String,
            required: true,
        },
        display_name: {
            type: String,
            reqired: null,
        },
        description: {
            type: String,
            reqired: null,
        }
    }, {
        timestamps:true
    }
);

export const Permission = mongoose.model("Permission", permissionModels);