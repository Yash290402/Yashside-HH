import mongoose, { Schema } from "mongoose";

const searchSchema = new mongoose.Schema({

    service: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    pincode: {
        type: String,
        required: true,
        trim: true
    }
},
    {
        timestamps: true,
    }
)


export const Search = mongoose.model('Search', searchSchema);