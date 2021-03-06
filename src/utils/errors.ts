import {BadRequest, HttpError} from "http-errors";
import {Response} from "express";

/**
 * Error handler returning http response with correct error status
 * @param err
 * @param res
 */
export const jsonErrorHandler = (err: HttpError, res: Response) => {
    console.error(`Error - ${err.statusCode}: ${err.name} - message: ${err.message}`);
    if (!err?.statusCode) {
        const defaultErr = new BadRequest(err?.toString())
        return res.status(defaultErr.statusCode).json(err);
    }
    return res.status(err.statusCode).json(err);
};