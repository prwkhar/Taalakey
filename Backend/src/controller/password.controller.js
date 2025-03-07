import asynchandler from "../utils/asynchanler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.models.js";
import {Password} from "../models/passwords.models.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const entersitedetails = asynchandler(async (req, res) => {
    console.log(req.body);
    const { siteurl, siteusername, sitepassword } = req.body;
    const user = req.user;
    console.log(req.user);
    const password = await Password.create({ site: siteurl,username: siteusername,password: sitepassword, userid: user._id });
    return res.status(201).json(new apiResponse(200, "site details entered successfully"));
});

const deletesitedetails = asynchandler(async (req, res) => {
    console.log(req.body);
    const { siteurl } = req.body;
    console.log(siteurl);
    const user = req.user;
    console.log(user._id);
    const userId = new mongoose.Types.ObjectId(user._id);
    const password =
    await Password.findOneAndDelete({ site: siteurl, userid: userId });
    if (!password) {
        throw new apiError(400, "site details not found");
    }
    return res.status(200).json(new apiResponse(200, "site details deleted successfully"));
}   );  

const updatesitedetails = asynchandler(async (req, res) => {
    const { siteurl, siteusername, sitepassword } = req.body;
    const user = req.user;
    const siteid = req._id;
    const password = await Password.findOneAndDelete({ site: siteurl, userid: user._id });
    if (!password) {
        throw new apiError(400, "site details not found");
    }
    const updatedpassword = await Password.create({ site: siteurl, username: siteusername, password: sitepassword, userid: user._id });
    return res.status(200).json(new apiResponse(200, "site details updated successfully"));
});

const showpasswords = asynchandler(async (req, res) => {
    const user = req.user;
    const passwords = await Password.find({ userid: user._id });
    return res.status(200).json(new apiResponse(200, passwords));
});

export { entersitedetails, deletesitedetails, updatesitedetails, showpasswords };