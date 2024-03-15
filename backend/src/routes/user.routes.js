import { Router } from "express";
import {loginUser, logoutUser, refreshAccessToken, registerUser} from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js";
import {Auth} from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: 'avatar',
            maxCount: 1,
            },
    ]),
    registerUser
    )

router.route("/login").post(loginUser)


/// user auth ,,,
router.route("/logout").post(Auth, logoutUser);

router.route("/refresh-token").post(refreshAccessToken);

export default router