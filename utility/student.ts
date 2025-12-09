export class Student implements IStudent{
    private _studentId!: string;
    private _firstName: string;
    private _lastName: string;
    private _program: string;
    private _yearOfStudy: number;

    constructor(studentId: string, firstName: string, lastName: string, program?: string, yearOfStudy?: number) {
        this._studentId = studentId;
        this._firstName = firstName;
        this._lastName = lastName;
        this._program = program ?? 'Unknown';
        this._yearOfStudy = yearOfStudy ?? 1;
    };

    public get firstName(): string {
        return this._firstName;
    };

    public get lastName(): string {
        return this._lastName;
    };

    public get studentId(): string {
        return this._studentId;
    };

    public get program(): string{
        return this._program;
    };

    public get fullName(): string {
        return `${this._firstName} ${this._lastName}`; // Computed
    };

    public get yearOfStudy(): number {
        return this._yearOfStudy;
    };

    public get email(): string {
        return `${this._firstName[0]?.toLowerCase()}${this._lastName.substring(0,3)?.toLowerCase()}.${this._studentId?.substring(1,8)}@student.ntu.edu.sg`; // Computed
    };

    public set firstName(newFirstName: string) {
        this._firstName = newFirstName;
    };

    public set lastName(newLastName: string) {
        this._lastName = newLastName;
    };

    public set program(newProgram: string) {
        this._program = newProgram;
    };
};

export interface IStudent {
    readonly studentId: string;
    firstName: string;
    lastName: string;
    program: string;
    readonly yearOfStudy: number;
}