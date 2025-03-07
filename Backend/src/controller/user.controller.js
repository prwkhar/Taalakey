import asynchandler from "../utils/asynchanler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";

const generateAccessandRefreshTokens = async (userId) => {
    try {
      const user = await User.findById(userId);
      const accessToken = user.generateAccessToken();
      const refreshToken = user.generateRefreshToken();
      user.refreshToken = refreshToken;
      await user.save({ validateBeforeSave: false });
      return { accessToken, refreshToken };
    } catch (error) {
      throw new apiError(500, "something went wrong while generating tokens");
    }
  };

const register = asynchandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new apiError(400, "user already exists");}
    const user = await User.create({ name, email, password });
    return res.status(201).json(new apiResponse(200,"created user succesfullly"));
});

const login = asynchandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
      if (!user) {
        throw new apiError(400, "user not exist");
      }
      const ispassvalid = await user.isPasswordCorrect(password);
        if (!ispassvalid) {
            throw new apiError(400, "password is incorrect");
        }
        const { accessToken, refreshToken } = await generateAccessandRefreshTokens(
            user._id
          );
        
          //sending to cookies
          const loggedinuser = await User.findById(User._id).select(
            "-password -refreshToken"
          );
        
          //because of this its can only be modified from server
          const options = {
            httpOnly: true,
            secure: true,
          };
        
          return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
              new apiResponse(
                200,
                {
                  user: loggedinuser,
                  accessToken,
                  refreshToken,
                },
                "user logged in successfully"
              )
            );
});
const logout = asynchandler(async (req, res) => {
    const user = req.user;
    user
      .updateOne({ refreshToken: "" })
      .then(() => {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.status(200).json(new apiResponse(200, "user logged out successfully"));
      })
      .catch((error) => {
        throw new apiError(500, "something went wrong while logging out");
      });
    });
const refreshToken = asynchandler(async (req, res) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      throw new apiError(400, "refresh token not found");
    }
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded._id);
    if (!user) {
      throw new apiError(404, "user not found");
    }
    if (user.refreshToken !== refreshToken) {
      throw new apiError(400, "invalid refresh token");
    }
    const { accessToken, refreshToken: newRefreshToken } =
      await generateAccessandRefreshTokens(user._id);
    const loggedinuser = await User.findById(user._id).select(
      "-password -refreshToken"
    );
    const options = {
      httpOnly: true,
      secure: true,
    };
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new apiResponse(
          200,
          {
            user: loggedinuser,
            accessToken,
            newRefreshToken,
          },
          "token refreshed successfully"
        )
      );
    });

export { register,login,logout,refreshToken};

