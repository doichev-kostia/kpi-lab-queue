import express from "express";
import passport from "passport";
import {controllers} from "../controllers";

const controller = new controllers.Queue();

const {
    create,
    retrieve,
    retrieveUserById,
    deleteRow,
    clear
} = controller;

const router = express.Router();

router.get("/all", retrieve);
router.get(
    "/",
    passport.authenticate("jwt", {session: false}),
    retrieveUserById
);
router.post(
    "/",
    passport.authenticate("jwt", {session: false}),
    create
);
router.delete(
    "/",
    passport.authenticate("jwt", {session: false}),
    deleteRow
);
router.delete(
    "/all",
    passport.authenticate("jwt-admin", {session: false}),
    clear
)

export default router;