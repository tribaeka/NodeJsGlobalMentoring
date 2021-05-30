import httpStatus from "http-status";

export class HttpError extends Error {
    public statusCode: number;

    constructor(name: string, message: string, statusCode: number,) {
        super();
        this.name = httpStatus[`${statusCode}_NAME`].toString();
        this.message = message;
        this.statusCode = statusCode;
    }
}
