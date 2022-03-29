export enum LogLevel {
  debug = 1,
  info = 2,
  warn = 3,
  error = 4,
}

/*
 * Abstract overridable class for logger
 */
export abstract class ILogger {
  constructor(protected readonly _logLevel: LogLevel = LogLevel.debug) {}

  debug = (message: unknown) => this.log(message, LogLevel.debug);
  info = (message: unknown) => this.log(message, LogLevel.info);
  warn = (message: unknown) => this.log(message, LogLevel.warn);
  error = (message: unknown) => this.log(message, LogLevel.error);

  log = (message: unknown, level: LogLevel) =>
    this._logLevel <= level && this._log(message, level);

  protected abstract _log(message: unknown, level: LogLevel): void;
}

/*
 * Default Implementation of ILogger streaming logs to console
 */
export class ConsoleLogger extends ILogger {
  _log = (message: unknown, level: LogLevel) => {
    switch (level) {
      case LogLevel.debug:
        console.debug(message);
        break;
      case LogLevel.info:
        console.log(message);
        break;
      case LogLevel.warn:
        console.warn(message);
        break;
      case LogLevel.error:
      default:
        console.error(message);
        break;
    }
  };
}
