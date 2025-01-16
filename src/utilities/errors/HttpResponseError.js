export class HttpResponseError extends Error {
  constructor(message, response) {
    super(message);
    this.response = response;
  }
}