import {Schema, model } from "mongoose";
import {Config as IConfig} from "./types";

const Config = new Schema<IConfig>(
    {
        labs: {
            type: Object,
            required: true
        }
    },
    {
        strict: false,
        timestamps: true
    }
);

const configModel = model("config", Config);

export default configModel;