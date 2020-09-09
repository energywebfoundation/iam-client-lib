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

import Web3 from 'web3';
import { EnrolmentFormData } from './models/enrolment-form-data';

/**
 * Decentralized Identity and Access Management (IAM) Type
 */
export class IAM {
    private _web3: (Web3 | undefined);
    private _contractAddress: (string | undefined);
    private _did: any;

    /**
     * IAM Constructor
     * 
     * @param web3 Web3 object
     * @param address Smart Contract Address
     */
    public constructor(web3: Web3, address?: string) {
        this._web3              = web3;

        // If contract address is not provided, use default (as may be provided in a config file)
        this._contractAddress   = address ? address.trim() : address;
    }

    // TODO:
    // Below should contain public and private methods related to IAM.
    // Currently, below methods are dummy methods.

    hello() {
        console.log('hello');
    }

    async getOrgRoles(orgKey: string): Promise<Array<Object>> {

        // TODO: Retrieve roles based on organization key

        return [];
    }

    async isLoggedIn(): Promise<boolean> {
        let isLoggedIn = false; 

        // TODO: Check if user is logged in

        return isLoggedIn; // TODO: Should return a promise
    }

    async login(orgKey: string, appId: string): Promise<Object> {
        let userData = new Object();

        // TODO: Login here and retrieve user data including roles

        return userData;
    }

    async enrol(data: EnrolmentFormData): Promise<Object> {
        let enrolmentStatus = new Object();

        // TODO: Enrol here (Generate DID, etc)

        return enrolmentStatus;
    }

    async getEnrolmentstatus(): Promise<Object> {
        let enrolmentStatus = new Object();

        // TODO: Get Enrolment Status here

        return enrolmentStatus;
    }

    private generateDID() {

    }

    public getIdentities() {

    }
}