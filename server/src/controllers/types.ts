import {Request, Response} from "express";

export interface UserController {
    create: (req: Request, res: Response) => Promise<Response | void>;
    logIn: (req: Request, res: Response) => Promise<Response | void>;
    retrieve: (req: Request, res: Response) => Promise<void>;
    updatePassword: (req: Request, res: Response) => Promise<Response | void>;
}

export interface QueueController {
    create: (req: Request, res: Response) => Promise<Response | void>;
    retrieve: (req: Request, res: Response) => Promise<Response | void>;
    retrieveUserById: (req: Request, res: Response) => Promise<Response | void>;
    deleteRow: (req: Request, res: Response) => Promise<Response | void>;
    clear: (req: Request, res: Response) => Promise<Response | void>;
}

export interface ConfigController {
    create: (req: Request, res: Response) => Promise<Response | void>;
    retrieve: (req: Request, res: Response) => Promise<Response | void>;
    update: (req: Request, res: Response) => Promise<Response | void>;
    delete: (req: Request, res: Response) => Promise<Response | void>;
}

export interface Row {
    number: number;
    fullName: string;
    lab: string;
    userId: string;
}