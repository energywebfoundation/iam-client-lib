/**
 * Though the process variable can be redefined, this approach is suitable for now.
 * 
 * Another option is to use new Function() constructor so the execution scope of this is binded to the global scope.
 * However, this fails if Content-Security-Policy (CSP) script-src does not allow 'unsafe-eval'.
 */
export const isBrowser = () =>
  typeof process === "undefined" || process.release?.name.search(/node|io.js/) === -1;
