import {ExtractJwt, Strategy, StrategyOptions} from "passport-jwt";
import {models} from "../models";
import {Authenticator} from "passport";

export default async (passport: Authenticator) => {
    const options: Partial<StrategyOptions> = {};

    options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    options.secretOrKey = process.env.SECRET;

    passport.use("jwt",
        new Strategy(options as StrategyOptions, async (jwt_payload, done) => {
            try {
                const user = await models.User.findById(jwt_payload.id).exec();
                if (!user) {
                    return done(null, false);
                }
                return done(null, user);
            } catch (error) {
                done(error, false);
                console.log(error);
            }
        })
    );

    passport.use("jwt-admin",
        new Strategy(options as StrategyOptions, async (jwt_payload, done) => {
            try {
                const user = await models.User.findById(jwt_payload.id).exec();

                if (!user) {
                    return done(null, false);
                }

                if (!user.isAdmin) {
                    return done(null, false, {
                        message: "You don't have enough permissions to complete" +
                            " this action"
                    });
                }

                done(null, user);
            } catch (error) {
                done(error, false);
                console.log(error);
            }
        })
    );
};