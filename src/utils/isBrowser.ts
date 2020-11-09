export const isBrowser = () =>
  typeof process !== "undefined" && process.release?.name.search(/node|io.js/) !== -1;
