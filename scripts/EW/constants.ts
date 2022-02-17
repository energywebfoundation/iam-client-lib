import { EWC_CHAIN_ID } from '@energyweb/iam-contracts';
import { Wallet } from 'ethers';
import { chainConfigs } from '../../src';

export const CHAIN_ID = EWC_CHAIN_ID;
const chain = chainConfigs()[CHAIN_ID].chainName;

export const ENERGYWEB = 'energyweb';
export const AUTH_EWC = 'auth.ewc';

export const ewOwnerKey = '';
export const ENERGYWEB_OWNER = `did:ethr:${chain}:${
  new Wallet(ewOwnerKey).address
}`;
export const ENERGYWEB_RECEIVER = `did:ethr:${chain}:0xEa2339592A0BFD53763038aD59679322A7A817E0`;
export const KYC_OWNER = `did:ethr:${chain}:0x246bDCF1e4f41FC639959FfAC135c77d9844750d`;
