import express from "express";
import passport from "passport";
import {controllers} from "../controllers";

const router = express.Router();
const controller = new controllers.Config();

const {
    create,
    retrieve,
    update,
    delete: deleteConfig,
} = controller;

router.get("/", retrieve);
router.post(
    "/",
    passport.authenticate("jwt-super-admin", {session: false}),
    create
);
router.put(
    "/:id",
    passport.authenticate("jwt-super-admin", {session: false}),
    update
);
router.delete(
    "/:id",
    passport.authenticate("jwt-super-admin", {session: false}),
    deleteConfig
);

export default router;