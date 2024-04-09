import { asynchandler } from '../utils/asynchandler.js';
import { APIerror } from '../utils/APIerror.js';
import { User } from '../models/user.model.js';
import { APIResponse } from '../utils/APIResponse.js';

const generateAccessTokenandrefereshToken = async (userId) => {
    try {

        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validatebeforeSave: false })

        return { accessToken, refreshToken }


    } catch (error) {
        throw new APIerror(500, "something went wrong while generating access token and refresh token")
    }
}

const registerUser = asynchandler(async (req, res) => {

    // get user details from frontend
    //validation -not empty
    //check if user already exists:username,email
    //check for images ,check for avatar
    //upload them to cloudinary,avatar
    //create user object-create entry in db
    //remove password and referesh token field from response
    //check for user creation
    //return response


    const { username, email, password } = req.body
    console.log("email: ", email);

    if (
        [password, email, username].some((field) => field?.trim() === "")
    ) {
        throw new APIerror(400, "ALL fields are required")

    }
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new APIerror(409, "User with email or username already exists")
    }


    const user = await User.create({

        email,
        password,
        username: username.toLowerCase()
    })

    const createUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createUser) {
        throw new APIerror(500, "Something went wrong while registering")
    }

    return res.status(201).json(
        new APIResponse(200, createUser, "User registration successful")
    )
})

const loginUser = asynchandler(async (req, res) => {
    //req body -> data
    //username or email
    //find the user
    //password check
    //access token and refresh token
    //send cookies

    const { email, username, password } = req.body
    // console.log(email);

    if (!(username)) {
        throw new APIerror(400, "username or password is required")
    }

    const user = await User.findOne({
        $or: [{ username }]
    })

    if (!user) {
        throw new APIerror(404, "User does not exist");
    }

    const isPasswordvalid = await user.isPasswordCorrect(password)


    if (!isPasswordvalid) {
        throw new APIerror(401, "Passsword incorrect does not exist");
    }


    const { accessToken, refreshToken } = await
        generateAccessTokenandrefereshToken(user._id)

    const loggedInUser = await User.findById(user._id)
        .select("-password -refreshToken ")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new APIResponse(
                200,
                {
                    user: loggedInUser, accessToken,
                    refreshToken
                },
                "user logged in successfully"
            )
        )

})



export { registerUser, loginUser }