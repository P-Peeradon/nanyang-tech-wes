export class HttpError extends Error {
    #errorCode: number;

    constructor(message: string, errorCode: number) {
        super(message);
        this.#errorCode = errorCode;
    }

    get errorCode(): number {
        return this.#errorCode;
    };
};