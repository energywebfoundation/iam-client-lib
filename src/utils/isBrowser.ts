export const isBrowser = () =>
  typeof process?.release?.name === "undefined" || process.release.name.search(/node|io.js/) === -1;
