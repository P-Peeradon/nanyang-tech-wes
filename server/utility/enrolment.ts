export class Enrolment implements IEnrolment {
    private _studentId!: string;
    private _courseCode!: string;
    // _status: any;
    private _year: number;
    private _semester: number;
    private _remark?: string | undefined;

    constructor(studentId: string, courseCode: string, year?: number, semester?: number, remark?: string) {
        this._studentId = studentId;
        this._courseCode = courseCode;
        this._year = year ?? 1965;
        this._semester = semester ?? 1;
        this._remark = remark;
    };

    public get studentId(): string {
        return this._studentId;
    };

    public get courseCode(): string {
        return this._courseCode;
    };

    public get year(): number {
        return this._year;
    };

    public get semester(): number {
        return this._semester;
    };

    public get remark(): string {
        return this._remark ?? '';
    };

    public toJSON(): object {
        return {
            studentId: this._studentId,
            courseCode: this._courseCode,
            year: this._year,
            semester: this._semester,
            remark: this._remark,
        }
    };

}

export interface IEnrolment {
    readonly studentId: string;
    readonly courseCode: string;
    // status: any;
    readonly year: number;
    readonly semester: number;
    readonly remark?: string;
    toJSON(): object;
}