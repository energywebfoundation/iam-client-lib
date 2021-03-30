import inquirer from "inquirer";
import { changeResolver, ChangeResolverParams } from "../src/utils/change_resolver";

const askParams = async (): Promise<ChangeResolverParams> => {
  const questions = [
    {
      name: 'rootNode',
      type: 'input',
      message: 'Root node name:',
      validate: function (value) {
        if (value.length) {
          return true;
        } else {
          return 'Root not provided';
        }
      }
    },
    {
      name: 'privateKey',
      type: 'password',
      message: 'Private key of root node owner:',
      validate: function (value) {
        if (value.length) {
          return true;
        } else {
          return 'Private key is not provided';
        }
      }
    },
    {
      name: 'rpcUrl',
      type: 'input',
      message: 'Rpc url:',
      validate: function (value) {
        if (value.length) {
          return true;
        } else {
          return 'Rpc url not provided';
        }
      }
    },
    {
      name: 'resolverAddr',
      type: 'input',
      message: 'Ens resolver address:',
      validate: function (value) {
        if (value.length) {
          return true;
        } else {
          return 'Ens resolver address not provided';
        }
      }
    },
    {
      name: 'registryAddr',
      type: 'input',
      message: 'Ens registry address:',
      validate: function (value) {
        if (value.length) {
          return true;
        } else {
          return 'Ens registry address not provided';
        }
      }
    },
    {
      name: 'newResolverAddr',
      type: 'input',
      message: 'New Ens resolver address:',
      validate: function (value) {
        if (value.length) {
          return true;
        } else {
          return 'New Ens resolver address not provided';
        }
      }
    }
  ];
  return inquirer.prompt(questions);
};

askParams().then((params) => {
  console.log('params:', params);
  return changeResolver(params);
})
  .then(() => console.log('Resolver successfuly replaced'))
  .catch((e) => console.error('Error replacing resolver:', e));
