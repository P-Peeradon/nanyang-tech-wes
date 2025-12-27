import type { Offer } from "./offer.js";

export class Timetable implements ITimetable {
    private _studentId!: string;
    private _option!: number;
    private _academicYear: number;
    private _semester: number;
    private _indices?: Offer[];

    constructor (studentId: string, option: number, academicYear: number, semester: number, indices?: Offer[]) {
        this._studentId = studentId;
        this._option = option;
        this._academicYear = academicYear;
        this._semester = semester;
        this._indices = indices ?? [];
    }

    get studentId(): string {
        return this._studentId;
    };

    get option(): number {
        return this._option
    }

    get academicYear(): number {
        return this._academicYear;
    };

    get semester(): number {
        return this._semester;
    };

    get indices(): Offer[] {
        return this._indices ?? [];
    };
};

export interface ITimetable {
    readonly studentId: string;
    readonly option: number;
    readonly academicYear: number;
    readonly semester: number;
    readonly indices: Offer[];
};