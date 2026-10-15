'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var ethers = require('ethers');
var tslib = require('tslib');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ('value' in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, 'prototype', {
    writable: false,
  });
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function');
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true,
    },
  });
  Object.defineProperty(subClass, 'prototype', {
    writable: false,
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === 'function') return true;

  try {
    Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {})
    );
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === 'object' || typeof call === 'function')) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError(
      'Derived constructors may only return object or undefined'
    );
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

function _get() {
  if (typeof Reflect !== 'undefined' && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);

      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(arguments.length < 3 ? target : receiver);
      }

      return desc.value;
    };
  }

  return _get.apply(this, arguments);
}

function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) ||
    _iterableToArrayLimit(arr, i) ||
    _unsupportedIterableToArray(arr, i) ||
    _nonIterableRest()
  );
}

function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) ||
    _iterableToArray(arr) ||
    _unsupportedIterableToArray(arr) ||
    _nonIterableSpread()
  );
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (
    (typeof Symbol !== 'undefined' && iter[Symbol.iterator] != null) ||
    iter['@@iterator'] != null
  )
    return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _i =
    arr == null
      ? null
      : (typeof Symbol !== 'undefined' && arr[Symbol.iterator]) ||
        arr['@@iterator'];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i['return'] != null) _i['return']();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === 'Object' && o.constructor) n = o.constructor.name;
  if (n === 'Map' || n === 'Set') return Array.from(o);
  if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError(
    'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
  );
}

function _nonIterableRest() {
  throw new TypeError(
    'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
  );
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it =
    (typeof Symbol !== 'undefined' && o[Symbol.iterator]) || o['@@iterator'];

  if (!it) {
    if (
      Array.isArray(o) ||
      (it = _unsupportedIterableToArray(o)) ||
      (allowArrayLike && o && typeof o.length === 'number')
    ) {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length)
            return {
              done: true,
            };
          return {
            done: false,
            value: o[i++],
          };
        },
        e: function (e) {
          throw e;
        },
        f: F,
      };
    }

    throw new TypeError(
      'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
    );
  }

  var normalCompletion = true,
    didErr = false,
    err;
  return {
    s: function () {
      it = it.call(o);
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    },
  };
}

exports.PreconditionType = void 0;

(function (PreconditionType) {
  PreconditionType['Role'] = 'role';
})(exports.PreconditionType || (exports.PreconditionType = {}));

// Volta chain
var VOLTA_CHAIN_ID = 73799;
var VOLTA_PUBLIC_RESOLVER_ADDRESS =
  '0x0a97e07c4Df22e2e31872F20C5BE191D5EFc4680';
var VOLTA_RESOLVER_V1_ADDRESS = '0xf5EA22c1F799d425356c2aab2004200Ab4490D2b';
var VOLTA_DOMAIN_NOTIFER_ADDRESS = '0xeea658026d6CDede4380D3aD030beAC911758A93';
var VOLTA_ENS_REGISTRY_ADDRESS = '0xd7CeF70Ba7efc2035256d828d5287e2D285CD1ac';
var VOLTA_CLAIM_MANAGER_ADDRESS = '0x5339adE9332A604A1c957B9bC1C6eee0Bcf7a031';
var VOLTA_IDENTITY_MANAGER_ADDRESS =
  '0x84d0c7284A869213CB047595d34d6044d9a7E14A';
var VOLTA_REWARD_POOL_ADDRESS = '0x6d832DDd386F1dFA53d5b0cACcFF509f95D345Ca';
var VOLTA_RESOLVER_V2_ADDRESS = '0xcf72f16Ab886776232bea2fcf3689761a0b74EfE'; // EWC chain

var EWC_CHAIN_ID = 246;
var EWC_CLAIM_MANAGER_ADDRESS = '0x23b026631A6f265d17CFee8aa6ced1B244f3920C';
var EWC_ENS_REGISTRY_ADDRESS = '0x0A6d64413c07E10E890220BBE1c49170080C6Ca0';
var EWC_RESOLVER_V1_ADDRESS = '0x70ad37DfeB1C05290F4bBd22188FA19Bc154A0ea';
var EWC_PUBLIC_RESOLVER_ADDRESS = '0xA517983Bd4Af4DF0Ed9b52DA4BC405d0A95eE7E2';
var EWC_DOMAIN_NOTIFER_ADDRESS = '0x5491Db3cC1f3AFf6C229e061735F92936004da3c';
var EWC_IDENTITY_MANAGER_ADDRESS = '0x2d1569f3a2006d21c0dc60eb13c8557b63ce5a8d';
var EWC_ADDRESS_1056 = '0xE29672f34e92b56C9169f9D485fFc8b9A136BCE4';
var EWC_RESOLVER_V2_ADDRESS = '0x70ad37DfeB1C05290F4bBd22188FA19Bc154A0ea';

var _abi$4 = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'approved',
        type: 'bool',
      },
    ],
    name: 'ApprovalForAll',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'label',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'NewOwner',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'resolver',
        type: 'address',
      },
    ],
    name: 'NewResolver',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'ttl',
        type: 'uint64',
      },
    ],
    name: 'NewTTL',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
    ],
    name: 'isApprovedForAll',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'recordExists',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'resolver',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'approved',
        type: 'bool',
      },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'setOwner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'resolver',
        type: 'address',
      },
      {
        internalType: 'uint64',
        name: 'ttl',
        type: 'uint64',
      },
    ],
    name: 'setRecord',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'resolver',
        type: 'address',
      },
    ],
    name: 'setResolver',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'label',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'setSubnodeOwner',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'label',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'resolver',
        type: 'address',
      },
      {
        internalType: 'uint64',
        name: 'ttl',
        type: 'uint64',
      },
    ],
    name: 'setSubnodeRecord',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'uint64',
        name: 'ttl',
        type: 'uint64',
      },
    ],
    name: 'setTTL',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'ttl',
    outputs: [
      {
        internalType: 'uint64',
        name: '',
        type: 'uint64',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
var _bytecode$4 =
  '0x608060405234801561001057600080fd5b50336000808060001b815260200190815260200160002060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550611219806100776000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c80635b0fc9c3116100715780635b0fc9c3146101b15780635ef2c7f0146101cd578063a22cb465146101e9578063cf40882314610205578063e985e9c514610221578063f79fe53814610251576100b4565b80630178b8bf146100b957806302571be3146100e957806306ab59231461011957806314ab90381461014957806316a25cbd146101655780631896f70a14610195575b600080fd5b6100d360048036038101906100ce9190610e6c565b610281565b6040516100e091906110b5565b60405180910390f35b61010360048036038101906100fe9190610e6c565b6102c0565b60405161011091906110b5565b60405180910390f35b610133600480360381019061012e9190610f34565b610343565b60405161014091906110eb565b60405180910390f35b610163600480360381019061015e9190610ffa565b6104c6565b005b61017f600480360381019061017a9190610e6c565b610644565b60405161018c9190611106565b60405180910390f35b6101af60048036038101906101aa9190610e95565b610677565b005b6101cb60048036038101906101c69190610e95565b61080d565b005b6101e760048036038101906101e29190610f83565b610959565b005b61020360048036038101906101fe9190610e30565b61097b565b005b61021f600480360381019061021a9190610ed1565b610a78565b005b61023b60048036038101906102369190610df4565b610a93565b60405161024891906110d0565b60405180910390f35b61026b60048036038101906102669190610e6c565b610b27565b60405161027891906110d0565b60405180910390f35b600080600083815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b60008060008084815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690503073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141561033957600091505061033e565b809150505b919050565b600083600080600083815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690503373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614806104405750600160008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b61044957600080fd5b6000868660405160200161045e929190611089565b6040516020818303038152906040528051906020012090506104808186610b95565b85877fce0457fe73731f824cc272376169235128c118b49d344817417c6d108d155e82876040516104b191906110b5565b60405180910390a38093505050509392505050565b81600080600083815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690503373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614806105c15750600160008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b6105ca57600080fd5b837f1d4f9bbfc9cab89d66e1a1562f2233ccbf1308cb4f63de2ead5787adddb8fa68846040516105fa9190611106565b60405180910390a28260008086815260200190815260200160002060010160146101000a81548167ffffffffffffffff021916908367ffffffffffffffff16021790555050505050565b600080600083815260200190815260200160002060010160149054906101000a900467ffffffffffffffff169050919050565b81600080600083815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690503373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614806107725750600160008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b61077b57600080fd5b837f335721b01866dc23fbee8b6b2c7b1e14d6f05c28cd35a2c934239f94095602a0846040516107ab91906110b5565b60405180910390a28260008086815260200190815260200160002060010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050505050565b81600080600083815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690503373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614806109085750600160008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b61091157600080fd5b61091b8484610b95565b837fd4735d920b0f87494915f556dd9b54c8f309026070caea5c737245152564d2668460405161094b91906110b5565b60405180910390a250505050565b6000610966868686610343565b9050610973818484610bed565b505050505050565b80600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3183604051610a6c91906110d0565b60405180910390a35050565b610a82848461080d565b610a8d848383610bed565b50505050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b60008073ffffffffffffffffffffffffffffffffffffffff1660008084815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614159050919050565b8060008084815260200190815260200160002060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050565b60008084815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614610ce2578160008085815260200190815260200160002060010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550827f335721b01866dc23fbee8b6b2c7b1e14d6f05c28cd35a2c934239f94095602a083604051610cd991906110b5565b60405180910390a25b60008084815260200190815260200160002060010160149054906101000a900467ffffffffffffffff1667ffffffffffffffff168167ffffffffffffffff1614610d9b578060008085815260200190815260200160002060010160146101000a81548167ffffffffffffffff021916908367ffffffffffffffff160217905550827f1d4f9bbfc9cab89d66e1a1562f2233ccbf1308cb4f63de2ead5787adddb8fa6882604051610d929190611106565b60405180910390a25b505050565b600081359050610daf81611187565b92915050565b600081359050610dc48161119e565b92915050565b600081359050610dd9816111b5565b92915050565b600081359050610dee816111cc565b92915050565b60008060408385031215610e0757600080fd5b6000610e1585828601610da0565b9250506020610e2685828601610da0565b9150509250929050565b60008060408385031215610e4357600080fd5b6000610e5185828601610da0565b9250506020610e6285828601610db5565b9150509250929050565b600060208284031215610e7e57600080fd5b6000610e8c84828501610dca565b91505092915050565b60008060408385031215610ea857600080fd5b6000610eb685828601610dca565b9250506020610ec785828601610da0565b9150509250929050565b60008060008060808587031215610ee757600080fd5b6000610ef587828801610dca565b9450506020610f0687828801610da0565b9350506040610f1787828801610da0565b9250506060610f2887828801610ddf565b91505092959194509250565b600080600060608486031215610f4957600080fd5b6000610f5786828701610dca565b9350506020610f6886828701610dca565b9250506040610f7986828701610da0565b9150509250925092565b600080600080600060a08688031215610f9b57600080fd5b6000610fa988828901610dca565b9550506020610fba88828901610dca565b9450506040610fcb88828901610da0565b9350506060610fdc88828901610da0565b9250506080610fed88828901610ddf565b9150509295509295909350565b6000806040838503121561100d57600080fd5b600061101b85828601610dca565b925050602061102c85828601610ddf565b9150509250929050565b61103f81611121565b82525050565b61104e81611133565b82525050565b61105d8161113f565b82525050565b61107461106f8261113f565b61117d565b82525050565b61108381611169565b82525050565b60006110958285611063565b6020820191506110a58284611063565b6020820191508190509392505050565b60006020820190506110ca6000830184611036565b92915050565b60006020820190506110e56000830184611045565b92915050565b60006020820190506111006000830184611054565b92915050565b600060208201905061111b600083018461107a565b92915050565b600061112c82611149565b9050919050565b60008115159050919050565b6000819050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600067ffffffffffffffff82169050919050565b6000819050919050565b61119081611121565b811461119b57600080fd5b50565b6111a781611133565b81146111b257600080fd5b50565b6111be8161113f565b81146111c957600080fd5b50565b6111d581611169565b81146111e057600080fd5b5056fea26469706673582212201ab8164453ecffb88b7d617dd74a64f968b9670672c9b5ea5a0ba74ee6b866c964736f6c63430008040033';

var isSuperArgs$4 = function isSuperArgs(xs) {
  return xs.length > 1;
};

var ENSRegistry__factory = /*#__PURE__*/ (function (_ContractFactory) {
  _inherits(ENSRegistry__factory, _ContractFactory);

  var _super = _createSuper(ENSRegistry__factory);

  function ENSRegistry__factory() {
    var _this;

    _classCallCheck(this, ENSRegistry__factory);

    for (
      var _len = arguments.length, args = new Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key];
    }

    if (isSuperArgs$4(args)) {
      _this = _super.call.apply(_super, [this].concat(args));
    } else {
      _this = _super.call(this, _abi$4, _bytecode$4, args[0]);
    }

    _this.contractName = 'ENSRegistry';
    return _possibleConstructorReturn(_this);
  }

  _createClass(
    ENSRegistry__factory,
    [
      {
        key: 'deploy',
        value: function deploy(overrides) {
          return _get(
            _getPrototypeOf(ENSRegistry__factory.prototype),
            'deploy',
            this
          ).call(this, overrides || {});
        },
      },
      {
        key: 'getDeployTransaction',
        value: function getDeployTransaction(overrides) {
          return _get(
            _getPrototypeOf(ENSRegistry__factory.prototype),
            'getDeployTransaction',
            this
          ).call(this, overrides || {});
        },
      },
      {
        key: 'attach',
        value: function attach(address) {
          return _get(
            _getPrototypeOf(ENSRegistry__factory.prototype),
            'attach',
            this
          ).call(this, address);
        },
      },
      {
        key: 'connect',
        value: function connect(signer) {
          return _get(
            _getPrototypeOf(ENSRegistry__factory.prototype),
            'connect',
            this
          ).call(this, signer);
        },
      },
    ],
    [
      {
        key: 'createInterface',
        value: function createInterface() {
          return new ethers.utils.Interface(_abi$4);
        },
      },
      {
        key: 'connect',
        value: function connect(address, signerOrProvider) {
          return new ethers.Contract(address, _abi$4, signerOrProvider);
        },
      },
    ]
  );

  return ENSRegistry__factory;
})(ethers.ContractFactory);
ENSRegistry__factory.bytecode = _bytecode$4;
ENSRegistry__factory.abi = _abi$4;

var _abi$3 = [
  {
    inputs: [
      {
        internalType: 'contract ENS',
        name: '_ens',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'contentType',
        type: 'uint256',
      },
    ],
    name: 'ABIChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'a',
        type: 'address',
      },
    ],
    name: 'AddrChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'coinType',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'newAddress',
        type: 'bytes',
      },
    ],
    name: 'AddressChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'target',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'isAuthorised',
        type: 'bool',
      },
    ],
    name: 'AuthorisationChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'hash',
        type: 'bytes',
      },
    ],
    name: 'ContenthashChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'name',
        type: 'bytes',
      },
      {
        indexed: false,
        internalType: 'uint16',
        name: 'resource',
        type: 'uint16',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'record',
        type: 'bytes',
      },
    ],
    name: 'DNSRecordChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'name',
        type: 'bytes',
      },
      {
        indexed: false,
        internalType: 'uint16',
        name: 'resource',
        type: 'uint16',
      },
    ],
    name: 'DNSRecordDeleted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'DNSZoneCleared',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'lastzonehash',
        type: 'bytes',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'zonehash',
        type: 'bytes',
      },
    ],
    name: 'DNSZonehashChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'bytes4',
        name: 'interfaceID',
        type: 'bytes4',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'implementer',
        type: 'address',
      },
    ],
    name: 'InterfaceChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
    ],
    name: 'NameChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'x',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'y',
        type: 'bytes32',
      },
    ],
    name: 'PubkeyChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'string',
        name: 'indexedKey',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'key',
        type: 'string',
      },
    ],
    name: 'TextChanged',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'contentTypes',
        type: 'uint256',
      },
    ],
    name: 'ABI',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'addr',
    outputs: [
      {
        internalType: 'address payable',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'coinType',
        type: 'uint256',
      },
    ],
    name: 'addr',
    outputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'authorisations',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'clearDNSZone',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'contenthash',
    outputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'name',
        type: 'bytes32',
      },
      {
        internalType: 'uint16',
        name: 'resource',
        type: 'uint16',
      },
    ],
    name: 'dnsRecord',
    outputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'name',
        type: 'bytes32',
      },
    ],
    name: 'hasDNSRecords',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes4',
        name: 'interfaceID',
        type: 'bytes4',
      },
    ],
    name: 'interfaceImplementer',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes[]',
        name: 'data',
        type: 'bytes[]',
      },
    ],
    name: 'multicall',
    outputs: [
      {
        internalType: 'bytes[]',
        name: 'results',
        type: 'bytes[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'pubkey',
    outputs: [
      {
        internalType: 'bytes32',
        name: 'x',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'y',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'contentType',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'setABI',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'coinType',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'a',
        type: 'bytes',
      },
    ],
    name: 'setAddr',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'a',
        type: 'address',
      },
    ],
    name: 'setAddr',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'target',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'isAuthorised',
        type: 'bool',
      },
    ],
    name: 'setAuthorisation',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes',
        name: 'hash',
        type: 'bytes',
      },
    ],
    name: 'setContenthash',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'setDNSRecords',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes4',
        name: 'interfaceID',
        type: 'bytes4',
      },
      {
        internalType: 'address',
        name: 'implementer',
        type: 'address',
      },
    ],
    name: 'setInterface',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
    ],
    name: 'setName',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'x',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'y',
        type: 'bytes32',
      },
    ],
    name: 'setPubkey',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'string',
        name: 'key',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'value',
        type: 'string',
      },
    ],
    name: 'setText',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes',
        name: 'hash',
        type: 'bytes',
      },
    ],
    name: 'setZonehash',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceID',
        type: 'bytes4',
      },
    ],
    name: 'supportsInterface',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'string',
        name: 'key',
        type: 'string',
      },
    ],
    name: 'text',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'zonehash',
    outputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
