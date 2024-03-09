import mongoose from 'mongoose';

const permission_usersModels = new mongoose.Schema(
    {
        permission_id: {
            type: mongoose.Schema.Type.ObjectId,
            ref: 'Permission',
        },
        user_id: {
            type: mongoose.Schema.Type.ObjectId,
            ref: 'User',
        }
    }
);


export const PermissionUser = mongoose.model("PermissionUser", permission_usersModels);