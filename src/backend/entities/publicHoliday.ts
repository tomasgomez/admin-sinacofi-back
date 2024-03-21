export class PublicHoliday {
    // Properties
    private readonly code: string; // Code
    private readonly year: number; // Year
    private readonly month: number; // Month
    private readonly day: number; // Day
    private readonly user: string; // User
    private readonly entryDate: string; // Entry Date
    private readonly description: string; // Description
  
    // Constructor
    constructor(parameters: {
      code: string;
      year: number;
      month: number;
      day: number;
      user: string;
      entryDate: string;
      description: string;
    }) {
      this.code = parameters.code;
      this.year = parameters.year;
      this.month = parameters.month;
      this.day = parameters.day;
      this.user = parameters.user;
      this.entryDate = parameters.entryDate;
      this.description = parameters.description;
    }
  
    // Accessor methods
    getCode(): string {
      return this.code;
    }
  
    getYear(): number {
      return this.year;
    }
  
    getMonth(): number {
      return this.month;
    }
  
    getDay(): number {
      return this.day;
    }
  
    getUser(): string {
      return this.user;
    }
  
    getEntryDate(): string {
      return this.entryDate;
    }
  
    getDescription(): string {
      return this.description;
    }
  }
  