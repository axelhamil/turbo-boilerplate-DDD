export interface IDomainException {
  statusCode: number;
  message: string[];
  error: string;
}

export class DomainError extends Error {
  constructor(
    public readonly message = 'Domain Error',
    private readonly status = 406,
  ) {
    super(message);
    Object.setPrototypeOf(this, DomainError.prototype);
  }
  
  getStatus(): number {
    return this.status;
  }
  
  getResponse(): IDomainException {
    return {
      error: 'Domain Error',
      message: [this.message],
      statusCode: this.status,
    };
  }
}
