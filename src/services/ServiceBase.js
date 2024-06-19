import { LoggingService } from "./LoggingService";

export class ServiceBase {
  constructor() {
    this._logger = new LoggingService().logger;
  }
}