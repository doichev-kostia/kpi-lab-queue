import express from "express";
import {config} from "dotenv";
import path from "path";
import passport from "passport";
import mongoose from "mongoose";
import {routers} from "./routes";
import {routes} from "./constants";

config();
const PORT = process.env.PORT || 8080;
const {DB_CONNECTION_STRING} = process.env;

const dirname = path.resolve();

const app = express();

app.use(express.static(path.join(dirname, 'public')));

app.use(express.json());
app.use(passport.initialize());

app.use(routes.USERS, routers.user);
app.use(routes.QUEUE, routers.queue);

app.get("/api", (_, res) => {
    res.send({message: "Hello, world!"})
})

app.get("/*", (_, res) => {
    res.sendFile(path.join(dirname, "public", "index.html"));
});

mongoose.connect(DB_CONNECTION_STRING || '')
    .then(() => {
        console.log("Database connection is successful ...");
        app.listen(PORT, () => {
            console.log(`Server is listening on ${PORT} port ...`);
        });

    })
    .catch(err => {
        console.log(`An error has occurred while launching server. Error: ${err}`);
    });
