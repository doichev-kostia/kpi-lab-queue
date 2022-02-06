import {ExtractJwt, Strategy, StrategyOptions} from "passport-jwt";
import {models} from "../models";
import {Roles} from "../types";
import passport from "passport";
import { config } from "dotenv";
config();

export const configurePassport = (passport: passport.PassportStatic) => {
    const options: Partial<StrategyOptions> = {};
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    options.secretOrKey = process.env.SECRET || "secret";

    passport.use("jwt",
        new Strategy(options as StrategyOptions, async (payload, done) => {
            try {
                const user = await models.User.findById(payload.id);
                if (!user) {
                    console.error(`User not found, jwt id: ${payload.id}`)
                    return done(null, false);
                }
                return done(null, user);
            } catch (error) {
                done(error, false);
                console.error(error);
            }
        })
    );

    passport.use("jwt-admin",
        new Strategy(options as StrategyOptions, async (payload, done) => {
            try {
                const user = await models.User.findById(payload.id).exec();

                if (!user) {
                    console.error(`User not found, jwt id: ${payload.id}`)
                    return done(null, false);
                }

                if (user.role === Roles.USER) {
                    return done(null, false, {
                        message: "You don't have enough permissions to complete" +
                            " this action"
                    });
                }

                done(null, user);
            } catch (error) {
                done(error, false);
                console.error(error);
            }
        })
    );

    passport.use("jwt-super-admin", new Strategy(options as StrategyOptions, async (payload, done) => {
        try {
            const user = await models.User.findById(payload.id).exec();

            if (!user) {
                console.error(`User not found, jwt id: ${payload.id}`)
                return done(null, false);
            }

            if (user.role !== Roles.SUPER_ADMIN) {
                return done(null, false, {
                    message: "You don't have enough permissions to complete" +
                        " this action"
                });
            }

            done(null, user);
        } catch (error) {
            done(error, false);
            console.error(error);
        }
    }))
};