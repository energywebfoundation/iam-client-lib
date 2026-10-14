
# setting up and testing project locally

to use/debug iam-client-lib locally you should 

1. clone the repo to your local machine
2. run `npm link` on root directory after `npm i`
3. then in repo you are going to use the package(i.e. switchboard-dapp), in root directory run `npm link iam-client-lib`

after this steps when `npm run build` command will be executed the iam-client-lib will automatically be updated on switchboard-dapp.

# supported environment

for unix and windows environments lib is executing `npm i` and `npm run build` without problems

tests run against a local Hardhat chain (configured in `hardhat.config.js`) that `npm run start-rpc` starts on port 8544 and stops when the tests finish. `npm run local-chain` starts the same chain on its own.