var _bytecode$3 =
  '0x60806040523480156200001157600080fd5b5060405162003f1538038062003f15833981810160405281019062000037919062000096565b80600b60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505062000124565b60008151905062000090816200010a565b92915050565b600060208284031215620000a957600080fd5b6000620000b9848285016200007f565b91505092915050565b6000620000cf82620000ea565b9050919050565b6000620000e382620000c2565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6200011581620000d6565b81146200012157600080fd5b50565b613de180620001346000396000f3fe608060405234801561001057600080fd5b506004361061018e5760003560e01c8063691f3431116100de578063bc1c58d111610097578063d5fa2b0011610071578063d5fa2b00146104ed578063e59d895d14610509578063f1cb7e0614610525578063f86bc879146105555761018e565b8063bc1c58d114610470578063c8690233146104a0578063ce3decdc146104d15761018e565b8063691f34311461038c57806377372213146103bc5780638b95dd71146103d8578063a8fa5682146103f4578063ac9650d814610424578063ad5780af146104545761018e565b8063304e6ade1161014b5780634cbf6ba4116101255780634cbf6ba4146102e057806359d1d43c146103105780635c98042b14610340578063623195b0146103705761018e565b8063304e6ade146102785780633b3b57de146102945780633e9ce794146102c45761018e565b806301ffc9a7146101935780630af179d7146101c357806310f13a8c146101df578063124a319c146101fb5780632203ab561461022b57806329cd62ea1461025c575b600080fd5b6101ad60048036038101906101a89190613353565b610585565b6040516101ba91906136b9565b60405180910390f35b6101dd60048036038101906101d8919061310b565b610597565b005b6101f960048036038101906101f491906131bb565b6107c9565b005b61021560048036038101906102109190613080565b610877565b6040516102229190613646565b60405180910390f35b61024560048036038101906102409190613244565b610cbb565b60405161025392919061386d565b60405180910390f35b61027660048036038101906102719190612fe2565b610def565b005b610292600480360381019061028d919061310b565b610e81565b005b6102ae60048036038101906102a99190612ea3565b610ef7565b6040516102bb919061367c565b60405180910390f35b6102de60048036038101906102d99190612f57565b610f2d565b005b6102fa60048036038101906102f59190612fa6565b61103d565b60405161030791906136b9565b60405180910390f35b61032a60048036038101906103259190613163565b6110a5565b604051610337919061384b565b60405180910390f35b61035a60048036038101906103559190612ea3565b61116a565b6040516103679190613757565b60405180910390f35b61038a60048036038101906103859190613280565b61120f565b005b6103a660048036038101906103a19190612ea3565b6112a5565b6040516103b3919061384b565b60405180910390f35b6103d660048036038101906103d19190613163565b61134a565b005b6103f260048036038101906103ed91906132ec565b6113c0565b005b61040e60048036038101906104099190613031565b611496565b60405161041b9190613757565b60405180910390f35b61043e60048036038101906104399190612e5e565b61158b565b60405161044b9190613697565b60405180910390f35b61046e60048036038101906104699190612ea3565b611737565b005b61048a60048036038101906104859190612ea3565b6117a4565b6040516104979190613757565b60405180910390f35b6104ba60048036038101906104b59190612ea3565b611849565b6040516104c89291906136ef565b60405180910390f35b6104eb60048036038101906104e6919061310b565b611883565b005b61050760048036038101906105029190612ecc565b61199c565b005b610523600480360381019061051e91906130bc565b6119c8565b005b61053f600480360381019061053a9190613244565b611ada565b60405161054c9190613757565b60405180910390f35b61056f600480360381019061056a9190612f08565b611b91565b60405161057c91906136b9565b60405180910390f35b600061059082611bcd565b9050919050565b826105a181611c2e565b6105aa57600080fd5b60008060608060008061060b60008a8a8080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050611db790919063ffffffff16565b90505b61061781611de1565b61074d5760008661ffff161415610673578060400151955061063881611df7565b93508360405160200161064b9190613616565b60405160208183030381529060405280519060200120915061066c81611e2e565b925061073f565b600061067e82611df7565b9050816040015161ffff168761ffff161415806106ab57506106a98186611e6790919063ffffffff16565b155b1561073d576107168b86898d8d8080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050508a8b886020015161070c9190613a38565b60008b5114611e8e565b81604001519650816020015195508094508480519060200120925061073a82611e2e565b93505b505b610748816121b9565b61060e565b506000835111156107be576107bd8984878b8b8080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505088898e8e90506107b39190613a38565b6000895114611e8e565b5b505050505050505050565b846107d381611c2e565b6107dc57600080fd5b8282600a6000898152602001908152602001600020878760405161080192919061362d565b9081526020016040518091039020919061081c929190612a22565b50848460405161082d92919061362d565b6040518091039020867fd8c9334b1a9c2f9da342a0a2b32629c1a229b6445dad78947f674b44444a75508787604051610867929190613827565b60405180910390a3505050505050565b600080600760008581526020019081526020016000206000847bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161461093c5780915050610cb5565b600061094785610ef7565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141561098957600092505050610cb5565b6000808273ffffffffffffffffffffffffffffffffffffffff166301ffc9a760e01b6040516024016109bb9190613718565b6040516020818303038152906040527f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050604051610a459190613616565b600060405180830381855afa9150503d8060008114610a80576040519150601f19603f3d011682016040523d82523d6000602084013e610a85565b606091505b5091509150811580610a98575060208151105b80610b0c5750600060f81b81601f81518110610add577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602001015160f81c60f81b7effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b15610b1e576000945050505050610cb5565b8273ffffffffffffffffffffffffffffffffffffffff1686604051602401610b469190613718565b6040516020818303038152906040527f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050604051610bd09190613616565b600060405180830381855afa9150503d8060008114610c0b576040519150601f19603f3d011682016040523d82523d6000602084013e610c10565b606091505b508092508193505050811580610c27575060208151105b80610c9b5750600060f81b81601f81518110610c6c577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602001015160f81c60f81b7effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b15610cad576000945050505050610cb5565b829450505050505b92915050565b60006060600080600086815260200190815260200160002090506000600190505b848111610dcf57600085821614158015610d14575060008260008381526020019081526020016000208054610d1090613bac565b9050115b15610dc35780826000838152602001908152602001600020808054610d3890613bac565b80601f0160208091040260200160405190810160405280929190818152602001828054610d6490613bac565b8015610db15780601f10610d8657610100808354040283529160200191610db1565b820191906000526020600020905b815481529060010190602001808311610d9457829003601f168201915b50505050509050935093505050610de8565b600181901b9050610cdc565b5060006040518060200160405280600081525092509250505b9250929050565b82610df981611c2e565b610e0257600080fd5b604051806040016040528084815260200183815250600960008681526020019081526020016000206000820151816000015560208201518160010155905050837f1d6f5e03d3f63eb58751986629a5439baee5079ff04f345becb66e23eb154e468484604051610e739291906136ef565b60405180910390a250505050565b82610e8b81611c2e565b610e9457600080fd5b8282600260008781526020019081526020016000209190610eb6929190612aa8565b50837fe379c1624ed7e714cc0937528a32359d69d5281337765313dba4e081b72d75788484604051610ee9929190613733565b60405180910390a250505050565b600080610f0583603c611ada565b9050600081511415610f1b576000915050610f28565b610f2481612303565b9150505b919050565b80600c600085815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16847fe1c5610a6e0cbe10764ecd182adcef1ec338dc4e199c99c32ce98f38e12791df8460405161103091906136b9565b60405180910390a4505050565b60008060066000858152602001908152602001600020600060046000878152602001908152602001600020548152602001908152602001600020600084815260200190815260200160002060009054906101000a900461ffff1661ffff161415905092915050565b6060600a600085815260200190815260200160002083836040516110ca92919061362d565b908152602001604051809103902080546110e390613bac565b80601f016020809104026020016040519081016040528092919081815260200182805461110f90613bac565b801561115c5780601f106111315761010080835404028352916020019161115c565b820191906000526020600020905b81548152906001019060200180831161113f57829003601f168201915b505050505090509392505050565b606060036000838152602001908152602001600020805461118a90613bac565b80601f01602080910402602001604051908101604052809291908181526020018280546111b690613bac565b80156112035780601f106111d857610100808354040283529160200191611203565b820191906000526020600020905b8154815290600101906020018083116111e657829003601f168201915b50505050509050919050565b8361121981611c2e565b61122257600080fd5b6000846001866112329190613a38565b161461123d57600080fd5b82826000808881526020019081526020016000206000878152602001908152602001600020919061126f929190612aa8565b5083857faa121bbeef5f32f5961a2a28966e769023910fc9479059ee3495d4c1a696efe360405160405180910390a35050505050565b60606008600083815260200190815260200160002080546112c590613bac565b80601f01602080910402602001604051908101604052809291908181526020018280546112f190613bac565b801561133e5780601f106113135761010080835404028352916020019161133e565b820191906000526020600020905b81548152906001019060200180831161132157829003601f168201915b50505050509050919050565b8261135481611c2e565b61135d57600080fd5b828260086000878152602001908152602001600020919061137f929190612a22565b50837fb7d29e911041e8d9b843369e890bcb72c9388692ba48b65ac54e7214c4c348f784846040516113b2929190613827565b60405180910390a250505050565b826113ca81611c2e565b6113d357600080fd5b837f65412581168e88a1e60c6459d7f44ae83ad0832e670826c05a4e2476b57af752848460405161140592919061386d565b60405180910390a2603c83141561145757837f52d7d861f09ab3d26239d492e8968629f95e9e318cf0b73bfddc441522a15fd261144184612303565b60405161144e9190613661565b60405180910390a25b81600160008681526020019081526020016000206000858152602001908152602001600020908051906020019061148f929190612b2e565b5050505050565b606060056000858152602001908152602001600020600060046000878152602001908152602001600020548152602001908152602001600020600084815260200190815260200160002060008361ffff1661ffff168152602001908152602001600020805461150490613bac565b80601f016020809104026020016040519081016040528092919081815260200182805461153090613bac565b801561157d5780601f106115525761010080835404028352916020019161157d565b820191906000526020600020905b81548152906001019060200180831161156057829003601f168201915b505050505090509392505050565b60608282905067ffffffffffffffff8111156115d0577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b60405190808252806020026020018201604052801561160357816020015b60608152602001906001900390816115ee5790505b50905060005b83839050811015611730576000803073ffffffffffffffffffffffffffffffffffffffff16868685818110611667577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b9050602002810190611679919061389d565b6040516116879291906135fd565b600060405180830381855af49150503d80600081146116c2576040519150601f19603f3d011682016040523d82523d6000602084013e6116c7565b606091505b5091509150816116d657600080fd5b80848481518110611710577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200260200101819052505050808061172890613c3a565b915050611609565b5092915050565b8061174181611c2e565b61174a57600080fd5b60046000838152602001908152602001600020600081548092919061176e90613c3a565b9190505550817fb757169b8492ca2f1c6619d9d76ce22803035c3b1d5f6930dffe7b127c1a198360405160405180910390a25050565b60606002600083815260200190815260200160002080546117c490613bac565b80601f01602080910402602001604051908101604052809291908181526020018280546117f090613bac565b801561183d5780601f106118125761010080835404028352916020019161183d565b820191906000526020600020905b81548152906001019060200180831161182057829003601f168201915b50505050509050919050565b6000806009600084815260200190815260200160002060000154600960008581526020019081526020016000206001015491509150915091565b8261188d81611c2e565b61189657600080fd5b60006003600086815260200190815260200160002080546118b690613bac565b80601f01602080910402602001604051908101604052809291908181526020018280546118e290613bac565b801561192f5780601f106119045761010080835404028352916020019161192f565b820191906000526020600020905b81548152906001019060200180831161191257829003601f168201915b505050505090508383600360008881526020019081526020016000209190611958929190612aa8565b50847f8f15ed4b723ef428f250961da8315675b507046737e19319fc1a4d81bfe87f8582868660405161198d93929190613779565b60405180910390a25050505050565b816119a681611c2e565b6119af57600080fd5b6119c383603c6119be85612326565b6113c0565b505050565b826119d281611c2e565b6119db57600080fd5b81600760008681526020019081526020016000206000857bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916847f7c69f06bea0bdef565b709e93a147836b0063ba2dd89f02d0b7e8d931e6a6daa84604051611acc9190613646565b60405180910390a350505050565b60606001600084815260200190815260200160002060008381526020019081526020016000208054611b0b90613bac565b80601f0160208091040260200160405190810160405280929190818152602001828054611b3790613bac565b8015611b845780601f10611b5957610100808354040283529160200191611b84565b820191906000526020600020905b815481529060010190602001808311611b6757829003601f168201915b5050505050905092915050565b600c602052826000526040600020602052816000526040600020602052806000526040600020600092509250509054906101000a900460ff1681565b60006359d1d43c60e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161480611c275750611c26826123b0565b5b9050919050565b600080600b60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166302571be3846040518263ffffffff1660e01b8152600401611c8c91906136d4565b60206040518083038186803b158015611ca457600080fd5b505afa158015611cb8573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611cdc9190612e35565b90503373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161480611daf5750600c600084815260200190815260200160002060008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b915050919050565b611dbf612bb4565b828160000181905250818160c0018181525050611ddb816121b9565b92915050565b6000816000015151826020015110159050919050565b6060611e278260200151611e1384600001518560200151612411565b84600001516124b49092919063ffffffff16565b9050919050565b6060611e608260a001518360a001518460c00151611e4c9190613a38565b84600001516124b49092919063ffffffff16565b9050919050565b600081518351148015611e865750611e85836000846000875161256f565b5b905092915050565b6000600460008981526020019081526020016000205490506000878051906020012090506000611ec98686896124b49092919063ffffffff16565b9050831561203b576000600560008c81526020019081526020016000206000858152602001908152602001600020600084815260200190815260200160002060008a61ffff1661ffff1681526020019081526020016000208054611f2c90613bac565b905014611fa257600660008b815260200190815260200160002060008481526020019081526020016000206000838152602001908152602001600020600081819054906101000a900461ffff1680929190611f8690613b82565b91906101000a81548161ffff021916908361ffff160217905550505b600560008b81526020019081526020016000206000848152602001908152602001600020600083815260200190815260200160002060008961ffff1661ffff1681526020019081526020016000206000611ffc9190612bff565b897f03528ed0c2a3ebc993b12ce3c16bb382f9c7d88ef7d8a1bf290eaf35955a12078a8a60405161202e9291906137b2565b60405180910390a26121ad565b6000600560008c81526020019081526020016000206000858152602001908152602001600020600084815260200190815260200160002060008a61ffff1661ffff168152602001908152602001600020805461209690613bac565b9050141561210d57600660008b815260200190815260200160002060008481526020019081526020016000206000838152602001908152602001600020600081819054906101000a900461ffff16809291906120f190613c0f565b91906101000a81548161ffff021916908361ffff160217905550505b80600560008c81526020019081526020016000206000858152602001908152602001600020600084815260200190815260200160002060008a61ffff1661ffff168152602001908152602001600020908051906020019061216f929190612b2e565b50897f52a608b3303a48862d07a73d82fa221318c0027fbbcfb1b2329bface3f19ff2b8a8a846040516121a4939291906137e2565b60405180910390a25b50505050505050505050565b8060c001518160200181815250508060000151518160200151106121dc57612300565b60006121f082600001518360200151612411565b82602001516121ff91906139e2565b905061221881836000015161259390919063ffffffff16565b826040019061ffff16908161ffff168152505060028161223891906139e2565b905061225181836000015161259390919063ffffffff16565b826060019061ffff16908161ffff168152505060028161227191906139e2565b905061228a8183600001516125c290919063ffffffff16565b826080019063ffffffff16908163ffffffff16815250506004816122ae91906139e2565b905060006122c982846000015161259390919063ffffffff16565b61ffff1690506002826122dc91906139e2565b9150818360a001818152505080826122f491906139e2565b8360c001818152505050505b50565b6000601482511461231357600080fd5b600c6101000a6020830151049050919050565b6060601467ffffffffffffffff811115612369577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040519080825280601f01601f19166020018201604052801561239b5781602001600182028036833780820191505090505b509050600c6101000a82026020820152919050565b600063c869023360e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061240a5750612409826125f3565b5b9050919050565b6000808290505b60011561249f5783518110612456577f4e487b7100000000000000000000000000000000000000000000000000000000600052600160045260246000fd5b600061246b828661265490919063ffffffff16565b60ff16905060018161247d91906139e2565b8261248891906139e2565b91506000811415612499575061249f565b50612418565b82816124ab9190613a38565b91505092915050565b6060835182846124c491906139e2565b11156124cf57600080fd5b60008267ffffffffffffffff811115612511577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040519080825280601f01601f1916602001820160405280156125435781602001600182028036833780820191505090505b50905060008060208301915085602088010190506125628282876126a5565b8293505050509392505050565b600061257c848484612709565b612587878785612709565b14905095945050505050565b600082516002836125a491906139e2565b11156125af57600080fd5b61ffff8260028501015116905092915050565b600082516004836125d391906139e2565b11156125de57600080fd5b63ffffffff8260048501015116905092915050565b600063691f343160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061264d575061264c82612735565b5b9050919050565b600082828151811061268f577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602001015160f81c60f81b60f81c905092915050565b5b602081106126e457815183526020836126bf91906139e2565b92506020826126ce91906139e2565b91506020816126dd9190613a38565b90506126a6565b60006001826020036101000a0390508019835116818551168181178652505050505050565b60008351828461271991906139e2565b111561272457600080fd5b818360208601012090509392505050565b60007f124a319c1247f4318c3c16c7e9cc865d0fb5d80d7bf02f56cafc0d14da0208507bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806127a857506127a7826127af565b5b9050919050565b600063a8fa568260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806128485750635c47637c60e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b8061285857506128578261285f565b5b9050919050565b600063bc1c58d160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806128b957506128b8826128c0565b5b9050919050565b6000633b3b57de60e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161480612959575063f1cb7e0660e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b80612969575061296882612970565b5b9050919050565b6000632203ab5660e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806129ca57506129c9826129d1565b5b9050919050565b60006301ffc9a760e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b828054612a2e90613bac565b90600052602060002090601f016020900481019282612a505760008555612a97565b82601f10612a6957803560ff1916838001178555612a97565b82800160010185558215612a97579182015b82811115612a96578235825591602001919060010190612a7b565b5b509050612aa49190612c3f565b5090565b828054612ab490613bac565b90600052602060002090601f016020900481019282612ad65760008555612b1d565b82601f10612aef57803560ff1916838001178555612b1d565b82800160010185558215612b1d579182015b82811115612b1c578235825591602001919060010190612b01565b5b509050612b2a9190612c3f565b5090565b828054612b3a90613bac565b90600052602060002090601f016020900481019282612b5c5760008555612ba3565b82601f10612b7557805160ff1916838001178555612ba3565b82800160010185558215612ba3579182015b82811115612ba2578251825591602001919060010190612b87565b5b509050612bb09190612c3f565b5090565b6040518060e001604052806060815260200160008152602001600061ffff168152602001600061ffff168152602001600063ffffffff16815260200160008152602001600081525090565b508054612c0b90613bac565b6000825580601f10612c1d5750612c3c565b601f016020900490600052602060002090810190612c3b9190612c3f565b5b50565b5b80821115612c58576000816000905550600101612c40565b5090565b6000612c6f612c6a84613919565b6138f4565b905082815260208101848484011115612c8757600080fd5b612c92848285613b40565b509392505050565b600081359050612ca981613d21565b92915050565b600081519050612cbe81613d21565b92915050565b60008083601f840112612cd657600080fd5b8235905067ffffffffffffffff811115612cef57600080fd5b602083019150836020820283011115612d0757600080fd5b9250929050565b600081359050612d1d81613d38565b92915050565b600081359050612d3281613d4f565b92915050565b600081359050612d4781613d66565b92915050565b60008083601f840112612d5f57600080fd5b8235905067ffffffffffffffff811115612d7857600080fd5b602083019150836001820283011115612d9057600080fd5b9250929050565b600082601f830112612da857600080fd5b8135612db8848260208601612c5c565b91505092915050565b60008083601f840112612dd357600080fd5b8235905067ffffffffffffffff811115612dec57600080fd5b602083019150836001820283011115612e0457600080fd5b9250929050565b600081359050612e1a81613d7d565b92915050565b600081359050612e2f81613d94565b92915050565b600060208284031215612e4757600080fd5b6000612e5584828501612caf565b91505092915050565b60008060208385031215612e7157600080fd5b600083013567ffffffffffffffff811115612e8b57600080fd5b612e9785828601612cc4565b92509250509250929050565b600060208284031215612eb557600080fd5b6000612ec384828501612d23565b91505092915050565b60008060408385031215612edf57600080fd5b6000612eed85828601612d23565b9250506020612efe85828601612c9a565b9150509250929050565b600080600060608486031215612f1d57600080fd5b6000612f2b86828701612d23565b9350506020612f3c86828701612c9a565b9250506040612f4d86828701612c9a565b9150509250925092565b600080600060608486031215612f6c57600080fd5b6000612f7a86828701612d23565b9350506020612f8b86828701612c9a565b9250506040612f9c86828701612d0e565b9150509250925092565b60008060408385031215612fb957600080fd5b6000612fc785828601612d23565b9250506020612fd885828601612d23565b9150509250929050565b600080600060608486031215612ff757600080fd5b600061300586828701612d23565b935050602061301686828701612d23565b925050604061302786828701612d23565b9150509250925092565b60008060006060848603121561304657600080fd5b600061305486828701612d23565b935050602061306586828701612d23565b925050604061307686828701612e0b565b9150509250925092565b6000806040838503121561309357600080fd5b60006130a185828601612d23565b92505060206130b285828601612d38565b9150509250929050565b6000806000606084860312156130d157600080fd5b60006130df86828701612d23565b93505060206130f086828701612d38565b925050604061310186828701612c9a565b9150509250925092565b60008060006040848603121561312057600080fd5b600061312e86828701612d23565b935050602084013567ffffffffffffffff81111561314b57600080fd5b61315786828701612d4d565b92509250509250925092565b60008060006040848603121561317857600080fd5b600061318686828701612d23565b935050602084013567ffffffffffffffff8111156131a357600080fd5b6131af86828701612dc1565b92509250509250925092565b6000806000806000606086880312156131d357600080fd5b60006131e188828901612d23565b955050602086013567ffffffffffffffff8111156131fe57600080fd5b61320a88828901612dc1565b9450945050604086013567ffffffffffffffff81111561322957600080fd5b61323588828901612dc1565b92509250509295509295909350565b6000806040838503121561325757600080fd5b600061326585828601612d23565b925050602061327685828601612e20565b9150509250929050565b6000806000806060858703121561329657600080fd5b60006132a487828801612d23565b94505060206132b587828801612e20565b935050604085013567ffffffffffffffff8111156132d257600080fd5b6132de87828801612d4d565b925092505092959194509250565b60008060006060848603121561330157600080fd5b600061330f86828701612d23565b935050602061332086828701612e20565b925050604084013567ffffffffffffffff81111561333d57600080fd5b61334986828701612d97565b9150509250925092565b60006020828403121561336557600080fd5b600061337384828501612d38565b91505092915050565b600061338883836134b1565b905092915050565b61339981613b0a565b82525050565b6133a881613a7e565b82525050565b6133b781613a6c565b82525050565b60006133c88261395a565b6133d28185613988565b9350836020820285016133e48561394a565b8060005b858110156134205784840389528151613401858261337c565b945061340c8361397b565b925060208a019950506001810190506133e8565b50829750879550505050505092915050565b61343b81613a90565b82525050565b61344a81613a9c565b82525050565b61345981613aa6565b82525050565b600061346b83856139aa565b9350613478838584613b40565b61348183613d10565b840190509392505050565b600061349883856139bb565b93506134a5838584613b40565b82840190509392505050565b60006134bc82613965565b6134c68185613999565b93506134d6818560208601613b4f565b6134df81613d10565b840191505092915050565b60006134f582613965565b6134ff81856139aa565b935061350f818560208601613b4f565b61351881613d10565b840191505092915050565b600061352e82613965565b61353881856139bb565b9350613548818560208601613b4f565b80840191505092915050565b600061356083856139c6565b935061356d838584613b40565b61357683613d10565b840190509392505050565b600061358d83856139d7565b935061359a838584613b40565b82840190509392505050565b60006135b182613970565b6135bb81856139c6565b93506135cb818560208601613b4f565b6135d481613d10565b840191505092915050565b6135e881613ad2565b82525050565b6135f781613b00565b82525050565b600061360a82848661348c565b91508190509392505050565b60006136228284613523565b915081905092915050565b600061363a828486613581565b91508190509392505050565b600060208201905061365b60008301846133ae565b92915050565b60006020820190506136766000830184613390565b92915050565b6000602082019050613691600083018461339f565b92915050565b600060208201905081810360008301526136b181846133bd565b905092915050565b60006020820190506136ce6000830184613432565b92915050565b60006020820190506136e96000830184613441565b92915050565b60006040820190506137046000830185613441565b6137116020830184613441565b9392505050565b600060208201905061372d6000830184613450565b92915050565b6000602082019050818103600083015261374e81848661345f565b90509392505050565b6000602082019050818103600083015261377181846134ea565b905092915050565b6000604082019050818103600083015261379381866134ea565b905081810360208301526137a881848661345f565b9050949350505050565b600060408201905081810360008301526137cc81856134ea565b90506137db60208301846135df565b9392505050565b600060608201905081810360008301526137fc81866134ea565b905061380b60208301856135df565b818103604083015261381d81846134ea565b9050949350505050565b60006020820190508181036000830152613842818486613554565b90509392505050565b6000602082019050818103600083015261386581846135a6565b905092915050565b600060408201905061388260008301856135ee565b818103602083015261389481846134ea565b90509392505050565b600080833560016020038436030381126138b657600080fd5b80840192508235915067ffffffffffffffff8211156138d457600080fd5b6020830192506001820236038313156138ec57600080fd5b509250929050565b60006138fe61390f565b905061390a8282613bde565b919050565b6000604051905090565b600067ffffffffffffffff82111561393457613933613ce1565b5b61393d82613d10565b9050602081019050919050565b6000819050602082019050919050565b600081519050919050565b600081519050919050565b600081519050919050565b6000602082019050919050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b600081905092915050565b600082825260208201905092915050565b600081905092915050565b60006139ed82613b00565b91506139f883613b00565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115613a2d57613a2c613c83565b5b828201905092915050565b6000613a4382613b00565b9150613a4e83613b00565b925082821015613a6157613a60613c83565b5b828203905092915050565b6000613a7782613ae0565b9050919050565b6000613a8982613ae0565b9050919050565b60008115159050919050565b6000819050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b600061ffff82169050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b6000613b1582613b1c565b9050919050565b6000613b2782613b2e565b9050919050565b6000613b3982613ae0565b9050919050565b82818337600083830152505050565b60005b83811015613b6d578082015181840152602081019050613b52565b83811115613b7c576000848401525b50505050565b6000613b8d82613ad2565b91506000821415613ba157613ba0613c83565b5b600182039050919050565b60006002820490506001821680613bc457607f821691505b60208210811415613bd857613bd7613cb2565b5b50919050565b613be782613d10565b810181811067ffffffffffffffff82111715613c0657613c05613ce1565b5b80604052505050565b6000613c1a82613ad2565b915061ffff821415613c2f57613c2e613c83565b5b600182019050919050565b6000613c4582613b00565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415613c7857613c77613c83565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b613d2a81613a6c565b8114613d3557600080fd5b50565b613d4181613a90565b8114613d4c57600080fd5b50565b613d5881613a9c565b8114613d6357600080fd5b50565b613d6f81613aa6565b8114613d7a57600080fd5b50565b613d8681613ad2565b8114613d9157600080fd5b50565b613d9d81613b00565b8114613da857600080fd5b5056fea2646970667358221220aea94f2756849a1a7ee3a1dfa465bed165dad58447f89e386e41c5867777cecc64736f6c63430008040033';

var isSuperArgs$3 = function isSuperArgs(xs) {
  return xs.length > 1;
};

var PublicResolver__factory = /*#__PURE__*/ (function (_ContractFactory) {
  _inherits(PublicResolver__factory, _ContractFactory);

  var _super = _createSuper(PublicResolver__factory);

  function PublicResolver__factory() {
    var _this;

    _classCallCheck(this, PublicResolver__factory);

    for (
      var _len = arguments.length, args = new Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key];
    }

    if (isSuperArgs$3(args)) {
      _this = _super.call.apply(_super, [this].concat(args));
    } else {
      _this = _super.call(this, _abi$3, _bytecode$3, args[0]);
    }

    _this.contractName = 'PublicResolver';
    return _possibleConstructorReturn(_this);
  }

  _createClass(
    PublicResolver__factory,
    [
      {
        key: 'deploy',
        value: function deploy(_ens, overrides) {
          return _get(
            _getPrototypeOf(PublicResolver__factory.prototype),
            'deploy',
            this
          ).call(this, _ens, overrides || {});
        },
      },
      {
        key: 'getDeployTransaction',
        value: function getDeployTransaction(_ens, overrides) {
          return _get(
            _getPrototypeOf(PublicResolver__factory.prototype),
            'getDeployTransaction',
            this
          ).call(this, _ens, overrides || {});
        },
      },
      {
        key: 'attach',
        value: function attach(address) {
          return _get(
            _getPrototypeOf(PublicResolver__factory.prototype),
            'attach',
            this
          ).call(this, address);
        },
      },
      {
        key: 'connect',
        value: function connect(signer) {
          return _get(
            _getPrototypeOf(PublicResolver__factory.prototype),
            'connect',
            this
          ).call(this, signer);
        },
      },
    ],
    [
      {
        key: 'createInterface',
        value: function createInterface() {
          return new ethers.utils.Interface(_abi$3);
        },
      },
      {
        key: 'connect',
        value: function connect(address, signerOrProvider) {
          return new ethers.Contract(address, _abi$3, signerOrProvider);
        },
      },
    ]
  );

  return PublicResolver__factory;
})(ethers.ContractFactory);
PublicResolver__factory.bytecode = _bytecode$3;
PublicResolver__factory.abi = _abi$3;

