import { Router } from "express";
import { register,login,logout,refreshToken} from "../controller/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(verifyJWT,logout);
router.route("/refreshToken").post(refreshToken);
export default router;