import { ServiceInfo } from "../models/serviceprovider.model.js";
import { asynchandler } from "../utils/asynchandler.js";
import { APIerror } from "../utils/APIerror.js";

const search = asynchandler(async (req, res) => {
    const { Catagory, city, pincode } = req.body;

    if ([city, pincode, Catagory].some((field) => !field || field.trim() === "")) {
        throw new APIerror(400, "All fields are required");
    }

    const searchResults = await ServiceInfo.findOne({
        Catagory: { $regex: new RegExp(Catagory, "i") }, // Case-insensitive search
        pincode,
        city
    });

    if (!searchResults) {
        throw new APIerror(404, "No matching service provider found");
    }

    res.json(searchResults);
});

export { search };
