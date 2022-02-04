import {Schema, model} from "mongoose"
import {User} from "./types";

const User = new Schema<User>({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
}, {
    strict: false,
    timestamps: true
});

const userModel = model("user", User);

export default userModel;