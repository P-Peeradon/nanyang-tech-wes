export class Course {
    #code: string;
    #title: string;
    #au: number;
    #prerequisite: Array<string>;

    constructor(code: string, title: string, au: number, prerequisite?: Array<string>) {
        this.#code = code;
        this.#title = title;
        this.#au = au;
        this.#prerequisite = prerequisite ?? [];
    }

    get code() {
        return this.#code;
    };

    get title() {
        return this.#title;
    };

    get au() {
        return this.#au;
    };

    get prerequisite() {
        return this.#prerequisite;
    };

    set title(newTitle: string) {
        this.#title = newTitle;
    }

    set prerequisite(newPrerequisite: Array<string>) {
        this.#prerequisite = newPrerequisite;
    };

    addNewPrereq(prereqCode: string) {
        if (!this.prerequisite.includes(prereqCode)) {
            this.prerequisite.push(prereqCode);
        } 
    };
}