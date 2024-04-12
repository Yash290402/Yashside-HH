import { Router } from "express";

import { loginUser, registerUser } from "../controllers/user.controller.js";

import { registerService } from "../controllers/service.controller.js";

import {submitFeedback } from "../controllers/feedback.controller.js"

import { search } from "../controllers/search.controller.js";

import {serviceProfile} from "../controllers/serviceProfile.controller.js"

const router = Router();


router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

router.route("/serviceprovider").post(registerService)

router.route("/feedbacks").post(submitFeedback)

// router.route("/search").post(search)

router.route("/serviceProfile").post(search)

export default router;