// class description with a code, type and the description itself

export class Description {
    // Properties
    private readonly code: string; // Code
    private readonly type: string; // Type
    private readonly description: string; // Description
  
    // Constructor
    constructor(parameters: {
      code: string;
      type: string;
      description: string;
    }) {
      this.code = parameters.code;
      this.type = parameters.type;
      this.description = parameters.description;
    }
  
    // Accessor methods
    getCode(): string {
      return this.code;
    }
  
    getType(): string {
      return this.type;
    }
  
    getDescription(): string {
      return this.description;
    }
}