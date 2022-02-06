import {PREFIX} from "../constants";
import {generateHeaders} from "../utils";
import {User} from "../../types";

type UserWithoutPassword = Omit<User, "password">;
type LoginBody = Pick<User, "email" | "password">;

export const retrieveUser = async (): Promise<UserWithoutPassword | void> => {
    try {
        const response = await fetch(`${PREFIX}/users/user`, {
            method: "GET",
            headers: generateHeaders(),
        });
        if (response.status % 200 >= 100) {
            throw new Error(response.statusText);
        }

        return await response.json() as UserWithoutPassword;
    } catch (error) {
        console.error(error);
    }
};

export const createUser = async (body: User): Promise<UserWithoutPassword | void> => {
    try {
        const response = await fetch(`${PREFIX}/users`, {
            method: "POST",
            headers: generateHeaders(),
            body: JSON.stringify(body)
        });

        if (response.status % 200 >= 100) {
            throw new Error(response.statusText);
        }

        return await response.json() as UserWithoutPassword;
    } catch (error) {
        console.error(error);
    }
};

export const logIn = async (body: LoginBody): Promise<{ token: string } | void> => {
    try {
        const response = await fetch(`${PREFIX}/users/login`, {
            method: "POST",
            headers: generateHeaders(),
            body: JSON.stringify(body)
        });

        if (response.status % 200 >= 100) {
            throw new Error(response.statusText);
        }

        return await response.json() as { token: string };
    } catch (error) {
        console.error(error);
    }
};

export const updatePassword = async (password: string, newPassword: string): Promise<UserWithoutPassword | void> => {
    try {
        const response = await fetch(`${PREFIX}/users`, {
            method: "PUT",
            headers: generateHeaders(),
            body: JSON.stringify({
                password,
                newPassword
            })
        });

        if (response.status % 200 >= 100) {
            throw new Error(response.statusText);
        }

        return await response.json() as UserWithoutPassword;
    } catch (error) {
        console.error(error)
    }
}