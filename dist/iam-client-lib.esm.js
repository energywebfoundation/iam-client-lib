import { __extends, __awaiter, __generator, __read, __rest, __assign, __values, __spread } from 'tslib';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { Contract, ContractFactory, providers, utils } from 'ethers';
import { Resolver, Operator, abi1056, address1056 } from '@ew-did-registry/did-ethr-resolver';
import { abi } from '@ensdomains/resolver/build/contracts/PublicResolver.json';
import { ProviderTypes } from '@ew-did-registry/did-resolver-interface';
export { Algorithms, DIDAttribute, Encoding, PubKeyType } from '@ew-did-registry/did-resolver-interface';
import { Methods } from '@ew-did-registry/did';
import { DIDDocumentFull } from '@ew-did-registry/did-document';
import { ClaimsUser, ClaimsIssuer, ClaimsVerifier } from '@ew-did-registry/claims';
import { DidStore } from '@ew-did-registry/did-ipfs-store';
import { normalize } from 'eth-ens-namehash';
import { JWT } from '@ew-did-registry/jwt';

var EnsRegistryFactory = function (_super) {
  __extends(EnsRegistryFactory, _super);

  function EnsRegistryFactory(signer) {
    return _super.call(this, _abi, _bytecode, signer) || this;
  }

  EnsRegistryFactory.prototype.deploy = function (overrides) {
    return _super.prototype.deploy.call(this, overrides);
  };

  EnsRegistryFactory.prototype.getDeployTransaction = function (overrides) {
    return _super.prototype.getDeployTransaction.call(this, overrides);
  };

  EnsRegistryFactory.prototype.attach = function (address) {
    return _super.prototype.attach.call(this, address);
  };

  EnsRegistryFactory.prototype.connect = function (signer) {
    return _super.prototype.connect.call(this, signer);
  };

  EnsRegistryFactory.connect = function (address, signerOrProvider) {
    return new Contract(address, _abi, signerOrProvider);
  };

  return EnsRegistryFactory;
}(ContractFactory);
var _abi = [{
  inputs: [],
  payable: false,
  stateMutability: "nonpayable",
  type: "constructor"
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    internalType: "address",
    name: "owner",
    type: "address"
  }, {
    indexed: true,
    internalType: "address",
    name: "operator",
    type: "address"
  }, {
    indexed: false,
    internalType: "bool",
    name: "approved",
    type: "bool"
  }],
  name: "ApprovalForAll",
  type: "event"
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    internalType: "bytes32",
    name: "node",
    type: "bytes32"
  }, {
    indexed: true,
    internalType: "bytes32",
    name: "label",
    type: "bytes32"
  }, {
    indexed: false,
    internalType: "address",
    name: "owner",
    type: "address"
  }],
  name: "NewOwner",
  type: "event"
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    internalType: "bytes32",
    name: "node",
    type: "bytes32"
  }, {
    indexed: false,
    internalType: "address",
    name: "resolver",
    type: "address"
  }],
  name: "NewResolver",
  type: "event"
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    internalType: "bytes32",
    name: "node",
    type: "bytes32"
  }, {
    indexed: false,
    internalType: "uint64",
    name: "ttl",
    type: "uint64"
  }],
  name: "NewTTL",
  type: "event"
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    internalType: "bytes32",
    name: "node",
    type: "bytes32"
  }, {
    indexed: false,
    internalType: "address",
    name: "owner",
    type: "address"
  }],
  name: "Transfer",
  type: "event"
}, {
  constant: false,
  inputs: [{
    internalType: "bytes32",
    name: "node",
    type: "bytes32"
  }, {
    internalType: "address",
    name: "owner",
    type: "address"
  }, {
    internalType: "address",
    name: "resolver",
    type: "address"
  }, {
    internalType: "uint64",
    name: "ttl",
    type: "uint64"
  }],
  name: "setRecord",
  outputs: [],
  payable: false,
  stateMutability: "nonpayable",
  type: "function"
}, {
  constant: false,
  inputs: [{
    internalType: "bytes32",
    name: "node",
    type: "bytes32"
  }, {
    internalType: "bytes32",
    name: "label",
    type: "bytes32"
  }, {
    internalType: "address",
    name: "owner",
    type: "address"
  }, {
    internalType: "address",
    name: "resolver",
    type: "address"
  }, {
    internalType: "uint64",
    name: "ttl",
    type: "uint64"
  }],
  name: "setSubnodeRecord",
  outputs: [],
  payable: false,
  stateMutability: "nonpayable",
  type: "function"
}, {
  constant: false,
  inputs: [{
    internalType: "bytes32",
    name: "node",
    type: "bytes32"
  }, {
    internalType: "address",
    name: "owner",
    type: "address"
  }],
  name: "setOwner",
  outputs: [],
  payable: false,
  stateMutability: "nonpayable",
  type: "function"
}, {
  constant: false,
  inputs: [{
    internalType: "bytes32",
    name: "node",
    type: "bytes32"
  }, {
    internalType: "bytes32",
    name: "label",
    type: "bytes32"
  }, {
    internalType: "address",
    name: "owner",
    type: "address"
  }],
  name: "setSubnodeOwner",
  outputs: [{
    internalType: "bytes32",
    name: "",
    type: "bytes32"
  }],
  payable: false,
  stateMutability: "nonpayable",
  type: "function"
}, {
  constant: false,
  inputs: [{
    internalType: "bytes32",
    name: "node",
    type: "bytes32"
  }, {
    internalType: "address",
    name: "resolver",
    type: "address"
  }],
  name: "setResolver",
  outputs: [],
  payable: false,
  stateMutability: "nonpayable",
  type: "function"
}, {
  constant: false,
  inputs: [{
    internalType: "bytes32",
    name: "node",
    type: "bytes32"
  }, {
    internalType: "uint64",
    name: "ttl",
    type: "uint64"
  }],
  name: "setTTL",
  outputs: [],
  payable: false,
  stateMutability: "nonpayable",
  type: "function"
}, {
  constant: false,
  inputs: [{
    internalType: "address",
    name: "operator",
    type: "address"
  }, {
    internalType: "bool",
    name: "approved",
    type: "bool"
  }],
  name: "setApprovalForAll",
  outputs: [],
  payable: false,
  stateMutability: "nonpayable",
  type: "function"
}, {
  constant: true,
  inputs: [{
    internalType: "bytes32",
    name: "node",
    type: "bytes32"
  }],
  name: "owner",
  outputs: [{
    internalType: "address",
    name: "",
    type: "address"
  }],
  payable: false,
  stateMutability: "view",
  type: "function"
}, {
  constant: true,
  inputs: [{
    internalType: "bytes32",
    name: "node",
    type: "bytes32"
  }],
  name: "resolver",
  outputs: [{
    internalType: "address",
    name: "",
    type: "address"
  }],
  payable: false,
  stateMutability: "view",
  type: "function"
}, {
  constant: true,
  inputs: [{
    internalType: "bytes32",
    name: "node",
    type: "bytes32"
  }],
  name: "ttl",
  outputs: [{
    internalType: "uint64",
    name: "",
    type: "uint64"
  }],
  payable: false,
  stateMutability: "view",
  type: "function"
}, {
  constant: true,
  inputs: [{
    internalType: "bytes32",
    name: "node",
    type: "bytes32"
  }],
  name: "recordExists",
  outputs: [{
    internalType: "bool",
    name: "",
    type: "bool"
  }],
  payable: false,
  stateMutability: "view",
  type: "function"
}, {
  constant: true,
  inputs: [{
    internalType: "address",
    name: "owner",
    type: "address"
  }, {
    internalType: "address",
    name: "operator",
    type: "address"
  }],
  name: "isApprovedForAll",
  outputs: [{
    internalType: "bool",
    name: "",
    type: "bool"
  }],
  payable: false,
  stateMutability: "view",
  type: "function"
}];
var _bytecode = "0x608060405234801561001057600080fd5b50336000808060001b815260200190815260200160002060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555061118b806100776000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c80635b0fc9c3116100715780635b0fc9c3146102e75780635ef2c7f014610335578063a22cb465146103c1578063cf40882314610411578063e985e9c514610493578063f79fe5381461050f576100b4565b80630178b8bf146100b957806302571be31461012757806306ab59231461019557806314ab90381461020157806316a25cbd146102435780631896f70a14610299575b600080fd5b6100e5600480360360208110156100cf57600080fd5b8101908080359060200190929190505050610555565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6101536004803603602081101561013d57600080fd5b8101908080359060200190929190505050610594565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6101eb600480360360608110156101ab57600080fd5b810190808035906020019092919080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610617565b6040518082815260200191505060405180910390f35b6102416004803603604081101561021757600080fd5b8101908080359060200190929190803567ffffffffffffffff1690602001909291905050506107cc565b005b61026f6004803603602081101561025957600080fd5b810190808035906020019092919050505061095e565b604051808267ffffffffffffffff1667ffffffffffffffff16815260200191505060405180910390f35b6102e5600480360360408110156102af57600080fd5b8101908080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610991565b005b610333600480360360408110156102fd57600080fd5b8101908080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610b53565b005b6103bf600480360360a081101561034b57600080fd5b810190808035906020019092919080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803567ffffffffffffffff169060200190929190505050610ccb565b005b61040f600480360360408110156103d757600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803515159060200190929190505050610ced565b005b6104916004803603608081101561042757600080fd5b8101908080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803567ffffffffffffffff169060200190929190505050610dee565b005b6104f5600480360360408110156104a957600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610e09565b604051808215151515815260200191505060405180910390f35b61053b6004803603602081101561052557600080fd5b8101908080359060200190929190505050610e9d565b604051808215151515815260200191505060405180910390f35b600080600083815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b60008060008084815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690503073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141561060d576000915050610612565b809150505b919050565b600083600080600083815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690503373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614806107145750600160008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b61071d57600080fd5b60008686604051602001808381526020018281526020019250505060405160208183030381529060405280519060200120905061075a8186610f0b565b85877fce0457fe73731f824cc272376169235128c118b49d344817417c6d108d155e8287604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a38093505050509392505050565b81600080600083815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690503373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614806108c75750600160008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b6108d057600080fd5b837f1d4f9bbfc9cab89d66e1a1562f2233ccbf1308cb4f63de2ead5787adddb8fa6884604051808267ffffffffffffffff1667ffffffffffffffff16815260200191505060405180910390a28260008086815260200190815260200160002060010160146101000a81548167ffffffffffffffff021916908367ffffffffffffffff16021790555050505050565b600080600083815260200190815260200160002060010160149054906101000a900467ffffffffffffffff169050919050565b81600080600083815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690503373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161480610a8c5750600160008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b610a9557600080fd5b837f335721b01866dc23fbee8b6b2c7b1e14d6f05c28cd35a2c934239f94095602a084604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a28260008086815260200190815260200160002060010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050505050565b81600080600083815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690503373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161480610c4e5750600160008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b610c5757600080fd5b610c618484610f0b565b837fd4735d920b0f87494915f556dd9b54c8f309026070caea5c737245152564d26684604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a250505050565b6000610cd8868686610617565b9050610ce5818484610f63565b505050505050565b80600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3183604051808215151515815260200191505060405180910390a35050565b610df88484610b53565b610e03848383610f63565b50505050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b60008073ffffffffffffffffffffffffffffffffffffffff1660008084815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614159050919050565b8060008084815260200190815260200160002060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050565b60008084815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614611084578160008085815260200190815260200160002060010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550827f335721b01866dc23fbee8b6b2c7b1e14d6f05c28cd35a2c934239f94095602a083604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a25b60008084815260200190815260200160002060010160149054906101000a900467ffffffffffffffff1667ffffffffffffffff168167ffffffffffffffff1614611151578060008085815260200190815260200160002060010160146101000a81548167ffffffffffffffff021916908367ffffffffffffffff160217905550827f1d4f9bbfc9cab89d66e1a1562f2233ccbf1308cb4f63de2ead5787adddb8fa6882604051808267ffffffffffffffff1667ffffffffffffffff16815260200191505060405180910390a25b50505056fea265627a7a723158207b5a893502e908f44aa238df4c84f15a53b16ec0f0e4ca667c972fe8f918e5d364736f6c63430005100032";

