import { asynchandler } from '../utils/asynchandler.js';
import { APIerror } from '../utils/APIerror.js';
import { APIResponse } from '../utils/APIResponse.js';
import { Service } from '../models/service.model.js'

const registerService = asynchandler(async (req, res) => {

    console.log("my server is listening")

    const { fullname, email, Phoneno } = req.body;
    // console.log('Received data:', { fullname, email, phoneno }); // Log received data

    if (
        [fullname, email, Phoneno].some((field) => field?.trim() === "")
    ) {
        throw new APIerror(400, "ALL fields are required")

    }
    const existedUser = await Service.findOne({
        $or: [{ fullname }, { email }]
    })

    if (existedUser) {
        throw new APIerror(409, "User with email or username already exists")
    }


    const servicep = await Service.create({
        email,
        Phoneno,
        fullname: fullname.toLowerCase()
    })

    const createUser = await Service.findById(servicep._id).select("-Phoneno -refreshToken")


    if (!createUser) {
        throw new APIerror(500, "Something went wrong while registering")
    }

    return res.status(201).json(
        new APIResponse(200, createUser, "User registration successful")
    )
})

export { registerService }
