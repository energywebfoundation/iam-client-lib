import { ILogger } from '../utils';
/**
 * Used to override existing console logger with custom logger of any type implementing required ILogger interface
 * Configuration must be set before constructing `IAM`
 */
export declare const setLogger: (newLogger: ILogger) => ILogger;
/**
 *
 * Returns currently set up logger. Console Logger By default
 * @returns logger
 */
export declare const getLogger: () => ILogger;
