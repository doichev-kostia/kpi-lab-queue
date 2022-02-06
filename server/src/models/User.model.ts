import {Schema, model} from "mongoose"
import {User, Roles} from "./types";

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
    role: {
        type: String,
        enum: [Roles.USER, Roles.ADMIN, Roles.SUPER_ADMIN],
    },
}, {
    strict: false,
    timestamps: true
});

const userModel = model("user", User);

export default userModel;