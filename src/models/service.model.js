import mongoose, { Schema } from "mongoose";


const serviceProviderSchema = new Schema({

    fullname: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },

    Phoneno: {
        type: String,
        required: true,

    },

    refreshToken: {
        type: String,

    }

},
    {
        timestamps: true,
    }
);





export const Service = mongoose.model("Service", serviceProviderSchema);