var _abi$2 = [
  {
    inputs: [
      {
        internalType: 'contract ENS',
        name: '_ens',
        type: 'address',
      },
      {
        internalType: 'contract DomainNotifier',
        name: '_notifier',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'contentType',
        type: 'uint256',
      },
    ],
    name: 'ABIChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'a',
        type: 'address',
      },
    ],
    name: 'AddrChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'coinType',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'newAddress',
        type: 'bytes',
      },
    ],
    name: 'AddressChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'target',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'isAuthorised',
        type: 'bool',
      },
    ],
    name: 'AuthorisationChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'hash',
        type: 'bytes',
      },
    ],
    name: 'ContenthashChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'name',
        type: 'bytes',
      },
      {
        indexed: false,
        internalType: 'uint16',
        name: 'resource',
        type: 'uint16',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'record',
        type: 'bytes',
      },
    ],
    name: 'DNSRecordChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'name',
        type: 'bytes',
      },
      {
        indexed: false,
        internalType: 'uint16',
        name: 'resource',
        type: 'uint16',
      },
    ],
    name: 'DNSRecordDeleted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'DNSZoneCleared',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'lastzonehash',
        type: 'bytes',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'zonehash',
        type: 'bytes',
      },
    ],
    name: 'DNSZonehashChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'bytes4',
        name: 'interfaceID',
        type: 'bytes4',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'implementer',
        type: 'address',
      },
    ],
    name: 'InterfaceChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'newType',
        type: 'uint8',
      },
    ],
    name: 'IssuerTypeChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        components: [
          {
            internalType: 'address[]',
            name: 'dids',
            type: 'address[]',
          },
          {
            internalType: 'bytes32',
            name: 'role',
            type: 'bytes32',
          },
        ],
        indexed: false,
        internalType: 'struct IssuersResolver.Issuers',
        name: 'newIssuers',
        type: 'tuple',
      },
    ],
    name: 'IssuersChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
    ],
    name: 'NameChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        components: [
          {
            internalType: 'bytes32[]',
            name: 'roles',
            type: 'bytes32[]',
          },
          {
            internalType: 'bool',
            name: 'mustHaveAll',
            type: 'bool',
          },
        ],
        indexed: false,
        internalType:
          'struct EnrolmentPrerequisiteRolesResolver.PrerequisiteRoles',
        name: 'newPrerequisiteRoles',
        type: 'tuple',
      },
    ],
    name: 'PrerequisiteRolesChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'x',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'y',
        type: 'bytes32',
      },
    ],
    name: 'PubkeyChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'string',
        name: 'indexedKey',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'key',
        type: 'string',
      },
    ],
    name: 'TextChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newVersion',
        type: 'uint256',
      },
    ],
    name: 'VersionNumberChanged',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'contentTypes',
        type: 'uint256',
      },
    ],
    name: 'ABI',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'addr',
    outputs: [
      {
        internalType: 'address payable',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'coinType',
        type: 'uint256',
      },
    ],
    name: 'addr',
    outputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'authorisations',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'clearDNSZone',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'contenthash',
    outputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'name',
        type: 'bytes32',
      },
      {
        internalType: 'uint16',
        name: 'resource',
        type: 'uint16',
      },
    ],
    name: 'dnsRecord',
    outputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'name',
        type: 'bytes32',
      },
    ],
    name: 'hasDNSRecords',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes4',
        name: 'interfaceID',
        type: 'bytes4',
      },
    ],
    name: 'interfaceImplementer',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'issuerType',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    name: 'issuerTypes',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'issuers',
    outputs: [
      {
        internalType: 'address[]',
        name: 'dids',
        type: 'address[]',
      },
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes[]',
        name: 'data',
        type: 'bytes[]',
      },
    ],
    name: 'multicall',
    outputs: [
      {
        internalType: 'bytes[]',
        name: 'results',
        type: 'bytes[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'prerequisiteRoles',
    outputs: [
      {
        internalType: 'bytes32[]',
        name: 'roles',
        type: 'bytes32[]',
      },
      {
        internalType: 'bool',
        name: 'mustHaveAll',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'pubkey',
    outputs: [
      {
        internalType: 'bytes32',
        name: 'x',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'y',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'contentType',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'setABI',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'coinType',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'a',
        type: 'bytes',
      },
    ],
    name: 'setAddr',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'a',
        type: 'address',
      },
    ],
    name: 'setAddr',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'target',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'isAuthorised',
        type: 'bool',
      },
    ],
    name: 'setAuthorisation',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes',
        name: 'hash',
        type: 'bytes',
      },
    ],
    name: 'setContenthash',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'setDNSRecords',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes4',
        name: 'interfaceID',
        type: 'bytes4',
      },
      {
        internalType: 'address',
        name: 'implementer',
        type: 'address',
      },
    ],
    name: 'setInterface',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'address[]',
        name: 'dids',
        type: 'address[]',
      },
    ],
    name: 'setIssuerDids',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
    ],
    name: 'setIssuerRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'uint8',
        name: 'newIssuerType',
        type: 'uint8',
      },
    ],
    name: 'setIssuerType',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
    ],
    name: 'setName',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32[]',
        name: 'roles',
        type: 'bytes32[]',
      },
      {
        internalType: 'bool',
        name: 'mustHaveAll',
        type: 'bool',
      },
    ],
    name: 'setPrerequisiteRoles',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'x',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'y',
        type: 'bytes32',
      },
    ],
    name: 'setPubkey',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'string',
        name: 'key',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'value',
        type: 'string',
      },
    ],
    name: 'setText',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'newVersionNumber',
        type: 'uint256',
      },
    ],
    name: 'setVersionNumber',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes',
        name: 'hash',
        type: 'bytes',
      },
    ],
    name: 'setZonehash',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'string',
        name: 'key',
        type: 'string',
      },
    ],
    name: 'text',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'versionNumber',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    name: 'versionNumbers',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'zonehash',
    outputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'domainUpdated',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceID',
        type: 'bytes4',
      },
    ],
    name: 'supportsInterface',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
];
var _bytecode$2 =
  '0x60806040523480156200001157600080fd5b506040516200530f3803806200530f8339818101604052810190620000379190620000f1565b8180600b60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505080601160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050620001cd565b600081519050620000d48162000199565b92915050565b600081519050620000eb81620001b3565b92915050565b600080604083850312156200010b576200010a62000194565b5b60006200011b85828601620000da565b92505060206200012e85828601620000c3565b9150509250929050565b6000620001458262000174565b9050919050565b6000620001598262000138565b9050919050565b60006200016d8262000138565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600080fd5b620001a4816200014c565b8114620001b057600080fd5b50565b620001be8162000160565b8114620001ca57600080fd5b50565b61513280620001dd6000396000f3fe608060405234801561001057600080fd5b50600436106102325760003560e01c80638b95dd7111610130578063c53a4413116100b8578063d055e4f81161007c578063d055e4f81461072b578063d5fa2b001461075b578063e59d895d14610777578063f1cb7e0614610793578063f86bc879146107c357610232565b8063c53a44131461064c578063c585f6971461067d578063c8690233146106ad578063c986c404146106de578063ce3decdc1461070f57610232565b8063ac9650d8116100ff578063ac9650d814610598578063ad154c69146105c8578063ad5780af146105e4578063bad72cbe14610600578063bc1c58d11461061c57610232565b80638b95dd7114610514578063916b848a14610530578063a8fa56821461054c578063abc52d5e1461057c57610232565b80633e9ce794116101be5780635c98042b116101825780635c98042b146104605780636161016414610490578063623195b0146104ac578063691f3431146104c857806377372213146104f857610232565b80633e9ce794146103985780634cbf6ba4146103b45780635146bd64146103e457806355329f3f1461041457806359d1d43c1461043057610232565b80632203ab56116102055780632203ab56146102cf57806329cd62ea14610300578063304e6ade1461031c578063338bc8fa146103385780633b3b57de1461036857610232565b806301ffc9a7146102375780630af179d71461026757806310f13a8c14610283578063124a319c1461029f575b600080fd5b610251600480360381019061024c91906140b8565b6107f3565b60405161025e919061472f565b60405180910390f35b610281600480360381019061027c9190613e00565b610854565b005b61029d60048036038101906102989190613ec0565b610a86565b005b6102b960048036038101906102b49190613d6d565b610b34565b6040516102c69190614633565b60405180910390f35b6102e960048036038101906102e49190613f55565b610f2c565b6040516102f7929190614942565b60405180910390f35b61031a60048036038101906103159190613cc7565b611060565b005b61033660048036038101906103319190613e00565b6110f2565b005b610352600480360381019061034d9190613aa0565b611168565b60405161035f9190614927565b60405180910390f35b610382600480360381019061037d9190613aa0565b611185565b60405161038f9190614669565b60405180910390f35b6103b260048036038101906103ad9190613b60565b6111bb565b005b6103ce60048036038101906103c99190613c87565b6112cb565b6040516103db919061472f565b60405180910390f35b6103fe60048036038101906103f99190613aa0565b611333565b60405161040b9190614927565b60405180910390f35b61042e60048036038101906104299190614078565b61134b565b005b61044a60048036038101906104459190613e60565b6113e7565b60405161045791906148c1565b60405180910390f35b61047a60048036038101906104759190613aa0565b6114ac565b60405161048791906147cd565b60405180910390f35b6104aa60048036038101906104a59190613aa0565b611551565b005b6104c660048036038101906104c19190613f95565b6115f5565b005b6104e260048036038101906104dd9190613aa0565b61168b565b6040516104ef91906148c1565b60405180910390f35b610512600480360381019061050d9190613e60565b611730565b005b61052e60048036038101906105299190614009565b6117a6565b005b61054a60048036038101906105459190613c87565b61187c565b005b61056660048036038101906105619190613d1a565b61191b565b60405161057391906147cd565b60405180910390f35b61059660048036038101906105919190613c13565b611a10565b005b6105b260048036038101906105ad9190613a26565b611b1f565b6040516105bf919061470d565b60405180910390f35b6105e260048036038101906105dd9190613f55565b611c59565b005b6105fe60048036038101906105f99190613aa0565b611cd4565b005b61061a60048036038101906106159190613bb3565b611d41565b005b61063660048036038101906106319190613aa0565b611de4565b60405161064391906147cd565b60405180910390f35b61066660048036038101906106619190613aa0565b611e89565b6040516106749291906146ad565b60405180910390f35b61069760048036038101906106929190613aa0565b611f4b565b6040516106a49190614972565b60405180910390f35b6106c760048036038101906106c29190613aa0565b611f75565b6040516106d5929190614765565b60405180910390f35b6106f860048036038101906106f39190613aa0565b611faf565b6040516107069291906146dd565b60405180910390f35b61072960048036038101906107249190613e00565b612048565b005b61074560048036038101906107409190613aa0565b612161565b6040516107529190614972565b60405180910390f35b61077560048036038101906107709190613acd565b612181565b005b610791600480360381019061078c9190613dad565b6121ad565b005b6107ad60048036038101906107a89190613f55565b6122bf565b6040516107ba91906147cd565b60405180910390f35b6107dd60048036038101906107d89190613b0d565b612376565b6040516107ea919061472f565b60405180910390f35b6000636161016460e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061084d575061084c826123b2565b5b9050919050565b8261085e81612413565b61086757600080fd5b6000806060806000806108c860008a8a8080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505061265090919063ffffffff16565b90505b6108d48161267a565b610a0a5760008661ffff16141561093057806040015195506108f581612690565b9350836040516020016109089190614603565b604051602081830303815290604052805190602001209150610929816126c7565b92506109fc565b600061093b82612690565b9050816040015161ffff168761ffff161415806109685750610966818661270090919063ffffffff16565b155b156109fa576109d38b86898d8d8080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050508a8b88602001516109c99190614c22565b60008b5114612727565b8160400151965081602001519550809450848051906020012092506109f7826126c7565b93505b505b610a0581612a52565b6108cb565b50600083511115610a7b57610a7a8984878b8b8080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505088898e8e9050610a709190614c22565b6000895114612727565b5b505050505050505050565b84610a9081612413565b610a9957600080fd5b8282600a60008981526020019081526020016000208787604051610abe92919061461a565b90815260200160405180910390209190610ad99291906133b9565b508484604051610aea92919061461a565b6040518091039020867fd8c9334b1a9c2f9da342a0a2b32629c1a229b6445dad78947f674b44444a75508787604051610b2492919061489d565b60405180910390a3505050505050565b600080600760008581526020019081526020016000206000847bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614610bf95780915050610f26565b6000610c0485611185565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610c4657600092505050610f26565b6000808273ffffffffffffffffffffffffffffffffffffffff166301ffc9a760e01b604051602401610c78919061478e565b6040516020818303038152906040527f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050604051610d029190614603565b600060405180830381855afa9150503d8060008114610d3d576040519150601f19603f3d011682016040523d82523d6000602084013e610d42565b606091505b5091509150811580610d55575060208151105b80610da35750600060f81b81601f81518110610d7457610d73614f8c565b5b602001015160f81c60f81b7effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b15610db5576000945050505050610f26565b8273ffffffffffffffffffffffffffffffffffffffff1686604051602401610ddd919061478e565b6040516020818303038152906040527f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050604051610e679190614603565b600060405180830381855afa9150503d8060008114610ea2576040519150601f19603f3d011682016040523d82523d6000602084013e610ea7565b606091505b508092508193505050811580610ebe575060208151105b80610f0c5750600060f81b81601f81518110610edd57610edc614f8c565b5b602001015160f81c60f81b7effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b15610f1e576000945050505050610f26565b829450505050505b92915050565b60006060600080600086815260200190815260200160002090506000600190505b84811161104057600085821614158015610f85575060008260008381526020019081526020016000208054610f8190614dda565b9050115b156110345780826000838152602001908152602001600020808054610fa990614dda565b80601f0160208091040260200160405190810160405280929190818152602001828054610fd590614dda565b80156110225780601f10610ff757610100808354040283529160200191611022565b820191906000526020600020905b81548152906001019060200180831161100557829003601f168201915b50505050509050935093505050611059565b600181901b9050610f4d565b5060006040518060200160405280600081525092509250505b9250929050565b8261106a81612413565b61107357600080fd5b604051806040016040528084815260200183815250600960008681526020019081526020016000206000820151816000015560208201518160010155905050837f1d6f5e03d3f63eb58751986629a5439baee5079ff04f345becb66e23eb154e4684846040516110e4929190614765565b60405180910390a250505050565b826110fc81612413565b61110557600080fd5b828260026000878152602001908152602001600020919061112792919061343f565b50837fe379c1624ed7e714cc0937528a32359d69d5281337765313dba4e081b72d7578848460405161115a9291906147a9565b60405180910390a250505050565b6000600d6000838152602001908152602001600020549050919050565b60008061119383603c6122bf565b90506000815114156111a95760009150506111b6565b6111b281612b9c565b9150505b919050565b80600c600085815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16847fe1c5610a6e0cbe10764ecd182adcef1ec338dc4e199c99c32ce98f38e12791df846040516112be919061472f565b60405180910390a4505050565b60008060066000858152602001908152602001600020600060046000878152602001908152602001600020548152602001908152602001600020600084815260200190815260200160002060009054906101000a900461ffff1661ffff161415905092915050565b600d6020528060005260406000206000915090505481565b8161135581612413565b61135e57600080fd5b81600e600085815260200190815260200160002060006101000a81548160ff021916908360ff160217905550827f7fc5f6d56736f6859a63066a1e8f557dc0b34a3a0af625f99db5a258963399d3600e600086815260200190815260200160002060009054906101000a900460ff166040516113da9190614972565b60405180910390a2505050565b6060600a6000858152602001908152602001600020838360405161140c92919061461a565b9081526020016040518091039020805461142590614dda565b80601f016020809104026020016040519081016040528092919081815260200182805461145190614dda565b801561149e5780601f106114735761010080835404028352916020019161149e565b820191906000526020600020905b81548152906001019060200180831161148157829003601f168201915b505050505090509392505050565b60606003600083815260200190815260200160002080546114cc90614dda565b80601f01602080910402602001604051908101604052809291908181526020018280546114f890614dda565b80156115455780601f1061151a57610100808354040283529160200191611545565b820191906000526020600020905b81548152906001019060200180831161152857829003601f168201915b50505050509050919050565b8061155b81612413565b61156457600080fd5b601160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166361610164836040518263ffffffff1660e01b81526004016115bf919061474a565b600060405180830381600087803b1580156115d957600080fd5b505af11580156115ed573d6000803e3d6000fd5b505050505050565b836115ff81612413565b61160857600080fd5b6000846001866116189190614c22565b161461162357600080fd5b82826000808881526020019081526020016000206000878152602001908152602001600020919061165592919061343f565b5083857faa121bbeef5f32f5961a2a28966e769023910fc9479059ee3495d4c1a696efe360405160405180910390a35050505050565b60606008600083815260200190815260200160002080546116ab90614dda565b80601f01602080910402602001604051908101604052809291908181526020018280546116d790614dda565b80156117245780601f106116f957610100808354040283529160200191611724565b820191906000526020600020905b81548152906001019060200180831161170757829003601f168201915b50505050509050919050565b8261173a81612413565b61174357600080fd5b82826008600087815260200190815260200160002091906117659291906133b9565b50837fb7d29e911041e8d9b843369e890bcb72c9388692ba48b65ac54e7214c4c348f7848460405161179892919061489d565b60405180910390a250505050565b826117b081612413565b6117b957600080fd5b837f65412581168e88a1e60c6459d7f44ae83ad0832e670826c05a4e2476b57af75284846040516117eb929190614942565b60405180910390a2603c83141561183d57837f52d7d861f09ab3d26239d492e8968629f95e9e318cf0b73bfddc441522a15fd261182784612b9c565b604051611834919061464e565b60405180910390a25b8160016000868152602001908152602001600020600085815260200190815260200160002090805190602001906118759291906134c5565b5050505050565b8161188681612413565b61188f57600080fd5b81600f600085815260200190815260200160002060010181905550600f600084815260200190815260200160002060000160006118cc919061354b565b827fab0ef04b258ea77c9247dad5b03ada5b2ed5b370f62963b9f84bd9066d499e5c600f600086815260200190815260200160002060405161190e91906148e3565b60405180910390a2505050565b606060056000858152602001908152602001600020600060046000878152602001908152602001600020548152602001908152602001600020600084815260200190815260200160002060008361ffff1661ffff168152602001908152602001600020805461198990614dda565b80601f01602080910402602001604051908101604052809291908181526020018280546119b590614dda565b8015611a025780601f106119d757610100808354040283529160200191611a02565b820191906000526020600020905b8154815290600101906020018083116119e557829003601f168201915b505050505090509392505050565b83611a1a81612413565b611a2357600080fd5b6040518060400160405280858580806020026020016040519081016040528093929190818152602001838360200280828437600081840152601f19601f820116905080830192505050505050508152602001831515815250601060008781526020019081526020016000206000820151816000019080519060200190611aaa92919061356c565b5060208201518160010160006101000a81548160ff021916908315150217905550905050847f26c1ae1a8943085479d1599dd3884c06f33c62627d918463e96a9b4e519894a360106000888152602001908152602001600020604051611b109190614905565b60405180910390a25050505050565b60608282905067ffffffffffffffff811115611b3e57611b3d614fbb565b5b604051908082528060200260200182016040528015611b7157816020015b6060815260200190600190039081611b5c5790505b50905060005b83839050811015611c52576000803073ffffffffffffffffffffffffffffffffffffffff16868685818110611baf57611bae614f8c565b5b9050602002810190611bc1919061498d565b604051611bcf9291906145ea565b600060405180830381855af49150503d8060008114611c0a576040519150601f19603f3d011682016040523d82523d6000602084013e611c0f565b606091505b509150915081611c1e57600080fd5b80848481518110611c3257611c31614f8c565b5b602002602001018190525050508080611c4a90614eb6565b915050611b77565b5092915050565b81611c6381612413565b611c6c57600080fd5b81600d600085815260200190815260200160002081905550827f85d51b785b03277eec6a168d133b8cffc1ab9f99d3e6a1b4061c23841801698f600d600086815260200190815260200160002054604051611cc79190614927565b60405180910390a2505050565b80611cde81612413565b611ce757600080fd5b600460008381526020019081526020016000206000815480929190611d0b90614eb6565b9190505550817fb757169b8492ca2f1c6619d9d76ce22803035c3b1d5f6930dffe7b127c1a198360405160405180910390a25050565b82611d4b81612413565b611d5457600080fd5b8282600f60008781526020019081526020016000206000019190611d799291906135b9565b50600f600085815260200190815260200160002060010160009055837fab0ef04b258ea77c9247dad5b03ada5b2ed5b370f62963b9f84bd9066d499e5c600f6000878152602001908152602001600020604051611dd691906148e3565b60405180910390a250505050565b6060600260008381526020019081526020016000208054611e0490614dda565b80601f0160208091040260200160405190810160405280929190818152602001828054611e3090614dda565b8015611e7d5780601f10611e5257610100808354040283529160200191611e7d565b820191906000526020600020905b815481529060010190602001808311611e6057829003601f168201915b50505050509050919050565b60606000600f6000848152602001908152602001600020600001600f60008581526020019081526020016000206001015481805480602002602001604051908101604052809291908181526020018280548015611f3b57602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311611ef1575b5050505050915091509150915091565b6000600e600083815260200190815260200160002060009054906101000a900460ff169050919050565b6000806009600084815260200190815260200160002060000154600960008581526020019081526020016000206001015491509150915091565b60606000601060008481526020019081526020016000206000016010600085815260200190815260200160002060010160009054906101000a900460ff168180548060200260200160405190810160405280929190818152602001828054801561203857602002820191906000526020600020905b815481526020019060010190808311612024575b5050505050915091509150915091565b8261205281612413565b61205b57600080fd5b600060036000868152602001908152602001600020805461207b90614dda565b80601f01602080910402602001604051908101604052809291908181526020018280546120a790614dda565b80156120f45780601f106120c9576101008083540402835291602001916120f4565b820191906000526020600020905b8154815290600101906020018083116120d757829003601f168201915b50505050509050838360036000888152602001908152602001600020919061211d92919061343f565b50847f8f15ed4b723ef428f250961da8315675b507046737e19319fc1a4d81bfe87f85828686604051612152939291906147ef565b60405180910390a25050505050565b600e6020528060005260406000206000915054906101000a900460ff1681565b8161218b81612413565b61219457600080fd5b6121a883603c6121a385612bbf565b6117a6565b505050565b826121b781612413565b6121c057600080fd5b81600760008681526020019081526020016000206000857bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916847f7c69f06bea0bdef565b709e93a147836b0063ba2dd89f02d0b7e8d931e6a6daa846040516122b19190614633565b60405180910390a350505050565b606060016000848152602001908152602001600020600083815260200190815260200160002080546122f090614dda565b80601f016020809104026020016040519081016040528092919081815260200182805461231c90614dda565b80156123695780601f1061233e57610100808354040283529160200191612369565b820191906000526020600020905b81548152906001019060200180831161234c57829003601f168201915b5050505050905092915050565b600c602052826000526040600020602052816000526040600020602052806000526040600020600092509250509054906101000a900460ff1681565b600063c986c40460e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061240c575061240b82612c23565b5b9050919050565b600080600b60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166302571be3846040518263ffffffff1660e01b8152600401612471919061474a565b60206040518083038186803b15801561248957600080fd5b505afa15801561249d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906124c191906139f9565b90503373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614806125945750600c600084815260200190815260200160002060008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b806126485750600b60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663e985e9c582336040518363ffffffff1660e01b81526004016125f7929190614684565b60206040518083038186803b15801561260f57600080fd5b505afa158015612623573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906126479190613a73565b5b915050919050565b612658613659565b828160000181905250818160c001818152505061267481612a52565b92915050565b6000816000015151826020015110159050919050565b60606126c082602001516126ac84600001518560200151612c84565b8460000151612d019092919063ffffffff16565b9050919050565b60606126f98260a001518360a001518460c001516126e59190614c22565b8460000151612d019092919063ffffffff16565b9050919050565b60008151835114801561271f575061271e8360008460008751612d96565b5b905092915050565b6000600460008981526020019081526020016000205490506000878051906020012090506000612762868689612d019092919063ffffffff16565b905083156128d4576000600560008c81526020019081526020016000206000858152602001908152602001600020600084815260200190815260200160002060008a61ffff1661ffff16815260200190815260200160002080546127c590614dda565b90501461283b57600660008b815260200190815260200160002060008481526020019081526020016000206000838152602001908152602001600020600081819054906101000a900461ffff168092919061281f90614db0565b91906101000a81548161ffff021916908361ffff160217905550505b600560008b81526020019081526020016000206000848152602001908152602001600020600083815260200190815260200160002060008961ffff1661ffff168152602001908152602001600020600061289591906136a4565b897f03528ed0c2a3ebc993b12ce3c16bb382f9c7d88ef7d8a1bf290eaf35955a12078a8a6040516128c7929190614828565b60405180910390a2612a46565b6000600560008c81526020019081526020016000206000858152602001908152602001600020600084815260200190815260200160002060008a61ffff1661ffff168152602001908152602001600020805461292f90614dda565b905014156129a657600660008b815260200190815260200160002060008481526020019081526020016000206000838152602001908152602001600020600081819054906101000a900461ffff168092919061298a90614e8b565b91906101000a81548161ffff021916908361ffff160217905550505b80600560008c81526020019081526020016000206000858152602001908152602001600020600084815260200190815260200160002060008a61ffff1661ffff1681526020019081526020016000209080519060200190612a089291906134c5565b50897f52a608b3303a48862d07a73d82fa221318c0027fbbcfb1b2329bface3f19ff2b8a8a84604051612a3d93929190614858565b60405180910390a25b50505050505050505050565b8060c00151816020018181525050806000015151816020015110612a7557612b99565b6000612a8982600001518360200151612c84565b8260200151612a989190614bcc565b9050612ab1818360000151612dba90919063ffffffff16565b826040019061ffff16908161ffff1681525050600281612ad19190614bcc565b9050612aea818360000151612dba90919063ffffffff16565b826060019061ffff16908161ffff1681525050600281612b0a9190614bcc565b9050612b23818360000151612de990919063ffffffff16565b826080019063ffffffff16908163ffffffff1681525050600481612b479190614bcc565b90506000612b62828460000151612dba90919063ffffffff16565b61ffff169050600282612b759190614bcc565b9150818360a00181815250508082612b8d9190614bcc565b8360c001818152505050505b50565b60006014825114612bac57600080fd5b600c6101000a6020830151049050919050565b6060601467ffffffffffffffff811115612bdc57612bdb614fbb565b5b6040519080825280601f01601f191660200182016040528015612c0e5781602001600182028036833780820191505090505b509050600c6101000a82026020820152919050565b600063c53a441360e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161480612c7d5750612c7c82612e1a565b5b9050919050565b6000808290505b600115612cec5783518110612ca357612ca2614eff565b5b6000612cb88286612e7b90919063ffffffff16565b60ff169050600181612cca9190614bcc565b82612cd59190614bcc565b91506000811415612ce65750612cec565b50612c8b565b8281612cf89190614c22565b91505092915050565b606083518284612d119190614bcc565b1115612d1c57600080fd5b60008267ffffffffffffffff811115612d3857612d37614fbb565b5b6040519080825280601f01601f191660200182016040528015612d6a5781602001600182028036833780820191505090505b5090506000806020830191508560208801019050612d89828287612ea6565b8293505050509392505050565b6000612da3848484612f0a565b612dae878785612f0a565b14905095945050505050565b60008251600283612dcb9190614bcc565b1115612dd657600080fd5b61ffff8260028501015116905092915050565b60008251600483612dfa9190614bcc565b1115612e0557600080fd5b63ffffffff8260048501015116905092915050565b600063c585f69760e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161480612e745750612e7382612f36565b5b9050919050565b6000828281518110612e9057612e8f614f8c565b5b602001015160f81c60f81b60f81c905092915050565b5b60208110612ee55781518352602083612ec09190614bcc565b9250602082612ecf9190614bcc565b9150602081612ede9190614c22565b9050612ea7565b60006001826020036101000a0390508019835116818551168181178652505050505050565b600083518284612f1a9190614bcc565b1115612f2557600080fd5b818360208601012090509392505050565b600063338bc8fa60e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161480612f905750612f8f82612f97565b5b9050919050565b6000612fa282612fa9565b9050919050565b60006359d1d43c60e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061300357506130028261300a565b5b9050919050565b600063c869023360e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061306457506130638261306b565b5b9050919050565b600063691f343160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806130c557506130c4826130cc565b5b9050919050565b60007f124a319c1247f4318c3c16c7e9cc865d0fb5d80d7bf02f56cafc0d14da0208507bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061313f575061313e82613146565b5b9050919050565b600063a8fa568260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806131df5750635c47637c60e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b806131ef57506131ee826131f6565b5b9050919050565b600063bc1c58d160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161480613250575061324f82613257565b5b9050919050565b6000633b3b57de60e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806132f0575063f1cb7e0660e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b8061330057506132ff82613307565b5b9050919050565b6000632203ab5660e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161480613361575061336082613368565b5b9050919050565b60006301ffc9a760e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b8280546133c590614dda565b90600052602060002090601f0160209004810192826133e7576000855561342e565b82601f1061340057803560ff191683800117855561342e565b8280016001018555821561342e579182015b8281111561342d578235825591602001919060010190613412565b5b50905061343b91906136e4565b5090565b82805461344b90614dda565b90600052602060002090601f01602090048101928261346d57600085556134b4565b82601f1061348657803560ff19168380011785556134b4565b828001600101855582156134b4579182015b828111156134b3578235825591602001919060010190613498565b5b5090506134c191906136e4565b5090565b8280546134d190614dda565b90600052602060002090601f0160209004810192826134f3576000855561353a565b82601f1061350c57805160ff191683800117855561353a565b8280016001018555821561353a579182015b8281111561353957825182559160200191906001019061351e565b5b50905061354791906136e4565b5090565b508054600082559060005260206000209081019061356991906136e4565b50565b8280548282559060005260206000209081019282156135a8579160200282015b828111156135a757825182559160200191906001019061358c565b5b5090506135b59190613701565b5090565b828054828255906000526020600020908101928215613648579160200282015b8281111561364757823573ffffffffffffffffffffffffffffffffffffffff168260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550916020019190600101906135d9565b5b50905061365591906136e4565b5090565b6040518060e001604052806060815260200160008152602001600061ffff168152602001600061ffff168152602001600063ffffffff16815260200160008152602001600081525090565b5080546136b090614dda565b6000825580601f106136c257506136e1565b601f0160209004906000526020600020908101906136e091906136e4565b5b50565b5b808211156136fd5760008160009055506001016136e5565b5090565b5b8082111561371a576000816000905550600101613702565b5090565b600061373161372c84614a15565b6149f0565b90508281526020810184848401111561374d5761374c61502e565b5b613758848285614d6e565b509392505050565b60008135905061376f8161505b565b92915050565b6000815190506137848161505b565b92915050565b60008083601f8401126137a05761379f615015565b5b8235905067ffffffffffffffff8111156137bd576137bc615010565b5b6020830191508360208202830111156137d9576137d8615024565b5b9250929050565b60008083601f8401126137f6576137f5615015565b5b8235905067ffffffffffffffff81111561381357613812615010565b5b60208301915083602082028301111561382f5761382e615024565b5b9250929050565b60008083601f84011261384c5761384b615015565b5b8235905067ffffffffffffffff81111561386957613868615010565b5b60208301915083602082028301111561388557613884615024565b5b9250929050565b60008135905061389b81615072565b92915050565b6000815190506138b081615072565b92915050565b6000813590506138c581615089565b92915050565b6000813590506138da816150a0565b92915050565b60008083601f8401126138f6576138f5615015565b5b8235905067ffffffffffffffff81111561391357613912615010565b5b60208301915083600182028301111561392f5761392e615024565b5b9250929050565b600082601f83011261394b5761394a615015565b5b813561395b84826020860161371e565b91505092915050565b60008083601f84011261397a57613979615015565b5b8235905067ffffffffffffffff81111561399757613996615010565b5b6020830191508360018202830111156139b3576139b2615024565b5b9250929050565b6000813590506139c9816150b7565b92915050565b6000813590506139de816150ce565b92915050565b6000813590506139f3816150e5565b92915050565b600060208284031215613a0f57613a0e615038565b5b6000613a1d84828501613775565b91505092915050565b60008060208385031215613a3d57613a3c615038565b5b600083013567ffffffffffffffff811115613a5b57613a5a615033565b5b613a6785828601613836565b92509250509250929050565b600060208284031215613a8957613a88615038565b5b6000613a97848285016138a1565b91505092915050565b600060208284031215613ab657613ab5615038565b5b6000613ac4848285016138b6565b91505092915050565b60008060408385031215613ae457613ae3615038565b5b6000613af2858286016138b6565b9250506020613b0385828601613760565b9150509250929050565b600080600060608486031215613b2657613b25615038565b5b6000613b34868287016138b6565b9350506020613b4586828701613760565b9250506040613b5686828701613760565b9150509250925092565b600080600060608486031215613b7957613b78615038565b5b6000613b87868287016138b6565b9350506020613b9886828701613760565b9250506040613ba98682870161388c565b9150509250925092565b600080600060408486031215613bcc57613bcb615038565b5b6000613bda868287016138b6565b935050602084013567ffffffffffffffff811115613bfb57613bfa615033565b5b613c078682870161378a565b92509250509250925092565b60008060008060608587031215613c2d57613c2c615038565b5b6000613c3b878288016138b6565b945050602085013567ffffffffffffffff811115613c5c57613c5b615033565b5b613c68878288016137e0565b93509350506040613c7b8782880161388c565b91505092959194509250565b60008060408385031215613c9e57613c9d615038565b5b6000613cac858286016138b6565b9250506020613cbd858286016138b6565b9150509250929050565b600080600060608486031215613ce057613cdf615038565b5b6000613cee868287016138b6565b9350506020613cff868287016138b6565b9250506040613d10868287016138b6565b9150509250925092565b600080600060608486031215613d3357613d32615038565b5b6000613d41868287016138b6565b9350506020613d52868287016138b6565b9250506040613d63868287016139ba565b9150509250925092565b60008060408385031215613d8457613d83615038565b5b6000613d92858286016138b6565b9250506020613da3858286016138cb565b9150509250929050565b600080600060608486031215613dc657613dc5615038565b5b6000613dd4868287016138b6565b9350506020613de5868287016138cb565b9250506040613df686828701613760565b9150509250925092565b600080600060408486031215613e1957613e18615038565b5b6000613e27868287016138b6565b935050602084013567ffffffffffffffff811115613e4857613e47615033565b5b613e54868287016138e0565b92509250509250925092565b600080600060408486031215613e7957613e78615038565b5b6000613e87868287016138b6565b935050602084013567ffffffffffffffff811115613ea857613ea7615033565b5b613eb486828701613964565b92509250509250925092565b600080600080600060608688031215613edc57613edb615038565b5b6000613eea888289016138b6565b955050602086013567ffffffffffffffff811115613f0b57613f0a615033565b5b613f1788828901613964565b9450945050604086013567ffffffffffffffff811115613f3a57613f39615033565b5b613f4688828901613964565b92509250509295509295909350565b60008060408385031215613f6c57613f6b615038565b5b6000613f7a858286016138b6565b9250506020613f8b858286016139cf565b9150509250929050565b60008060008060608587031215613faf57613fae615038565b5b6000613fbd878288016138b6565b9450506020613fce878288016139cf565b935050604085013567ffffffffffffffff811115613fef57613fee615033565b5b613ffb878288016138e0565b925092505092959194509250565b60008060006060848603121561402257614021615038565b5b6000614030868287016138b6565b9350506020614041868287016139cf565b925050604084013567ffffffffffffffff81111561406257614061615033565b5b61406e86828701613936565b9150509250925092565b6000806040838503121561408f5761408e615038565b5b600061409d858286016138b6565b92505060206140ae858286016139e4565b9150509250929050565b6000602082840312156140ce576140cd615038565b5b60006140dc848285016138cb565b91505092915050565b60006140f18383614147565b60208301905092915050565b6000614109838361437e565b60208301905092915050565b600061412183836143fd565b905092915050565b61413281614d38565b82525050565b61414181614c9f565b82525050565b61415081614c8d565b82525050565b61415f81614c8d565b82525050565b600061417082614aa0565b61417a8185614b3f565b935061418583614a46565b8060005b838110156141b657815161419d88826140e5565b97506141a883614aed565b925050600181019050614189565b5085935050505092915050565b60006141ce82614aab565b6141d88185614b2e565b93506141e383614a56565b8060005b8381101561421b576141f882614fea565b61420288826140e5565b975061420d83614afa565b9250506001810190506141e7565b5085935050505092915050565b600061423382614ab6565b61423d8185614b61565b935061424883614a6b565b8060005b8381101561427957815161426088826140fd565b975061426b83614b07565b92505060018101905061424c565b5085935050505092915050565b600061429182614ac1565b61429b8185614b50565b93506142a683614a7b565b8060005b838110156142de576142bb82614ffd565b6142c588826140fd565b97506142d083614b14565b9250506001810190506142aa565b5085935050505092915050565b60006142f682614acc565b6143008185614b72565b93508360208202850161431285614a90565b8060005b8581101561434e578484038952815161432f8582614115565b945061433a83614b21565b925060208a01995050600181019050614316565b50829750879550505050505092915050565b61436981614cb1565b82525050565b61437881614cb1565b82525050565b61438781614cbd565b82525050565b61439681614cbd565b82525050565b6143a581614cc7565b82525050565b60006143b78385614b94565b93506143c4838584614d6e565b6143cd8361503d565b840190509392505050565b60006143e48385614ba5565b93506143f1838584614d6e565b82840190509392505050565b600061440882614ad7565b6144128185614b83565b9350614422818560208601614d7d565b61442b8161503d565b840191505092915050565b600061444182614ad7565b61444b8185614b94565b935061445b818560208601614d7d565b6144648161503d565b840191505092915050565b600061447a82614ad7565b6144848185614ba5565b9350614494818560208601614d7d565b80840191505092915050565b60006144ac8385614bb0565b93506144b9838584614d6e565b6144c28361503d565b840190509392505050565b60006144d98385614bc1565b93506144e6838584614d6e565b82840190509392505050565b60006144fd82614ae2565b6145078185614bb0565b9350614517818560208601614d7d565b6145208161503d565b840191505092915050565b6000604083016000808401858303600087015261454883826141c3565b9250506001840154905061455b81614e40565b614568602087018261437e565b50819250505092915050565b600060408301600080840185830360008701526145918382614286565b925050600184015490506145a481614e26565b6145b16020870182614360565b50819250505092915050565b6145c681614cf3565b82525050565b6145d581614d21565b82525050565b6145e481614d2b565b82525050565b60006145f78284866143d8565b91508190509392505050565b600061460f828461446f565b915081905092915050565b60006146278284866144cd565b91508190509392505050565b60006020820190506146486000830184614156565b92915050565b60006020820190506146636000830184614129565b92915050565b600060208201905061467e6000830184614138565b92915050565b60006040820190506146996000830185614156565b6146a66020830184614156565b9392505050565b600060408201905081810360008301526146c78185614165565b90506146d6602083018461438d565b9392505050565b600060408201905081810360008301526146f78185614228565b9050614706602083018461436f565b9392505050565b6000602082019050818103600083015261472781846142eb565b905092915050565b6000602082019050614744600083018461436f565b92915050565b600060208201905061475f600083018461438d565b92915050565b600060408201905061477a600083018561438d565b614787602083018461438d565b9392505050565b60006020820190506147a3600083018461439c565b92915050565b600060208201905081810360008301526147c48184866143ab565b90509392505050565b600060208201905081810360008301526147e78184614436565b905092915050565b600060408201905081810360008301526148098186614436565b9050818103602083015261481e8184866143ab565b9050949350505050565b600060408201905081810360008301526148428185614436565b905061485160208301846145bd565b9392505050565b600060608201905081810360008301526148728186614436565b905061488160208301856145bd565b81810360408301526148938184614436565b9050949350505050565b600060208201905081810360008301526148b88184866144a0565b90509392505050565b600060208201905081810360008301526148db81846144f2565b905092915050565b600060208201905081810360008301526148fd818461452b565b905092915050565b6000602082019050818103600083015261491f8184614574565b905092915050565b600060208201905061493c60008301846145cc565b92915050565b600060408201905061495760008301856145cc565b81810360208301526149698184614436565b90509392505050565b600060208201905061498760008301846145db565b92915050565b600080833560016020038436030381126149aa576149a961501f565b5b80840192508235915067ffffffffffffffff8211156149cc576149cb61501a565b5b6020830192506001820236038313156149e8576149e7615029565b5b509250929050565b60006149fa614a0b565b9050614a068282614e5a565b919050565b6000604051905090565b600067ffffffffffffffff821115614a3057614a2f614fbb565b5b614a398261503d565b9050602081019050919050565b6000819050602082019050919050565b60008190508160005260206000209050919050565b6000819050602082019050919050565b60008190508160005260206000209050919050565b6000819050602082019050919050565b600081519050919050565b600081549050919050565b600081519050919050565b600081549050919050565b600081519050919050565b600081519050919050565b600081519050919050565b6000602082019050919050565b6000600182019050919050565b6000602082019050919050565b6000600182019050919050565b6000602082019050919050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b600081905092915050565b600082825260208201905092915050565b600081905092915050565b6000614bd782614d21565b9150614be283614d21565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115614c1757614c16614f2e565b5b828201905092915050565b6000614c2d82614d21565b9150614c3883614d21565b925082821015614c4b57614c4a614f2e565b5b828203905092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600060ff82169050919050565b6000819050919050565b6000614c9882614d01565b9050919050565b6000614caa82614d01565b9050919050565b60008115159050919050565b6000819050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b600061ffff82169050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060ff82169050919050565b6000614d4382614d4a565b9050919050565b6000614d5582614d5c565b9050919050565b6000614d6782614d01565b9050919050565b82818337600083830152505050565b60005b83811015614d9b578082015181840152602081019050614d80565b83811115614daa576000848401525b50505050565b6000614dbb82614cf3565b91506000821415614dcf57614dce614f2e565b5b600182039050919050565b60006002820490506001821680614df257607f821691505b60208210811415614e0657614e05614f5d565b5b50919050565b6000614e1f614e1a8361504e565b614c56565b9050919050565b6000614e39614e348361504e565b614c76565b9050919050565b6000614e53614e4e8361504e565b614c83565b9050919050565b614e638261503d565b810181811067ffffffffffffffff82111715614e8257614e81614fbb565b5b80604052505050565b6000614e9682614cf3565b915061ffff821415614eab57614eaa614f2e565b5b600182019050919050565b6000614ec182614d21565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415614ef457614ef3614f2e565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052600160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000614ff68254614e0c565b9050919050565b60006150098254614e40565b9050919050565b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b60008160001c9050919050565b61506481614c8d565b811461506f57600080fd5b50565b61507b81614cb1565b811461508657600080fd5b50565b61509281614cbd565b811461509d57600080fd5b50565b6150a981614cc7565b81146150b457600080fd5b50565b6150c081614cf3565b81146150cb57600080fd5b50565b6150d781614d21565b81146150e257600080fd5b50565b6150ee81614d2b565b81146150f957600080fd5b5056fea2646970667358221220f0d8e9a774febbc80a13ec1c7961499ea08a66db8828a2f54524b0bbcc1911cf64736f6c63430008060033';

