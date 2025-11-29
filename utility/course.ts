export class Course {
    #code: string;
    #title: string;
    #au: number;

    constructor(code: string, title: string, au: number) {
        this.#code = code;
        this.#title = title;
        this.#au = au;
    }

    get code() {
        return this.#code
    }

    get title() {
        return this.#title
    }

    get au() {
        return this.#au
    }
}