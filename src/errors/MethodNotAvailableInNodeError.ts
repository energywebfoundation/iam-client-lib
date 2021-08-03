export class MethodNotAvailableInNodeEnvError extends Error {
    constructor(methodName: string) {
        super(`Method ${methodName} not supported in Node.js env`);
    }
}
