import winston from 'winston';

export class Logger {
  private winston: winston.Logger;
  requestId: string = '';
  client?: string;

  constructor() {
    this.winston = winston.createLogger({
      level: 'info',
      format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
      transports: [new winston.transports.Console()],
    });
  }

  private updateDefaultMeta() {
    this.winston.defaultMeta = {
      requestId: this.requestId,
      client: this.client,
    };
  }

  setRequestId(requestId?: string) {
    if (requestId) {
      this.requestId = requestId;
      this.updateDefaultMeta();
    }
  }

  setClient(client?: string) {
    this.client = client;
    this.updateDefaultMeta();
  }

  info(message: string, meta?: object) {
    this.winston.info(message, meta);
  }

  error(message: string, meta?: object) {
    this.winston.error(message, meta);
  }

  warn(message: string, meta?: object) {
    this.winston.warn(message, meta);
  }
}
