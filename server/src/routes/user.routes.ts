import express from "express";
import passport from "passport";
import {controllers} from "../controllers";

const router = express.Router();

const controller = new controllers.User();
const {
    create,
    logIn,
    retrieve,
    updatePassword
} = controller;

router.post("/", create);
router.post("/login", logIn);
router.get(
    "/user",
    passport.authenticate("jwt", {session: false}),
    retrieve
);
router.put(
    "/password",
    passport.authenticate("jwt", {session: false}),
    updatePassword
)

export default router;