import { asynchandler } from '../utils/asynchandler.js';
import { APIerror } from '../utils/APIerror.js';
import { APIResponse } from '../utils/APIResponse.js';
import { ServiceInfo } from '../models/serviceprovider.model.js';

const serviceProfile = asynchandler(async (req, res) => {
    console.log("server is listening ")

    const { Providername, email, Phoneno, Adharno, birthday, Password, Catagory, Charges, Rating, city, reviewers, pincode, slot, PastBooking } = req.body;

    if (
        [Providername, email, Phoneno, Adharno, birthday, Password, Catagory, Charges, Rating, city, reviewers, pincode, slot, PastBooking].some((field) => field?.trim() == "")

    ) {
        throw new APIerror(400, "ALL fields are required")
    }

    const existuser = await ServiceInfo.findOne({
        $or: [{ Providername }, { email }, { Adharno }]
    })

    if (existuser) {
        throw new APIerror(409, "User with email or username already exists")

    }

    const service = await ServiceInfo.create({
        Providername,
        email,
        Phoneno,
        Adharno,
        birthday,
        Password,
        Catagory,
        Charges,
        Rating,
        city,
        reviewers,
        pincode,
        slot,
        PastBooking
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