// File size limit

export class FileSizeLimit {
    // Properties
    private readonly ftCode: string; // Code
    private readonly name: string; // Name
    private readonly size: number; // Size
    private readonly date: string; // Date
    private readonly time: string; // Time
    private readonly user: string; // User
    private readonly institutionCode: string; // Institution Code

    // Constructor
    constructor(parameters: {
        ftCode: string;
        name: string;
        size: number;
        date: string;
        time: string;
        user: string;
        institutionCode: string;
    }) {
        this.ftCode = parameters.ftCode;
        this.name = parameters.name;
        this.size = parameters.size;
        this.date = parameters.date;
        this.time = parameters.time;
        this.user = parameters.user;
        this.institutionCode = parameters.institutionCode;
    }

    // Accessor methods
    getFtCode(): string {
        return this.ftCode;
    }

    getName(): string {
        return this.name;
    }

    getSize(): number {
        return this.size;
    }

    getDate(): string {
        return this.date;
    }

    getTime(): string {
        return this.time;
    }

    getUser(): string {
        return this.user;
    }
}