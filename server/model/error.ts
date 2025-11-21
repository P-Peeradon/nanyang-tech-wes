export class HttpError extends Error {
    #errorCode: number;

    constructor(message: string, errorCode?: number) {
        super(message);
        this.#errorCode = errorCode ?? 500;
    }

    get errorCode(): number {
        return this.#errorCode;
    };
};