# Logging

The iam-client-library default logger streams logs to console. 
You can change default logger to custom by calling [setLogger(customLogger)](https://github.com/energywebfoundation/iam-client-lib/blob/develop/src/config/logger.config.ts) function during initialization.

customLogger must derive from the [ILogger](https://github.com/energywebfoundation/iam-client-lib/blob/develop/src/utils/logger.ts) abstract class and implment abstract function: 

```
protected abstract _log(message: unknown, level: LogLevel): void;

```

Example implementation can be found here: [ConsoleLogger](https://github.com/energywebfoundation/iam-client-lib/blob/develop/src/utils/logger.ts)