var PublicResolverFactory = function (_super) {
  __extends(PublicResolverFactory, _super);

  function PublicResolverFactory(signer) {
    return _super.call(this, _abi$1, _bytecode$1, signer) || this;
  }

  PublicResolverFactory.prototype.deploy = function (_ens, overrides) {
    return _super.prototype.deploy.call(this, _ens, overrides);
  };

  PublicResolverFactory.prototype.getDeployTransaction = function (_ens, overrides) {
    return _super.prototype.getDeployTransaction.call(this, _ens, overrides);
  };

  PublicResolverFactory.prototype.attach = function (address) {
    return _super.prototype.attach.call(this, address);
  };

  PublicResolverFactory.prototype.connect = function (signer) {
    return _super.prototype.connect.call(this, signer);
  };

  PublicResolverFactory.connect = function (address, signerOrProvider) {
    return new Contract(address, _abi$1, signerOrProvider);
  };

  return PublicResolverFactory;
}(ContractFactory);
var _abi$1 = [{
  constant: true,
  inputs: [{
    name: "interfaceID",
    type: "bytes4"
  }],
  name: "supportsInterface",
  outputs: [{
    name: "",
    type: "bool"
  }],
  payable: false,
  stateMutability: "pure",
  type: "function"
}, {
  constant: false,
  inputs: [{
    name: "node",
    type: "bytes32"
  }, {
    name: "data",
    type: "bytes"
  }],
  name: "setDNSRecords",
  outputs: [],
  payable: false,
  stateMutability: "nonpayable",
  type: "function"
}, {
  constant: false,
  inputs: [{
    name: "node",
    type: "bytes32"
  }, {
    name: "key",
    type: "string"
  }, {
    name: "value",
    type: "string"
  }],
  name: "setText",
  outputs: [],
  payable: false,
  stateMutability: "nonpayable",
  type: "function"
}, {
  constant: true,
  inputs: [{
    name: "node",
    type: "bytes32"
  }, {
    name: "interfaceID",
    type: "bytes4"
  }],
  name: "interfaceImplementer",
  outputs: [{
    name: "",
    type: "address"
  }],
  payable: false,
  stateMutability: "view",
  type: "function"
}, {
  constant: true,
  inputs: [{
    name: "node",
    type: "bytes32"
  }, {
    name: "contentTypes",
    type: "uint256"
  }],
  name: "ABI",
  outputs: [{
    name: "",
    type: "uint256"
  }, {
    name: "",
    type: "bytes"
  }],
  payable: false,
  stateMutability: "view",
  type: "function"
}, {
  constant: false,
  inputs: [{
    name: "node",
    type: "bytes32"
  }, {
    name: "x",
    type: "bytes32"
  }, {
    name: "y",
    type: "bytes32"
  }],
  name: "setPubkey",
  outputs: [],
  payable: false,
  stateMutability: "nonpayable",
  type: "function"
}, {
  constant: false,
  inputs: [{
    name: "node",
    type: "bytes32"
  }, {
    name: "hash",
    type: "bytes"
  }],
  name: "setContenthash",
  outputs: [],
  payable: false,
  stateMutability: "nonpayable",
  type: "function"
}, {
  constant: true,
  inputs: [{
    name: "node",
    type: "bytes32"
  }],
  name: "addr",
  outputs: [{
    name: "",
    type: "address"
  }],
  payable: false,
  stateMutability: "view",
  type: "function"
}, {
  constant: true,
  inputs: [{
    name: "node",
    type: "bytes32"
  }, {
    name: "name",
    type: "bytes32"
  }],
  name: "hasDNSRecords",
  outputs: [{
    name: "",
    type: "bool"
  }],
  payable: false,
  stateMutability: "view",
  type: "function"
}, {
  constant: true,
  inputs: [{
    name: "node",
    type: "bytes32"
  }, {
    name: "key",
    type: "string"
  }],
  name: "text",
  outputs: [{
    name: "",
    type: "string"
  }],
  payable: false,
  stateMutability: "view",
  type: "function"
}, {
  constant: false,
  inputs: [{
    name: "node",
    type: "bytes32"
  }, {
    name: "contentType",
    type: "uint256"
  }, {
    name: "data",
    type: "bytes"
  }],
  name: "setABI",
  outputs: [],
  payable: false,
  stateMutability: "nonpayable",
  type: "function"
}, {
  constant: true,
  inputs: [{
    name: "node",
    type: "bytes32"
  }],
  name: "name",
  outputs: [{
    name: "",
    type: "string"
  }],
  payable: false,
  stateMutability: "view",
  type: "function"
}, {
  constant: false,
  inputs: [{
    name: "node",
    type: "bytes32"
  }, {
    name: "name",
    type: "string"
  }],
  name: "setName",
  outputs: [],
  payable: false,
  stateMutability: "nonpayable",
  type: "function"
}, {
  constant: false,
  inputs: [{
    name: "node",
    type: "bytes32"
  }, {
    name: "coinType",
    type: "uint256"
  }, {
    name: "a",
    type: "bytes"
  }],
  name: "setAddr",
  outputs: [],
  payable: false,
  stateMutability: "nonpayable",
  type: "function"
}, {
  constant: true,
  inputs: [{
    name: "node",
    type: "bytes32"
  }, {
    name: "name",
    type: "bytes32"
  }, {
    name: "resource",
    type: "uint16"
  }],
  name: "dnsRecord",
  outputs: [{
    name: "",
    type: "bytes"
  }],
  payable: false,
  stateMutability: "view",
  type: "function"
}, {
  constant: false,
  inputs: [{
    name: "node",
    type: "bytes32"
  }],
  name: "clearDNSZone",
  outputs: [],
  payable: false,
  stateMutability: "nonpayable",
  type: "function"
}, {
  constant: true,
  inputs: [{
    name: "node",
    type: "bytes32"
  }],
  name: "contenthash",
  outputs: [{
    name: "",
    type: "bytes"
  }],
  payable: false,
  stateMutability: "view",
  type: "function"
}, {
  constant: true,
  inputs: [{
    name: "node",
    type: "bytes32"
  }],
  name: "pubkey",
  outputs: [{
    name: "x",
    type: "bytes32"
  }, {
    name: "y",
    type: "bytes32"
  }],
  payable: false,
  stateMutability: "view",
  type: "function"
}, {
  constant: false,
  inputs: [{
    name: "node",
    type: "bytes32"
  }, {
    name: "a",
    type: "address"
  }],
  name: "setAddr",
  outputs: [],
  payable: false,
  stateMutability: "nonpayable",
  type: "function"
}, {
  constant: false,
  inputs: [{
    name: "node",
    type: "bytes32"
  }, {
    name: "interfaceID",
    type: "bytes4"
  }, {
    name: "implementer",
    type: "address"
  }],
  name: "setInterface",
  outputs: [],
  payable: false,
  stateMutability: "nonpayable",
  type: "function"
}, {
  constant: true,
  inputs: [{
    name: "node",
    type: "bytes32"
  }, {
    name: "coinType",
    type: "uint256"
  }],
  name: "addr",
  outputs: [{
    name: "",
    type: "bytes"
  }],
  payable: false,
  stateMutability: "view",
  type: "function"
}, {
  constant: true,
  inputs: [{
    name: "",
    type: "bytes32"
  }, {
    name: "",
    type: "address"
  }, {
    name: "",
    type: "address"
  }],
  name: "authorisations",
  outputs: [{
    name: "",
    type: "bool"
  }],
  payable: false,
  stateMutability: "view",
  type: "function"
}, {
  inputs: [{
    name: "_ens",
    type: "address"
  }],
  payable: false,
  stateMutability: "nonpayable",
  type: "constructor"
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    name: "node",
    type: "bytes32"
  }, {
    indexed: true,
    name: "owner",
    type: "address"
  }, {
    indexed: true,
    name: "target",
    type: "address"
  }, {
    indexed: false,
    name: "isAuthorised",
    type: "bool"
  }],
  name: "AuthorisationChanged",
  type: "event"
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    name: "node",
    type: "bytes32"
  }, {
    indexed: true,
    name: "indexedKey",
    type: "string"
  }, {
    indexed: false,
    name: "key",
    type: "string"
  }],
  name: "TextChanged",
  type: "event"
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    name: "node",
    type: "bytes32"
  }, {
    indexed: false,
    name: "x",
    type: "bytes32"
  }, {
    indexed: false,
    name: "y",
    type: "bytes32"
  }],
  name: "PubkeyChanged",
  type: "event"
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    name: "node",
    type: "bytes32"
  }, {
    indexed: false,
    name: "name",
    type: "string"
  }],
  name: "NameChanged",
  type: "event"
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    name: "node",
    type: "bytes32"
  }, {
    indexed: true,
    name: "interfaceID",
    type: "bytes4"
  }, {
    indexed: false,
    name: "implementer",
    type: "address"
  }],
  name: "InterfaceChanged",
  type: "event"
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    name: "node",
    type: "bytes32"
  }, {
    indexed: false,
    name: "name",
    type: "bytes"
  }, {
    indexed: false,
    name: "resource",
    type: "uint16"
  }, {
    indexed: false,
    name: "record",
    type: "bytes"
  }],
  name: "DNSRecordChanged",
  type: "event"
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    name: "node",
    type: "bytes32"
  }, {
    indexed: false,
    name: "name",
    type: "bytes"
  }, {
    indexed: false,
    name: "resource",
    type: "uint16"
  }],
  name: "DNSRecordDeleted",
  type: "event"
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    name: "node",
    type: "bytes32"
  }],
  name: "DNSZoneCleared",
  type: "event"
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    name: "node",
    type: "bytes32"
  }, {
    indexed: false,
    name: "hash",
    type: "bytes"
  }],
  name: "ContenthashChanged",
  type: "event"
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    name: "node",
    type: "bytes32"
  }, {
    indexed: false,
    name: "a",
    type: "address"
  }],
  name: "AddrChanged",
  type: "event"
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    name: "node",
    type: "bytes32"
  }, {
    indexed: false,
    name: "coinType",
    type: "uint256"
  }, {
    indexed: false,
    name: "newAddress",
    type: "bytes"
  }],
  name: "AddressChanged",
  type: "event"
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    name: "node",
    type: "bytes32"
  }, {
    indexed: true,
    name: "contentType",
    type: "uint256"
  }],
  name: "ABIChanged",
  type: "event"
}, {
  constant: false,
  inputs: [{
    name: "node",
    type: "bytes32"
  }, {
    name: "target",
    type: "address"
  }, {
    name: "isAuthorised",
    type: "bool"
  }],
  name: "setAuthorisation",
  outputs: [],
  payable: false,
  stateMutability: "nonpayable",
  type: "function"
}, {
  constant: false,
  inputs: [{
    name: "data",
    type: "bytes[]"
  }],
  name: "multicall",
  outputs: [{
    name: "results",
    type: "bytes[]"
  }],
  payable: false,
  stateMutability: "nonpayable",
  type: "function"
}];
var _bytecode$1 = "0x60806040523480156200001157600080fd5b506040516020806200386d833981018060405262000033919081019062000092565b80600a60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505062000120565b6000815190506200008c8162000106565b92915050565b600060208284031215620000a557600080fd5b6000620000b5848285016200007b565b91505092915050565b6000620000cb82620000e6565b9050919050565b6000620000df82620000be565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6200011181620000d2565b81146200011d57600080fd5b50565b61373d80620001306000396000f3fe608060405234801561001057600080fd5b50600436106101585760003560e01c8063691f3431116100c3578063bc1c58d11161007c578063bc1c58d11461040a578063c86902331461043a578063d5fa2b001461046b578063e59d895d14610487578063f1cb7e06146104a3578063f86bc879146104d357610158565b8063691f34311461032657806377372213146103565780638b95dd7114610372578063a8fa56821461038e578063ac9650d8146103be578063ad5780af146103ee57610158565b8063304e6ade11610115578063304e6ade146102425780633b3b57de1461025e5780633e9ce7941461028e5780634cbf6ba4146102aa57806359d1d43c146102da578063623195b01461030a57610158565b806301ffc9a71461015d5780630af179d71461018d57806310f13a8c146101a9578063124a319c146101c55780632203ab56146101f557806329cd62ea14610226575b600080fd5b61017760048036036101729190810190612ecd565b610503565b60405161018491906132ae565b60405180910390f35b6101a760048036036101a29190810190612c85565b610564565b005b6101c360048036036101be9190810190612d35565b610792565b005b6101df60048036036101da9190810190612bfa565b610840565b6040516101ec919061323b565b60405180910390f35b61020f600480360361020a9190810190612dbe565b610c2b565b60405161021d929190613429565b60405180910390f35b610240600480360361023b9190810190612b5c565b610d7a565b005b61025c60048036036102579190810190612c85565b610e0c565b005b61027860048036036102739190810190612a1d565b610e82565b6040516102859190613271565b60405180910390f35b6102a860048036036102a39190810190612ad1565b610eb9565b005b6102c460048036036102bf9190810190612b20565b610fc9565b6040516102d191906132ae565b60405180910390f35b6102f460048036036102ef9190810190612cdd565b611031565b6040516103019190613407565b60405180910390f35b610324600480360361031f9190810190612dfa565b611106565b005b610340600480360361033b9190810190612a1d565b611193565b60405161034d9190613407565b60405180910390f35b610370600480360361036b9190810190612cdd565b611248565b005b61038c60048036036103879190810190612e66565b6112be565b005b6103a860048036036103a39190810190612bab565b611394565b6040516103b5919061334c565b60405180910390f35b6103d860048036036103d391908101906129d8565b611499565b6040516103e5919061328c565b60405180910390f35b61040860048036036104039190810190612a1d565b6115ef565b005b610424600480360361041f9190810190612a1d565b611656565b604051610431919061334c565b60405180910390f35b610454600480360361044f9190810190612a1d565b61170b565b6040516104629291906132e4565b60405180910390f35b61048560048036036104809190810190612a46565b611745565b005b6104a1600480360361049c9190810190612c36565b611771565b005b6104bd60048036036104b89190810190612dbe565b611883565b6040516104ca919061334c565b60405180910390f35b6104ed60048036036104e89190810190612a82565b61194a565b6040516104fa91906132ae565b60405180910390f35b60006359d1d43c60e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061055d575061055c82611986565b5b9050919050565b8261056e816119e7565b61057757600080fd5b60008090506000809050606080600061058e6125b2565b6105e660008a8a8080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050611b7090919063ffffffff16565b90505b6105f281611b9a565b61071f5760008661ffff16141561064e578060400151955061061381611bb0565b93508360405160200161062691906131f6565b60405160208183030381529060405280519060200120915061064781611be7565b9250610711565b606061065982611bb0565b9050816040015161ffff168761ffff1614158061068657506106848186611c1790919063ffffffff16565b155b1561070f576106e88b86898d8d8080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050508a8b88602001510360008b5114611c3e565b81604001519650816020015195508094508480519060200120925061070c82611be7565b93505b505b61071a81611f6e565b6105e9565b50600083511115610787576107868984878b8b8080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505088898e8e9050036000895114611c3e565b5b505050505050505050565b8461079c816119e7565b6107a557600080fd5b82826009600089815260200190815260200160002087876040516107ca92919061320d565b908152602001604051809103902091906107e59291906125fd565b5084846040516107f692919061320d565b6040518091039020867fd8c9334b1a9c2f9da342a0a2b32629c1a229b6445dad78947f674b44444a755087876040516108309291906133e3565b60405180910390a3505050505050565b600080600660008581526020019081526020016000206000847bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16146109055780915050610c25565b600061091085610e82565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141561095257600092505050610c25565b600060608273ffffffffffffffffffffffffffffffffffffffff166301ffc9a760e01b604051602401610985919061330d565b6040516020818303038152906040527f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050604051610a0f91906131f6565b600060405180830381855afa9150503d8060008114610a4a576040519150601f19603f3d011682016040523d82523d6000602084013e610a4f565b606091505b5091509150811580610a62575060208151105b80610aa95750600060f81b81601f81518110610a7a57fe5b602001015160f81c60f81b7effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b15610abb576000945050505050610c25565b8273ffffffffffffffffffffffffffffffffffffffff1686604051602401610ae3919061330d565b6040516020818303038152906040527f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050604051610b6d91906131f6565b600060405180830381855afa9150503d8060008114610ba8576040519150601f19603f3d011682016040523d82523d6000602084013e610bad565b606091505b508092508193505050811580610bc4575060208151105b80610c0b5750600060f81b81601f81518110610bdc57fe5b602001015160f81c60f81b7effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b15610c1d576000945050505050610c25565b829450505050505b92915050565b60006060600080600086815260200190815260200160002090506000600190505b848111610d5757600085821614158015610c8c57506000826000838152602001908152602001600020805460018160011615610100020316600290049050115b15610d4b5780826000838152602001908152602001600020808054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610d395780601f10610d0e57610100808354040283529160200191610d39565b820191906000526020600020905b815481529060010190602001808311610d1c57829003601f168201915b50505050509050935093505050610d73565b600181901b9050610c4c565b5060006040518060200160405280600081525081915092509250505b9250929050565b82610d84816119e7565b610d8d57600080fd5b604051806040016040528084815260200183815250600860008681526020019081526020016000206000820151816000015560208201518160010155905050837f1d6f5e03d3f63eb58751986629a5439baee5079ff04f345becb66e23eb154e468484604051610dfe9291906132e4565b60405180910390a250505050565b82610e16816119e7565b610e1f57600080fd5b8282600260008781526020019081526020016000209190610e4192919061267d565b50837fe379c1624ed7e714cc0937528a32359d69d5281337765313dba4e081b72d75788484604051610e74929190613328565b60405180910390a250505050565b60006060610e9183603c611883565b9050600081511415610ea7576000915050610eb4565b610eb081612082565b9150505b919050565b80600b600085815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16847fe1c5610a6e0cbe10764ecd182adcef1ec338dc4e199c99c32ce98f38e12791df84604051610fbc91906132ae565b60405180910390a4505050565b60008060056000858152602001908152602001600020600060036000878152602001908152602001600020548152602001908152602001600020600084815260200190815260200160002060009054906101000a900461ffff1661ffff161415905092915050565b606060096000858152602001908152602001600020838360405161105692919061320d565b90815260200160405180910390208054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156110f85780601f106110cd576101008083540402835291602001916110f8565b820191906000526020600020905b8154815290600101906020018083116110db57829003601f168201915b505050505090509392505050565b83611110816119e7565b61111957600080fd5b60008460018603161461112b57600080fd5b82826000808881526020019081526020016000206000878152602001908152602001600020919061115d92919061267d565b5083857faa121bbeef5f32f5961a2a28966e769023910fc9479059ee3495d4c1a696efe360405160405180910390a35050505050565b6060600760008381526020019081526020016000208054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561123c5780601f106112115761010080835404028352916020019161123c565b820191906000526020600020905b81548152906001019060200180831161121f57829003601f168201915b50505050509050919050565b82611252816119e7565b61125b57600080fd5b828260076000878152602001908152602001600020919061127d9291906125fd565b50837fb7d29e911041e8d9b843369e890bcb72c9388692ba48b65ac54e7214c4c348f784846040516112b09291906133e3565b60405180910390a250505050565b826112c8816119e7565b6112d157600080fd5b837f65412581168e88a1e60c6459d7f44ae83ad0832e670826c05a4e2476b57af7528484604051611303929190613429565b60405180910390a2603c83141561135557837f52d7d861f09ab3d26239d492e8968629f95e9e318cf0b73bfddc441522a15fd261133f84612082565b60405161134c9190613256565b60405180910390a25b81600160008681526020019081526020016000206000858152602001908152602001600020908051906020019061138d9291906126fd565b5050505050565b606060046000858152602001908152602001600020600060036000878152602001908152602001600020548152602001908152602001600020600084815260200190815260200160002060008361ffff1661ffff1681526020019081526020016000208054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561148b5780601f106114605761010080835404028352916020019161148b565b820191906000526020600020905b81548152906001019060200180831161146e57829003601f168201915b505050505090509392505050565b6060828290506040519080825280602002602001820160405280156114d257816020015b60608152602001906001900390816114bd5790505b50905060008090505b838390508110156115e557600060603073ffffffffffffffffffffffffffffffffffffffff1686868581811061150d57fe5b905060200281018035600160200383360303811261152a57600080fd5b8083019250508135905060208201915067ffffffffffffffff81111561154f57600080fd5b60018102360382131561156157600080fd5b60405161156f9291906131dd565b600060405180830381855af49150503d80600081146115aa576040519150601f19603f3d011682016040523d82523d6000602084013e6115af565b606091505b5091509150816115be57600080fd5b808484815181106115cb57fe5b6020026020010181905250505080806001019150506114db565b5080905092915050565b806115f9816119e7565b61160257600080fd5b6003600083815260200190815260200160002060008154809291906001019190505550817fb757169b8492ca2f1c6619d9d76ce22803035c3b1d5f6930dffe7b127c1a198360405160405180910390a25050565b6060600260008381526020019081526020016000208054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156116ff5780601f106116d4576101008083540402835291602001916116ff565b820191906000526020600020905b8154815290600101906020018083116116e257829003601f168201915b50505050509050919050565b6000806008600084815260200190815260200160002060000154600860008581526020019081526020016000206001015491509150915091565b8161174f816119e7565b61175857600080fd5b61176c83603c611767856120a5565b6112be565b505050565b8261177b816119e7565b61178457600080fd5b81600660008681526020019081526020016000206000857bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916847f7c69f06bea0bdef565b709e93a147836b0063ba2dd89f02d0b7e8d931e6a6daa84604051611875919061323b565b60405180910390a350505050565b60606001600084815260200190815260200160002060008381526020019081526020016000208054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561193d5780601f106119125761010080835404028352916020019161193d565b820191906000526020600020905b81548152906001019060200180831161192057829003601f168201915b5050505050905092915050565b600b602052826000526040600020602052816000526040600020602052806000526040600020600092509250509054906101000a900460ff1681565b600063c869023360e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806119e057506119df826120f0565b5b9050919050565b600080600a60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166302571be3846040518263ffffffff1660e01b8152600401611a4591906132c9565b60206040518083038186803b158015611a5d57600080fd5b505afa158015611a71573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250611a9591908101906129af565b90503373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161480611b685750600b600084815260200190815260200160002060008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b915050919050565b611b786125b2565b828160000181905250818160c0018181525050611b9481611f6e565b92915050565b6000816000015151826020015110159050919050565b6060611be08260200151611bcc84600001518560200151612151565b84600001516121ac9092919063ffffffff16565b9050919050565b6060611c108260a001518360a001518460c001510384600001516121ac9092919063ffffffff16565b9050919050565b600081518351148015611c365750611c35836000846000875161221f565b5b905092915050565b6000600360008981526020019081526020016000205490506000878051906020012090506060611c798686896121ac9092919063ffffffff16565b90508315611dee576000600460008c81526020019081526020016000206000858152602001908152602001600020600084815260200190815260200160002060008a61ffff1661ffff16815260200190815260200160002080546001816001161561010002031660029004905014611d5557600560008b815260200190815260200160002060008481526020019081526020016000206000838152602001908152602001600020600081819054906101000a900461ffff16809291906001900391906101000a81548161ffff021916908361ffff160217905550505b600460008b81526020019081526020016000206000848152602001908152602001600020600083815260200190815260200160002060008961ffff1661ffff1681526020019081526020016000206000611daf919061277d565b897f03528ed0c2a3ebc993b12ce3c16bb382f9c7d88ef7d8a1bf290eaf35955a12078a8a604051611de192919061336e565b60405180910390a2611f62565b6000600460008c81526020019081526020016000206000858152602001908152602001600020600084815260200190815260200160002060008a61ffff1661ffff1681526020019081526020016000208054600181600116156101000203166002900490501415611ec257600560008b815260200190815260200160002060008481526020019081526020016000206000838152602001908152602001600020600081819054906101000a900461ffff168092919060010191906101000a81548161ffff021916908361ffff160217905550505b80600460008c81526020019081526020016000206000858152602001908152602001600020600084815260200190815260200160002060008a61ffff1661ffff1681526020019081526020016000209080519060200190611f249291906126fd565b50897f52a608b3303a48862d07a73d82fa221318c0027fbbcfb1b2329bface3f19ff2b8a8a84604051611f599392919061339e565b60405180910390a25b50505050505050505050565b8060c00151816020018181525050806000015151816020015110611f915761207f565b6000611fa582600001518360200151612151565b8260200151019050611fc481836000015161224390919063ffffffff16565b826040019061ffff16908161ffff1681525050600281019050611ff481836000015161224390919063ffffffff16565b826060019061ffff16908161ffff168152505060028101905061202481836000015161226990919063ffffffff16565b826080019063ffffffff16908163ffffffff1681525050600481019050600061205a82846000015161224390919063ffffffff16565b61ffff169050600282019150818360a00181815250508082018360c001818152505050505b50565b6000601482511461209257600080fd5b600c6101000a6020830151049050919050565b606060146040519080825280601f01601f1916602001820160405280156120db5781602001600182028038833980820191505090505b509050600c6101000a82026020820152919050565b600063691f343160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061214a575061214982612291565b5b9050919050565b6000808290505b6001156121a0578351811061216957fe5b600061217e82866122fe90919063ffffffff16565b60ff1690506001810182019150600081141561219a57506121a0565b50612158565b82810391505092915050565b6060835182840111156121be57600080fd5b6060826040519080825280601f01601f1916602001820160405280156121f35781602001600182028038833980820191505090505b5090506000806020830191508560208801019050612212828287612322565b8293505050509392505050565b600061222c84848461236b565b61223787878561236b565b14905095945050505050565b6000825160028301111561225657600080fd5b61ffff8260028501015116905092915050565b6000825160048301111561227c57600080fd5b63ffffffff8260048501015116905092915050565b600060405161229f90613226565b60405180910390207bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806122f757506122f68261238e565b5b9050919050565b600082828151811061230c57fe5b602001015160f81c60f81b60f81c905092915050565b5b602081106123465781518352602083019250602082019150602081039050612323565b60006001826020036101000a0390508019835116818551168181178652505050505050565b60008351828401111561237d57600080fd5b818360208601012090509392505050565b600063a8fa568260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806123e857506123e7826123ef565b5b9050919050565b600063bc1c58d160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161480612449575061244882612450565b5b9050919050565b6000633b3b57de60e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806124e9575063f1cb7e0660e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b806124f957506124f882612500565b5b9050919050565b6000632203ab5660e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061255a575061255982612561565b5b9050919050565b60006301ffc9a760e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b6040518060e001604052806060815260200160008152602001600061ffff168152602001600061ffff168152602001600063ffffffff16815260200160008152602001600081525090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061263e57803560ff191683800117855561266c565b8280016001018555821561266c579182015b8281111561266b578235825591602001919060010190612650565b5b50905061267991906127c5565b5090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106126be57803560ff19168380011785556126ec565b828001600101855582156126ec579182015b828111156126eb5782358255916020019190600101906126d0565b5b5090506126f991906127c5565b5090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061273e57805160ff191683800117855561276c565b8280016001018555821561276c579182015b8281111561276b578251825591602001919060010190612750565b5b50905061277991906127c5565b5090565b50805460018160011615610100020316600290046000825580601f106127a357506127c2565b601f0160209004906000526020600020908101906127c191906127c5565b5b50565b6127e791905b808211156127e35760008160009055506001016127cb565b5090565b90565b6000813590506127f981613679565b92915050565b60008151905061280e81613679565b92915050565b60008083601f84011261282657600080fd5b8235905067ffffffffffffffff81111561283f57600080fd5b60208301915083602082028301111561285757600080fd5b9250929050565b60008135905061286d81613690565b92915050565b600081359050612882816136a7565b92915050565b600081359050612897816136be565b92915050565b60008083601f8401126128af57600080fd5b8235905067ffffffffffffffff8111156128c857600080fd5b6020830191508360018202830111156128e057600080fd5b9250929050565b600082601f8301126128f857600080fd5b813561290b61290682613486565b613459565b9150808252602083016020830185838301111561292757600080fd5b612932838284613626565b50505092915050565b60008083601f84011261294d57600080fd5b8235905067ffffffffffffffff81111561296657600080fd5b60208301915083600182028301111561297e57600080fd5b9250929050565b600081359050612994816136d5565b92915050565b6000813590506129a9816136ec565b92915050565b6000602082840312156129c157600080fd5b60006129cf848285016127ff565b91505092915050565b600080602083850312156129eb57600080fd5b600083013567ffffffffffffffff811115612a0557600080fd5b612a1185828601612814565b92509250509250929050565b600060208284031215612a2f57600080fd5b6000612a3d84828501612873565b91505092915050565b60008060408385031215612a5957600080fd5b6000612a6785828601612873565b9250506020612a78858286016127ea565b9150509250929050565b600080600060608486031215612a9757600080fd5b6000612aa586828701612873565b9350506020612ab6868287016127ea565b9250506040612ac7868287016127ea565b9150509250925092565b600080600060608486031215612ae657600080fd5b6000612af486828701612873565b9350506020612b05868287016127ea565b9250506040612b168682870161285e565b9150509250925092565b60008060408385031215612b3357600080fd5b6000612b4185828601612873565b9250506020612b5285828601612873565b9150509250929050565b600080600060608486031215612b7157600080fd5b6000612b7f86828701612873565b9350506020612b9086828701612873565b9250506040612ba186828701612873565b9150509250925092565b600080600060608486031215612bc057600080fd5b6000612bce86828701612873565b9350506020612bdf86828701612873565b9250506040612bf086828701612985565b9150509250925092565b60008060408385031215612c0d57600080fd5b6000612c1b85828601612873565b9250506020612c2c85828601612888565b9150509250929050565b600080600060608486031215612c4b57600080fd5b6000612c5986828701612873565b9350506020612c6a86828701612888565b9250506040612c7b868287016127ea565b9150509250925092565b600080600060408486031215612c9a57600080fd5b6000612ca886828701612873565b935050602084013567ffffffffffffffff811115612cc557600080fd5b612cd18682870161289d565b92509250509250925092565b600080600060408486031215612cf257600080fd5b6000612d0086828701612873565b935050602084013567ffffffffffffffff811115612d1d57600080fd5b612d298682870161293b565b92509250509250925092565b600080600080600060608688031215612d4d57600080fd5b6000612d5b88828901612873565b955050602086013567ffffffffffffffff811115612d7857600080fd5b612d848882890161293b565b9450945050604086013567ffffffffffffffff811115612da357600080fd5b612daf8882890161293b565b92509250509295509295909350565b60008060408385031215612dd157600080fd5b6000612ddf85828601612873565b9250506020612df08582860161299a565b9150509250929050565b60008060008060608587031215612e1057600080fd5b6000612e1e87828801612873565b9450506020612e2f8782880161299a565b935050604085013567ffffffffffffffff811115612e4c57600080fd5b612e588782880161289d565b925092505092959194509250565b600080600060608486031215612e7b57600080fd5b6000612e8986828701612873565b9350506020612e9a8682870161299a565b925050604084013567ffffffffffffffff811115612eb757600080fd5b612ec3868287016128e7565b9150509250925092565b600060208284031215612edf57600080fd5b6000612eed84828501612888565b91505092915050565b6000612f028383613095565b905092915050565b612f13816135f0565b82525050565b612f2281613564565b82525050565b612f3181613552565b82525050565b6000612f42826134bf565b612f4c81856134f8565b935083602082028501612f5e856134b2565b8060005b85811015612f9a5784840389528151612f7b8582612ef6565b9450612f86836134eb565b925060208a01995050600181019050612f62565b50829750879550505050505092915050565b612fb581613576565b82525050565b612fc481613582565b82525050565b612fd38161358c565b82525050565b6000612fe5838561351a565b9350612ff2838584613626565b612ffb83613668565b840190509392505050565b6000613012838561352b565b935061301f838584613626565b82840190509392505050565b6000613036826134d5565b613040818561351a565b9350613050818560208601613635565b61305981613668565b840191505092915050565b600061306f826134d5565b613079818561352b565b9350613089818560208601613635565b80840191505092915050565b60006130a0826134ca565b6130aa8185613509565b93506130ba818560208601613635565b6130c381613668565b840191505092915050565b60006130da8385613536565b93506130e7838584613626565b6130f083613668565b840190509392505050565b60006131078385613547565b9350613114838584613626565b82840190509392505050565b600061312b826134e0565b6131358185613536565b9350613145818560208601613635565b61314e81613668565b840191505092915050565b6000613166602483613547565b91507f696e74657266616365496d706c656d656e74657228627974657333322c62797460008301527f65733429000000000000000000000000000000000000000000000000000000006020830152602482019050919050565b6131c8816135b8565b82525050565b6131d7816135e6565b82525050565b60006131ea828486613006565b91508190509392505050565b60006132028284613064565b915081905092915050565b600061321a8284866130fb565b91508190509392505050565b600061323182613159565b9150819050919050565b60006020820190506132506000830184612f28565b92915050565b600060208201905061326b6000830184612f0a565b92915050565b60006020820190506132866000830184612f19565b92915050565b600060208201905081810360008301526132a68184612f37565b905092915050565b60006020820190506132c36000830184612fac565b92915050565b60006020820190506132de6000830184612fbb565b92915050565b60006040820190506132f96000830185612fbb565b6133066020830184612fbb565b9392505050565b60006020820190506133226000830184612fca565b92915050565b60006020820190508181036000830152613343818486612fd9565b90509392505050565b60006020820190508181036000830152613366818461302b565b905092915050565b60006040820190508181036000830152613388818561302b565b905061339760208301846131bf565b9392505050565b600060608201905081810360008301526133b8818661302b565b90506133c760208301856131bf565b81810360408301526133d9818461302b565b9050949350505050565b600060208201905081810360008301526133fe8184866130ce565b90509392505050565b600060208201905081810360008301526134218184613120565b905092915050565b600060408201905061343e60008301856131ce565b8181036020830152613450818461302b565b90509392505050565b6000604051905081810181811067ffffffffffffffff8211171561347c57600080fd5b8060405250919050565b600067ffffffffffffffff82111561349d57600080fd5b601f19601f8301169050602081019050919050565b6000602082019050919050565b600081519050919050565b600081519050919050565b600081519050919050565b600081519050919050565b6000602082019050919050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b600081905092915050565b600082825260208201905092915050565b600081905092915050565b600061355d826135c6565b9050919050565b600061356f826135c6565b9050919050565b60008115159050919050565b6000819050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b600061ffff82169050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b60006135fb82613602565b9050919050565b600061360d82613614565b9050919050565b600061361f826135c6565b9050919050565b82818337600083830152505050565b60005b83811015613653578082015181840152602081019050613638565b83811115613662576000848401525b50505050565b6000601f19601f8301169050919050565b61368281613552565b811461368d57600080fd5b50565b61369981613576565b81146136a457600080fd5b50565b6136b081613582565b81146136bb57600080fd5b50565b6136c78161358c565b81146136d257600080fd5b50565b6136de816135b8565b81146136e957600080fd5b50565b6136f5816135e6565b811461370057600080fd5b5056fea265627a7a7230582049ebf27fa2f4353ae0dc98302f101fe3256ef5930b91c52222dcf860d94f3c326c6578706572696d656e74616cf50037";

