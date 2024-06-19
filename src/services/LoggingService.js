import pino from 'pino';

export class LoggingService {
  constructor() {
    this._logger = pino({
      browser: {
        asObject: false,
      },
      level: import.meta.env.VITE_LOG_LEVEL || 'error',
    });
  }

  get logger() {
    return this._logger;
  }
}