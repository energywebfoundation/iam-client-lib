export class InterfaceNotSatisfied extends Error {
  constructor(interf: string, reason: string) {
    super(`Interface ${interf} is not satisfied: ${reason}`);
  }
}
