export class Student {
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

    get firstName(): string {
        return this._firstName;
    };

    get lastName(): string {
        return this._lastName;
    };

    get studentId(): string {
        return this._studentId;
    };

    get program(): string{
        return this._program;
    };

    get fullName(): string {
        return `${this._firstName} ${this._lastName}`; // Computed
    };

    get yearOfStudy(): number {
        return this._yearOfStudy;
    };

    get email(): string {
        return `${this._firstName[0]?.toLowerCase()}${this._lastName.substring(0,3)?.toLowerCase()}.${this._studentId?.substring(1,8)}@student.ntu.edu.sg`; // Computed
    };

    set firstName(newFirstName: string) {
        this._firstName = newFirstName;
    };

    set lastName(newLastName: string) {
        this._lastName = newLastName;
    };

    set studentId(newStudentId: string)  {
        this._studentId = newStudentId;
    };

    set program(newProgram: string) {
        this._program = newProgram;
    };
};
