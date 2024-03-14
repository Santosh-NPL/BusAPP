import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/users/user.models.js";
import {Profile} from "../models/users/Profile.models.js";
import {uploadOnCloudinary} from "../utils/cloudinary.file.upload.js";
import {ApiResponse} from "../utils/ApiResponse.js";


const generateAccessAndRefreshToken = async (userId) => {

    try{
        const user = await User.findById(userId);

       const accessToken =  user.generateAccessToken();
       const refreshToken = user.generateRefreshToken();
       user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false});

       return {accessToken, refreshToken}

    }catch (e) {
        throw new ApiError("Somethings is wrong tocreate the token")
    }

}
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
        throw new ApiError(400, "Mobile, email, or username is required");
    }

    const  user = await User.findOne({
        $or: [{mobile}, {email}, {username}]
    });

    if(!user){
        throw new ApiError(400, "User not found");
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(400, "Password is not correct");
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id);
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options).
        json(
            new ApiResponse(200, {
                user: loggedInUser, accessToken, refreshToken
            }, "User logged In successfully")
        )

});

const logoutUser = asyncHandler(async (req, res) => {
  await  User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refresh_token: undefined
            }
        },{
            req: true
        }
    )
    const options = {
        httpOnly: true,
        secure: true
    }
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "user Logout"))
})

export {registerUser, loginUser, logoutUser};