var sha3 = require("js-sha3").keccak_256;
function decodeLabelhash(hash) {
  if (!(hash.startsWith("[") && hash.endsWith("]"))) {
    throw Error("Expected encoded labelhash to start and end with square brackets");
  }

  if (hash.length !== 66) {
    throw Error("Expected encoded labelhash to have a length of 66");
  }

  return "" + hash.slice(1, -1);
}
function isEncodedLabelhash(hash) {
  return hash.startsWith("[") && hash.endsWith("]") && hash.length === 66;
}
function namehash(inputName) {
  var node = "";

  for (var i = 0; i < 32; i++) {
    node += "00";
  }

  if (inputName) {
    var labels = inputName.split(".");

    for (var i = labels.length - 1; i >= 0; i--) {
      var labelSha = void 0;

      if (isEncodedLabelhash(labels[i])) {
        labelSha = decodeLabelhash(labels[i]);
      } else {
        var normalizedLabel = normalize(labels[i]);
        labelSha = sha3(normalizedLabel);
      }

      node = sha3(new Buffer(node + labelSha, "hex"));
    }
  }

  return "0x" + node;
}
function labelhash(unnormalizedLabelOrLabelhash) {
  return isEncodedLabelhash(unnormalizedLabelOrLabelhash) ? "0x" + decodeLabelhash(unnormalizedLabelOrLabelhash) : "0x" + sha3(normalize(unnormalizedLabelOrLabelhash));
}

