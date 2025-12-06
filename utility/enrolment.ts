export class Enrolment {
    private _studentId!: string;
    private _courseCode!: string;
    // #status: any;
    private _year: number;
    private _semester: number;
    private _timestamp: Date;
    private _remark?: string | undefined;

    constructor(studentId: string, courseCode: string, year?: number, semester?: number, remark?: string) {
        this._studentId = studentId;
        this._courseCode = courseCode;
        this._year = year ?? 1965;
        this._semester = semester ?? 1;
        this._timestamp = new Date();
        this._remark = remark;
    };

    get studentId(): string {
        return this._studentId;
    };

    get courseCode(): string {
        return this._courseCode;
    };

    get year(): number {
        return this._year;
    };

    get semester(): number {
        return this._semester;
    };

    get remark(): string {
        return this._remark ?? '';
    };

}