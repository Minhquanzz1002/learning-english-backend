export class BaseError extends Error {
  status: number;
  timestamp: Date;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.timestamp = new Date();
    Object.setPrototypeOf(this, BaseError.prototype);
  }
}