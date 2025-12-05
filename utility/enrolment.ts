export class Enrolment {
    #studentId!: string;
    #courseCode!: string;
    // #status: any;
    #year: number;
    #semester: number;
    #timestamp: Date;
    #remark?: string | undefined;

    constructor(studentId: string, courseCode: string, year?: number, semester?: number, remark?: string) {
        this.#studentId = studentId;
        this.#courseCode = courseCode;
        this.#year = year ?? 1965;
        this.#semester = semester ?? 1;
        this.#timestamp = new Date();
        this.#remark = remark;
    };

    get studentId(): string {
        return this.#studentId;
    };

    get courseCode(): string {
        return this.#courseCode;
    };

    get year(): number {
        return this.#year;
    };

    get semester(): number {
        return this.#semester;
    };

    get remark(): string {
        return this.#remark ?? '';
    };

}