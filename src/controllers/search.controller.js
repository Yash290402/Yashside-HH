import { Search } from "../models/search.model.js";
import { asynchandler } from "../utils/asynchandler.js";
import { APIerror } from "../utils/APIerror.js";

const search = asynchandler(async (req, res) => {
    const { service, pincode } = req.body;

    if (
        [service,pincode].some((field) => field?.trim() === "")
    ) {
        throw new APIerror(400, "ALL fields are required")

    }

    const searchResults = await Search.find({
        service: new RegExp(service,'i'), // Case-insensitive search
        pincode: pincode
    });

    res.json(searchResults);
})

export { search }