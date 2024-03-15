import { Router } from "express";
import {registerSamiti} from "../controllers/samiti.controller.js";
import {upload} from "../middlewares/multer.middleware.js";

const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: 'cover_image',
            maxCount: 1,
        },
        ]),
    registerSamiti
    )


export default router