var IAM = function () {
  function IAM(_a) {
    var _b;

    var rpcUrl = _a.rpcUrl,
        _c = _a.chainId,
        chainId = _c === void 0 ? 1 : _c,
        infuraId = _a.infuraId,
        _d = _a.ensRegistryAddress,
        ensRegistryAddress = _d === void 0 ? "0xd7CeF70Ba7efc2035256d828d5287e2D285CD1ac" : _d,
        _e = _a.ensResolverAddress,
        ensResolverAddress = _e === void 0 ? "0x0a97e07c4Df22e2e31872F20C5BE191D5EFc4680" : _e,
        _f = _a.ipfsUrl,
        ipfsUrl = _f === void 0 ? "https://ipfs.infura.io:5001/api/v0/" : _f;
    this._walletConnectProvider = new WalletConnectProvider({
      rpc: (_b = {}, _b[chainId] = rpcUrl, _b),
      infuraId: infuraId
    });
    this._resolverSetting = {
      provider: {
        uriOrInfo: rpcUrl,
        type: ProviderTypes.HTTP
      },
      abi: abi1056,
      address: address1056,
      method: Methods.Erc1056
    };
    this._ensRegistryAddress = ensRegistryAddress;
    this._ensResolverAddress = ensResolverAddress;
    this._ipfsStore = new DidStore(ipfsUrl);
  }

  IAM.prototype.init = function () {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4, this._walletConnectProvider.enable()];

          case 1:
            _a.sent();

            this._provider = new providers.Web3Provider(this._walletConnectProvider);
            this.setAddress();
            this.setResolver();
            this.setSigner();
            this.setDid();
            this.setupENS();
            return [4, this.setDocument()];

          case 2:
            _a.sent();

            this.setClaims();
            this.setJWT();
            return [2];
        }
      });
    });
  };

  IAM.prototype.setAddress = function () {
    this._address = this._walletConnectProvider.accounts[0];
  };

  IAM.prototype.setSigner = function () {
    var _a;

    this._signer = (_a = this._provider) === null || _a === void 0 ? void 0 : _a.getSigner();
  };

  IAM.prototype.setResolver = function () {
    if (this._resolverSetting) {
      this._resolver = new Resolver(this._resolverSetting);
    }
  };

  IAM.prototype.setDid = function () {
    this._did = "did:" + Methods.Erc1056 + ":" + this._address;
  };

  IAM.prototype.setupENS = function () {
    if (this._signer) {
      this._ensRegistry = EnsRegistryFactory.connect(this._ensRegistryAddress, this._signer);
      this._ensResolver = PublicResolverFactory.connect(this._ensResolverAddress, this._signer);
    }
  };

  IAM.prototype.setDocument = function () {
    return __awaiter(this, void 0, void 0, function () {
      var document_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!(this._did && this._signer)) return [3, 2];
            document_1 = new DIDDocumentFull(this._did, new Operator(this._signer, this._resolverSetting));
            return [4, document_1.create()];

          case 1:
            _a.sent();

            this._document = document_1;
            _a.label = 2;

          case 2:
            return [2];
        }
      });
    });
  };

  IAM.prototype.setClaims = function () {
    if (this._signer && this._document) {
      this._userClaims = new ClaimsUser(this._signer, this._document, this._ipfsStore);
      this._issuerClaims = new ClaimsIssuer(this._signer, this._document, this._ipfsStore);
      this._verifierClaims = new ClaimsVerifier(this._signer, this._document, this._ipfsStore);
    }
  };

  IAM.prototype.setJWT = function () {
    if (this._signer) {
      this._jwt = new JWT(this._signer);
    }
  };

  IAM.prototype.getDid = function () {
    return this._did;
  };

  IAM.prototype.getSigner = function () {
    return this._signer;
  };

  IAM.prototype.initializeConnection = function () {
    return __awaiter(this, void 0, void 0, function () {
      var err_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2,, 3]);

            return [4, this.init()];

          case 1:
            _a.sent();

            return [3, 3];

          case 2:
            err_1 = _a.sent();

            if (err_1 === "User closed modal") {
              return [2, {
                did: undefined,
                connected: false,
                userClosedModal: true
              }];
            }

            console.log(err_1);
            return [3, 3];

          case 3:
            return [2, {
              did: this.getDid(),
              connected: this.isConnected() || false,
              userClosedModal: false
            }];
        }
      });
    });
  };

  IAM.prototype.closeConnection = function () {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4, this._walletConnectProvider.close()];

          case 1:
            _a.sent();

            this._did = undefined;
            this._address = undefined;
            this._signer = undefined;
            return [2];
        }
      });
    });
  };

  IAM.prototype.isConnected = function () {
    return this._walletConnectProvider.connected;
  };

  IAM.prototype.getDidDocument = function () {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (this._did && this._resolver) {
          return [2, this._resolver.read(this._did)];
        }

        return [2, null];
      });
    });
  };

  IAM.prototype.updateDidDocument = function (_a) {
    var didAttribute = _a.didAttribute,
        data = _a.data,
        validity = _a.validity;
    return __awaiter(this, void 0, void 0, function () {
      var updated;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            if (!this._document) return [3, 2];
            return [4, this._document.update(didAttribute, data, validity)];

          case 1:
            updated = _b.sent();
            return [2, updated];

          case 2:
            return [2, false];
        }
      });
    });
  };

  IAM.prototype.revokeDidDocument = function () {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (this._document) {
          return [2, this._document.deactivate()];
        }

        return [2, false];
      });
    });
  };

  IAM.prototype.createPublicClaim = function (_a) {
    var data = _a.data;
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_b) {
        if (this._userClaims) {
          return [2, this._userClaims.createPublicClaim(data)];
        }

        return [2, null];
      });
    });
  };

  IAM.prototype.publishPublicClaim = function (_a) {
    var token = _a.token,
        claimData = _a.claimData;
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_b) {
        if (this._userClaims) {
          return [2, this._userClaims.publishPublicClaim(token, claimData)];
        }

        return [2, null];
      });
    });
  };

  IAM.prototype.createProofClaim = function (_a) {
    var _b;

    var claimUrl = _a.claimUrl,
        saltedFields = _a.saltedFields;
    return __awaiter(this, void 0, void 0, function () {
      var encryptedSaltedFields_1, counter_1;
      return __generator(this, function (_c) {
        if (this._userClaims) {
          encryptedSaltedFields_1 = {};
          counter_1 = 0;
          Object.entries(saltedFields).forEach(function (_a) {
            var _b = __read(_a, 2),
                key = _b[0],
                value = _b[1];

            if (counter_1 % 2 === 0) {
              encryptedSaltedFields_1[key] = {
                value: value,
                encrypted: true
              };
            } else {
              encryptedSaltedFields_1[key] = {
                value: value,
                encrypted: false
              };
            }

            counter_1++;
          });
          return [2, (_b = this._userClaims) === null || _b === void 0 ? void 0 : _b.createProofClaim(claimUrl, encryptedSaltedFields_1)];
        }

        return [2, null];
      });
    });
  };

  IAM.prototype.issuePublicClaim = function (_a) {
    var token = _a.token;
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_b) {
        if (this._issuerClaims) {
          return [2, this._issuerClaims.issuePublicClaim(token)];
        }

        return [2, null];
      });
    });
  };

  IAM.prototype.verifyPublicClaim = function (_a) {
    var issuedToken = _a.issuedToken;
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_b) {
        if (this._verifierClaims) {
          return [2, this._verifierClaims.verifyPublicProof(issuedToken)];
        }

        return [2, null];
      });
    });
  };

  IAM.prototype.createSelfSignedClaim = function (_a) {
    var data = _a.data;
    return __awaiter(this, void 0, void 0, function () {
      var claim;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            if (!this._userClaims) return [3, 3];
            return [4, this._userClaims.createPublicClaim(data)];

          case 1:
            claim = _b.sent();
            return [4, this._userClaims.publishPublicClaim(claim, data)];

          case 2:
            _b.sent();

            _b.label = 3;

          case 3:
            return [2];
        }
      });
    });
  };

  IAM.prototype.getUserClaims = function () {
    return __awaiter(this, void 0, void 0, function () {
      var document_2, services, claims;

      var _this = this;

      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!(this._resolver && this._did)) return [3, 3];
            return [4, this._resolver.read(this._did)];

          case 1:
            document_2 = _a.sent();
            services = document_2.service && document_2.service.length > 1 ? document_2.service : [];
            return [4, Promise.all(services.map(function (_a) {
              var _b;

              return __awaiter(_this, void 0, void 0, function () {
                var data, claimData;

                var serviceEndpoint = _a.serviceEndpoint,
                    rest = __rest(_a, ["serviceEndpoint"]);

                return __generator(this, function (_c) {
                  switch (_c.label) {
                    case 0:
                      return [4, this._ipfsStore.get(serviceEndpoint)];

                    case 1:
                      data = _c.sent();
                      claimData = ((_b = this._jwt) === null || _b === void 0 ? void 0 : _b.decode(data)).claimData;
                      return [2, __assign(__assign({}, rest), claimData)];
                  }
                });
              });
            }))];

          case 2:
            claims = _a.sent();
            return [2, claims];

          case 3:
            return [2, []];
        }
      });
    });
  };

  IAM.prototype.createSubdomain = function (_a) {
    var subdomain = _a.subdomain,
        domain = _a.domain;
    return __awaiter(this, void 0, void 0, function () {
      var roleHash, namespaceHash, ttl, setDomainTx;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            if (!(this._signer && this._ensRegistry && this._address)) return [3, 3];
            roleHash = labelhash(subdomain);
            namespaceHash = namehash(domain);
            ttl = utils.bigNumberify(0);
            return [4, this._ensRegistry.setSubnodeRecord(namespaceHash, roleHash, this._address, this._ensResolverAddress, ttl, {
              gasLimit: utils.hexlify(25000),
              gasPrice: utils.hexlify(10e9)
            })];

          case 1:
            setDomainTx = _b.sent();
            return [4, setDomainTx.wait()];

          case 2:
            _b.sent();

            console.log("Subdomain " + (subdomain + "." + domain) + " created");
            _b.label = 3;

          case 3:
            return [2];
        }
      });
    });
  };

  IAM.prototype.setDomainName = function (_a) {
    var domain = _a.domain;
    return __awaiter(this, void 0, void 0, function () {
      var namespaceHash, setDomainNameTx;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            if (!this._ensResolver) return [3, 3];
            namespaceHash = namehash(domain);
            return [4, this._ensResolver.setName(namespaceHash, domain, {
              gasLimit: utils.hexlify(25000),
              gasPrice: utils.hexlify(10e9)
            })];

          case 1:
            setDomainNameTx = _b.sent();
            return [4, setDomainNameTx.wait()];

          case 2:
            _b.sent();

            console.log("Set the name of the domain to " + domain);
            _b.label = 3;

          case 3:
            return [2];
        }
      });
    });
  };

  IAM.prototype.getFilteredDomainsFromEvent = function (_a) {
    var domain = _a.domain;
    return __awaiter(this, void 0, void 0, function () {
      var ensInterface_1, Event_1, filter, logs, rawLogs, domains, uniqDomains, domains_1, domains_1_1, item;

      var e_1, _b;

      var _this = this;

      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            if (!(this._ensResolver && this._provider)) return [3, 3];
            ensInterface_1 = new utils.Interface(abi);
            Event_1 = this._ensResolver.filters.TextChanged(null, "metadata", null);
            filter = {
              fromBlock: 0,
              toBlock: "latest",
              address: Event_1.address,
              topics: __spread(Event_1.topics)
            };
            return [4, this._provider.getLogs(filter)];

          case 1:
            logs = _c.sent();
            rawLogs = logs.map(function (log) {
              var parsedLog = ensInterface_1.parseLog(log);
              return parsedLog.values;
            });
            return [4, Promise.all(rawLogs.map(function (_a) {
              var node = _a.node;
              return __awaiter(_this, void 0, void 0, function () {
                var _b;

                return __generator(this, function (_c) {
                  return [2, (_b = this._ensResolver) === null || _b === void 0 ? void 0 : _b.name(node)];
                });
              });
            }))];

          case 2:
            domains = _c.sent();
            uniqDomains = {};

            try {
              for (domains_1 = __values(domains), domains_1_1 = domains_1.next(); !domains_1_1.done; domains_1_1 = domains_1.next()) {
                item = domains_1_1.value;

                if (item && item.endsWith(domain) && !uniqDomains[item]) {
                  uniqDomains[item] = null;
                }
              }
            } catch (e_1_1) {
              e_1 = {
                error: e_1_1
              };
            } finally {
              try {
                if (domains_1_1 && !domains_1_1.done && (_b = domains_1["return"])) _b.call(domains_1);
              } finally {
                if (e_1) throw e_1.error;
              }
            }

            return [2, Object.keys(uniqDomains)];

          case 3:
            return [2, []];
        }
      });
    });
  };

  IAM.prototype.setRoleDefinition = function (_a) {
    var domain = _a.domain,
        data = _a.data;
    return __awaiter(this, void 0, void 0, function () {
      var namespaceHash, setTextTx;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            if (!(this._signer && this._ensResolver)) return [3, 3];
            namespaceHash = namehash(domain);
            return [4, this._ensResolver.setText(namespaceHash, "metadata", data, {
              gasLimit: utils.hexlify(25000),
              gasPrice: utils.hexlify(10e9)
            })];

          case 1:
            setTextTx = _b.sent();
            return [4, setTextTx.wait()];

          case 2:
            _b.sent();

            console.log("Added data: " + data + " to " + domain + " metadata");
            _b.label = 3;

          case 3:
            return [2];
        }
      });
    });
  };

  IAM.prototype.createRole = function (_a) {
    var roleName = _a.roleName,
        namespace = _a.namespace,
        data = _a.data;
    return __awaiter(this, void 0, void 0, function () {
      var newDomain;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            newDomain = roleName + "." + namespace;
            return [4, this.createSubdomain({
              subdomain: roleName,
              domain: namespace
            })];

          case 1:
            _b.sent();

            return [4, this.setDomainName({
              domain: newDomain
            })];

          case 2:
            _b.sent();

            return [4, this.setRoleDefinition({
              data: data,
              domain: newDomain
            })];

          case 3:
            _b.sent();

            return [2];
        }
      });
    });
  };

  IAM.prototype.getRoleDefinition = function (_a) {
    var roleName = _a.roleName;
    return __awaiter(this, void 0, void 0, function () {
      var roleHash, meta;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            if (!this._ensResolver) return [3, 2];
            roleHash = namehash(roleName);
            return [4, this._ensResolver.text(roleHash, "metadata")];

          case 1:
            meta = _b.sent();
            return [2, meta];

          case 2:
            return [2, ""];
        }
      });
    });
  };

  IAM.prototype.getSubdomains = function (_a) {
    var domain = _a.domain;
    return __awaiter(this, void 0, void 0, function () {
      var domains, role, subdomains, domains_2, domains_2_1, name_1, nameArray;

      var e_2, _b;

      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            if (!this._ensRegistry) return [3, 2];
            return [4, this.getFilteredDomainsFromEvent({
              domain: domain
            })];

          case 1:
            domains = _c.sent();
            role = domain.split(".");
            subdomains = [];

            try {
              for (domains_2 = __values(domains), domains_2_1 = domains_2.next(); !domains_2_1.done; domains_2_1 = domains_2.next()) {
                name_1 = domains_2_1.value;
                nameArray = name_1.split(".").reverse();
                if (nameArray.length <= role.length) return [2];
                subdomains.push(nameArray[role.length]);
              }
            } catch (e_2_1) {
              e_2 = {
                error: e_2_1
              };
            } finally {
              try {
                if (domains_2_1 && !domains_2_1.done && (_b = domains_2["return"])) _b.call(domains_2);
              } finally {
                if (e_2) throw e_2.error;
              }
            }

            return [2, subdomains];

          case 2:
            return [2, []];
        }
      });
    });
  };

  IAM.prototype.checkExistenceOfDomain = function (_a) {
    var domain = _a.domain;
    return __awaiter(this, void 0, void 0, function () {
      var domainHash;
      return __generator(this, function (_b) {
        if (this._ensRegistry) {
          domainHash = namehash(domain);
          return [2, this._ensRegistry.recordExists(domainHash)];
        }

        return [2, false];
      });
    });
  };

  IAM.prototype.isOwner = function (_a) {
    var domain = _a.domain,
        _b = _a.user,
        user = _b === void 0 ? this._address : _b;
    return __awaiter(this, void 0, void 0, function () {
      var domainHash, owner;
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            if (!this._ensRegistry) return [3, 2];
            domainHash = namehash(domain);
            return [4, this._ensRegistry.owner(domainHash)];

          case 1:
            owner = _c.sent();
            return [2, owner === user];

          case 2:
            return [2, false];
        }
      });
    });
  };

  IAM.prototype.getOrgRoles = function (orgKey) {
    return __awaiter(this, void 0, void 0, function () {
      var _a;

      return __generator(this, function (_b) {
        return [2, [(_a = {}, _a[orgKey] = orgKey, _a)]];
      });
    });
  };

  IAM.prototype.enrol = function (data) {
    return __awaiter(this, void 0, void 0, function () {
      var enrolmentStatus;
      return __generator(this, function (_a) {
        enrolmentStatus = __assign({}, data);
        return [2, enrolmentStatus];
      });
    });
  };

  IAM.prototype.getEnrolmentStatus = function () {
    return __awaiter(this, void 0, void 0, function () {
      var enrolmentStatus;
      return __generator(this, function (_a) {
        enrolmentStatus = {};
        return [2, enrolmentStatus];
      });
    });
  };

  IAM.prototype.getIdentities = function () {
    return null;
  };

  return IAM;
}();

