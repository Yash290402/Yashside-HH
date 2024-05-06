import { Router } from "express";

import { loginUser, registerUser } from "../controllers/user.controller.js";

import { registerService } from "../controllers/service.controller.js";

import { submitFeedback } from "../controllers/feedback.controller.js"

import { search } from "../controllers/search.controller.js";

import { serviceProfile } from '../controllers/serviceProfile.controller.js'

import {upload} from '../middlewares/multer.middleware.js'

import { bookTimeSlot } from "../controllers/booking.controller.js";

const router = Router();


router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

router.route("/serviceprovider").post(registerService)

router.route("/feedbacks").post(submitFeedback)

// router.route("/search").post(search)

router.route("/serviceProfile/search").post(search)

router.route("/serviceProfile").post(upload.fields([
    {
        name: "avatar",
        maxCount: 1
    },

]), serviceProfile)

router.route("/book").post(bookTimeSlot)

export default router;