var isSuperArgs$2 = function isSuperArgs(xs) {
  return xs.length > 1;
};

var RoleDefinitionResolver__factory = /*#__PURE__*/ (function (
  _ContractFactory
) {
  _inherits(RoleDefinitionResolver__factory, _ContractFactory);

  var _super = _createSuper(RoleDefinitionResolver__factory);

  function RoleDefinitionResolver__factory() {
    var _this;

    _classCallCheck(this, RoleDefinitionResolver__factory);

    for (
      var _len = arguments.length, args = new Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key];
    }

    if (isSuperArgs$2(args)) {
      _this = _super.call.apply(_super, [this].concat(args));
    } else {
      _this = _super.call(this, _abi$2, _bytecode$2, args[0]);
    }

    _this.contractName = 'RoleDefinitionResolver';
    return _possibleConstructorReturn(_this);
  }

  _createClass(
    RoleDefinitionResolver__factory,
    [
      {
        key: 'deploy',
        value: function deploy(_ens, _notifier, overrides) {
          return _get(
            _getPrototypeOf(RoleDefinitionResolver__factory.prototype),
            'deploy',
            this
          ).call(this, _ens, _notifier, overrides || {});
        },
      },
      {
        key: 'getDeployTransaction',
        value: function getDeployTransaction(_ens, _notifier, overrides) {
          return _get(
            _getPrototypeOf(RoleDefinitionResolver__factory.prototype),
            'getDeployTransaction',
            this
          ).call(this, _ens, _notifier, overrides || {});
        },
      },
      {
        key: 'attach',
        value: function attach(address) {
          return _get(
            _getPrototypeOf(RoleDefinitionResolver__factory.prototype),
            'attach',
            this
          ).call(this, address);
        },
      },
      {
        key: 'connect',
        value: function connect(signer) {
          return _get(
            _getPrototypeOf(RoleDefinitionResolver__factory.prototype),
            'connect',
            this
          ).call(this, signer);
        },
      },
    ],
    [
      {
        key: 'createInterface',
        value: function createInterface() {
          return new ethers.utils.Interface(_abi$2);
        },
      },
      {
        key: 'connect',
        value: function connect(address, signerOrProvider) {
          return new ethers.Contract(address, _abi$2, signerOrProvider);
        },
      },
    ]
  );

  return RoleDefinitionResolver__factory;
})(ethers.ContractFactory);
RoleDefinitionResolver__factory.bytecode = _bytecode$2;
RoleDefinitionResolver__factory.abi = _abi$2;

