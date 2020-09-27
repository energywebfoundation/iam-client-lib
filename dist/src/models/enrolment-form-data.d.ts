export declare class EnrolmentFormData {
    orgKey: (string | undefined);
    appId: (string | undefined);
    roleId: (string | undefined);
    firstName: (string | undefined);
    lastName: (string | undefined);
    meteringId: (string | undefined);
    emailAddress: (string | undefined);
    constructor(orgKey: string, appId: string, roleId: string, firstName: string, lastName: string, meteringId: string, emailAddress: string);
    private isValidFormData;
}
