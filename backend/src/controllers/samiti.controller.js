import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {uploadOnCloudinary} from "../utils/cloudinary.file.upload.js"; // if image is add in model
import {Samiti} from "../models/samiti/samiti.models.js";
import {User} from "../models/users/user.models.js";
import {SamitiUser} from "../models/samiti/samiti_users.models.js";
import {Role} from "../models/roles/roles.models.js";
import {RoleUser} from "../models/roles/role_users.models.js";


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


    const avtarLocalPath = req.files?.cover_image[0]?.path;

    if(!avtarLocalPath){
        throw new ApiError(400, "avatar file is required");
    }

    const avatars =  await uploadOnCloudinary(avtarLocalPath);

    if(!avatars){
        throw new ApiError(500, "Avatar file is required");

    }


    const user= await User.create({
        mobile,
        name,
        password: mobile
    });

    if(!user){
        throw new ApiError(400, "User not created..");
    }

    const samiti = await Samiti.create({
        name,
        address,
        mobile,
        cover_image: avatars.url
    })

    const role = await Role.findOne({
    name: "samiti"
    })

    const role_user = await RoleUser.create({
        role_id: role._id,
        user_id: user._id
    });



    if(!samiti){

        throw new ApiError(400, "User not created..");
    }

    const  samiti_user = await SamitiUser.create({
        samiti_id: samiti._id,
        user_id: user._id
    });

    const CreatedUser = await User.findById(user._id).select(
        "-password -refresh_token"
    );

    if(!CreatedUser){
        throw new ApiError(400, "User not created..");
    }

    return res.status(201).json(
        new ApiResponse(201, CreatedUser, "Thank your for regestering in our App..", "success")
    );

});

export {registerSamiti}