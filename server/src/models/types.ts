export interface Config {
    labs: Object;
}

export interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isAdmin?: boolean;
}