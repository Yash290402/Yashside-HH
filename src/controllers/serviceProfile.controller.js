import { asynchandler } from '../utils/asynchandler.js';
import { APIerror } from '../utils/APIerror.js';
import { APIResponse } from '../utils/APIResponse.js';
import { ServiceInfo } from '../models/serviceprovider.model.js';
import {uploadOncloudinary} from '../utils/cloudinary.js'

const serviceProfile = asynchandler(async (req, res) => {
    console.log("server is listening ")

    const { providername,availability, email, Phoneno, Adharno, birthday, Password,  category, charges, Rating, city, reviewers, pincode, slot, PastBooking } = req.body;

    if (
        [providername,availability, email, Phoneno, Adharno, birthday, Password,  category, charges, Rating, city, reviewers, pincode, slot, PastBooking].some((field) => field?.trim() == "")

    ) {
        throw new APIerror(400, "ALL fields are required")
    }

    const existuser = await ServiceInfo.findOne({
        $or: [{ providername }, { email }, { Adharno }]
    })

    if (existuser) {
        throw new APIerror(409, "User with email or username already exists")

    }
    console.log("file is ",req.files)

    const avatarlocalPath = req.files?.avatar[0]?.path;
    
    if(!avatarlocalPath){
        throw new APIerror(400,"Avatar file not found")
    }

    const avatar=await uploadOncloudinary(avatarlocalPath)

    if(!avatar){
        throw new APIerror(400,"avatar is not available")
    }



    const service = await ServiceInfo.create({
        providername,
        email,
        Phoneno,
        Adharno,
        birthday,
        Password,
        category,
        charges,
        Rating,
        city,
        reviewers,
        pincode,
        slot,
        PastBooking,
        avatar:avatar.url,
        availability
        
    })
    const createUser=await ServiceInfo.findById(service._id)

    if(!createUser) {
        throw new APIerror(500, "Something went wrong while registering")
    }

    return res.status(201).json(
        new APIResponse(200, createUser, "User registration successful")
    )
})

export { serviceProfile }