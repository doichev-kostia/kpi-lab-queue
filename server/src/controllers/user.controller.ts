import {models, ModelInterfaces} from "../models"
import bcrypt from "bcryptjs"

import jwt from "jsonwebtoken"
import {Request, Response} from "express";
import {UserController} from "./types";
import _ from "lodash"
import {config} from "dotenv";

config();

const SECRET = process.env.SECRET || 'secret';


export class User implements UserController {
    private static async encrypt(data: string, rounds: number): Promise<string> {
        const salt = await bcrypt.genSalt(rounds);
        return await bcrypt.hash(data, salt);
    }

    public async create(req: Request, res: Response): Promise<Response | void> {
        try {
            const {
                firstName,
                lastName,
                email,
                password,
                role
            } = req.body;

            const isUserExists = await models.User.findOne({email}).exec();
            if (isUserExists) {
                return res.status(400).send({
                    message: "The user with such email already exists"
                }).end();
            }

            const hash = await User.encrypt(password, 10);
            const user: ModelInterfaces.User = {
                firstName,
                lastName,
                email,
                password: hash,
                role,
            }
            const entity = new models.User(user);

            const document = await entity.save();
            const result = _.omit(document.toObject(), ["createdAt", "updatedAt", "password", "__v"])
            res.status(200).send(result).end();
        } catch (error) {
            res.status(500).send({
                message: "An error has occurred while creating a user"
            });
            console.error(`An error has occurred while creating a user. Error: ${error}`);
        }
    }

    public async logIn(req: Request, res: Response): Promise<Response | void> {
        try {
            const {email, password} = req.body;
            const user = await models.User.findOne({email}).exec();

            if (!user) {
                return res.status(404).send({
                    message: "User not found"
                }).end();
            }

            const isCorrectPassword = await bcrypt.compare(password, user.password);

            if (!isCorrectPassword) {
                return res.status(401).send({
                    message: "Invalid password"
                }).end();
            }

            const payload = {
                id: user.id
            };

            const token = jwt.sign(payload, SECRET, {
                expiresIn: 3600
            });

            res.send({
                token: `Bearer ${token}`
            }).end();

        } catch (error) {
            res.status(500).send({
                message: `An error has occurred while logging in.`
            });
            console.error(`An error has occurred while logging in. Error: ${error}`);
        }
    }

    public async retrieve(req: Request, res: Response): Promise<void> {
        // @ts-ignore
        const user = _.omit(req.user.toObject(), ['password']);
        res.send(user).end();
    }

    public async updatePassword(req: Request, res: Response): Promise<Response | void> {
        try {
            // @ts-ignore
            const {id} = req.user;
            const user = await models.User.findById(id).exec();
            if (!user) {
                return res.status(404).send({
                    message: `The user with id ${id} doesn't exist`
                });
            }
            const {password, newPassword} = req.body;
            if (!user?.password) {
                console.error("User password is not defined");
                return res.status(500).send({
                    message: "An error has occurred while updating the password"
                })
            }
            const areSame = await bcrypt.compare(password, user.password);
            if (!areSame) {
                console.error("The passwords do not match");
                return res.status(400).send({
                    message: "Invalid password"
                });
            }

            const hash = await User.encrypt(newPassword, 10);
            const document = await models.User.findByIdAndUpdate(id, {
                password: hash
            }, {new: true}).exec();
            // @ts-ignore
            const result = _.omit(document.toObject(), ["createdAt", "updatedAt", "password", "__v"])
            res.status(200).send(result).end();
        } catch (error) {
            res.status(500).send({
                message: `An error has occurred while logging in.`
            }).end();
            console.error(`An error has occurred while logging in. Error: `, error);
        }
    }
}


