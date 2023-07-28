import winston, { format } from 'winston';

const { combine, colorize, simple } = format;

export enum LogLevel {
  error = 'error',
  warn = 'warn',
  info = 'info',
  debug = 'debug',
}

/*
 * Abstract overridable class for logger
 */
export abstract class ILogger {
  constructor(protected readonly maxLevel: LogLevel = LogLevel.debug) { }

  debug = (message: unknown) => this.log(message, LogLevel.debug);
  info = (message: unknown) => this.log(message, LogLevel.info);
  warn = (message: unknown) => this.log(message, LogLevel.warn);
  error = (message: unknown) => this.log(message, LogLevel.error);

  log = (message: unknown, level: LogLevel) =>
    this._log(message, level);

  protected abstract _log(message: unknown, level: LogLevel): void;
}

/*
 * Default Implementation of ILogger streaming logs to console
 */
export class ConsoleLogger extends ILogger {
  private logger = winston.createLogger({
    level: this.maxLevel,
    format: combine(
      colorize(),
      simple()
    ),
    transports:
      new winston.transports.Console(),
  });

  _log(message: unknown, level: LogLevel) {
    this.logger[level](message);
  };
}
