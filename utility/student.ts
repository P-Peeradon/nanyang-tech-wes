export class Student {
    #studentId!: string;
    #firstName: string;
    #lastName: string;
    #program: string;
    #yearOfStudy: number;

    constructor(studentId: string, firstName: string, lastName: string, program?: string, yearOfStudy?: number) {
        this.#studentId = studentId;
        this.#firstName = firstName;
        this.#lastName = lastName;
        this.#program = program ?? 'Unknown';
        this.#yearOfStudy = yearOfStudy ?? 1;
    };

    get firstName(): string {
        return this.#firstName;
    };

    get lastName(): string {
        return this.#lastName;
    };

    get studentId(): string {
        return this.#studentId;
    };

    get program(): string{
        return this.#program;
    };

    get fullName(): string {
        return `${this.#firstName} ${this.#lastName}`; // Computed
    };

    get yearOfStudy(): number {
        return this.#yearOfStudy;
    };

    get email(): string {
        return `${this.#firstName[0]?.toLowerCase()}${this.#lastName.substring(0,3)?.toLowerCase()}.${this.#studentId?.substring(1,8)}@student.ntu.edu.sg`; // Computed
    };

    set firstName(newFirstName: string) {
        this.#firstName = newFirstName;
    };

    set lastName(newLastName: string) {
        this.#lastName = newLastName;
    };

    set studentId(newStudentId: string)  {
        this.#studentId = newStudentId;
    };

    set program(newProgram: string) {
        this.#program = newProgram;
    };
};
