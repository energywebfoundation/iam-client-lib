import { detectExecutionEnvironment, ExecutionEnvironment } from "../../src/utils/detectEnvironment";

describe("Execution environment tests", () => {
    it("tests are running in browser env", () => {
        expect(detectExecutionEnvironment()).toBe(ExecutionEnvironment.BROWSER);
    });
});
