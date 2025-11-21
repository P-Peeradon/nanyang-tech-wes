export class Student {
    #firstName: string;
    #lastName: string;
    #studentId: string;
    #enrolmentList: Array<object>;

    constructor(firstName: string, lastName: string, studentId: string) {
        this.#firstName = firstName ?? '';
        this.#lastName = lastName ?? '';
        this.#studentId = studentId ?? 'U0000000X';
        this.#enrolmentList = [];
    }

    get firstName(): string {
        return this.#firstName;
    };

    get lastName(): string {
        return this.#lastName;
    }

    get studentId(): string {
        return this.#studentId;
    }

    get enrolmentList(): Array<object>{
        return this.#enrolmentList;
    }

    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    };

    get email(): string {
        return `${this.firstName[0]?.toLowerCase()}${this.lastName.substring(0,3)?.toLowerCase()}.${this.studentId?.substring(1,8)}@student.ntu.edu.sg`;
    };

    set firstName(newFirstName: string) {
        this.#firstName = newFirstName;
    }

    set lastName(newLastName: string) {
        this.#lastName = newLastName;
    }
};