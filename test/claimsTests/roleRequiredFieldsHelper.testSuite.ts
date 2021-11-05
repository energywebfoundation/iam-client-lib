import { IRoleDefinition } from "@energyweb/iam-contracts";
import { validateRequiredParamsDefinition, varifyRequiredParams } from "../../src/iam/roleRequiredFieldsHelper";

export function roleRequiredFieldsHelperTest() {
    it("required params - validateRequiredParamsDefinition should throw error if schema incorrect", () => {
        const roleDefinition = {
            metadata: {
                requiredParams: "incorrect param",
            },
        } as unknown as IRoleDefinition;
        expect(() => validateRequiredParamsDefinition(roleDefinition)).toThrow(
            "Required params definition is not valid",
        );
    });

    it("required params - validateRequiredParamsDefinition should accept correct schema", () => {
        const roleDefinition = {
            metadata: {
                requiredParams: [
                    {
                        name: "param1",
                        pattern: "^[ABC]{1,20}$",
                        description: "this is one of required fields",
                    },
                    {
                        name: "param2",
                        pattern: "^[ABC]{0,20}$",
                        description: "this is optional field",
                    },
                    {
                        name: "param3", // another optional field without description
                    },
                ],
            },
        } as unknown as IRoleDefinition;
        try {
            validateRequiredParamsDefinition(roleDefinition);
        } catch (ex) {
            fail("should not throw any error");
        }
    });

    it("required params - varifyRequiredParams should not throw error on any", () => {
        const roleDefinition = {
            metadata: {
                requiredParams: [
                    {
                        name: "param1",
                        pattern: "^[A-Za-z]{1,20}$",
                        description: "this is one of required fields",
                    },
                    {
                        name: "param2",
                        pattern: "^[A-Za-z]{1,20}$",
                        description: "this is another required field",
                    },
                ],
            },
        } as unknown as IRoleDefinition;

        const claimParams = {
            param1: "correctValue",
            param2: "OtherCorrectValue",
            param3: "some arbitrary value",
        };
        try {
            varifyRequiredParams({ claimParams, roleDefinition });
        } catch (ex) {
            fail("should not throw any error");
        }
    });

    it("required params - varifyRequiredParams should throw error if required params not provided", () => {
        const roleDefinition = {
            metadata: {
                requiredParams: [
                    {
                        name: "param1",
                        pattern: "^[ABC]{1,20}$",
                        description: "this is one of required fields",
                    },
                ],
            },
        } as unknown as IRoleDefinition;

        const claimParams = {
            param3: "some arbitrary value",
        };
        expect(() => varifyRequiredParams({ claimParams, roleDefinition })).toThrow(
            "Required Param for enrolment subject not provided",
        );
    });

    it("required params - varifyRequiredParams should throw error if required params format invalid", () => {
        const roleDefinition = {
            metadata: {
                requiredParams: [
                    {
                        name: "param1",
                        pattern: "^[ABC]{1,20}$",
                        description: "this is one of required fields",
                    },
                ],
            },
        } as unknown as IRoleDefinition;

        const claimParams = {
            param1: "invalid123value",
        };

        expect(() => varifyRequiredParams({ claimParams, roleDefinition })).toThrow(
            "Required Param for enrolment subject not provided",
        );
    });
}
