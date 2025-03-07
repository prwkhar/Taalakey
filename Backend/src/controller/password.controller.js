import asynchandler from "../utils/asynchanler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.models.js";
import {Password} from "../models/passwords.models.js";
import jwt from "jsonwebtoken";

const entersitedetails = asynchandler(async (req, res) => {
    const { siteurl, siteusername, sitepassword } = req.body;
    const user = req.user;
    const password = await Password.create({ siteurl, siteusername, sitepassword, user: user._id });
    return res.status(201).json(apiResponse(200, "site details entered successfully"));
});

const deletesitedetails = asynchandler(async (req, res) => {
    const { siteid } = req.body;
    const user = req.user;
    const password =
    await Password.findOneAndDelete({ _id: siteid, user: user._id });
    if (!password) {
        throw new apiError(400, "site details not found");
    }
    return res.status(200).json(apiResponse(200, "site details deleted successfully"));
}   );  

const updatesitedetails = asynchandler(async (req, res) => {
    const { siteid, siteurl, siteusername, sitepassword } = req.body;
    const user = req.user;
    const password = await Password.findOneAndUpdate(
        { _id: siteid, user: user._id },
        { siteurl, siteusername, sitepassword },
        { new: true }
      );
        if (!password) {
            throw new apiError(400, "site details not found");
        }
        return res.status(200).json(apiResponse(200, "site details updated successfully"));
    }
);

const showpasswords = asynchandler(async (req, res) => {
    const user = req.user;
    const passwords = await Password.find({ user: user._id });
    return res.status(200).json(apiResponse(200, passwords));
});

export { entersitedetails, deletesitedetails, updatesitedetails, showpasswords };