import mongoose from "mongoose";

const role_usersModel = new mongoose.Schema(
    {
        role_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Role'
        },
        user_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }
);

export const RoleUser = mongoose.model("RoleUser", role_usersModel);