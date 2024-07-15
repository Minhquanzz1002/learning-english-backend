import { BaseError } from './BaseError';

export class AuthorizationError extends BaseError {
  constructor(message: string) {
    super(message, 401);
    Object.setPrototypeOf(this, AuthorizationError.prototype);
  }
}