var EnrolmentFormData = function () {
  function EnrolmentFormData(orgKey, appId, roleId, firstName, lastName, meteringId, emailAddress) {
    orgKey = orgKey ? orgKey.trim() : orgKey;
    appId = appId ? appId.trim() : appId;
    roleId = roleId ? roleId.trim() : roleId;
    firstName = firstName ? firstName.trim() : firstName;
    lastName = lastName ? lastName.trim() : lastName;
    meteringId = meteringId ? meteringId.trim() : meteringId;
    emailAddress = emailAddress ? emailAddress.trim() : emailAddress;

    if (!this.isValidFormData(orgKey, appId, roleId, firstName, lastName, meteringId, emailAddress)) {
      throw new Error("[IAM] Enrolment Form Data must not contain empty field.");
    }

    this.orgKey = orgKey;
    this.appId = appId;
    this.roleId = roleId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.meteringId = meteringId;
    this.emailAddress = emailAddress;
  }

  EnrolmentFormData.prototype.isValidFormData = function (orgKey, appId, roleId, firstName, lastName, meteringId, emailAddress) {
    var isValidFormData = true;

    if (!orgKey || !appId || !roleId || !firstName || !lastName || !meteringId || !emailAddress) {
      isValidFormData = false;
    }

    return isValidFormData;
  };

  return EnrolmentFormData;
}();

export { EnrolmentFormData, IAM };
