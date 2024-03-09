import mongoose from "mongoose";

const rolesModels = new mongoose.Schema(
    {
        name: {
            type: String,
            reqired: true,
        },
        display_name: {
            type: String,
            reqired: null,
        },
        description: {
            type: String,
            reqired: null,
        }
    },
    {
        timestamps: true
    }
)

export const Role = mongoose.model("Role", rolesModels);