var _abi$1 = [
  {
    inputs: [
      {
        internalType: 'contract ENS',
        name: '_ens',
        type: 'address',
      },
      {
        internalType: 'contract DomainNotifier',
        name: '_notifier',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'contentType',
        type: 'uint256',
      },
    ],
    name: 'ABIChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'a',
        type: 'address',
      },
    ],
    name: 'AddrChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'coinType',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'newAddress',
        type: 'bytes',
      },
    ],
    name: 'AddressChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'target',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'isAuthorised',
        type: 'bool',
      },
    ],
    name: 'AuthorisationChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'hash',
        type: 'bytes',
      },
    ],
    name: 'ContenthashChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'name',
        type: 'bytes',
      },
      {
        indexed: false,
        internalType: 'uint16',
        name: 'resource',
        type: 'uint16',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'record',
        type: 'bytes',
      },
    ],
    name: 'DNSRecordChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'name',
        type: 'bytes',
      },
      {
        indexed: false,
        internalType: 'uint16',
        name: 'resource',
        type: 'uint16',
      },
    ],
    name: 'DNSRecordDeleted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'DNSZoneCleared',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'lastzonehash',
        type: 'bytes',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'zonehash',
        type: 'bytes',
      },
    ],
    name: 'DNSZonehashChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'bytes4',
        name: 'interfaceID',
        type: 'bytes4',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'implementer',
        type: 'address',
      },
    ],
    name: 'InterfaceChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'newType',
        type: 'uint8',
      },
    ],
    name: 'IssuerTypeChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        components: [
          {
            internalType: 'address[]',
            name: 'dids',
            type: 'address[]',
          },
          {
            internalType: 'bytes32',
            name: 'role',
            type: 'bytes32',
          },
        ],
        indexed: false,
        internalType: 'struct IssuersResolver.Issuers',
        name: 'newIssuers',
        type: 'tuple',
      },
    ],
    name: 'IssuersChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
    ],
    name: 'NameChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        components: [
          {
            internalType: 'bytes32[]',
            name: 'roles',
            type: 'bytes32[]',
          },
          {
            internalType: 'bool',
            name: 'mustHaveAll',
            type: 'bool',
          },
        ],
        indexed: false,
        internalType:
          'struct EnrolmentPrerequisiteRolesResolver.PrerequisiteRoles',
        name: 'newPrerequisiteRoles',
        type: 'tuple',
      },
    ],
    name: 'PrerequisiteRolesChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'x',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'y',
        type: 'bytes32',
      },
    ],
    name: 'PubkeyChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'newType',
        type: 'uint8',
      },
    ],
    name: 'RevokerTypeChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        components: [
          {
            internalType: 'address[]',
            name: 'dids',
            type: 'address[]',
          },
          {
            internalType: 'bytes32',
            name: 'role',
            type: 'bytes32',
          },
        ],
        indexed: false,
        internalType: 'struct RevokersResolver.Revokers',
        name: 'newRevokers',
        type: 'tuple',
      },
    ],
    name: 'RevokersChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'string',
        name: 'indexedKey',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'key',
        type: 'string',
      },
    ],
    name: 'TextChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newVersion',
        type: 'uint256',
      },
    ],
    name: 'VersionNumberChanged',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'contentTypes',
        type: 'uint256',
      },
    ],
    name: 'ABI',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'addr',
    outputs: [
      {
        internalType: 'address payable',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'coinType',
        type: 'uint256',
      },
    ],
    name: 'addr',
    outputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'authorisations',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'clearDNSZone',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'contenthash',
    outputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'name',
        type: 'bytes32',
      },
      {
        internalType: 'uint16',
        name: 'resource',
        type: 'uint16',
      },
    ],
    name: 'dnsRecord',
    outputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'name',
        type: 'bytes32',
      },
    ],
    name: 'hasDNSRecords',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes4',
        name: 'interfaceID',
        type: 'bytes4',
      },
    ],
    name: 'interfaceImplementer',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'issuerType',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    name: 'issuerTypes',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'issuers',
    outputs: [
      {
        internalType: 'address[]',
        name: 'dids',
        type: 'address[]',
      },
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes[]',
        name: 'data',
        type: 'bytes[]',
      },
    ],
    name: 'multicall',
    outputs: [
      {
        internalType: 'bytes[]',
        name: 'results',
        type: 'bytes[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'prerequisiteRoles',
    outputs: [
      {
        internalType: 'bytes32[]',
        name: 'roles',
        type: 'bytes32[]',
      },
      {
        internalType: 'bool',
        name: 'mustHaveAll',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'pubkey',
    outputs: [
      {
        internalType: 'bytes32',
        name: 'x',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'y',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'revokerType',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    name: 'revokerTypes',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'revokers',
    outputs: [
      {
        internalType: 'address[]',
        name: 'dids',
        type: 'address[]',
      },
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'contentType',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'setABI',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'coinType',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'a',
        type: 'bytes',
      },
    ],
    name: 'setAddr',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'a',
        type: 'address',
      },
    ],
    name: 'setAddr',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'target',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'isAuthorised',
        type: 'bool',
      },
    ],
    name: 'setAuthorisation',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes',
        name: 'hash',
        type: 'bytes',
      },
    ],
    name: 'setContenthash',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'setDNSRecords',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes4',
        name: 'interfaceID',
        type: 'bytes4',
      },
      {
        internalType: 'address',
        name: 'implementer',
        type: 'address',
      },
    ],
    name: 'setInterface',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'address[]',
        name: 'dids',
        type: 'address[]',
      },
    ],
    name: 'setIssuerDids',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
    ],
    name: 'setIssuerRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'uint8',
        name: 'newIssuerType',
        type: 'uint8',
      },
    ],
    name: 'setIssuerType',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
    ],
    name: 'setName',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32[]',
        name: 'roles',
        type: 'bytes32[]',
      },
      {
        internalType: 'bool',
        name: 'mustHaveAll',
        type: 'bool',
      },
    ],
    name: 'setPrerequisiteRoles',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'x',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'y',
        type: 'bytes32',
      },
    ],
    name: 'setPubkey',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'address[]',
        name: 'dids',
        type: 'address[]',
      },
    ],
    name: 'setRevokerDids',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
    ],
    name: 'setRevokerRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'uint8',
        name: 'newRevokerType',
        type: 'uint8',
      },
    ],
    name: 'setRevokerType',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'string',
        name: 'key',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'value',
        type: 'string',
      },
    ],
    name: 'setText',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'newVersionNumber',
        type: 'uint256',
      },
    ],
    name: 'setVersionNumber',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes',
        name: 'hash',
        type: 'bytes',
      },
    ],
    name: 'setZonehash',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'string',
        name: 'key',
        type: 'string',
      },
    ],
    name: 'text',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'versionNumber',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    name: 'versionNumbers',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'zonehash',
    outputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'domainUpdated',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceID',
        type: 'bytes4',
      },
    ],
    name: 'supportsInterface',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
];
var _bytecode$1 =
  '0x60806040523480156200001157600080fd5b506040516200584d3803806200584d8339818101604052810190620000379190620000f1565b8180600b60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505080601360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050620001cd565b600081519050620000d48162000199565b92915050565b600081519050620000eb81620001b3565b92915050565b600080604083850312156200010b576200010a62000194565b5b60006200011b85828601620000da565b92505060206200012e85828601620000c3565b9150509250929050565b6000620001458262000174565b9050919050565b6000620001598262000138565b9050919050565b60006200016d8262000138565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600080fd5b620001a4816200014c565b8114620001b057600080fd5b50565b620001be8162000160565b8114620001ca57600080fd5b50565b61567080620001dd6000396000f3fe608060405234801561001057600080fd5b50600436106102745760003560e01c80637737221311610151578063c585f697116100c3578063d5fa2b0011610087578063d5fa2b0014610822578063e59d895d1461083e578063ec7adf271461085a578063f1bed5851461088a578063f1cb7e06146108ba578063f86bc879146108ea57610274565b8063c585f69714610744578063c869023314610774578063c986c404146107a5578063ce3decdc146107d6578063d055e4f8146107f257610274565b8063ac9650d811610115578063ac9650d81461065f578063ad154c691461068f578063ad5780af146106ab578063bad72cbe146106c7578063bc1c58d1146106e3578063c53a44131461071357610274565b806377372213146105bf5780638b95dd71146105db578063916b848a146105f7578063a8fa568214610613578063abc52d5e1461064357610274565b806349a762a7116101ea5780635c98042b116101ae5780635c98042b146104da578063616101641461050a578063623195b014610526578063658d7dad14610542578063691f34311461055e57806374d3013a1461058e57610274565b806349a762a7146104125780634cbf6ba41461042e5780635146bd641461045e57806355329f3f1461048e57806359d1d43c146104aa57610274565b806329cd62ea1161023c57806329cd62ea14610342578063304e6ade1461035e578063338bc8fa1461037a5780633393d53c146103aa5780633b3b57de146103c65780633e9ce794146103f657610274565b806301ffc9a7146102795780630af179d7146102a957806310f13a8c146102c5578063124a319c146102e15780632203ab5614610311575b600080fd5b610293600480360381019061028e919061458b565b61091a565b6040516102a09190614c4b565b60405180910390f35b6102c360048036038101906102be91906142d3565b61097b565b005b6102df60048036038101906102da9190614393565b610bad565b005b6102fb60048036038101906102f69190614240565b610c5b565b6040516103089190614b4f565b60405180910390f35b61032b60048036038101906103269190614428565b611053565b604051610339929190614e80565b60405180910390f35b61035c6004803603810190610357919061419a565b611187565b005b610378600480360381019061037391906142d3565b611219565b005b610394600480360381019061038f9190613f73565b61128f565b6040516103a19190614e65565b60405180910390f35b6103c460048036038101906103bf919061454b565b6112ac565b005b6103e060048036038101906103db9190613f73565b611348565b6040516103ed9190614b85565b60405180910390f35b610410600480360381019061040b9190614033565b61137e565b005b61042c6004803603810190610427919061415a565b61148e565b005b6104486004803603810190610443919061415a565b61152d565b6040516104559190614c4b565b60405180910390f35b61047860048036038101906104739190613f73565b611595565b6040516104859190614e65565b60405180910390f35b6104a860048036038101906104a3919061454b565b6115ad565b005b6104c460048036038101906104bf9190614333565b611649565b6040516104d19190614ddd565b60405180910390f35b6104f460048036038101906104ef9190613f73565b61170e565b6040516105019190614ce9565b60405180910390f35b610524600480360381019061051f9190613f73565b6117b3565b005b610540600480360381019061053b9190614468565b611857565b005b61055c60048036038101906105579190614086565b6118ed565b005b61057860048036038101906105739190613f73565b611990565b6040516105859190614ddd565b60405180910390f35b6105a860048036038101906105a39190613f73565b611a35565b6040516105b6929190614bc9565b60405180910390f35b6105d960048036038101906105d49190614333565b611af7565b005b6105f560048036038101906105f091906144dc565b611b6d565b005b610611600480360381019061060c919061415a565b611c43565b005b61062d600480360381019061062891906141ed565b611ce2565b60405161063a9190614ce9565b60405180910390f35b61065d600480360381019061065891906140e6565b611dd7565b005b61067960048036038101906106749190613ef9565b611ee6565b6040516106869190614c29565b60405180910390f35b6106a960048036038101906106a49190614428565b612020565b005b6106c560048036038101906106c09190613f73565b61209b565b005b6106e160048036038101906106dc9190614086565b612108565b005b6106fd60048036038101906106f89190613f73565b6121ab565b60405161070a9190614ce9565b60405180910390f35b61072d60048036038101906107289190613f73565b612250565b60405161073b929190614bc9565b60405180910390f35b61075e60048036038101906107599190613f73565b612312565b60405161076b9190614eb0565b60405180910390f35b61078e60048036038101906107899190613f73565b61233c565b60405161079c929190614c81565b60405180910390f35b6107bf60048036038101906107ba9190613f73565b612376565b6040516107cd929190614bf9565b60405180910390f35b6107f060048036038101906107eb91906142d3565b61240f565b005b61080c60048036038101906108079190613f73565b612528565b6040516108199190614eb0565b60405180910390f35b61083c60048036038101906108379190613fa0565b612548565b005b61085860048036038101906108539190614280565b612574565b005b610874600480360381019061086f9190613f73565b612686565b6040516108819190614eb0565b60405180910390f35b6108a4600480360381019061089f9190613f73565b6126b0565b6040516108b19190614eb0565b60405180910390f35b6108d460048036038101906108cf9190614428565b6126d0565b6040516108e19190614ce9565b60405180910390f35b61090460048036038101906108ff9190613fe0565b612787565b6040516109119190614c4b565b60405180910390f35b6000636161016460e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806109745750610973826127c3565b5b9050919050565b8261098581612824565b61098e57600080fd5b6000806060806000806109ef60008a8a8080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050612a6190919063ffffffff16565b90505b6109fb81612a8b565b610b315760008661ffff161415610a575780604001519550610a1c81612aa1565b935083604051602001610a2f9190614b1f565b604051602081830303815290604052805190602001209150610a5081612ad8565b9250610b23565b6000610a6282612aa1565b9050816040015161ffff168761ffff16141580610a8f5750610a8d8186612b1190919063ffffffff16565b155b15610b2157610afa8b86898d8d8080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050508a8b8860200151610af09190615160565b60008b5114612b38565b816040015196508160200151955080945084805190602001209250610b1e82612ad8565b93505b505b610b2c81612e63565b6109f2565b50600083511115610ba257610ba18984878b8b8080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505088898e8e9050610b979190615160565b6000895114612b38565b5b505050505050505050565b84610bb781612824565b610bc057600080fd5b8282600a60008981526020019081526020016000208787604051610be5929190614b36565b90815260200160405180910390209190610c0092919061388c565b508484604051610c11929190614b36565b6040518091039020867fd8c9334b1a9c2f9da342a0a2b32629c1a229b6445dad78947f674b44444a75508787604051610c4b929190614db9565b60405180910390a3505050505050565b600080600760008581526020019081526020016000206000847bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614610d20578091505061104d565b6000610d2b85611348565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610d6d5760009250505061104d565b6000808273ffffffffffffffffffffffffffffffffffffffff166301ffc9a760e01b604051602401610d9f9190614caa565b6040516020818303038152906040527f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050604051610e299190614b1f565b600060405180830381855afa9150503d8060008114610e64576040519150601f19603f3d011682016040523d82523d6000602084013e610e69565b606091505b5091509150811580610e7c575060208151105b80610eca5750600060f81b81601f81518110610e9b57610e9a6154ca565b5b602001015160f81c60f81b7effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b15610edc57600094505050505061104d565b8273ffffffffffffffffffffffffffffffffffffffff1686604051602401610f049190614caa565b6040516020818303038152906040527f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050604051610f8e9190614b1f565b600060405180830381855afa9150503d8060008114610fc9576040519150601f19603f3d011682016040523d82523d6000602084013e610fce565b606091505b508092508193505050811580610fe5575060208151105b806110335750600060f81b81601f81518110611004576110036154ca565b5b602001015160f81c60f81b7effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b1561104557600094505050505061104d565b829450505050505b92915050565b60006060600080600086815260200190815260200160002090506000600190505b848111611167576000858216141580156110ac5750600082600083815260200190815260200160002080546110a890615318565b9050115b1561115b57808260008381526020019081526020016000208080546110d090615318565b80601f01602080910402602001604051908101604052809291908181526020018280546110fc90615318565b80156111495780601f1061111e57610100808354040283529160200191611149565b820191906000526020600020905b81548152906001019060200180831161112c57829003601f168201915b50505050509050935093505050611180565b600181901b9050611074565b5060006040518060200160405280600081525092509250505b9250929050565b8261119181612824565b61119a57600080fd5b604051806040016040528084815260200183815250600960008681526020019081526020016000206000820151816000015560208201518160010155905050837f1d6f5e03d3f63eb58751986629a5439baee5079ff04f345becb66e23eb154e46848460405161120b929190614c81565b60405180910390a250505050565b8261122381612824565b61122c57600080fd5b828260026000878152602001908152602001600020919061124e929190613912565b50837fe379c1624ed7e714cc0937528a32359d69d5281337765313dba4e081b72d75788484604051611281929190614cc5565b60405180910390a250505050565b6000600d6000838152602001908152602001600020549050919050565b816112b681612824565b6112bf57600080fd5b816010600085815260200190815260200160002060006101000a81548160ff021916908360ff160217905550827fb171544f546e8605a60c7cfbf3d2b6a808a2089ae865c93d983d9e26a8f362526010600086815260200190815260200160002060009054906101000a900460ff1660405161133b9190614eb0565b60405180910390a2505050565b60008061135683603c6126d0565b905060008151141561136c576000915050611379565b61137581612fad565b9150505b919050565b80600c600085815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16847fe1c5610a6e0cbe10764ecd182adcef1ec338dc4e199c99c32ce98f38e12791df846040516114819190614c4b565b60405180910390a4505050565b8161149881612824565b6114a157600080fd5b8160116000858152602001908152602001600020600101819055506011600084815260200190815260200160002060000160006114de9190613998565b827fe63737c75876c3e30f959222eccba9bd21a79e44ebbdeba938a2310016d14ded601160008681526020019081526020016000206040516115209190614e43565b60405180910390a2505050565b60008060066000858152602001908152602001600020600060046000878152602001908152602001600020548152602001908152602001600020600084815260200190815260200160002060009054906101000a900461ffff1661ffff161415905092915050565b600d6020528060005260406000206000915090505481565b816115b781612824565b6115c057600080fd5b81600e600085815260200190815260200160002060006101000a81548160ff021916908360ff160217905550827f7fc5f6d56736f6859a63066a1e8f557dc0b34a3a0af625f99db5a258963399d3600e600086815260200190815260200160002060009054906101000a900460ff1660405161163c9190614eb0565b60405180910390a2505050565b6060600a6000858152602001908152602001600020838360405161166e929190614b36565b9081526020016040518091039020805461168790615318565b80601f01602080910402602001604051908101604052809291908181526020018280546116b390615318565b80156117005780601f106116d557610100808354040283529160200191611700565b820191906000526020600020905b8154815290600101906020018083116116e357829003601f168201915b505050505090509392505050565b606060036000838152602001908152602001600020805461172e90615318565b80601f016020809104026020016040519081016040528092919081815260200182805461175a90615318565b80156117a75780601f1061177c576101008083540402835291602001916117a7565b820191906000526020600020905b81548152906001019060200180831161178a57829003601f168201915b50505050509050919050565b806117bd81612824565b6117c657600080fd5b601360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166361610164836040518263ffffffff1660e01b81526004016118219190614c66565b600060405180830381600087803b15801561183b57600080fd5b505af115801561184f573d6000803e3d6000fd5b505050505050565b8361186181612824565b61186a57600080fd5b60008460018661187a9190615160565b161461188557600080fd5b8282600080888152602001908152602001600020600087815260200190815260200160002091906118b7929190613912565b5083857faa121bbeef5f32f5961a2a28966e769023910fc9479059ee3495d4c1a696efe360405160405180910390a35050505050565b826118f781612824565b61190057600080fd5b82826011600087815260200190815260200160002060000191906119259291906139b9565b506011600085815260200190815260200160002060010160009055837fe63737c75876c3e30f959222eccba9bd21a79e44ebbdeba938a2310016d14ded601160008781526020019081526020016000206040516119829190614e43565b60405180910390a250505050565b60606008600083815260200190815260200160002080546119b090615318565b80601f01602080910402602001604051908101604052809291908181526020018280546119dc90615318565b8015611a295780601f106119fe57610100808354040283529160200191611a29565b820191906000526020600020905b815481529060010190602001808311611a0c57829003601f168201915b50505050509050919050565b6060600060116000848152602001908152602001600020600001601160008581526020019081526020016000206001015481805480602002602001604051908101604052809291908181526020018280548015611ae757602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311611a9d575b5050505050915091509150915091565b82611b0181612824565b611b0a57600080fd5b8282600860008781526020019081526020016000209190611b2c92919061388c565b50837fb7d29e911041e8d9b843369e890bcb72c9388692ba48b65ac54e7214c4c348f78484604051611b5f929190614db9565b60405180910390a250505050565b82611b7781612824565b611b8057600080fd5b837f65412581168e88a1e60c6459d7f44ae83ad0832e670826c05a4e2476b57af7528484604051611bb2929190614e80565b60405180910390a2603c831415611c0457837f52d7d861f09ab3d26239d492e8968629f95e9e318cf0b73bfddc441522a15fd2611bee84612fad565b604051611bfb9190614b6a565b60405180910390a25b816001600086815260200190815260200160002060008581526020019081526020016000209080519060200190611c3c929190613a59565b5050505050565b81611c4d81612824565b611c5657600080fd5b81600f600085815260200190815260200160002060010181905550600f60008481526020019081526020016000206000016000611c939190613998565b827fab0ef04b258ea77c9247dad5b03ada5b2ed5b370f62963b9f84bd9066d499e5c600f6000868152602001908152602001600020604051611cd59190614dff565b60405180910390a2505050565b606060056000858152602001908152602001600020600060046000878152602001908152602001600020548152602001908152602001600020600084815260200190815260200160002060008361ffff1661ffff1681526020019081526020016000208054611d5090615318565b80601f0160208091040260200160405190810160405280929190818152602001828054611d7c90615318565b8015611dc95780601f10611d9e57610100808354040283529160200191611dc9565b820191906000526020600020905b815481529060010190602001808311611dac57829003601f168201915b505050505090509392505050565b83611de181612824565b611dea57600080fd5b6040518060400160405280858580806020026020016040519081016040528093929190818152602001838360200280828437600081840152601f19601f820116905080830192505050505050508152602001831515815250601260008781526020019081526020016000206000820151816000019080519060200190611e71929190613adf565b5060208201518160010160006101000a81548160ff021916908315150217905550905050847f26c1ae1a8943085479d1599dd3884c06f33c62627d918463e96a9b4e519894a360126000888152602001908152602001600020604051611ed79190614e21565b60405180910390a25050505050565b60608282905067ffffffffffffffff811115611f0557611f046154f9565b5b604051908082528060200260200182016040528015611f3857816020015b6060815260200190600190039081611f235790505b50905060005b83839050811015612019576000803073ffffffffffffffffffffffffffffffffffffffff16868685818110611f7657611f756154ca565b5b9050602002810190611f889190614ecb565b604051611f96929190614b06565b600060405180830381855af49150503d8060008114611fd1576040519150601f19603f3d011682016040523d82523d6000602084013e611fd6565b606091505b509150915081611fe557600080fd5b80848481518110611ff957611ff86154ca565b5b602002602001018190525050508080612011906153f4565b915050611f3e565b5092915050565b8161202a81612824565b61203357600080fd5b81600d600085815260200190815260200160002081905550827f85d51b785b03277eec6a168d133b8cffc1ab9f99d3e6a1b4061c23841801698f600d60008681526020019081526020016000205460405161208e9190614e65565b60405180910390a2505050565b806120a581612824565b6120ae57600080fd5b6004600083815260200190815260200160002060008154809291906120d2906153f4565b9190505550817fb757169b8492ca2f1c6619d9d76ce22803035c3b1d5f6930dffe7b127c1a198360405160405180910390a25050565b8261211281612824565b61211b57600080fd5b8282600f600087815260200190815260200160002060000191906121409291906139b9565b50600f600085815260200190815260200160002060010160009055837fab0ef04b258ea77c9247dad5b03ada5b2ed5b370f62963b9f84bd9066d499e5c600f600087815260200190815260200160002060405161219d9190614dff565b60405180910390a250505050565b60606002600083815260200190815260200160002080546121cb90615318565b80601f01602080910402602001604051908101604052809291908181526020018280546121f790615318565b80156122445780601f1061221957610100808354040283529160200191612244565b820191906000526020600020905b81548152906001019060200180831161222757829003601f168201915b50505050509050919050565b60606000600f6000848152602001908152602001600020600001600f6000858152602001908152602001600020600101548180548060200260200160405190810160405280929190818152602001828054801561230257602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190600101908083116122b8575b5050505050915091509150915091565b6000600e600083815260200190815260200160002060009054906101000a900460ff169050919050565b6000806009600084815260200190815260200160002060000154600960008581526020019081526020016000206001015491509150915091565b60606000601260008481526020019081526020016000206000016012600085815260200190815260200160002060010160009054906101000a900460ff16818054806020026020016040519081016040528092919081815260200182805480156123ff57602002820191906000526020600020905b8154815260200190600101908083116123eb575b5050505050915091509150915091565b8261241981612824565b61242257600080fd5b600060036000868152602001908152602001600020805461244290615318565b80601f016020809104026020016040519081016040528092919081815260200182805461246e90615318565b80156124bb5780601f10612490576101008083540402835291602001916124bb565b820191906000526020600020905b81548152906001019060200180831161249e57829003601f168201915b5050505050905083836003600088815260200190815260200160002091906124e4929190613912565b50847f8f15ed4b723ef428f250961da8315675b507046737e19319fc1a4d81bfe87f8582868660405161251993929190614d0b565b60405180910390a25050505050565b600e6020528060005260406000206000915054906101000a900460ff1681565b8161255281612824565b61255b57600080fd5b61256f83603c61256a85612fd0565b611b6d565b505050565b8261257e81612824565b61258757600080fd5b81600760008681526020019081526020016000206000857bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916847f7c69f06bea0bdef565b709e93a147836b0063ba2dd89f02d0b7e8d931e6a6daa846040516126789190614b4f565b60405180910390a350505050565b60006010600083815260200190815260200160002060009054906101000a900460ff169050919050565b60106020528060005260406000206000915054906101000a900460ff1681565b6060600160008481526020019081526020016000206000838152602001908152602001600020805461270190615318565b80601f016020809104026020016040519081016040528092919081815260200182805461272d90615318565b801561277a5780601f1061274f5761010080835404028352916020019161277a565b820191906000526020600020905b81548152906001019060200180831161275d57829003601f168201915b5050505050905092915050565b600c602052826000526040600020602052816000526040600020602052806000526040600020600092509250509054906101000a900460ff1681565b600063c986c40460e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061281d575061281c82613034565b5b9050919050565b600080600b60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166302571be3846040518263ffffffff1660e01b81526004016128829190614c66565b60206040518083038186803b15801561289a57600080fd5b505afa1580156128ae573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906128d29190613ecc565b90503373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614806129a55750600c600084815260200190815260200160002060008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b80612a595750600b60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663e985e9c582336040518363ffffffff1660e01b8152600401612a08929190614ba0565b60206040518083038186803b158015612a2057600080fd5b505afa158015612a34573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612a589190613f46565b5b915050919050565b612a69613b2c565b828160000181905250818160c0018181525050612a8581612e63565b92915050565b6000816000015151826020015110159050919050565b6060612ad18260200151612abd84600001518560200151613095565b84600001516131129092919063ffffffff16565b9050919050565b6060612b0a8260a001518360a001518460c00151612af69190615160565b84600001516131129092919063ffffffff16565b9050919050565b600081518351148015612b305750612b2f83600084600087516131a7565b5b905092915050565b6000600460008981526020019081526020016000205490506000878051906020012090506000612b738686896131129092919063ffffffff16565b90508315612ce5576000600560008c81526020019081526020016000206000858152602001908152602001600020600084815260200190815260200160002060008a61ffff1661ffff1681526020019081526020016000208054612bd690615318565b905014612c4c57600660008b815260200190815260200160002060008481526020019081526020016000206000838152602001908152602001600020600081819054906101000a900461ffff1680929190612c30906152ee565b91906101000a81548161ffff021916908361ffff160217905550505b600560008b81526020019081526020016000206000848152602001908152602001600020600083815260200190815260200160002060008961ffff1661ffff1681526020019081526020016000206000612ca69190613b77565b897f03528ed0c2a3ebc993b12ce3c16bb382f9c7d88ef7d8a1bf290eaf35955a12078a8a604051612cd8929190614d44565b60405180910390a2612e57565b6000600560008c81526020019081526020016000206000858152602001908152602001600020600084815260200190815260200160002060008a61ffff1661ffff1681526020019081526020016000208054612d4090615318565b90501415612db757600660008b815260200190815260200160002060008481526020019081526020016000206000838152602001908152602001600020600081819054906101000a900461ffff1680929190612d9b906153c9565b91906101000a81548161ffff021916908361ffff160217905550505b80600560008c81526020019081526020016000206000858152602001908152602001600020600084815260200190815260200160002060008a61ffff1661ffff1681526020019081526020016000209080519060200190612e19929190613a59565b50897f52a608b3303a48862d07a73d82fa221318c0027fbbcfb1b2329bface3f19ff2b8a8a84604051612e4e93929190614d74565b60405180910390a25b50505050505050505050565b8060c00151816020018181525050806000015151816020015110612e8657612faa565b6000612e9a82600001518360200151613095565b8260200151612ea9919061510a565b9050612ec28183600001516131cb90919063ffffffff16565b826040019061ffff16908161ffff1681525050600281612ee2919061510a565b9050612efb8183600001516131cb90919063ffffffff16565b826060019061ffff16908161ffff1681525050600281612f1b919061510a565b9050612f348183600001516131fa90919063ffffffff16565b826080019063ffffffff16908163ffffffff1681525050600481612f58919061510a565b90506000612f738284600001516131cb90919063ffffffff16565b61ffff169050600282612f86919061510a565b9150818360a00181815250508082612f9e919061510a565b8360c001818152505050505b50565b60006014825114612fbd57600080fd5b600c6101000a6020830151049050919050565b6060601467ffffffffffffffff811115612fed57612fec6154f9565b5b6040519080825280601f01601f19166020018201604052801561301f5781602001600182028036833780820191505090505b509050600c6101000a82026020820152919050565b60006374d3013a60e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061308e575061308d8261322b565b5b9050919050565b6000808290505b6001156130fd57835181106130b4576130b361543d565b5b60006130c9828661328c90919063ffffffff16565b60ff1690506001816130db919061510a565b826130e6919061510a565b915060008114156130f757506130fd565b5061309c565b82816131099190615160565b91505092915050565b606083518284613122919061510a565b111561312d57600080fd5b60008267ffffffffffffffff811115613149576131486154f9565b5b6040519080825280601f01601f19166020018201604052801561317b5781602001600182028036833780820191505090505b509050600080602083019150856020880101905061319a8282876132b7565b8293505050509392505050565b60006131b484848461331b565b6131bf87878561331b565b14905095945050505050565b600082516002836131dc919061510a565b11156131e757600080fd5b61ffff8260028501015116905092915050565b6000825160048361320b919061510a565b111561321657600080fd5b63ffffffff8260048501015116905092915050565b600063ec7adf2760e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161480613285575061328482613347565b5b9050919050565b60008282815181106132a1576132a06154ca565b5b602001015160f81c60f81b60f81c905092915050565b5b602081106132f657815183526020836132d1919061510a565b92506020826132e0919061510a565b91506020816132ef9190615160565b90506132b8565b60006001826020036101000a0390508019835116818551168181178652505050505050565b60008351828461332b919061510a565b111561333657600080fd5b818360208601012090509392505050565b600063c53a441360e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806133a157506133a0826133a8565b5b9050919050565b600063c585f69760e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161480613402575061340182613409565b5b9050919050565b600063338bc8fa60e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061346357506134628261346a565b5b9050919050565b60006134758261347c565b9050919050565b60006359d1d43c60e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806134d657506134d5826134dd565b5b9050919050565b600063c869023360e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061353757506135368261353e565b5b9050919050565b600063691f343160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061359857506135978261359f565b5b9050919050565b60007f124a319c1247f4318c3c16c7e9cc865d0fb5d80d7bf02f56cafc0d14da0208507bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161480613612575061361182613619565b5b9050919050565b600063a8fa568260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806136b25750635c47637c60e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b806136c257506136c1826136c9565b5b9050919050565b600063bc1c58d160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061372357506137228261372a565b5b9050919050565b6000633b3b57de60e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806137c3575063f1cb7e0660e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b806137d357506137d2826137da565b5b9050919050565b6000632203ab5660e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061383457506138338261383b565b5b9050919050565b60006301ffc9a760e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b82805461389890615318565b90600052602060002090601f0160209004810192826138ba5760008555613901565b82601f106138d357803560ff1916838001178555613901565b82800160010185558215613901579182015b828111156139005782358255916020019190600101906138e5565b5b50905061390e9190613bb7565b5090565b82805461391e90615318565b90600052602060002090601f0160209004810192826139405760008555613987565b82601f1061395957803560ff1916838001178555613987565b82800160010185558215613987579182015b8281111561398657823582559160200191906001019061396b565b5b5090506139949190613bb7565b5090565b50805460008255906000526020600020908101906139b69190613bb7565b50565b828054828255906000526020600020908101928215613a48579160200282015b82811115613a4757823573ffffffffffffffffffffffffffffffffffffffff168260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550916020019190600101906139d9565b5b509050613a559190613bb7565b5090565b828054613a6590615318565b90600052602060002090601f016020900481019282613a875760008555613ace565b82601f10613aa057805160ff1916838001178555613ace565b82800160010185558215613ace579182015b82811115613acd578251825591602001919060010190613ab2565b5b509050613adb9190613bb7565b5090565b828054828255906000526020600020908101928215613b1b579160200282015b82811115613b1a578251825591602001919060010190613aff565b5b509050613b289190613bd4565b5090565b6040518060e001604052806060815260200160008152602001600061ffff168152602001600061ffff168152602001600063ffffffff16815260200160008152602001600081525090565b508054613b8390615318565b6000825580601f10613b955750613bb4565b601f016020900490600052602060002090810190613bb39190613bb7565b5b50565b5b80821115613bd0576000816000905550600101613bb8565b5090565b5b80821115613bed576000816000905550600101613bd5565b5090565b6000613c04613bff84614f53565b614f2e565b905082815260208101848484011115613c2057613c1f61556c565b5b613c2b8482856152ac565b509392505050565b600081359050613c4281615599565b92915050565b600081519050613c5781615599565b92915050565b60008083601f840112613c7357613c72615553565b5b8235905067ffffffffffffffff811115613c9057613c8f61554e565b5b602083019150836020820283011115613cac57613cab615562565b5b9250929050565b60008083601f840112613cc957613cc8615553565b5b8235905067ffffffffffffffff811115613ce657613ce561554e565b5b602083019150836020820283011115613d0257613d01615562565b5b9250929050565b60008083601f840112613d1f57613d1e615553565b5b8235905067ffffffffffffffff811115613d3c57613d3b61554e565b5b602083019150836020820283011115613d5857613d57615562565b5b9250929050565b600081359050613d6e816155b0565b92915050565b600081519050613d83816155b0565b92915050565b600081359050613d98816155c7565b92915050565b600081359050613dad816155de565b92915050565b60008083601f840112613dc957613dc8615553565b5b8235905067ffffffffffffffff811115613de657613de561554e565b5b602083019150836001820283011115613e0257613e01615562565b5b9250929050565b600082601f830112613e1e57613e1d615553565b5b8135613e2e848260208601613bf1565b91505092915050565b60008083601f840112613e4d57613e4c615553565b5b8235905067ffffffffffffffff811115613e6a57613e6961554e565b5b602083019150836001820283011115613e8657613e85615562565b5b9250929050565b600081359050613e9c816155f5565b92915050565b600081359050613eb18161560c565b92915050565b600081359050613ec681615623565b92915050565b600060208284031215613ee257613ee1615576565b5b6000613ef084828501613c48565b91505092915050565b60008060208385031215613f1057613f0f615576565b5b600083013567ffffffffffffffff811115613f2e57613f2d615571565b5b613f3a85828601613d09565b92509250509250929050565b600060208284031215613f5c57613f5b615576565b5b6000613f6a84828501613d74565b91505092915050565b600060208284031215613f8957613f88615576565b5b6000613f9784828501613d89565b91505092915050565b60008060408385031215613fb757613fb6615576565b5b6000613fc585828601613d89565b9250506020613fd685828601613c33565b9150509250929050565b600080600060608486031215613ff957613ff8615576565b5b600061400786828701613d89565b935050602061401886828701613c33565b925050604061402986828701613c33565b9150509250925092565b60008060006060848603121561404c5761404b615576565b5b600061405a86828701613d89565b935050602061406b86828701613c33565b925050604061407c86828701613d5f565b9150509250925092565b60008060006040848603121561409f5761409e615576565b5b60006140ad86828701613d89565b935050602084013567ffffffffffffffff8111156140ce576140cd615571565b5b6140da86828701613c5d565b92509250509250925092565b60008060008060608587031215614100576140ff615576565b5b600061410e87828801613d89565b945050602085013567ffffffffffffffff81111561412f5761412e615571565b5b61413b87828801613cb3565b9350935050604061414e87828801613d5f565b91505092959194509250565b6000806040838503121561417157614170615576565b5b600061417f85828601613d89565b925050602061419085828601613d89565b9150509250929050565b6000806000606084860312156141b3576141b2615576565b5b60006141c186828701613d89565b93505060206141d286828701613d89565b92505060406141e386828701613d89565b9150509250925092565b60008060006060848603121561420657614205615576565b5b600061421486828701613d89565b935050602061422586828701613d89565b925050604061423686828701613e8d565b9150509250925092565b6000806040838503121561425757614256615576565b5b600061426585828601613d89565b925050602061427685828601613d9e565b9150509250929050565b60008060006060848603121561429957614298615576565b5b60006142a786828701613d89565b93505060206142b886828701613d9e565b92505060406142c986828701613c33565b9150509250925092565b6000806000604084860312156142ec576142eb615576565b5b60006142fa86828701613d89565b935050602084013567ffffffffffffffff81111561431b5761431a615571565b5b61432786828701613db3565b92509250509250925092565b60008060006040848603121561434c5761434b615576565b5b600061435a86828701613d89565b935050602084013567ffffffffffffffff81111561437b5761437a615571565b5b61438786828701613e37565b92509250509250925092565b6000806000806000606086880312156143af576143ae615576565b5b60006143bd88828901613d89565b955050602086013567ffffffffffffffff8111156143de576143dd615571565b5b6143ea88828901613e37565b9450945050604086013567ffffffffffffffff81111561440d5761440c615571565b5b61441988828901613e37565b92509250509295509295909350565b6000806040838503121561443f5761443e615576565b5b600061444d85828601613d89565b925050602061445e85828601613ea2565b9150509250929050565b6000806000806060858703121561448257614481615576565b5b600061449087828801613d89565b94505060206144a187828801613ea2565b935050604085013567ffffffffffffffff8111156144c2576144c1615571565b5b6144ce87828801613db3565b925092505092959194509250565b6000806000606084860312156144f5576144f4615576565b5b600061450386828701613d89565b935050602061451486828701613ea2565b925050604084013567ffffffffffffffff81111561453557614534615571565b5b61454186828701613e09565b9150509250925092565b6000806040838503121561456257614561615576565b5b600061457085828601613d89565b925050602061458185828601613eb7565b9150509250929050565b6000602082840312156145a1576145a0615576565b5b60006145af84828501613d9e565b91505092915050565b60006145c4838361461a565b60208301905092915050565b60006145dc8383614851565b60208301905092915050565b60006145f483836148d0565b905092915050565b61460581615276565b82525050565b614614816151dd565b82525050565b614623816151cb565b82525050565b614632816151cb565b82525050565b600061464382614fde565b61464d818561507d565b935061465883614f84565b8060005b8381101561468957815161467088826145b8565b975061467b8361502b565b92505060018101905061465c565b5085935050505092915050565b60006146a182614fe9565b6146ab818561506c565b93506146b683614f94565b8060005b838110156146ee576146cb82615528565b6146d588826145b8565b97506146e083615038565b9250506001810190506146ba565b5085935050505092915050565b600061470682614ff4565b614710818561509f565b935061471b83614fa9565b8060005b8381101561474c57815161473388826145d0565b975061473e83615045565b92505060018101905061471f565b5085935050505092915050565b600061476482614fff565b61476e818561508e565b935061477983614fb9565b8060005b838110156147b15761478e8261553b565b61479888826145d0565b97506147a383615052565b92505060018101905061477d565b5085935050505092915050565b60006147c98261500a565b6147d381856150b0565b9350836020820285016147e585614fce565b8060005b85811015614821578484038952815161480285826145e8565b945061480d8361505f565b925060208a019950506001810190506147e9565b50829750879550505050505092915050565b61483c816151ef565b82525050565b61484b816151ef565b82525050565b61485a816151fb565b82525050565b614869816151fb565b82525050565b61487881615205565b82525050565b600061488a83856150d2565b93506148978385846152ac565b6148a08361557b565b840190509392505050565b60006148b783856150e3565b93506148c48385846152ac565b82840190509392505050565b60006148db82615015565b6148e581856150c1565b93506148f58185602086016152bb565b6148fe8161557b565b840191505092915050565b600061491482615015565b61491e81856150d2565b935061492e8185602086016152bb565b6149378161557b565b840191505092915050565b600061494d82615015565b61495781856150e3565b93506149678185602086016152bb565b80840191505092915050565b600061497f83856150ee565b935061498c8385846152ac565b6149958361557b565b840190509392505050565b60006149ac83856150ff565b93506149b98385846152ac565b82840190509392505050565b60006149d082615020565b6149da81856150ee565b93506149ea8185602086016152bb565b6149f38161557b565b840191505092915050565b60006040830160008084018583036000870152614a1b8382614696565b92505060018401549050614a2e8161537e565b614a3b6020870182614851565b50819250505092915050565b60006040830160008084018583036000870152614a648382614759565b92505060018401549050614a7781615364565b614a846020870182614833565b50819250505092915050565b60006040830160008084018583036000870152614aad8382614696565b92505060018401549050614ac08161537e565b614acd6020870182614851565b50819250505092915050565b614ae281615231565b82525050565b614af18161525f565b82525050565b614b0081615269565b82525050565b6000614b138284866148ab565b91508190509392505050565b6000614b2b8284614942565b915081905092915050565b6000614b438284866149a0565b91508190509392505050565b6000602082019050614b646000830184614629565b92915050565b6000602082019050614b7f60008301846145fc565b92915050565b6000602082019050614b9a600083018461460b565b92915050565b6000604082019050614bb56000830185614629565b614bc26020830184614629565b9392505050565b60006040820190508181036000830152614be38185614638565b9050614bf26020830184614860565b9392505050565b60006040820190508181036000830152614c1381856146fb565b9050614c226020830184614842565b9392505050565b60006020820190508181036000830152614c4381846147be565b905092915050565b6000602082019050614c606000830184614842565b92915050565b6000602082019050614c7b6000830184614860565b92915050565b6000604082019050614c966000830185614860565b614ca36020830184614860565b9392505050565b6000602082019050614cbf600083018461486f565b92915050565b60006020820190508181036000830152614ce081848661487e565b90509392505050565b60006020820190508181036000830152614d038184614909565b905092915050565b60006040820190508181036000830152614d258186614909565b90508181036020830152614d3a81848661487e565b9050949350505050565b60006040820190508181036000830152614d5e8185614909565b9050614d6d6020830184614ad9565b9392505050565b60006060820190508181036000830152614d8e8186614909565b9050614d9d6020830185614ad9565b8181036040830152614daf8184614909565b9050949350505050565b60006020820190508181036000830152614dd4818486614973565b90509392505050565b60006020820190508181036000830152614df781846149c5565b905092915050565b60006020820190508181036000830152614e1981846149fe565b905092915050565b60006020820190508181036000830152614e3b8184614a47565b905092915050565b60006020820190508181036000830152614e5d8184614a90565b905092915050565b6000602082019050614e7a6000830184614ae8565b92915050565b6000604082019050614e956000830185614ae8565b8181036020830152614ea78184614909565b90509392505050565b6000602082019050614ec56000830184614af7565b92915050565b60008083356001602003843603038112614ee857614ee761555d565b5b80840192508235915067ffffffffffffffff821115614f0a57614f09615558565b5b602083019250600182023603831315614f2657614f25615567565b5b509250929050565b6000614f38614f49565b9050614f448282615398565b919050565b6000604051905090565b600067ffffffffffffffff821115614f6e57614f6d6154f9565b5b614f778261557b565b9050602081019050919050565b6000819050602082019050919050565b60008190508160005260206000209050919050565b6000819050602082019050919050565b60008190508160005260206000209050919050565b6000819050602082019050919050565b600081519050919050565b600081549050919050565b600081519050919050565b600081549050919050565b600081519050919050565b600081519050919050565b600081519050919050565b6000602082019050919050565b6000600182019050919050565b6000602082019050919050565b6000600182019050919050565b6000602082019050919050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b600081905092915050565b600082825260208201905092915050565b600081905092915050565b60006151158261525f565b91506151208361525f565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156151555761515461546c565b5b828201905092915050565b600061516b8261525f565b91506151768361525f565b9250828210156151895761518861546c565b5b828203905092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600060ff82169050919050565b6000819050919050565b60006151d68261523f565b9050919050565b60006151e88261523f565b9050919050565b60008115159050919050565b6000819050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b600061ffff82169050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060ff82169050919050565b600061528182615288565b9050919050565b60006152938261529a565b9050919050565b60006152a58261523f565b9050919050565b82818337600083830152505050565b60005b838110156152d95780820151818401526020810190506152be565b838111156152e8576000848401525b50505050565b60006152f982615231565b9150600082141561530d5761530c61546c565b5b600182039050919050565b6000600282049050600182168061533057607f821691505b602082108114156153445761534361549b565b5b50919050565b600061535d6153588361558c565b615194565b9050919050565b60006153776153728361558c565b6151b4565b9050919050565b600061539161538c8361558c565b6151c1565b9050919050565b6153a18261557b565b810181811067ffffffffffffffff821117156153c0576153bf6154f9565b5b80604052505050565b60006153d482615231565b915061ffff8214156153e9576153e861546c565b5b600182019050919050565b60006153ff8261525f565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8214156154325761543161546c565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052600160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000615534825461534a565b9050919050565b6000615547825461537e565b9050919050565b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b60008160001c9050919050565b6155a2816151cb565b81146155ad57600080fd5b50565b6155b9816151ef565b81146155c457600080fd5b50565b6155d0816151fb565b81146155db57600080fd5b50565b6155e781615205565b81146155f257600080fd5b50565b6155fe81615231565b811461560957600080fd5b50565b6156158161525f565b811461562057600080fd5b50565b61562c81615269565b811461563757600080fd5b5056fea26469706673582212205f46b36c67cd4d4ae0eb4cfc2c5dfd8898deff5fdb1ad1cd1152a9162dfbea5c64736f6c63430008060033';

