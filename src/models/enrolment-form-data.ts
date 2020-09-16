// Copyright 2020 Energy Web Foundation
// This file is part of IAM Client Library brought to you by the Energy Web Foundation,
// a global non-profit organization focused on accelerating blockchain technology across the energy sector,
// incorporated in Zug, Switzerland.
//
// The IAM Client Library is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// This is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY and without an implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details, at <http://www.gnu.org/licenses/>.
//
// @authors: Kim Honoridez

/**
 * Data model to be used upon enrolment of new user
 */
export class EnrolmentFormData {
    orgKey: (string | undefined);
    appId: (string | undefined);
    roleId: (string | undefined);
    firstName: (string | undefined);
    lastName: (string | undefined);
    meteringId: (string | undefined);
    emailAddress: (string | undefined);

    constructor(orgKey: string,
        appId: string,
        roleId: string,
        firstName: string,
        lastName: string,
        meteringId: string,
        emailAddress: string) {
            // Trim Form Data
            orgKey          = orgKey ? orgKey.trim() : orgKey;
            appId           = appId ? appId.trim() : appId;
            roleId          = roleId ? roleId.trim() : roleId;
            firstName       = firstName ? firstName.trim() : firstName;
            lastName        = lastName ? lastName.trim() : lastName;
            meteringId      = meteringId ? meteringId.trim() : meteringId;
            emailAddress    = emailAddress ? emailAddress.trim() : emailAddress;

            // Check Validity
            if (!this.isValidFormData(orgKey, appId, roleId, firstName, lastName, meteringId, emailAddress)) {
                throw new Error("[IAM] Enrolment Form Data must not contain empty field.");
            }

            // Set Values
            this.orgKey         = orgKey;
            this.appId          = appId;
            this.roleId         = roleId;
            this.firstName      = firstName;
            this.lastName       = lastName;
            this.meteringId     = meteringId;
            this.emailAddress   = emailAddress;
    }

    /**
     * Checks the validity of the Enrolment Form Data
     *
     * @param orgKey Organization's unique identifier
     * @param appId Application ID under the orgKey
     * @param roleId Role ID
     * @param firstName First Name
     * @param lastName Last Name
     * @param meteringId Metering ID
     * @param emailAddress Email Address
     *
     * @returns true | false
     */
    private isValidFormData(orgKey: string,
        appId: string,
        roleId: string,
        firstName: string,
        lastName: string,
        meteringId: string,
        emailAddress: string): boolean {
            let isValidFormData = true;

            // Check if one of the fields is empty
            if (!orgKey || !appId || !roleId || !firstName || !lastName || !meteringId || !emailAddress) {
                isValidFormData = false;
            }

            return isValidFormData;
    }
}
