import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {uploadOnCloudinary} from "../utils/cloudinary.file.upload.js"; // if image is add in model
import {Samiti} from "../models/samiti/samiti.models.js";
import {User} from "../models/users/user.models.js";


const registerSamiti = asyncHandler( async (req, res) => {

    // get req data

    const {name, address, mobile, cover_image} = req.body;


    if(
        [mobile, name, address, cover_image].some((field)=> field?.trim() === "")){
            throw new ApiError(400, "All fields are required");
    }


    const existedUser = await User.findOne(
        {
            $or: [{mobile}]
        }
    )

    if(existedUser){
        throw new ApiError(409, "Mobile already exitst")
    }



});

export {registerSamiti}