var isSuperArgs$1 = function isSuperArgs(xs) {
  return xs.length > 1;
};

var RoleDefinitionResolverV2__factory = /*#__PURE__*/ (function (
  _ContractFactory
) {
  _inherits(RoleDefinitionResolverV2__factory, _ContractFactory);

  var _super = _createSuper(RoleDefinitionResolverV2__factory);

  function RoleDefinitionResolverV2__factory() {
    var _this;

    _classCallCheck(this, RoleDefinitionResolverV2__factory);

    for (
      var _len = arguments.length, args = new Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key];
    }

    if (isSuperArgs$1(args)) {
      _this = _super.call.apply(_super, [this].concat(args));
    } else {
      _this = _super.call(this, _abi$1, _bytecode$1, args[0]);
    }

    _this.contractName = 'RoleDefinitionResolverV2';
    return _possibleConstructorReturn(_this);
  }

  _createClass(
    RoleDefinitionResolverV2__factory,
    [
      {
        key: 'deploy',
        value: function deploy(_ens, _notifier, overrides) {
          return _get(
            _getPrototypeOf(RoleDefinitionResolverV2__factory.prototype),
            'deploy',
            this
          ).call(this, _ens, _notifier, overrides || {});
        },
      },
      {
        key: 'getDeployTransaction',
        value: function getDeployTransaction(_ens, _notifier, overrides) {
          return _get(
            _getPrototypeOf(RoleDefinitionResolverV2__factory.prototype),
            'getDeployTransaction',
            this
          ).call(this, _ens, _notifier, overrides || {});
        },
      },
      {
        key: 'attach',
        value: function attach(address) {
          return _get(
            _getPrototypeOf(RoleDefinitionResolverV2__factory.prototype),
            'attach',
            this
          ).call(this, address);
        },
      },
      {
        key: 'connect',
        value: function connect(signer) {
          return _get(
            _getPrototypeOf(RoleDefinitionResolverV2__factory.prototype),
            'connect',
            this
          ).call(this, signer);
        },
      },
    ],
    [
      {
        key: 'createInterface',
        value: function createInterface() {
          return new ethers.utils.Interface(_abi$1);
        },
      },
      {
        key: 'connect',
        value: function connect(address, signerOrProvider) {
          return new ethers.Contract(address, _abi$1, signerOrProvider);
        },
      },
    ]
  );

  return RoleDefinitionResolverV2__factory;
})(ethers.ContractFactory);
RoleDefinitionResolverV2__factory.bytecode = _bytecode$1;
RoleDefinitionResolverV2__factory.abi = _abi$1;

exports.ResolverContractType = void 0;

(function (ResolverContractType) {
  ResolverContractType['PublicResolver'] = 'public';
  ResolverContractType['RoleDefinitionResolver_v1'] = 'roledefv1';
  ResolverContractType['RoleDefinitionResolver_v2'] = 'roledefv2';
})(exports.ResolverContractType || (exports.ResolverContractType = {}));

var ERROR_MESSAGES;

(function (ERROR_MESSAGES) {
  ERROR_MESSAGES['DOMAIN_NOT_REGISTERED'] = 'Domain not registered';
  ERROR_MESSAGES['RESOLVER_NOT_KNOWN'] =
    'Resolver contract is not known. Use addKnownResolver function';
  ERROR_MESSAGES['RESOLVER_NOT_SUPPORTED'] = 'Resolver type is not supported';
  ERROR_MESSAGES['DOMAIN_TYPE_UNKNOWN'] = 'unable to determine domain type';
  ERROR_MESSAGES['NAME_NODE_MISMATCH'] = 'hashed name does not match node';
})(ERROR_MESSAGES || (ERROR_MESSAGES = {}));

var DomainReader = /*#__PURE__*/ (function () {
  function DomainReader(_ref) {
    var _VOLTA_CHAIN_ID, _this$_knownDidEthrNe;

    var ensRegistryAddress = _ref.ensRegistryAddress,
      provider = _ref.provider;

    _classCallCheck(this, DomainReader);

    this._knownEnsResolvers = _defineProperty(
      {},
      VOLTA_CHAIN_ID,
      ((_VOLTA_CHAIN_ID = {}),
      _defineProperty(
        _VOLTA_CHAIN_ID,
        VOLTA_PUBLIC_RESOLVER_ADDRESS,
        exports.ResolverContractType.PublicResolver
      ),
      _defineProperty(
        _VOLTA_CHAIN_ID,
        VOLTA_RESOLVER_V1_ADDRESS,
        exports.ResolverContractType.RoleDefinitionResolver_v1
      ),
      _defineProperty(
        _VOLTA_CHAIN_ID,
        VOLTA_RESOLVER_V2_ADDRESS,
        exports.ResolverContractType.RoleDefinitionResolver_v2
      ),
      _VOLTA_CHAIN_ID)
    );
    /**
     * Allows to map between chainId to network name that is used in ethr DID
     *
     */

    this._knownDidEthrNetworkNames =
      ((_this$_knownDidEthrNe = {}),
      _defineProperty(_this$_knownDidEthrNe, VOLTA_CHAIN_ID, 'volta'),
      _defineProperty(_this$_knownDidEthrNe, EWC_CHAIN_ID, 'ewc'),
      _this$_knownDidEthrNe);
    this._provider = provider;
    this._ensRegistry = ENSRegistry__factory.connect(
      ensRegistryAddress,
      this._provider
    );
  }

  _createClass(DomainReader, [
    {
      key: 'addKnownResolver',
      value: function addKnownResolver(_ref2) {
        var chainId = _ref2.chainId,
          address = _ref2.address,
          type = _ref2.type;

        if (!this._knownEnsResolvers[chainId]) {
          this._knownEnsResolvers[chainId] = {};
        }

        this._knownEnsResolvers[chainId][address] = type;
      },
      /**
       * Reads the reverse name for a node from its registered ENS resolver contract
       * @param node the ENS node hash of a domain name
       * @returns The name associated with the node.
       */
    },
    {
      key: 'readName',
      value: function readName(node) {
        return tslib.__awaiter(this, void 0, void 0, function* () {
          var checkName = function checkName(name) {
            if (node !== ethers.utils.namehash(name)) {
              throw Error(
                ''
                  .concat(ERROR_MESSAGES.NAME_NODE_MISMATCH, ', node: ')
                  .concat(node)
              );
            }

            return name;
          };

          // var _yield$this$getResolv = yield this.getResolverInfo(node),
          //     resolverAddress = _yield$this$getResolv.resolverAddress,
          //     resolverType = _yield$this$getResolv.resolverType;

          try {
            // if (resolverType === exports.ResolverContractType.PublicResolver) {
            var ensResolver = PublicResolver__factory.connect(
              EWC_PUBLIC_RESOLVER_ADDRESS,
              this._provider
            );
            var name = yield ensResolver.name(node);
            return checkName(name);
          } catch (_) {}

          try {
            // if (resolverType === exports.ResolverContractType.RoleDefinitionResolver_v1) {
            var _ensResolver = RoleDefinitionResolver__factory.connect(
              EWC_RESOLVER_V1_ADDRESS,
              this._provider
            );

            var _name = yield _ensResolver.name(node);

            return checkName(_name);
          } catch (_) {}

          try {
            // if (resolverType === exports.ResolverContractType.RoleDefinitionResolver_v2) {
            var _ensResolver2 = RoleDefinitionResolverV2__factory.connect(
              EWC_RESOLVER_V2_ADDRESS,
              this._provider
            );

            var _name2 = yield _ensResolver2.name(node);

            return checkName(_name2);
          } catch (_) {}

          throw Error(
            ''
              .concat(ERROR_MESSAGES.RESOLVER_NOT_SUPPORTED, ', node: ')
              .concat(node)
          );
        });
      },
      /**
       * Reads the App, Org or Role Definition from the registered ENS resolver contract
       * @param node the ENS node hash of a domain name
       * @returns
       */
    },
    {
      key: 'read',
      value: function read(_ref3) {
        var node = _ref3.node;
        return tslib.__awaiter(this, void 0, void 0, function* () {
          // var _yield$this$getResolv2 = yield this.getResolverInfo(node),
          //     resolverAddress = _yield$this$getResolv2.resolverAddress,
          //     resolverType = _yield$this$getResolv2.resolverType;

          try {
            // if (resolverType === exports.ResolverContractType.PublicResolver) {
            var ensResolver = PublicResolver__factory.connect(
              EWC_PUBLIC_RESOLVER_ADDRESS,
              this._provider
            );
            var textData = yield ensResolver.text(node, 'metadata');
            var definition;

            // try {
            definition = JSON.parse(textData, this.reviveDates);
            // } catch (err) {
            //   throw Error("unable to parse resolved textData for node: ".concat(node, ". textData: ").concat(textData, ". error: ").concat(JSON.stringify(err)));
            // }

            return definition;
          } catch (_) {}
          try {
            // } else if (resolverType === exports.ResolverContractType.RoleDefinitionResolver_v1) {
            var _ensResolver3 = RoleDefinitionResolver__factory.connect(
              EWC_RESOLVER_V1_ADDRESS,
              this._provider
            );

            var _textData = yield _ensResolver3.text(node, 'metadata');

            var textProps;

            // try {
            textProps = JSON.parse(_textData, this.reviveDates);
            // } catch (err) {
            //   throw Error("unable to parse resolved textData for node: ".concat(node, ". textData: ").concat(_textData, ". error: ").concat(JSON.stringify(err)));
            // }

            if (
              DomainReader.isOrgDefinition(textProps) ||
              DomainReader.isAppDefinition(textProps)
            ) {
              return textProps;
            }

            if (DomainReader.isRoleDefinition(textProps)) {
              return yield this.readRoleDefResolver_v1(
                node,
                textProps,
                _ensResolver3
              );
            }
            throw Error(ERROR_MESSAGES.DOMAIN_TYPE_UNKNOWN);
          } catch (_) {}
          try {
            // } else if (resolverType === exports.ResolverContractType.RoleDefinitionResolver_v2) {
            var _ensResolver4 = RoleDefinitionResolverV2__factory.connect(
              EWC_RESOLVER_V2_ADDRESS,
              this._provider
            );

            var _textData2 = yield _ensResolver4.text(node, 'metadata');

            var _textProps;

            // try {
            _textProps = JSON.parse(_textData2, this.reviveDates);
            // } catch (err) {
            //   throw Error("unable to parse resolved textData for node: ".concat(node, ". textData: ").concat(_textData2, ". error: ").concat(JSON.stringify(err)));
            // }

            if (
              DomainReader.isOrgDefinition(_textProps) ||
              DomainReader.isAppDefinition(_textProps)
            ) {
              return _textProps;
            }

            if (DomainReader.isRoleDefinition(_textProps)) {
              return yield this.readRoleDefResolver_v2(
                node,
                _textProps,
                _ensResolver4
              );
            }

            throw Error(ERROR_MESSAGES.DOMAIN_TYPE_UNKNOWN);
          } catch (_) {}

          throw Error(ERROR_MESSAGES.RESOLVER_NOT_SUPPORTED);
        });
      },
    },
    {
      key: 'getResolverInfo',
      value: function getResolverInfo(node) {
        return tslib.__awaiter(this, void 0, void 0, function* () {
          var network = yield this._provider.getNetwork();
          var chainId = network.chainId; // Get resolver from registry

          var resolverAddress = yield this._ensRegistry.resolver(node);

          if (
            resolverAddress === '0x0000000000000000000000000000000000000000'
          ) {
            throw Error(ERROR_MESSAGES.DOMAIN_NOT_REGISTERED);
          }

          var resolversForChain = this._knownEnsResolvers[chainId];

          if (resolversForChain === undefined) {
            throw Error(ERROR_MESSAGES.RESOLVER_NOT_KNOWN);
          }

          var resolverType = resolversForChain[resolverAddress];

          if (resolverType === undefined) {
            throw Error(ERROR_MESSAGES.RESOLVER_NOT_KNOWN);
          }

          return {
            resolverAddress: resolverAddress,
            resolverType: resolverType,
          };
        });
      },
      /**
       * Because a given resolver represents the contract from which the role definition data is read,
       * and because ethr DIDs are currently stored as addresses in the resolver contracts (so that they can be read by other smart contracts),
       * the network of the provider configured for the resolver is the network that should be used for the ethr DIDs
       * see {@link https://github.com/decentralized-identity/ethr-did-resolver#multi-network-configuration}
       * @param ensResolver ensResolver that is to be used to obtain the DIDs
       * @returns The network name that should be used for DID stored by this resolver
       */
    },
    {
      key: 'getNetworkNameFromResolver',
      value: function getNetworkNameFromResolver(ensResolver) {
        return tslib.__awaiter(this, void 0, void 0, function* () {
          var _yield$ensResolver$pr = yield ensResolver.provider.getNetwork(),
            chainId = _yield$ensResolver$pr.chainId;

          if (!chainId) {
            throw new Error('Unable to read chainId from ensResolver provider');
          }

          var networkName = this._knownDidEthrNetworkNames[chainId];

          if (!networkName) {
            throw new Error(
              'No did:ethr networkName known for '.concat(chainId)
            );
          }

          return networkName;
        });
      }, // TODO: Muliticalify (make all the queries in one)
    },
    {
      key: 'readRoleDefResolver_v1',
      value: function readRoleDefResolver_v1(
        node,
        roleDefinitionText,
        ensResolver
      ) {
        return tslib.__awaiter(this, void 0, void 0, function* () {
          var _this = this;

          var issuersData = yield ensResolver.issuers(node);
          var issuer;

          if (issuersData.dids.length > 0) {
            var networkName = yield this.getNetworkNameFromResolver(
              ensResolver
            );
            issuer = {
              issuerType: 'DID',
              did: issuersData.dids.map(function (address) {
                return 'did:ethr:'.concat(networkName, ':').concat(address);
              }),
            };
          } else if (issuersData.role != '') {
            issuer = {
              issuerType: 'ROLE',
              roleName: yield this.readName(issuersData.role),
            };
          } else {
            issuer = {};
          }

          var prerequisiteRolesNodes = yield ensResolver.prerequisiteRoles(
            node
          );
          var prerequisiteRoles = yield Promise.all(
            prerequisiteRolesNodes[0].map(function (node) {
              return _this.readName(node);
            })
          );
          var enrolmentPreconditions =
            prerequisiteRoles.length >= 1
              ? [
                  {
                    type: exports.PreconditionType.Role,
                    conditions: prerequisiteRoles,
                  },
                ]
              : [];
          var version = (yield ensResolver.versionNumber(node)).toNumber();
          return Object.assign(Object.assign({}, roleDefinitionText), {
            issuer: issuer,
            version: version,
            enrolmentPreconditions: enrolmentPreconditions,
          });
        });
      }, // TODO: Muliticalify (make all the queries in one)
    },
    {
      key: 'readRoleDefResolver_v2',
      value: function readRoleDefResolver_v2(
        node,
        roleDefinitionText,
        ensResolver
      ) {
        return tslib.__awaiter(this, void 0, void 0, function* () {
          var issuersData = yield ensResolver.issuers(node);
          var revokersData = yield ensResolver.revokers(node);
          var issuer;
          var revoker;
          var networkName = yield this.getNetworkNameFromResolver(ensResolver);

          if (issuersData.dids.length > 0) {
            issuer = {
              issuerType: 'DID',
              did: issuersData.dids.map(function (address) {
                return 'did:ethr:'.concat(networkName, ':').concat(address);
              }),
            };
          } else if (issuersData.role != '') {
            issuer = {
              issuerType: 'ROLE',
              roleName: yield this.readName(issuersData.role),
            };
          } else {
            issuer = {};
          }

          if (revokersData.dids.length > 0) {
            revoker = {
              revokerType: 'DID',
              did: revokersData.dids.map(function (address) {
                return 'did:ethr:'.concat(networkName, ':').concat(address);
              }),
            };
          } else if (revokersData.role != '') {
            revoker = {
              revokerType: 'ROLE',
              roleName: yield this.readName(revokersData.role),
            };
          } else {
            revoker = {};
          }

          var prerequisiteRolesNodes = yield ensResolver.prerequisiteRoles(
            node
          );
          var prerequisiteRoles = yield Promise.all(
            prerequisiteRolesNodes[0].map(function (node) {
              return ensResolver.name(node);
            })
          );
          var enrolmentPreconditions =
            prerequisiteRoles.length >= 1
              ? [
                  {
                    type: exports.PreconditionType.Role,
                    conditions: prerequisiteRoles,
                  },
                ]
              : [];
          var version = (yield ensResolver.versionNumber(node)).toNumber();
          return Object.assign(Object.assign({}, roleDefinitionText), {
            issuer: issuer,
            revoker: revoker,
            version: version,
            enrolmentPreconditions: enrolmentPreconditions,
          });
        });
      },
    },
    {
      key: 'reviveDates',
      value: function reviveDates(key, value) {
        if ((key === 'minDate' || key === 'maxDate') && value !== null) {
          return new Date(value);
        }

        return value;
      },
    },
  ]);

  return DomainReader;
})();

DomainReader.isOrgDefinition = function (domainDefinition) {
  return domainDefinition.orgName !== undefined;
};

DomainReader.isAppDefinition = function (domainDefinition) {
  return domainDefinition.appName !== undefined;
};

DomainReader.isRoleDefinition = function (domainDefinition) {
  return domainDefinition.roleName !== undefined;
};

/**
 * A value object representing a W3C DID
 * https://www.w3.org/TR/did-core/#did-syntax
 */
var DID = /*#__PURE__*/ _createClass(function DID(did) {
  _classCallCheck(this, DID);

  var idParts = did.split(':');

  if (idParts.length < 3) {
    throw new Error('DID should consists of at least 3 components');
  }

  var didMethod;
  var didChain;
  var didId; // Back compatibility with old format

  if (idParts.length === 3) {
    didMethod = idParts[1];
    didChain = undefined;
    didId = idParts[2];
  } else if (idParts.length === 4) {
    didMethod = idParts[1];
    didChain = idParts[2];
    didId = idParts[3];
  } else {
    throw new Error('Unsupported DID format');
  }

  this.did = did;
  this.method = didMethod;
  this.id = didId;
  this.chain = didChain;
});

