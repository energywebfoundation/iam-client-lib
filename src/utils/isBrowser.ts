export const isBrowser = (processObj: processProps = process) =>
  typeof processObj === "undefined" || processObj.release?.name.search(/node|io.js/) === -1;

interface processProps {
    release?: {
        name: string
    }
}
