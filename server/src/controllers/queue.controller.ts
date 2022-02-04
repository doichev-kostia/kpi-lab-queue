import Doc from "../config/google-sheets";
import {models} from "../models";
import {QueueController, Row} from "./types";
import {Request, Response} from "express";
import {GoogleSpreadsheetRow} from "google-spreadsheet";

export class Queue implements QueueController {
    public async create(req: Request, res: Response): Promise<Response | void> {
        try {
            const {query, body, user} = req;
            const {subject} = query;
            if (!subject) {
                return res.status(400).send({
                    message: "Invalid subject"
                }).end();
            }
            // @ts-ignore
            const sheet = Doc.sheetsByTitle[subject];
            const rows = await sheet.getRows();
            // @ts-ignore
            const {id} = user;
            const isInQueue = rows.some(({userId, lab}: { userId: string; lab: string }) => {
                return userId === id && lab === body.lab;
            });

            if (isInQueue) {
                console.error("The user is already in the queue");
                return res.status(400).send({
                    message: "The user is already in the queue"
                }).end();
            }

            const config = await models.Config.find().exec();
            // @ts-ignore
            const configLab = config[0].labs[subject][body.lab];
            const isAvailableTime = Date.now() >= configLab.openingDate;

            if (configLab.isClosed) {
                return res.status(400).send({
                    message: "This lab is already unavailable"
                }).end()
            }

            if (!isAvailableTime) {
                let parsedOpeningDate: string | Date = new Date(configLab.openingDate);
                parsedOpeningDate = parsedOpeningDate.toLocaleString(undefined, {
                    timeZone: "Europe/Kiev"
                })
                return res.status(400).send({
                    message: `This lab will be available on ${parsedOpeningDate}`
                }).end()
            }


            const newRow = {
                number: rows.length + 1,
                // @ts-ignore
                fullName: `${user.get('firstName')} ${user.get('lastName')}`,
                lab: body.lab,
                userId: id
            };

            const updatedRows = [...rows, newRow]
                .sort((firstEL, secondEl) => {
                    const firstLab = Number(firstEL.lab);
                    const secondLab = Number(secondEl.lab);
                    if (firstLab > secondLab) {
                        return 1;
                    } else if (firstLab < secondLab) {
                        return -1;
                    } else {
                        return 0;
                    }
                })
                .map(({lab, fullName, userId}, index) => {
                    return {
                        lab,
                        fullName,
                        userId,
                        number: index + 1
                    };
                });

            await sheet.clear();
            await sheet.setHeaderRow(["number", "fullName", "lab", "userId"]);

            const addedRows = await sheet.addRows(updatedRows);
            const currentRow = addedRows.find((item: GoogleSpreadsheetRow) => {
                return item.userId.toString().trim() === id.trim();
            });

            res.send({
                data: {
                    number: currentRow.number,
                    fullName: currentRow.fullName,
                    lab: currentRow.lab,
                    userId: currentRow.userId
                }
            }).end();
        } catch (error) {
            res.status(500).send({
                message: `An error has occurred while creating the queue.`
            });
            console.error(`An error has occurred while creating the queue. Error:`, error);
        }
    }

    public async retrieve(req: Request, res: Response): Promise<Response | void> {
        try {
            const {subject} = req.query;

            if (!subject) {
                return res.status(400).send({
                    message: "Invalid subject"
                }).end();
            }

            // @ts-ignore
            const sheet = Doc.sheetsByTitle[subject];
            const rows = await sheet.getRows();
            const newRows: Row[] = rows.map(({number, fullName, lab, userId}: Row) => ({
                    number,
                    fullName,
                    lab,
                    userId
                } as Row
            ));

            res.send({
                data: newRows
            });
        } catch (error) {
            res.status(500).send({
                message: `An error has occurred while retrieving the queue.`
            });
            console.error(`An error has occurred while retrieving the queue. Error:`, error);
        }
    }

    public async retrieveUserById(req: Request, res: Response): Promise<Response | void> {
        try {
            const {subject, lab} = req.query;
            if (!subject) {
                return res.status(400).send({
                    message: "Invalid subject"
                }).end();
            }
            // @ts-ignore
            const sheet = Doc.sheetsByTitle[subject];
            const rows = await sheet.getRows();
            // @ts-ignore
            const {id} = req.user;
            const chosenRow: Row[] = rows.filter(({userId, lab: itemLab}: { userId: string; lab: string; }) => {
                return userId === id && lab === itemLab;
            });

            if (chosenRow.length) {
                const {number, fullName, lab: currentLab, userId} = chosenRow[0];
                return res.send({
                    data: {number, fullName, currentLab, userId}
                });
            }

            res.status(404).send({
                message: "Not found"
            });
        } catch (error) {
            res.status(500).send({
                message: `An error has occurred while retrieving the user from the queue.`
            });
            console.error(`An error has occurred while retrieving the user from the queue. Error:`, error);
        }
    }

    public async deleteRow(req: Request, res: Response): Promise<Response | void> {
        try {
            const {query, body, user} = req;
            const {subject} = query;
            if (!subject) {
                return res.status(400).send({
                    message: "Invalid subject"
                }).end();
            }
            // @ts-ignore
            const sheet = Doc.sheetsByTitle[subject];
            const rows = await sheet.getRows();
            // @ts-ignore
            const {id} = user;
            const chosenRow = rows.filter(({userId, lab}: { userId: string; lab: string; }) => {
                return userId === id && lab === body.lab;
            });

            if (chosenRow[0]) {
                await chosenRow[0].delete();
                res.status(200).end();
                return;
            }

            res.status(404).end();
        } catch (error) {
            res.status(500).send({
                message: `An error has occurred while deleting the queue row.`
            });
            console.error(`An error has occurred while deleting the queue row. Error:`, error);
        }
    }

    public async clear(req: Request, res: Response): Promise<Response | void> {
        try {
            const {subject} = req.query;
            if (!subject) {
                return res.status(400).send({
                    message: "Invalid subject"
                }).end();
            }
            // @ts-ignore
            const sheet = Doc.sheetsByTitle[subject];

            await sheet.clear();
            await sheet.setHeaderRow(["number", "fullName", "lab", "userId"]);
        } catch (error) {
            res.status(500).send({
                message: `An error has occurred while clearing the queue`
            });
            console.error(`An error has occurred while clearing the queue. Error:`, error);
        }
    }

}