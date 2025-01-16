import { wait } from "@utils/helper.js";

export class PollingService {
  constructor(fn, ms = import.meta.env.VITE_POLLING_INTERVAL) {
    this.fn = fn;
    this.ms = ms;
    this.polling = false;
  }

  async start() {
    this.polling = true
    while (this.polling) {
      await this.fn();
      await wait(this.ms);
    }
  }

  stop() {
    this.polling = false;
  }
    
}