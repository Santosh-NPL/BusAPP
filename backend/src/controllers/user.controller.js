import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/users/user.models.js";
import {Profile} from "../models/users/Profile.models.js";
import {uploadOnCloudinary} from "../utils/cloudinary.file.upload.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {RoleUser} from "../models/roles/role_users.models.js";
import {Role} from "../models/roles/roles.models.js";
import jwt from "jsonwebtoken";


const generateAccessAndRefreshToken = async (userId) => {

    try{
        const user = await User.findById(userId);

       const accessToken =  user.generateAccessToken();
       const newRefreshToken = user.generateRefreshToken();
       user.refresh_token = newRefreshToken
        await user.save({validateBeforeSave: false});

       return {accessToken, newRefreshToken}

    }catch (e) {
        throw new ApiError("Somethings is wrong tocreate the token")
    }

};
const registerUser = asyncHandler( async (req, res) => {

    // get user details from frontend
    // validation - not empty
    // check if user already exists: mobile
    // check for images check for avatar
    // upload to cloudinary
    // check the avatar in cloudinary
    // create user object - create enter in db
    // remove password and refresh token field from response
    // check for user creation
    // return response

    const {mobile, name, password, avatar, gender} = req.body;


        // if(mobile == ""){
        //     throw new ApiError(400, "Mobile Number Required");
        // }

    // or

    if(
        [mobile, name, password, avatar, gender].some((field) => field?.trim() === "")
        ){
        throw new ApiError(400, "All fields are required");
    }

    // User.findOne({mobile})

    // we can check the email or username

    const existedUser = await User.findOne({
        $or: [{mobile}]
    })

    if(existedUser){
        throw new ApiError(409, "Mobile already exist");
    }

    const avtarLocalPath = req.files?.avatar[0]?.path;

    if(!avtarLocalPath){

        throw new ApiError(400, "avatar file is required");

    }

    const avatars =  await uploadOnCloudinary(avtarLocalPath);

    if(!avatars){
        throw new ApiError(500, "Avatar file is required");

    }

    const user = await User.create({
        mobile,
        name,
        password
    });

    if(!user){
        throw new ApiError(400, "User not created..");
    }

    const profile = await Profile.create(
        {
            mobile,
            gender,
            avatar: avatars.url,
            user_id: user._id,

        }
        )

    const CreatedUser = await User.findById(user._id).select(
        "-password -refresh_token"
    );

    if(!CreatedUser){
        throw new ApiError(400, "User not created..");
    }

    return res.status(201).json(
        new ApiResponse(201, CreatedUser, "Thank your for regestering in our App..", "success")
    );

//    res.status(200).json({
//        message: "ok"
//    })
});

const loginUser = asyncHandler(async (req, res) => {

    // req body -> data
    // username or email or mobile
    // find the user
    //password check
        //access and refresh token
    // send cookies secure

    // res send


    const {mobile, email, username, password} = req.body;


    if (!mobile) {
        throw new ApiError(400, "Mobile is required");
    }

    // const  user = await User.findOne({
    //     $or: [{mobile}, {email}, {username}]
    // });


    const user = await User.findOne({$or: [{mobile}]})
    console.log(user);

    if(!user){
        throw new ApiError(400, "User not found");
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(400, "Password is not correct");
    }

    const {accessToken, newRefreshToken} = await generateAccessAndRefreshToken(user._id);
    const loggedInUser = await User.findById(user._id).select("-password -refresh_token");

    const options = {
        httpOnly: true,
        secure: true
    }

    const role_id = await RoleUser.findOne({user_id: user._id});

    const role = await Role.findById(role_id.role_id).select("name -_id");





    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options).
        json(
            new ApiResponse(200, {
                user: loggedInUser, accessToken, newRefreshToken, role
            }, "User logged In successfully")
        )

});

const logoutUser = asyncHandler(async (req, res) => {

  const user =await  User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refresh_token: null
            }
        },{
            req: true
        }
    )
    const options = {
        httpOnly: true,
        secure: true
    }
    if(!user){
        throw new ApiError("user not found");
    }
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "user Logout"))
});

const refreshAccessToken = asyncHandler( async (req, res) => {
   try {
       const userRefToken = req.cookies.refreshToken || req.body.refreshToken;

       if(!userRefToken){
           throw new ApiError(401, "Unauthorized request")
       }

       const decodedToken = jwt.verify(userRefToken, process.env.REFRESH_TOKEN_SECRET)

       if(!decodedToken){
           throw new ApiError(401, "Unauthorized request")
       }
       const user = await User.findOne({_id: decodedToken?._id, refresh_token: userRefToken});

       if(!user){
           throw new ApiError(401, "Refresh token is expired or used")
       }

       const options = {
           httpOnly: true,
           secure: true,
       }

       const {accessToken, newRefreshToken } = await generateAccessAndRefreshToken(user._id);

       return res
           .status(200)
           .cookie("accessToken", accessToken, options)
           .cookie("refreshToken", newRefreshToken, options)
           .json(
               new ApiResponse(
                   200,
                   {
                       accessToken, newRefreshToken
                   },
                   "Access Token refresh"
               )
           )
   }catch (e) {
       throw new ApiError(401, e?.message || "Invalid refresh token")
   }

});

export {registerUser, loginUser, logoutUser, refreshAccessToken};