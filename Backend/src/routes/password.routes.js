import { Router } from "express";
import { entersitedetails, deletesitedetails, updatesitedetails, showpasswords} from "../controller/password.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
const router2 = Router()

router2.route("/entersitedetails").post(verifyJWT,entersitedetails);
router2.route("/deletesitedetails").delete(verifyJWT,deletesitedetails);
router2.route("/updatesitedetails").put(verifyJWT,updatesitedetails);
router2.route("/showpasswords").get(verifyJWT,showpasswords);

export default router2