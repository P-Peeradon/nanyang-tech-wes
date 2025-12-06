export class Course {
    private _code!: string;
    private _title: string;
    private _au: number;
    private _prerequisite: Array<string>;

    constructor(code: string, title: string, au: number, prerequisite?: Array<string>) {
        this._code = code;
        this._title = title;
        this._au = au;
        this._prerequisite = prerequisite ?? [];
    };

    get code(): string {
        return this._code;
    }

    get title(): string  {
        return this._title;
    };

    get au(): number {
        return this._au;
    };

    get prerequisite() {
        return this._prerequisite;
    };

    set title(newTitle: string) {
        this._title = newTitle;
    }

    set prerequisite(newPrerequisite: Array<string>) {
        this._prerequisite = newPrerequisite;
    };

    addNewPrereq(prereqCode: string) {
        if (!this.prerequisite.includes(prereqCode)) {
            this.prerequisite.push(prereqCode);
        } 
    };
}