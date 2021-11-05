import { IRoleDefinition } from "@energyweb/iam-contracts";
import { ERROR_MESSAGES } from "../errors";
import { buildRegex } from "../utils/regex_builder";
import Ajv from "ajv";
export const REQUIRED_PARAMS_FIELD_NAME = "requiredParams";
const requiredParamsSchema = {
    type: "object",
    additionalProperties: true,
    properties: {
        [REQUIRED_PARAMS_FIELD_NAME]: {
            type: "array",
            uniqueItems: true,
            items: {
                type: "object",
                required: ["name"],
                properties: {
                    name: { type: "string" },
                    pattern: { type: "string" },
                    description: { type: "string" },
                },
            },
        },
    },
};

const ajv = new Ajv();
const validate = ajv.compile(requiredParamsSchema);

export type RoleRequiredParamSchema = {
    name: string;
    pattern?: string;
    description: string;
};

export function validateRequiredParamsDefinition(roleDefinition: IRoleDefinition) {
    if (!(REQUIRED_PARAMS_FIELD_NAME in roleDefinition?.metadata)) return;

    const valid = validate(roleDefinition.metadata);
    if (!valid) throw new Error(ERROR_MESSAGES.ROLE_REQUIRED_PARAMS_DEFINITION_INVALID);
}

export function varifyRequiredParams({
    claimParams,
    roleDefinition,
}: {
    claimParams: Record<string, string> | undefined;
    roleDefinition: IRoleDefinition;
}) {
    if (!roleDefinition) {
        throw new Error(ERROR_MESSAGES.ROLE_NOT_EXISTS);
    }
    if (roleDefinition.metadata && REQUIRED_PARAMS_FIELD_NAME in roleDefinition.metadata) {
        const requiredParams = roleDefinition.metadata[REQUIRED_PARAMS_FIELD_NAME] as RoleRequiredParamSchema[];
        requiredParams.forEach((p) => {
            const testRegex = buildRegex(p.pattern);
            const paramValue = (claimParams && claimParams[p.name]) || "";
            if (!!testRegex && !testRegex.test(paramValue)) {
                throw new Error(ERROR_MESSAGES.ROLE_PREREQUISITES_REQUIRED_PARAM_INVALID);
            }
        });
    }
}
