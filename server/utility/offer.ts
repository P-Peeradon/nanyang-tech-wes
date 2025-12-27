export class Offer implements IOffer{
    private _courseCode!: string;
    private _section!: number;
    private _dayOfWeek: string;
    private _timeStart: Date;
    private _timeEnd: Date;
    private _capacity: number;

    constructor ( 
        courseCode: string, 
        section: number, 
        dayOfWeek: string, 
        timeStart: Date, 
        timeEnd: Date,
        capacity: number
    ) {
        this._courseCode = courseCode;
        this._section = section;
        this._dayOfWeek = dayOfWeek;
        this._timeStart = timeStart;
        this._timeEnd = timeEnd;
        this._capacity = capacity;
    };

    get courseCode(): string {
        return this._courseCode;
    };

    get section(): number {
        return this._section;
    };

    get dayOfWeek(): string {
        return this._dayOfWeek;
    };
    
    get timeStart(): Date {
        return this._timeStart;
    };

    get formattedTimeStart(): string {
        return this._timeStart.toLocaleTimeString([], {
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: false,
            timeZone: 'Asia/Singapore'
        });
    };

    get timeEnd(): Date {
        return this._timeEnd;
    };

    get formattedTimeEnd(): string {
        return this._timeEnd.toLocaleTimeString([], {
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: false,
            timeZone: 'Asia/Singapore'
        });
    };

    get duration(): number {
        const timeDiff = (this._timeEnd.getTime() - this._timeStart.getTime())/3600000;
        return Math.round(timeDiff * 10) / 10; // Math.round() convert to integer.
    };

    get capacity(): number {
        return this._capacity
    };

    set dayOfWeek(newDayOfWeek: string) {
        this._dayOfWeek = newDayOfWeek;
    };

    set timeStart(newTimeStart: Date) {
        this._timeStart = newTimeStart;
    };

    set capacity(newCapacity: number) {
        this._capacity = newCapacity;
    };

    public isClash(other: Offer): boolean {
        return this._timeStart < other.timeEnd && this._timeEnd > other.timeStart;
    };

    public toJSON(): object {
        return {
            courseCode: this._courseCode,
            section: this._section
        };
    };
}

export interface IOffer {
    readonly courseCode: string;
    readonly section: number;
    dayOfWeek: string;
    timeStart: Date;
    readonly formattedTimeStart: string;
    timeEnd: Date;
    readonly formattedTimeEnd: string;
    readonly duration: number;
    capacity: number;
    isClash(other: Offer): boolean;
    toJSON(): object;
}