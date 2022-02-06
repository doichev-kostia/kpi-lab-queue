export enum Roles {
    "USER" = "ROLE_USER",
    "ADMIN" = "ROLE_ADMIN",
    "SUPER_ADMIN" = "ROLE_SUPER_ADMIN"
}

export interface Config {
    labs: Object;
}

export interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Roles;
}