var abi$4 = [
  {
    inputs: [
      {
        internalType: 'contract ENS',
        name: '_ens',
        type: 'address',
      },
      {
        internalType: 'contract DomainNotifier',
        name: '_notifier',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'contentType',
        type: 'uint256',
      },
    ],
    name: 'ABIChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'a',
        type: 'address',
      },
    ],
    name: 'AddrChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'coinType',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'newAddress',
        type: 'bytes',
      },
    ],
    name: 'AddressChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'target',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'isAuthorised',
        type: 'bool',
      },
    ],
    name: 'AuthorisationChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'hash',
        type: 'bytes',
      },
    ],
    name: 'ContenthashChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'name',
        type: 'bytes',
      },
      {
        indexed: false,
        internalType: 'uint16',
        name: 'resource',
        type: 'uint16',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'record',
        type: 'bytes',
      },
    ],
    name: 'DNSRecordChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'name',
        type: 'bytes',
      },
      {
        indexed: false,
        internalType: 'uint16',
        name: 'resource',
        type: 'uint16',
      },
    ],
    name: 'DNSRecordDeleted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'DNSZoneCleared',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'lastzonehash',
        type: 'bytes',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'zonehash',
        type: 'bytes',
      },
    ],
    name: 'DNSZonehashChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'bytes4',
        name: 'interfaceID',
        type: 'bytes4',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'implementer',
        type: 'address',
      },
    ],
    name: 'InterfaceChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'newType',
        type: 'uint8',
      },
    ],
    name: 'IssuerTypeChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        components: [
          {
            internalType: 'address[]',
            name: 'dids',
            type: 'address[]',
          },
          {
            internalType: 'bytes32',
            name: 'role',
            type: 'bytes32',
          },
        ],
        indexed: false,
        internalType: 'struct IssuersResolver.Issuers',
        name: 'newIssuers',
        type: 'tuple',
      },
    ],
    name: 'IssuersChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
    ],
    name: 'NameChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        components: [
          {
            internalType: 'bytes32[]',
            name: 'roles',
            type: 'bytes32[]',
          },
          {
            internalType: 'bool',
            name: 'mustHaveAll',
            type: 'bool',
          },
        ],
        indexed: false,
        internalType:
          'struct EnrolmentPrerequisiteRolesResolver.PrerequisiteRoles',
        name: 'newPrerequisiteRoles',
        type: 'tuple',
      },
    ],
    name: 'PrerequisiteRolesChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'x',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'y',
        type: 'bytes32',
      },
    ],
    name: 'PubkeyChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'string',
        name: 'indexedKey',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'key',
        type: 'string',
      },
    ],
    name: 'TextChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newVersion',
        type: 'uint256',
      },
    ],
    name: 'VersionNumberChanged',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'contentTypes',
        type: 'uint256',
      },
    ],
    name: 'ABI',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'addr',
    outputs: [
      {
        internalType: 'address payable',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'coinType',
        type: 'uint256',
      },
    ],
    name: 'addr',
    outputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'authorisations',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'clearDNSZone',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'contenthash',
    outputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'name',
        type: 'bytes32',
      },
      {
        internalType: 'uint16',
        name: 'resource',
        type: 'uint16',
      },
    ],
    name: 'dnsRecord',
    outputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'name',
        type: 'bytes32',
      },
    ],
    name: 'hasDNSRecords',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes4',
        name: 'interfaceID',
        type: 'bytes4',
      },
    ],
    name: 'interfaceImplementer',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'issuerType',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    name: 'issuerTypes',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'issuers',
    outputs: [
      {
        internalType: 'address[]',
        name: 'dids',
        type: 'address[]',
      },
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes[]',
        name: 'data',
        type: 'bytes[]',
      },
    ],
    name: 'multicall',
    outputs: [
      {
        internalType: 'bytes[]',
        name: 'results',
        type: 'bytes[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'prerequisiteRoles',
    outputs: [
      {
        internalType: 'bytes32[]',
        name: 'roles',
        type: 'bytes32[]',
      },
      {
        internalType: 'bool',
        name: 'mustHaveAll',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'pubkey',
    outputs: [
      {
        internalType: 'bytes32',
        name: 'x',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'y',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'contentType',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'setABI',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'coinType',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'a',
        type: 'bytes',
      },
    ],
    name: 'setAddr',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'a',
        type: 'address',
      },
    ],
    name: 'setAddr',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'target',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'isAuthorised',
        type: 'bool',
      },
    ],
    name: 'setAuthorisation',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes',
        name: 'hash',
        type: 'bytes',
      },
    ],
    name: 'setContenthash',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'setDNSRecords',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes4',
        name: 'interfaceID',
        type: 'bytes4',
      },
      {
        internalType: 'address',
        name: 'implementer',
        type: 'address',
      },
    ],
    name: 'setInterface',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'address[]',
        name: 'dids',
        type: 'address[]',
      },
    ],
    name: 'setIssuerDids',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
    ],
    name: 'setIssuerRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'uint8',
        name: 'newIssuerType',
        type: 'uint8',
      },
    ],
    name: 'setIssuerType',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
    ],
    name: 'setName',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32[]',
        name: 'roles',
        type: 'bytes32[]',
      },
      {
        internalType: 'bool',
        name: 'mustHaveAll',
        type: 'bool',
      },
    ],
    name: 'setPrerequisiteRoles',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'x',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'y',
        type: 'bytes32',
      },
    ],
    name: 'setPubkey',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'string',
        name: 'key',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'value',
        type: 'string',
      },
    ],
    name: 'setText',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'newVersionNumber',
        type: 'uint256',
      },
    ],
    name: 'setVersionNumber',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes',
        name: 'hash',
        type: 'bytes',
      },
    ],
    name: 'setZonehash',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'string',
        name: 'key',
        type: 'string',
      },
    ],
    name: 'text',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'versionNumber',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    name: 'versionNumbers',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'zonehash',
    outputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'domainUpdated',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceID',
        type: 'bytes4',
      },
    ],
    name: 'supportsInterface',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
];

var namehash$1 = ethers.utils.namehash;
var DomainTransactionFactory = /*#__PURE__*/ (function () {
  function DomainTransactionFactory(_ref) {
    var _ref$domainResolverAd = _ref.domainResolverAddress,
      domainResolverAddress =
        _ref$domainResolverAd === void 0
          ? VOLTA_RESOLVER_V1_ADDRESS
          : _ref$domainResolverAd;

    _classCallCheck(this, DomainTransactionFactory);

    this._resolverAddress = domainResolverAddress;
    this._roleDefResolverInterface = new ethers.utils.Interface(abi$4);
  }
  /**
   * Creates transaction to set role definition and reverse name in resolver contract
   */

  _createClass(DomainTransactionFactory, [
    {
      key: 'newRole',
      value: function newRole(_ref2) {
        var domain = _ref2.domain,
          roleDefinition = _ref2.roleDefinition;
        var setDomainNameTx = this.setDomainNameTx({
          domain: domain,
        });
        var setRoleDefinitionTx = this.setRoleDefinitionTx({
          data: roleDefinition,
          domain: domain,
        });
        return this.createMultiCallTx({
          transactionsToCombine: [setDomainNameTx, setRoleDefinitionTx],
        });
      },
      /**
       * Creates transaction to update domain definition in resolver contract
       */
    },
    {
      key: 'editDomain',
      value: function editDomain(_ref3) {
        var domain = _ref3.domain,
          domainDefinition = _ref3.domainDefinition;

        if (DomainReader.isRoleDefinition(domainDefinition)) {
          return this.setRoleDefinitionTx({
            data: domainDefinition,
            domain: domain,
          });
        } else {
          var setDomainDefinitionTx = this.setTextTx({
            data: domainDefinition,
            domain: domain,
          });
          var domainUpdated = this.domainUpdated({
            domain: domain,
          });
          return this.createMultiCallTx({
            transactionsToCombine: [setDomainDefinitionTx, domainUpdated],
          });
        }
      },
      /**
       * Creates transaction to set app/org definition and reverse name in resolver contract
       */
    },
    {
      key: 'newDomain',
      value: function newDomain(_ref4) {
        var domain = _ref4.domain,
          domainDefinition = _ref4.domainDefinition;
        var setDomainNameTx = this.setDomainNameTx({
          domain: domain,
        });
        var setDomainDefinitionTx = this.setTextTx({
          data: domainDefinition,
          domain: domain,
        });
        var domainUpdated = this.domainUpdated({
          domain: domain,
        });
        return this.createMultiCallTx({
          transactionsToCombine: [
            setDomainNameTx,
            setDomainDefinitionTx,
            domainUpdated,
          ],
        });
      },
    },
    {
      key: 'setDomainNameTx',
      value: function setDomainNameTx(_ref5) {
        var domain = _ref5.domain;
        var namespaceHash = ethers.utils.namehash(domain);
        return {
          to: this._resolverAddress,
          data: this._roleDefResolverInterface.encodeFunctionData('setName', [
            namespaceHash,
            domain,
          ]),
        };
      },
      /**
       * Encodes a call to the ENS Resolver multicall function
       * @param transactionsToCombine
       * @returns Combined encoded call
       */
    },
    {
      key: 'createMultiCallTx',
      value: function createMultiCallTx(_ref6) {
        var transactionsToCombine = _ref6.transactionsToCombine;
        return {
          to: this._resolverAddress,
          data: this._roleDefResolverInterface.encodeFunctionData('multicall', [
            transactionsToCombine.map(function (t) {
              return t.data;
            }),
          ]),
        };
      },
    },
    {
      key: 'setRoleDefinitionTx',
      value: function setRoleDefinitionTx(_ref7) {
        var domain = _ref7.domain,
          data = _ref7.data;

        var _a;

        var setVersionTx = this.setVersionNumberTx({
          domain: domain,
          versionNumber: data.version,
        });
        var setIssuersTx = this.setIssuersTx({
          domain: domain,
          issuers: data.issuer,
        }); // IssuerType hardcoded to zero for now which means approval by some identity (i.e. an identity from a list of DIDs, or an identity with a given role

        var setIssuerTypeTx = this.setIssuerTypeTx({
          domain: domain,
          issuerType: 0,
        });
        var prerequisiteRolesTx;
        var roleConditiions =
          (_a =
            data === null || data === void 0
              ? void 0
              : data.enrolmentPreconditions) === null || _a === void 0
            ? void 0
            : _a.filter(function (condition) {
                return condition.type === exports.PreconditionType.Role;
              });

        if (!roleConditiions || roleConditiions.length < 1) {
          prerequisiteRolesTx = this.setPrerequisiteRolesTx({
            domain: domain,
            prerequisiteRoles: [],
          });
        } else if (roleConditiions.length == 1) {
          // TODO: check that each condition has a reverse name set
          prerequisiteRolesTx = this.setPrerequisiteRolesTx({
            domain: domain,
            prerequisiteRoles: roleConditiions[0].conditions,
          });
        } else if (roleConditiions.length > 1) {
          throw Error(
            'only one set of enrolment role preconditions should be provided'
          );
        } else {
          throw Error('error setting role preconditions');
        }

        var textProps = (function (roleDef) {
          return {
            roleName: roleDef.roleName,
            roleType: roleDef.roleType,
            fields: roleDef.fields,
            requestorFields: roleDef.requestorFields,
            issuerFields: roleDef.issuerFields,
            metadata: roleDef.metadata,
          };
        })(data);

        var setTextTx = this.setTextTx({
          domain: domain,
          data: textProps,
        });
        var domainUpdatedTx = this.domainUpdated({
          domain: domain,
        });
        return this.createMultiCallTx({
          transactionsToCombine: [
            setVersionTx,
            setIssuersTx,
            setIssuerTypeTx,
            setTextTx,
            prerequisiteRolesTx,
            domainUpdatedTx,
          ],
        });
      },
    },
    {
      key: 'setTextTx',
      value: function setTextTx(_ref8) {
        var domain = _ref8.domain,
          data = _ref8.data;
        return {
          to: this._resolverAddress,
          data: this._roleDefResolverInterface.encodeFunctionData('setText', [
            ethers.utils.namehash(domain),
            'metadata',
            JSON.stringify(data),
          ]),
        };
      },
    },
    {
      key: 'domainUpdated',
      value: function domainUpdated(_ref9) {
        var domain = _ref9.domain;
        return {
          to: this._resolverAddress,
          data: this._roleDefResolverInterface.encodeFunctionData(
            'domainUpdated',
            [ethers.utils.namehash(domain)]
          ),
        };
      },
    },
    {
      key: 'setVersionNumberTx',
      value: function setVersionNumberTx(_ref10) {
        var domain = _ref10.domain,
          versionNumber = _ref10.versionNumber;
        return {
          to: this._resolverAddress,
          data: this._roleDefResolverInterface.encodeFunctionData(
            'setVersionNumber',
            [ethers.utils.namehash(domain), versionNumber]
          ),
        };
      },
    },
    {
      key: 'setIssuersTx',
      value: function setIssuersTx(_ref11) {
        var domain = _ref11.domain,
          issuers = _ref11.issuers;

        var _a, _b; // First, try to determine which to set from issueType possiblities:
        // https://github.com/energywebfoundation/switchboard-dapp/blob/8776624832e68d2965f5a0b27ddb58f1907b0a33/src/app/routes/applications/new-role/new-role.component.ts#L56

        if (
          ((_a = issuers.issuerType) === null || _a === void 0
            ? void 0
            : _a.toUpperCase()) === 'DID'
        ) {
          if (!issuers.did) {
            throw Error('IssuerType set to DID but no DIDs provided');
          }

          var addresses = issuers.did.map(function (didString) {
            return new DID(didString).id;
          });
          return {
            to: this._resolverAddress,
            data: this._roleDefResolverInterface.encodeFunctionData(
              'setIssuerDids',
              [ethers.utils.namehash(domain), addresses]
            ),
          };
        } else if (
          ((_b = issuers.issuerType) === null || _b === void 0
            ? void 0
            : _b.toUpperCase()) === 'ROLE'
        ) {
          if (!issuers.roleName) {
            throw Error('IssuerType set to roleName but no roleName provided');
          }

          return {
            to: this._resolverAddress,
            data: this._roleDefResolverInterface.encodeFunctionData(
              'setIssuerRole',
              [ethers.utils.namehash(domain), namehash$1(issuers.roleName)]
            ),
          };
        }

        throw new Error(
          'IssuerType of '.concat(issuers.issuerType, ' is not supported')
        );
      },
    },
    {
      key: 'setIssuerTypeTx',
      value: function setIssuerTypeTx(_ref12) {
        var domain = _ref12.domain,
          issuerType = _ref12.issuerType;
        return {
          to: this._resolverAddress,
          data: this._roleDefResolverInterface.encodeFunctionData(
            'setIssuerType',
            [ethers.utils.namehash(domain), issuerType]
          ),
        };
      },
    },
    {
      key: 'setPrerequisiteRolesTx',
      value: function setPrerequisiteRolesTx(_ref13) {
        var domain = _ref13.domain,
          prerequisiteRoles = _ref13.prerequisiteRoles;
        var prequisiteRoleDomains = prerequisiteRoles.map(function (role) {
          return ethers.utils.namehash(role);
        });
        return {
          to: this._resolverAddress,
          data: this._roleDefResolverInterface.encodeFunctionData(
            'setPrerequisiteRoles',
            [
              ethers.utils.namehash(domain),
              prequisiteRoleDomains,
              false, // mustHaveAll = false so only need to have one of the set
            ]
          ),
        };
      },
    },
  ]);

  return DomainTransactionFactory;
})();

var abi$3 = [
  {
    inputs: [
      {
        internalType: 'contract ENS',
        name: '_ens',
        type: 'address',
      },
      {
        internalType: 'contract DomainNotifier',
        name: '_notifier',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'contentType',
        type: 'uint256',
      },
    ],
    name: 'ABIChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'a',
        type: 'address',
      },
    ],
    name: 'AddrChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'coinType',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'newAddress',
        type: 'bytes',
      },
    ],
    name: 'AddressChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'target',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'isAuthorised',
        type: 'bool',
      },
    ],
    name: 'AuthorisationChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'hash',
        type: 'bytes',
      },
    ],
    name: 'ContenthashChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'name',
        type: 'bytes',
      },
      {
        indexed: false,
        internalType: 'uint16',
        name: 'resource',
        type: 'uint16',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'record',
        type: 'bytes',
      },
    ],
    name: 'DNSRecordChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'name',
        type: 'bytes',
      },
      {
        indexed: false,
        internalType: 'uint16',
        name: 'resource',
        type: 'uint16',
      },
    ],
    name: 'DNSRecordDeleted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'DNSZoneCleared',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'lastzonehash',
        type: 'bytes',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'zonehash',
        type: 'bytes',
      },
    ],
    name: 'DNSZonehashChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'bytes4',
        name: 'interfaceID',
        type: 'bytes4',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'implementer',
        type: 'address',
      },
    ],
    name: 'InterfaceChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'newType',
        type: 'uint8',
      },
    ],
    name: 'IssuerTypeChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        components: [
          {
            internalType: 'address[]',
            name: 'dids',
            type: 'address[]',
          },
          {
            internalType: 'bytes32',
            name: 'role',
            type: 'bytes32',
          },
        ],
        indexed: false,
        internalType: 'struct IssuersResolver.Issuers',
        name: 'newIssuers',
        type: 'tuple',
      },
    ],
    name: 'IssuersChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
    ],
    name: 'NameChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        components: [
          {
            internalType: 'bytes32[]',
            name: 'roles',
            type: 'bytes32[]',
          },
          {
            internalType: 'bool',
            name: 'mustHaveAll',
            type: 'bool',
          },
        ],
        indexed: false,
        internalType:
          'struct EnrolmentPrerequisiteRolesResolver.PrerequisiteRoles',
        name: 'newPrerequisiteRoles',
        type: 'tuple',
      },
    ],
    name: 'PrerequisiteRolesChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'x',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'y',
        type: 'bytes32',
      },
    ],
    name: 'PubkeyChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'newType',
        type: 'uint8',
      },
    ],
    name: 'RevokerTypeChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        components: [
          {
            internalType: 'address[]',
            name: 'dids',
            type: 'address[]',
          },
          {
            internalType: 'bytes32',
            name: 'role',
            type: 'bytes32',
          },
        ],
        indexed: false,
        internalType: 'struct RevokersResolver.Revokers',
        name: 'newRevokers',
        type: 'tuple',
      },
    ],
    name: 'RevokersChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'string',
        name: 'indexedKey',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'key',
        type: 'string',
      },
    ],
    name: 'TextChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newVersion',
        type: 'uint256',
      },
    ],
    name: 'VersionNumberChanged',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'contentTypes',
        type: 'uint256',
      },
    ],
    name: 'ABI',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'addr',
    outputs: [
      {
        internalType: 'address payable',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'coinType',
        type: 'uint256',
      },
    ],
    name: 'addr',
    outputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'authorisations',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'clearDNSZone',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'contenthash',
    outputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'name',
        type: 'bytes32',
      },
      {
        internalType: 'uint16',
        name: 'resource',
        type: 'uint16',
      },
    ],
    name: 'dnsRecord',
    outputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'name',
        type: 'bytes32',
      },
    ],
    name: 'hasDNSRecords',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes4',
        name: 'interfaceID',
        type: 'bytes4',
      },
    ],
    name: 'interfaceImplementer',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'issuerType',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    name: 'issuerTypes',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'issuers',
    outputs: [
      {
        internalType: 'address[]',
        name: 'dids',
        type: 'address[]',
      },
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes[]',
        name: 'data',
        type: 'bytes[]',
      },
    ],
    name: 'multicall',
    outputs: [
      {
        internalType: 'bytes[]',
        name: 'results',
        type: 'bytes[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'prerequisiteRoles',
    outputs: [
      {
        internalType: 'bytes32[]',
        name: 'roles',
        type: 'bytes32[]',
      },
      {
        internalType: 'bool',
        name: 'mustHaveAll',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'pubkey',
    outputs: [
      {
        internalType: 'bytes32',
        name: 'x',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'y',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'revokerType',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    name: 'revokerTypes',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'revokers',
    outputs: [
      {
        internalType: 'address[]',
        name: 'dids',
        type: 'address[]',
      },
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'contentType',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'setABI',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'coinType',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'a',
        type: 'bytes',
      },
    ],
    name: 'setAddr',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'a',
        type: 'address',
      },
    ],
    name: 'setAddr',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'target',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'isAuthorised',
        type: 'bool',
      },
    ],
    name: 'setAuthorisation',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes',
        name: 'hash',
        type: 'bytes',
      },
    ],
    name: 'setContenthash',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'setDNSRecords',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes4',
        name: 'interfaceID',
        type: 'bytes4',
      },
      {
        internalType: 'address',
        name: 'implementer',
        type: 'address',
      },
    ],
    name: 'setInterface',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'address[]',
        name: 'dids',
        type: 'address[]',
      },
    ],
    name: 'setIssuerDids',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
    ],
    name: 'setIssuerRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'uint8',
        name: 'newIssuerType',
        type: 'uint8',
      },
    ],
    name: 'setIssuerType',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
    ],
    name: 'setName',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32[]',
        name: 'roles',
        type: 'bytes32[]',
      },
      {
        internalType: 'bool',
        name: 'mustHaveAll',
        type: 'bool',
      },
    ],
    name: 'setPrerequisiteRoles',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'x',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'y',
        type: 'bytes32',
      },
    ],
    name: 'setPubkey',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'address[]',
        name: 'dids',
        type: 'address[]',
      },
    ],
    name: 'setRevokerDids',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32',
      },
    ],
    name: 'setRevokerRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'uint8',
        name: 'newRevokerType',
        type: 'uint8',
      },
    ],
    name: 'setRevokerType',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'string',
        name: 'key',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'value',
        type: 'string',
      },
    ],
    name: 'setText',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'newVersionNumber',
        type: 'uint256',
      },
    ],
    name: 'setVersionNumber',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes',
        name: 'hash',
        type: 'bytes',
      },
    ],
    name: 'setZonehash',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'string',
        name: 'key',
        type: 'string',
      },
    ],
    name: 'text',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'versionNumber',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    name: 'versionNumbers',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'zonehash',
    outputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'domainUpdated',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceID',
        type: 'bytes4',
      },
    ],
    name: 'supportsInterface',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
];

