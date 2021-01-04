/**
 * isBrowser creates a new function using a new Function() constructor.
 * This is so the execution scope of this is binded to the global scope.
 * We can compare the global scope directly to the expected value of "window".
 * An alternative approach of checking a javascript variable (e.g. window or process)
 * is fallible because javascript variables can be redefined by inner scopes.
 */
export const isBrowser = new Function("try {return this===window;} catch(e) {return false;}");
