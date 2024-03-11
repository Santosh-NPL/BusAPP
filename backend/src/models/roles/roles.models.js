import mongoose from "mongoose";

const rolesModels = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        display_name: {
            type: String,
        },
        description: {
            type: String,
        }
    },
    {
        timestamps: true
    }
)

export const Role = mongoose.model("Role", rolesModels);