var namehash = ethers.utils.namehash;
var DomainTransactionFactoryV2 = /*#__PURE__*/ (function () {
  function DomainTransactionFactoryV2(_ref) {
    var _ref$domainResolverAd = _ref.domainResolverAddress,
      domainResolverAddress =
        _ref$domainResolverAd === void 0
          ? EWC_RESOLVER_V2_ADDRESS
          : _ref$domainResolverAd;

    _classCallCheck(this, DomainTransactionFactoryV2);

    this._resolverAddress = domainResolverAddress;
    this._roleDefResolverInterface = new ethers.utils.Interface(abi$3);
  }
  /**
   * Creates transaction to set role definition and reverse name in resolver contract
   */

  _createClass(DomainTransactionFactoryV2, [
    {
      key: 'newRole',
      value: function newRole(_ref2) {
        var domain = _ref2.domain,
          roleDefinition = _ref2.roleDefinition;
        var setDomainNameTx = this.setDomainNameTx({
          domain: domain,
        });
        var setRoleDefinitionTx = this.setRoleDefinitionTx({
          data: roleDefinition,
          domain: domain,
        });
        return this.createMultiCallTx({
          transactionsToCombine: [setDomainNameTx, setRoleDefinitionTx],
        });
      },
      /**
       * Creates transaction to update domain definition in resolver contract
       */
    },
    {
      key: 'editDomain',
      value: function editDomain(_ref3) {
        var domain = _ref3.domain,
          domainDefinition = _ref3.domainDefinition;

        if (DomainReader.isRoleDefinition(domainDefinition)) {
          return this.setRoleDefinitionTx({
            data: domainDefinition,
            domain: domain,
          });
        } else {
          var setDomainDefinitionTx = this.setTextTx({
            data: domainDefinition,
            domain: domain,
          });
          var domainUpdated = this.domainUpdated({
            domain: domain,
          });
          return this.createMultiCallTx({
            transactionsToCombine: [setDomainDefinitionTx, domainUpdated],
          });
        }
      },
      /**
       * Creates transaction to set app/org definition and reverse name in resolver contract
       */
    },
    {
      key: 'newDomain',
      value: function newDomain(_ref4) {
        var domain = _ref4.domain,
          domainDefinition = _ref4.domainDefinition;
        var setDomainNameTx = this.setDomainNameTx({
          domain: domain,
        });
        var setDomainDefinitionTx = this.setTextTx({
          data: domainDefinition,
          domain: domain,
        });
        var domainUpdated = this.domainUpdated({
          domain: domain,
        });
        return this.createMultiCallTx({
          transactionsToCombine: [
            setDomainNameTx,
            setDomainDefinitionTx,
            domainUpdated,
          ],
        });
      },
    },
    {
      key: 'setDomainNameTx',
      value: function setDomainNameTx(_ref5) {
        var domain = _ref5.domain;
        var namespaceHash = ethers.utils.namehash(domain);
        return {
          to: this._resolverAddress,
          data: this._roleDefResolverInterface.encodeFunctionData('setName', [
            namespaceHash,
            domain,
          ]),
        };
      },
      /**
       * Encodes a call to the ENS Resolver multicall function
       * @param transactionsToCombine
       * @returns Combined encoded call
       */
    },
    {
      key: 'createMultiCallTx',
      value: function createMultiCallTx(_ref6) {
        var transactionsToCombine = _ref6.transactionsToCombine;
        return {
          to: this._resolverAddress,
          data: this._roleDefResolverInterface.encodeFunctionData('multicall', [
            transactionsToCombine.map(function (t) {
              return t.data;
            }),
          ]),
        };
      },
    },
    {
      key: 'setRoleDefinitionTx',
      value: function setRoleDefinitionTx(_ref7) {
        var domain = _ref7.domain,
          data = _ref7.data;

        var _a;

        var setVersionTx = this.setVersionNumberTx({
          domain: domain,
          versionNumber: data.version,
        });
        var setIssuersTx = this.setIssuersTx({
          domain: domain,
          issuers: data.issuer,
        }); // IssuerType hardcoded to zero for now which means approval by some identity (i.e. an identity from a list of DIDs, or an identity with a given role

        var setIssuerTypeTx = this.setIssuerTypeTx({
          domain: domain,
          issuerType: 0,
        });
        var setRevokersTx = this.setRevokersTx({
          domain: domain,
          revokers: data.revoker,
        }); // RevokerType hardcoded to zero for now which means approval by some identity (i.e. an identity from a list of DIDs, or an identity with a given role

        var setRevokerTypeTx = this.setRevokerTypeTx({
          domain: domain,
          revokerType: 0,
        });
        var prerequisiteRolesTx;
        var roleConditiions =
          (_a =
            data === null || data === void 0
              ? void 0
              : data.enrolmentPreconditions) === null || _a === void 0
            ? void 0
            : _a.filter(function (condition) {
                return condition.type === exports.PreconditionType.Role;
              });

        if (!roleConditiions || roleConditiions.length < 1) {
          prerequisiteRolesTx = this.setPrerequisiteRolesTx({
            domain: domain,
            prerequisiteRoles: [],
          });
        } else if (roleConditiions.length == 1) {
          // TODO: check that each condition has a reverse name set
          prerequisiteRolesTx = this.setPrerequisiteRolesTx({
            domain: domain,
            prerequisiteRoles: roleConditiions[0].conditions,
          });
        } else if (roleConditiions.length > 1) {
          throw Error(
            'only one set of enrolment role preconditions should be provided'
          );
        } else {
          throw Error('error setting role preconditions');
        }

        var textProps = (function (roleDef) {
          return {
            roleName: roleDef.roleName,
            roleType: roleDef.roleType,
            fields: roleDef.fields,
            requestorFields: roleDef.requestorFields,
            issuerFields: roleDef.issuerFields,
            metadata: roleDef.metadata,
          };
        })(data);

        var setTextTx = this.setTextTx({
          domain: domain,
          data: textProps,
        });
        var domainUpdatedTx = this.domainUpdated({
          domain: domain,
        });
        return this.createMultiCallTx({
          transactionsToCombine: [
            setVersionTx,
            setIssuersTx,
            setIssuerTypeTx,
            setRevokersTx,
            setRevokerTypeTx,
            setTextTx,
            prerequisiteRolesTx,
            domainUpdatedTx,
          ],
        });
      },
    },
    {
      key: 'setTextTx',
      value: function setTextTx(_ref8) {
        var domain = _ref8.domain,
          data = _ref8.data;
        return {
          to: this._resolverAddress,
          data: this._roleDefResolverInterface.encodeFunctionData('setText', [
            ethers.utils.namehash(domain),
            'metadata',
            JSON.stringify(data),
          ]),
        };
      },
    },
    {
      key: 'domainUpdated',
      value: function domainUpdated(_ref9) {
        var domain = _ref9.domain;
        return {
          to: this._resolverAddress,
          data: this._roleDefResolverInterface.encodeFunctionData(
            'domainUpdated',
            [ethers.utils.namehash(domain)]
          ),
        };
      },
    },
    {
      key: 'setVersionNumberTx',
      value: function setVersionNumberTx(_ref10) {
        var domain = _ref10.domain,
          versionNumber = _ref10.versionNumber;
        return {
          to: this._resolverAddress,
          data: this._roleDefResolverInterface.encodeFunctionData(
            'setVersionNumber',
            [ethers.utils.namehash(domain), versionNumber]
          ),
        };
      },
    },
    {
      key: 'setIssuersTx',
      value: function setIssuersTx(_ref11) {
        var domain = _ref11.domain,
          issuers = _ref11.issuers;

        var _a, _b; // First, try to determine which to set from issueType possiblities:
        // https://github.com/energywebfoundation/switchboard-dapp/blob/8776624832e68d2965f5a0b27ddb58f1907b0a33/src/app/routes/applications/new-role/new-role.component.ts#L56

        if (
          ((_a = issuers.issuerType) === null || _a === void 0
            ? void 0
            : _a.toUpperCase()) === 'DID'
        ) {
          if (!issuers.did) {
            throw Error('IssuerType set to DID but no DIDs provided');
          }

          var addresses = issuers.did.map(function (didString) {
            return new DID(didString).id;
          });
          return {
            to: this._resolverAddress,
            data: this._roleDefResolverInterface.encodeFunctionData(
              'setIssuerDids',
              [ethers.utils.namehash(domain), addresses]
            ),
          };
        } else if (
          ((_b = issuers.issuerType) === null || _b === void 0
            ? void 0
            : _b.toUpperCase()) === 'ROLE'
        ) {
          if (!issuers.roleName) {
            throw Error('IssuerType set to roleName but no roleName provided');
          }

          return {
            to: this._resolverAddress,
            data: this._roleDefResolverInterface.encodeFunctionData(
              'setIssuerRole',
              [ethers.utils.namehash(domain), namehash(issuers.roleName)]
            ),
          };
        }

        throw new Error(
          'IssuerType of '.concat(issuers.issuerType, ' is not supported')
        );
      },
    },
    {
      key: 'setRevokersTx',
      value: function setRevokersTx(_ref12) {
        var domain = _ref12.domain,
          revokers = _ref12.revokers;

        var _a, _b;

        if (
          ((_a = revokers.revokerType) === null || _a === void 0
            ? void 0
            : _a.toUpperCase()) === 'DID'
        ) {
          if (!revokers.did) {
            throw Error('RevokerType set to DID but no DIDs provided');
          }

          var addresses = revokers.did.map(function (didString) {
            return new DID(didString).id;
          });
          return {
            to: this._resolverAddress,
            data: this._roleDefResolverInterface.encodeFunctionData(
              'setRevokerDids',
              [ethers.utils.namehash(domain), addresses]
            ),
          };
        } else if (
          ((_b = revokers.revokerType) === null || _b === void 0
            ? void 0
            : _b.toUpperCase()) === 'ROLE'
        ) {
          if (!revokers.roleName) {
            throw Error('RevokerType set to roleName but no roleName provided');
          }

          return {
            to: this._resolverAddress,
            data: this._roleDefResolverInterface.encodeFunctionData(
              'setRevokerRole',
              [ethers.utils.namehash(domain), namehash(revokers.roleName)]
            ),
          };
        }

        throw new Error(
          'RevokerType of '.concat(revokers.revokerType, ' is not supported')
        );
      },
    },
    {
      key: 'setIssuerTypeTx',
      value: function setIssuerTypeTx(_ref13) {
        var domain = _ref13.domain,
          issuerType = _ref13.issuerType;
        return {
          to: this._resolverAddress,
          data: this._roleDefResolverInterface.encodeFunctionData(
            'setIssuerType',
            [ethers.utils.namehash(domain), issuerType]
          ),
        };
      },
    },
    {
      key: 'setRevokerTypeTx',
      value: function setRevokerTypeTx(_ref14) {
        var domain = _ref14.domain,
          revokerType = _ref14.revokerType;
        return {
          to: this._resolverAddress,
          data: this._roleDefResolverInterface.encodeFunctionData(
            'setRevokerType',
            [ethers.utils.namehash(domain), revokerType]
          ),
        };
      },
    },
    {
      key: 'setPrerequisiteRolesTx',
      value: function setPrerequisiteRolesTx(_ref15) {
        var domain = _ref15.domain,
          prerequisiteRoles = _ref15.prerequisiteRoles;
        var prequisiteRoleDomains = prerequisiteRoles.map(function (role) {
          return ethers.utils.namehash(role);
        });
        return {
          to: this._resolverAddress,
          data: this._roleDefResolverInterface.encodeFunctionData(
            'setPrerequisiteRoles',
            [
              ethers.utils.namehash(domain),
              prequisiteRoleDomains,
              false, // mustHaveAll = false so only need to have one of the set
            ]
          ),
        };
      },
    },
  ]);

  return DomainTransactionFactoryV2;
})();

var abi$2 = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'approved',
        type: 'bool',
      },
    ],
    name: 'ApprovalForAll',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'label',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'NewOwner',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'resolver',
        type: 'address',
      },
    ],
    name: 'NewResolver',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'ttl',
        type: 'uint64',
      },
    ],
    name: 'NewTTL',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'resolver',
        type: 'address',
      },
      {
        internalType: 'uint64',
        name: 'ttl',
        type: 'uint64',
      },
    ],
    name: 'setRecord',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'label',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'resolver',
        type: 'address',
      },
      {
        internalType: 'uint64',
        name: 'ttl',
        type: 'uint64',
      },
    ],
    name: 'setSubnodeRecord',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'label',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'setSubnodeOwner',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'resolver',
        type: 'address',
      },
    ],
    name: 'setResolver',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'setOwner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'uint64',
        name: 'ttl',
        type: 'uint64',
      },
    ],
    name: 'setTTL',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'approved',
        type: 'bool',
      },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'resolver',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'ttl',
    outputs: [
      {
        internalType: 'uint64',
        name: '',
        type: 'uint64',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'recordExists',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
    ],
    name: 'isApprovedForAll',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

var abi$1 = [
  {
    inputs: [
      {
        internalType: 'contract ENS',
        name: '_ens',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'contentType',
        type: 'uint256',
      },
    ],
    name: 'ABIChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'a',
        type: 'address',
      },
    ],
    name: 'AddrChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'coinType',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'newAddress',
        type: 'bytes',
      },
    ],
    name: 'AddressChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'target',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'isAuthorised',
        type: 'bool',
      },
    ],
    name: 'AuthorisationChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'hash',
        type: 'bytes',
      },
    ],
    name: 'ContenthashChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'name',
        type: 'bytes',
      },
      {
        indexed: false,
        internalType: 'uint16',
        name: 'resource',
        type: 'uint16',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'record',
        type: 'bytes',
      },
    ],
    name: 'DNSRecordChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'name',
        type: 'bytes',
      },
      {
        indexed: false,
        internalType: 'uint16',
        name: 'resource',
        type: 'uint16',
      },
    ],
    name: 'DNSRecordDeleted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'DNSZoneCleared',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'lastzonehash',
        type: 'bytes',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'zonehash',
        type: 'bytes',
      },
    ],
    name: 'DNSZonehashChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'bytes4',
        name: 'interfaceID',
        type: 'bytes4',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'implementer',
        type: 'address',
      },
    ],
    name: 'InterfaceChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
    ],
    name: 'NameChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'x',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'y',
        type: 'bytes32',
      },
    ],
    name: 'PubkeyChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'string',
        name: 'indexedKey',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'key',
        type: 'string',
      },
    ],
    name: 'TextChanged',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'contentTypes',
        type: 'uint256',
      },
    ],
    name: 'ABI',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'addr',
    outputs: [
      {
        internalType: 'address payable',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'coinType',
        type: 'uint256',
      },
    ],
    name: 'addr',
    outputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'authorisations',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'clearDNSZone',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'contenthash',
    outputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'name',
        type: 'bytes32',
      },
      {
        internalType: 'uint16',
        name: 'resource',
        type: 'uint16',
      },
    ],
    name: 'dnsRecord',
    outputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'name',
        type: 'bytes32',
      },
    ],
    name: 'hasDNSRecords',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes4',
        name: 'interfaceID',
        type: 'bytes4',
      },
    ],
    name: 'interfaceImplementer',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'pubkey',
    outputs: [
      {
        internalType: 'bytes32',
        name: 'x',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'y',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'contentType',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'setABI',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'coinType',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'a',
        type: 'bytes',
      },
    ],
    name: 'setAddr',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'a',
        type: 'address',
      },
    ],
    name: 'setAddr',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes',
        name: 'hash',
        type: 'bytes',
      },
    ],
    name: 'setContenthash',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'setDNSRecords',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes4',
        name: 'interfaceID',
        type: 'bytes4',
      },
      {
        internalType: 'address',
        name: 'implementer',
        type: 'address',
      },
    ],
    name: 'setInterface',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
    ],
    name: 'setName',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'x',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32',
        name: 'y',
        type: 'bytes32',
      },
    ],
    name: 'setPubkey',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'string',
        name: 'key',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'value',
        type: 'string',
      },
    ],
    name: 'setText',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'bytes',
        name: 'hash',
        type: 'bytes',
      },
    ],
    name: 'setZonehash',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'string',
        name: 'key',
        type: 'string',
      },
    ],
    name: 'text',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'zonehash',
    outputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'target',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'isAuthorised',
        type: 'bool',
      },
    ],
    name: 'setAuthorisation',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes[]',
        name: 'data',
        type: 'bytes[]',
      },
    ],
    name: 'multicall',
    outputs: [
      {
        internalType: 'bytes[]',
        name: 'results',
        type: 'bytes[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceID',
        type: 'bytes4',
      },
    ],
    name: 'supportsInterface',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
];

var abi = [
  {
    inputs: [
      {
        internalType: 'contract ENS',
        name: 'ens',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'DomainUpdated',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'domainUpdated',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

var parseEther = ethers.utils.parseEther;
var emptyAddress = '0x0000000000000000000000000000000000000000';
var PRINCIPAL_THRESHOLD = parseEther('100');
var WITHDRAW_DELAY = 5;

var _abi = [
  {
    inputs: [
      {
        internalType: 'contract ENS',
        name: 'ens',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'DomainUpdated',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'node',
        type: 'bytes32',
      },
    ],
    name: 'domainUpdated',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
var _bytecode =
  '0x608060405234801561001057600080fd5b506040516103df3803806103df8339818101604052810190610032919061008d565b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505061011a565b60008151905061008781610103565b92915050565b6000602082840312156100a3576100a26100fe565b5b60006100b184828501610078565b91505092915050565b60006100c5826100de565b9050919050565b60006100d7826100ba565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600080fd5b61010c816100cc565b811461011757600080fd5b50565b6102b6806101296000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c80636161016414610030575b600080fd5b61004a600480360381019061004591906101ba565b61004c565b005b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16630178b8bf836040518263ffffffff1660e01b81526004016100a891906101f6565b60206040518083038186803b1580156100c057600080fd5b505afa1580156100d4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906100f8919061018d565b90503373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161461013257600080fd5b817f8c7bc2aee1d48bb46b825273bef0ffd000ccf7d354d5be84bd1e7fe6a208db4960405160405180910390a25050565b60008151905061017281610252565b92915050565b60008135905061018781610269565b92915050565b6000602082840312156101a3576101a261024d565b5b60006101b184828501610163565b91505092915050565b6000602082840312156101d0576101cf61024d565b5b60006101de84828501610178565b91505092915050565b6101f081610223565b82525050565b600060208201905061020b60008301846101e7565b92915050565b600061021c8261022d565b9050919050565b6000819050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600080fd5b61025b81610211565b811461026657600080fd5b50565b61027281610223565b811461027d57600080fd5b5056fea2646970667358221220c8227124f3183d4c5889d86c3ad4a74ff632210e25cf67b343ec4ce925b4a0f364736f6c63430008060033';

var isSuperArgs = function isSuperArgs(xs) {
  return xs.length > 1;
};

var DomainNotifier__factory = /*#__PURE__*/ (function (_ContractFactory) {
  _inherits(DomainNotifier__factory, _ContractFactory);

  var _super = _createSuper(DomainNotifier__factory);

  function DomainNotifier__factory() {
    var _this;

    _classCallCheck(this, DomainNotifier__factory);

    for (
      var _len = arguments.length, args = new Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key];
    }

    if (isSuperArgs(args)) {
      _this = _super.call.apply(_super, [this].concat(args));
    } else {
      _this = _super.call(this, _abi, _bytecode, args[0]);
    }

    _this.contractName = 'DomainNotifier';
    return _possibleConstructorReturn(_this);
  }

  _createClass(
    DomainNotifier__factory,
    [
      {
        key: 'deploy',
        value: function deploy(ens, overrides) {
          return _get(
            _getPrototypeOf(DomainNotifier__factory.prototype),
            'deploy',
            this
          ).call(this, ens, overrides || {});
        },
      },
      {
        key: 'getDeployTransaction',
        value: function getDeployTransaction(ens, overrides) {
          return _get(
            _getPrototypeOf(DomainNotifier__factory.prototype),
            'getDeployTransaction',
            this
          ).call(this, ens, overrides || {});
        },
      },
      {
        key: 'attach',
        value: function attach(address) {
          return _get(
            _getPrototypeOf(DomainNotifier__factory.prototype),
            'attach',
            this
          ).call(this, address);
        },
      },
      {
        key: 'connect',
        value: function connect(signer) {
          return _get(
            _getPrototypeOf(DomainNotifier__factory.prototype),
            'connect',
            this
          ).call(this, signer);
        },
      },
    ],
    [
      {
        key: 'createInterface',
        value: function createInterface() {
          return new ethers.utils.Interface(_abi);
        },
      },
      {
        key: 'connect',
        value: function connect(address, signerOrProvider) {
          return new ethers.Contract(address, _abi, signerOrProvider);
        },
      },
    ]
  );

  return DomainNotifier__factory;
})(ethers.ContractFactory);
DomainNotifier__factory.bytecode = _bytecode;
DomainNotifier__factory.abi = _abi;

var DomainHierarchy = /*#__PURE__*/ _createClass(function DomainHierarchy(
  _ref
) {
  var _this = this;

  var domainReader = _ref.domainReader,
    ensRegistryAddress = _ref.ensRegistryAddress,
    provider = _ref.provider,
    domainNotifierAddress = _ref.domainNotifierAddress,
    publicResolverAddress = _ref.publicResolverAddress;

  _classCallCheck(this, DomainHierarchy);

  /**
   * Retrieves list of subdomains from on-chain for a given parent domain
   * based on the logs from the ENS resolver contracts.
   * By default, queries from the DomainNotifier contract.
   * If publicResolver available, also queries from PublicResolver contract.
   */
  this.getSubdomainsUsingResolver = function (_ref2) {
    var domain = _ref2.domain,
      mode = _ref2.mode;
    return tslib.__awaiter(_this, void 0, void 0, function* () {
      var _this2 = this;

      if (!domain) throw new Error('You need to pass a domain name'); // Filter out apps and roles

      var isRelevantDomainEndings = function isRelevantDomainEndings(name) {
        var notRelevantDomainEndings = ['roles', 'apps'];
        var leafLabel = name.split('.')[0];
        return notRelevantDomainEndings.includes(leafLabel);
      };

      if (mode === 'ALL') {
        var getParser = function getParser(nameReader) {
          return function (_ref3) {
            var node = _ref3.node;
            return tslib.__awaiter(_this2, void 0, void 0, function* () {
              try {
                var name = yield nameReader(node);

                if (isRelevantDomainEndings(name)) {
                  return '';
                }

                if (name.endsWith(domain) && name !== domain) {
                  var owner = yield this._ensRegistry.owner(node);
                  if (owner === emptyAddress) return '';
                  return name;
                }
              } catch (_a) {
                // A possible source of exceptions is if domain has been deleted (https://energyweb.atlassian.net/browse/SWTCH-997)
                return '';
              }

              return '';
            });
          };
        };

        var subDomains = yield this.getDomainsFromLogs({
          parser: getParser(
            this._domainReader.readName.bind(this._domainReader)
          ),
          provider: this._domainNotifier.provider,
          event: this._domainNotifier.filters.DomainUpdated(null),
          contractInterface: new ethers.utils.Interface(abi),
        });

        if (this._publicResolver) {
          var publicResolverDomains = yield this.getDomainsFromLogs({
            parser: getParser(this._publicResolver.name),
            provider: this._publicResolver.provider,
            event: this._publicResolver.filters.TextChanged(
              null,
              'metadata',
              null
            ),
            contractInterface: new ethers.utils.Interface(abi$1),
          });
          subDomains = new Set(
            [].concat(
              _toConsumableArray(publicResolverDomains),
              _toConsumableArray(subDomains)
            )
          );
        }

        return _toConsumableArray(subDomains).filter(Boolean); // Boolean filter to remove empty string
      }

      var singleLevel = yield this.getDomainsFromLogs({
        contractInterface: new ethers.utils.Interface(abi$2),
        event: this._ensRegistry.filters.NewOwner(
          ethers.utils.namehash(domain),
          null,
          null
        ),
        parser: function parser(_ref4) {
          var node = _ref4.node,
            label = _ref4.label;
          return tslib.__awaiter(_this2, void 0, void 0, function* () {
            var namehash = ethers.utils.keccak256(node + label.slice(2));
            if (domain.endsWith('orgs.engie.auth.ewc')) {
              console.log('> orgs.engie.auth.ewc subdomain:', namehash);
            }
            if (
              namehash ===
              ethers.utils.namehash('engie-africa.orgs.engie.auth.ewc')
            ) {
              console.log('> caught engie-africa.orgs.engie.auth.ewc');
              return 'engie-africa.orgs.engie.auth.ewc';
            }
            try {
              var _yield$Promise$all = yield Promise.all([
                  this._domainReader.readName(namehash),
                  this._ensRegistry.owner(namehash),
                ]),
                _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2),
                name = _yield$Promise$all2[0],
                ownerAddress = _yield$Promise$all2[1];
              if (ownerAddress === emptyAddress) return '';

              if (isRelevantDomainEndings(name)) {
                return '';
              }

              return name;
            } catch (_a) {
              console.log(`error parsing ${_ref4}:`, _a.message);
              return '';
            }
          });
        },
        provider: this._ensRegistry.provider,
      });
      return _toConsumableArray(singleLevel).filter(Boolean); // Boolean filter to remove empty string
    });
  };
  /**
   * Retrieves list of subdomains from on-chain for a given parent domain
   * based on the ENS Registry contract logs.
   * For multi-level queries with many domains, querying the registry is slower than
   * using the resolver contract because of the repeated RPC call.
   */

  this.getSubdomainsUsingRegistry = function (_ref5) {
    var domain = _ref5.domain;
    return tslib.__awaiter(_this, void 0, void 0, function* () {
      var _this3 = this;

      if (!domain) throw new Error('You need to pass a domain name');
      var notRelevantDomainEndings = ['roles', 'apps'];

      var parser = function parser(_ref6) {
        var node = _ref6.node,
          label = _ref6.label,
          owner = _ref6.owner;
        return tslib.__awaiter(_this3, void 0, void 0, function* () {
          try {
            if (owner === emptyAddress) return '';
            var namehash = ethers.utils.keccak256(node + label.slice(2));

            var _yield$Promise$all3 = yield Promise.all([
                this._domainReader.readName(namehash),
                this._ensRegistry.owner(namehash),
              ]),
              _yield$Promise$all4 = _slicedToArray(_yield$Promise$all3, 2),
              name = _yield$Promise$all4[0],
              ownerAddress = _yield$Promise$all4[1];

            if (ownerAddress === emptyAddress) return '';
            return name;
          } catch (_b) {
            // A possible source of exceptions is if domain has been deleted (https://energyweb.atlassian.net/browse/SWTCH-997)
            return '';
          }
        });
      };

      var queue = [];
      var subDomains = new Set();
      queue.push([domain]);
      subDomains.add(domain); // Breadth-first search down subdomain tree

      while (queue.length > 0) {
        var currentNodes = queue[0];
        var currentNameHashes = currentNodes.map(function (node) {
          return ethers.utils.namehash(node);
        });

        var event = this._ensRegistry.filters.NewOwner(null, null, null); // topics should be able to accept an array: https://docs.ethers.io/v5/concepts/events/
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore

        event.topics[1] = currentNameHashes;
        var uniqueDomains = yield this.getDomainsFromLogs({
          provider: this._ensRegistry.provider,
          parser: parser,
          event: event,
          contractInterface: new ethers.utils.Interface(abi$2),
        });

        if (uniqueDomains.size > 0) {
          queue.push(_toConsumableArray(uniqueDomains));
        }

        var _iterator = _createForOfIteratorHelper(uniqueDomains),
          _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done; ) {
            var _domain = _step.value;

            var leafLabel = _domain.split('.')[0];

            if (notRelevantDomainEndings.includes(leafLabel)) continue;
            subDomains.add(_domain);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        queue.shift();
      }

      return _toConsumableArray(subDomains).filter(Boolean); // Boolean filter to remove empty string
    });
  };

  this.getDomainsFromLogs = function (_ref7) {
    var provider = _ref7.provider,
      parser = _ref7.parser,
      event = _ref7.event,
      contractInterface = _ref7.contractInterface;
    return tslib.__awaiter(_this, void 0, void 0, function* () {
      var filter = {
        fromBlock: 0,
        toBlock: 'latest',
        address: event.address,
        topics: event.topics || [],
      };
      var logs = yield provider.getLogs(filter);
      var rawLogs = logs.map(function (log) {
        var parsedLog = contractInterface.parseLog(log);
        /** ethers_v5 Interface.parseLog incorrectly parses log, so have to use lowlevel alternative */

        return contractInterface.decodeEventLog(
          parsedLog.name,
          log.data,
          log.topics
        );
      });
      var domains = yield Promise.all(rawLogs.map(parser));
      var nonEmptyDomains = domains.filter(function (domain) {
        return domain != '';
      });
      return new Set(nonEmptyDomains);
    });
  };

  if (!domainReader) throw new Error('You need to pass a DomainReader');
  this._domainReader = domainReader;
  if (!ensRegistryAddress)
    throw new Error(
      'You need to pass the address of ensRegistry ethers contract'
    );
  this._ensRegistry = ENSRegistry__factory.connect(
    ensRegistryAddress,
    provider
  );
  if (!provider) throw new Error('You need to pass a provider');
  this._provider = provider;
  if (!domainNotifierAddress)
    throw new Error(
      'You need to pass the address of a domain notifier contract'
    );
  this._domainNotifier = DomainNotifier__factory.connect(
    domainNotifierAddress,
    provider
  );

  if (publicResolverAddress) {
    this._publicResolver = PublicResolver__factory.connect(
      publicResolverAddress,
      provider
    );
  }
});

var Logger = ethers.utils.Logger;
Logger.setLogLevel(Logger.levels.ERROR);

exports.DomainHierarchy = DomainHierarchy;
exports.DomainReader = DomainReader;
exports.DomainTransactionFactory = DomainTransactionFactory;
exports.DomainTransactionFactoryV2 = DomainTransactionFactoryV2;
exports.EWC_ADDRESS_1056 = EWC_ADDRESS_1056;
exports.EWC_CHAIN_ID = EWC_CHAIN_ID;
exports.EWC_CLAIM_MANAGER_ADDRESS = EWC_CLAIM_MANAGER_ADDRESS;
exports.EWC_DOMAIN_NOTIFER_ADDRESS = EWC_DOMAIN_NOTIFER_ADDRESS;
exports.EWC_ENS_REGISTRY_ADDRESS = EWC_ENS_REGISTRY_ADDRESS;
exports.EWC_IDENTITY_MANAGER_ADDRESS = EWC_IDENTITY_MANAGER_ADDRESS;
exports.EWC_PUBLIC_RESOLVER_ADDRESS = EWC_PUBLIC_RESOLVER_ADDRESS;
exports.EWC_RESOLVER_V1_ADDRESS = EWC_RESOLVER_V1_ADDRESS;
exports.EWC_RESOLVER_V2_ADDRESS = EWC_RESOLVER_V2_ADDRESS;
exports.PRINCIPAL_THRESHOLD = PRINCIPAL_THRESHOLD;
exports.VOLTA_CHAIN_ID = VOLTA_CHAIN_ID;
exports.VOLTA_CLAIM_MANAGER_ADDRESS = VOLTA_CLAIM_MANAGER_ADDRESS;
exports.VOLTA_DOMAIN_NOTIFER_ADDRESS = VOLTA_DOMAIN_NOTIFER_ADDRESS;
exports.VOLTA_ENS_REGISTRY_ADDRESS = VOLTA_ENS_REGISTRY_ADDRESS;
exports.VOLTA_IDENTITY_MANAGER_ADDRESS = VOLTA_IDENTITY_MANAGER_ADDRESS;
exports.VOLTA_PUBLIC_RESOLVER_ADDRESS = VOLTA_PUBLIC_RESOLVER_ADDRESS;
exports.VOLTA_RESOLVER_V1_ADDRESS = VOLTA_RESOLVER_V1_ADDRESS;
exports.VOLTA_RESOLVER_V2_ADDRESS = VOLTA_RESOLVER_V2_ADDRESS;
exports.VOLTA_REWARD_POOL_ADDRESS = VOLTA_REWARD_POOL_ADDRESS;
exports.WITHDRAW_DELAY = WITHDRAW_DELAY;
//# sourceMappingURL=index.js.map
