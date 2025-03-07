import mongoose from "mongoose";
import { Schema } from "mongoose";

const passwordSchema = new Schema({
    site:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    userid:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

export const Password= mongoose.model("Password",passwordSchema);
