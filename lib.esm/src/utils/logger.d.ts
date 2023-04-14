export declare enum LogLevel {
    debug = 1,
    info = 2,
    warn = 3,
    error = 4
}
export declare abstract class ILogger {
    protected readonly _logLevel: LogLevel;
    constructor(_logLevel?: LogLevel);
    debug: (message: unknown) => false | void;
    info: (message: unknown) => false | void;
    warn: (message: unknown) => false | void;
    error: (message: unknown) => false | void;
    log: (message: unknown, level: LogLevel) => false | void;
    protected abstract _log(message: unknown, level: LogLevel): void;
}
export declare class ConsoleLogger extends ILogger {
    _log: (message: unknown, level: LogLevel) => void;
}
