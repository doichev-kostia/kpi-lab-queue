import {ConfigController} from "./types";
import {Request, Response} from "express";
import {models} from "../models";

export class Config implements ConfigController {
    public async create(req: Request, res: Response): Promise<Response | void> {
        try {
            const {labs} = req.body;

            const config = await new models.Config({
                labs
            });

            const document = await config.save();
            res.send(document).end();

        } catch (error) {
            res.status(500).send({
                message: "An error has occurred while creating config."
            });
            console.error(`An error has occurred while creating config. Error: ${error}`);
        }
    }

    public async retrieve(_: Request, res: Response): Promise<Response | void> {
        try {
            const configs = await models.Config.find().exec();
            if (!configs) {
                console.error("Configs not found");
                return res.status(404).send({
                    message: "Not found"
                });
            }

            res.send(configs).end();

        } catch (error) {
            res.status(500).send({
                message: "An error has occurred while retrieving configs."
            });
            console.error(`An error has occurred while retrieving config. Error: ${error}`);
        }
    }

    public async update(req: Request, res: Response): Promise<Response | void> {
        try {
            const {params, body} = req;

            const document = await models.Config.findByIdAndUpdate(params.id, body, {new: true});
            if (!document) {
                console.error("Config not found");
                return res.status(404).send({
                    message: "Not found"
                }).end();
            }
            res.send(document).end();

        } catch (error) {
            res.status(500).send({
                message: "An error has occurred while editing config."
            });
            console.error(`An error has occurred while editing config. Error: ${error}`);
        }
    }

    public async delete(req: Request, res: Response): Promise<Response | void> {
        try {
            const {params} = req;
            const document = await models.Config.findByIdAndDelete(params.id).exec();

            if (!document) {
                console.error("Config not found");
                return res.status(404).send({
                    message: "Not found"
                }).end();
            }

            res.send({
                message: "Success"
            });
        } catch (error) {
            res.status(500).send({
                message: "An error has occurred while deleting config."
            });
            console.error(`An error has occurred while deleting config. Error: ${error}`);
        }
    }

}