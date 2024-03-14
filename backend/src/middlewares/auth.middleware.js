import {asyncHandler} from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import {User} from "../models/users/user.models.js";
import {ApiError} from "../utils/ApiError.js";

export const Auth = asyncHandler(async (req, _, next) => {
    try{
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if(!token){
            throw new ApiError("Unauthorized request");
        }

        const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

       const user = await User.findById(decodedToken?._id).select("-password -refresh_token")

        if(!user){
            throw new ApiError(401, "Invalid access token");
        }

        req.user = user;
        next();

    }catch (e) {
        throw new ApiError(500, e?.message || "Invalid access token");
    }
})