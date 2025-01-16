export class SessionExpiredError extends Error {
  constructor() {
    super('Session has expired');
    this.name = 'SessionExpiredError';
  }
}