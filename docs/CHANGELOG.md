### [6.2.1-alpha.2](https://github.com/energywebfoundation/iam-client-lib/compare/v6.2.1-alpha.1...v6.2.1-alpha.2) (2022-09-12)


### Refactoring

* **claims:** merge ClaimData with vc-verification ([0e1fafa](https://github.com/energywebfoundation/iam-client-lib/commit/0e1fafa417addaa3aba725224772f38e8212a063))

### [6.2.1-alpha.1](https://github.com/energywebfoundation/iam-client-lib/compare/v6.2.0...v6.2.1-alpha.1) (2022-09-09)


### Bug Fixes

* verify credential before issuer verification ([111923b](https://github.com/energywebfoundation/iam-client-lib/commit/111923bae56da5977a814e9b280be57747345c94))

## [6.2.0](https://github.com/energywebfoundation/iam-client-lib/compare/v6.1.0...v6.2.0) (2022-09-06)


### Features

* set roleeip191jwt expiration in seconds ([270778c](https://github.com/energywebfoundation/iam-client-lib/commit/270778cf3b462c6304c9fa401a0b3b344f2077e0))

## [6.2.0-alpha.1](https://github.com/energywebfoundation/iam-client-lib/compare/v6.1.0...v6.2.0-alpha.1) (2022-09-06)


### Features

* set roleeip191jwt expiration in seconds ([270778c](https://github.com/energywebfoundation/iam-client-lib/commit/270778cf3b462c6304c9fa401a0b3b344f2077e0))

## [6.1.0](https://github.com/energywebfoundation/iam-client-lib/compare/v6.0.1...v6.1.0) (2022-09-05)


### Features

* verification code refactoring ([fefb6e2](https://github.com/energywebfoundation/iam-client-lib/commit/fefb6e289b458d6989b8e6a2c10796c1d8228989))


### Bug Fixes

* validate issuer verification ([14fe517](https://github.com/energywebfoundation/iam-client-lib/commit/14fe51721f7b00c7972d1501f397b6fae74b4af0))

## [6.1.0-alpha.1](https://github.com/energywebfoundation/iam-client-lib/compare/v6.0.1...v6.1.0-alpha.1) (2022-09-02)


### Features

* verification code refactoring ([fefb6e2](https://github.com/energywebfoundation/iam-client-lib/commit/fefb6e289b458d6989b8e6a2c10796c1d8228989))


### Bug Fixes

* validate issuer verification ([14fe517](https://github.com/energywebfoundation/iam-client-lib/commit/14fe51721f7b00c7972d1501f397b6fae74b4af0))

### [6.0.1](https://github.com/energywebfoundation/iam-client-lib/compare/v6.0.0...v6.0.1) (2022-08-31)


### Bug Fixes

* **exp:** document expirationTimestamp ([#631](https://github.com/energywebfoundation/iam-client-lib/issues/631)) ([9595c34](https://github.com/energywebfoundation/iam-client-lib/commit/9595c34bba0021ef75a29b24610d37eac762fc64))
* **issue claim:** allow boolean as valid field ([#639](https://github.com/energywebfoundation/iam-client-lib/issues/639)) ([77eb426](https://github.com/energywebfoundation/iam-client-lib/commit/77eb426c5222c312b6cb04fc87155b6300693d97))
* use resolveCredentialAndVerify to verify enrolment prerequisites ([#630](https://github.com/energywebfoundation/iam-client-lib/issues/630)) ([9208ad3](https://github.com/energywebfoundation/iam-client-lib/commit/9208ad36edb91a0aac3cf1b36dc28053b123896f))

### [6.0.1-alpha.3](https://github.com/energywebfoundation/iam-client-lib/compare/v6.0.1-alpha.2...v6.0.1-alpha.3) (2022-08-17)


### Bug Fixes

* use resolveCredentialAndVerify to verify enrolment prerequisites ([#630](https://github.com/energywebfoundation/iam-client-lib/issues/630)) ([9208ad3](https://github.com/energywebfoundation/iam-client-lib/commit/9208ad36edb91a0aac3cf1b36dc28053b123896f))

### [6.0.1-alpha.2](https://github.com/energywebfoundation/iam-client-lib/compare/v6.0.1-alpha.1...v6.0.1-alpha.2) (2022-08-15)


### Bug Fixes

* **exp:** document expirationTimestamp ([#631](https://github.com/energywebfoundation/iam-client-lib/issues/631)) ([9595c34](https://github.com/energywebfoundation/iam-client-lib/commit/9595c34bba0021ef75a29b24610d37eac762fc64))

### [6.0.1-alpha.1](https://github.com/energywebfoundation/iam-client-lib/compare/v6.0.0...v6.0.1-alpha.1) (2022-08-15)


### Bug Fixes

* **issue claim:** allow boolean as valid field ([#639](https://github.com/energywebfoundation/iam-client-lib/issues/639)) ([77eb426](https://github.com/energywebfoundation/iam-client-lib/commit/77eb426c5222c312b6cb04fc87155b6300693d97))

## [6.0.0](https://github.com/energywebfoundation/iam-client-lib/compare/v5.0.0...v6.0.0) (2022-08-15)


### ⚠ BREAKING CHANGES

* **infura:** Requiring object instead of string for IPFS config

* fix(infura): allow DID reg to take in Infura config

* fix(infura): create helper method for ipfs config for tests

* fix(infura): add return type

* fix(infura): use IFPS daemon for tests

* fix(infura): use ipfs config for initUser methods

* fix(infura): replace config with ipfs daemon for initUser methods
* `VerifiableCredentialsService` is initialized earlier.

### Features

* add claim revocation ([2ab1d93](https://github.com/energywebfoundation/iam-client-lib/commit/2ab1d936e7afcc17ac2165272ccb8603412ed1fc))
* add createdAt property to Claim interface ([c71344d](https://github.com/energywebfoundation/iam-client-lib/commit/c71344d24ba3f99373306ba56cdcd94ed713d59f))
* add credential revocation ([1f8f028](https://github.com/energywebfoundation/iam-client-lib/commit/1f8f0282a38853d3bc6fbbce3e02a028f68749ff))
* add documentation ([543494f](https://github.com/energywebfoundation/iam-client-lib/commit/543494fb0a7caa0fe57fd0880cefb13090ea086d))
* add documentation comments in dist ([cc34e96](https://github.com/energywebfoundation/iam-client-lib/commit/cc34e963e52342259277e2643ac8dc5819df47f8))
* add logs for axios errors ([2fa44c6](https://github.com/energywebfoundation/iam-client-lib/commit/2fa44c627ed2d11b79b566d90986a8c8e7d4d20c))
* add method to get claims by revoker to cache client interface ([e24b506](https://github.com/energywebfoundation/iam-client-lib/commit/e24b506a929f5c7ff17df99b6d23dd7b31440efe))
* adding more details to error log line when http request fails ([#617](https://github.com/energywebfoundation/iam-client-lib/issues/617)) ([e99ceda](https://github.com/energywebfoundation/iam-client-lib/commit/e99cedac0e1ebc66369cfbfced39dce07822aab3))
* **addStatusToClaim:** add cred status to claim object ([f1f6328](https://github.com/energywebfoundation/iam-client-lib/commit/f1f6328e762b7d48dbf6a2a5dbdd4cca069090c0))
* apply prettier formatting ([abc5154](https://github.com/energywebfoundation/iam-client-lib/commit/abc5154b1cd9e509fc7f30d8115e9eaf243d94fd))
* **assets:** fix assets service interfaces ([c9c6a87](https://github.com/energywebfoundation/iam-client-lib/commit/c9c6a8742c4389653a6b593261fab784c27b5ff2))
* **assets:** get asset owner ([1eb4832](https://github.com/energywebfoundation/iam-client-lib/commit/1eb48322b2736f0819366eef07a6fabb6cf8ff11))
* authorize issuer ([7e8b864](https://github.com/energywebfoundation/iam-client-lib/commit/7e8b86480b81cc0d0f76588146c28271552ad589))
* claim expieration ([#567](https://github.com/energywebfoundation/iam-client-lib/issues/567)) ([757de5a](https://github.com/energywebfoundation/iam-client-lib/commit/757de5a4458b0864d621cbb41c44f764c87b3b5c))
* **claim:** issue VC when approving role request ([a3eefbc](https://github.com/energywebfoundation/iam-client-lib/commit/a3eefbc243f39f5392f7918b1cdb4e782faf8001))
* **claims:** add status to vc ([28c556f](https://github.com/energywebfoundation/iam-client-lib/commit/28c556ffa0a9d53561507fdce95817a6672e43f3))
* **claims:** verify credential status ([b5da79f](https://github.com/energywebfoundation/iam-client-lib/commit/b5da79f74a1f1c86243799c3b42ef60fc6a36b2f))
* **claims:** verify role vc ([b318dbd](https://github.com/energywebfoundation/iam-client-lib/commit/b318dbdc2771165b8bbc215abb02d3f14f2020f1))
* continue credentials exchange ([fd07ba0](https://github.com/energywebfoundation/iam-client-lib/commit/fd07ba0a67611b36f4b5e53ed054bf491e9d0375))
* **docs:** quick start ([cd85c17](https://github.com/energywebfoundation/iam-client-lib/commit/cd85c1718a372509594db944fe6eb9d3beba667b))
* **domain-reader:** refactor domainreader initialisation ([9f7ea6e](https://github.com/energywebfoundation/iam-client-lib/commit/9f7ea6ed79acbb58f95773d1d17272c61312184f))
* **domains:** add MulticallTx type ([3be1e6f](https://github.com/energywebfoundation/iam-client-lib/commit/3be1e6fb7435d3fc6a76c3772c668f7fe4ee5eca))
* ens scripts ([d7f0df3](https://github.com/energywebfoundation/iam-client-lib/commit/d7f0df38c5eb0ff1d7b44159b6a83ec606927790))
* **exp:** add explainer for expiration ([5441a4f](https://github.com/energywebfoundation/iam-client-lib/commit/5441a4f3164c87feb85bb8dce3023211c37eccff))
* **exp:** apply prettier formatting ([7261112](https://github.com/energywebfoundation/iam-client-lib/commit/72611120383a4b0ea94cd57ad27c9bde0d9052df))
* **exp:** fix issuerVerified as boolean ([d82eeeb](https://github.com/energywebfoundation/iam-client-lib/commit/d82eeebd1c36105fbf2156b0b04e7ec7487328e4))
* export logger ([819e67c](https://github.com/energywebfoundation/iam-client-lib/commit/819e67c8f5ab64a137ffdeb2405684c972b0b1c2))
* **exp:** remove method for expiration check; decrease test await ([9ae092c](https://github.com/energywebfoundation/iam-client-lib/commit/9ae092cf228862d6886a70ed96c543eeb5128e87))
* handle unexpected did service endpoint ([#610](https://github.com/energywebfoundation/iam-client-lib/issues/610)) ([a360e93](https://github.com/energywebfoundation/iam-client-lib/commit/a360e936bae152b336611a9105dea638af60349d))
* **infura:** allow DID reg to take in Infura config ([#638](https://github.com/energywebfoundation/iam-client-lib/issues/638)) ([ad2ed1a](https://github.com/energywebfoundation/iam-client-lib/commit/ad2ed1abdaa94ca9ed40c21ab549bdc0921a326c))
* initiate credential exchange ([099eb64](https://github.com/energywebfoundation/iam-client-lib/commit/099eb64b4087d5f3a9b486b5794452410673ee99))
* remove verifiable credentials storage ([9501481](https://github.com/energywebfoundation/iam-client-lib/commit/9501481acd4fc1f11819e3f3564caf82d2f432ce))
* **revocation:** add credentialStatus to EIP191JWT ([52fec66](https://github.com/energywebfoundation/iam-client-lib/commit/52fec660c53ac04dbaf5f9aee07004c6ee786064))
* **RevokeClaim:** add endpoint to fetch claims by revoker (current user) ([80cf934](https://github.com/energywebfoundation/iam-client-lib/commit/80cf93485d7f53460ab5df78b37f40fe5eedb4c7))
* **revokeClaim:** make did param required ([b6648d6](https://github.com/energywebfoundation/iam-client-lib/commit/b6648d6549b569fb6a74ccaba8b5c5b970ce7806))
* types in claims service (EthersProviderIssuerResolver) ([11ac865](https://github.com/energywebfoundation/iam-client-lib/commit/11ac8656440c958df1c8216f7917e6ffce696e26))
* update claim revocation registry address ([effe1d8](https://github.com/energywebfoundation/iam-client-lib/commit/effe1d899d8316005759a2c0050ec4d4c3513d0b))
* update types and interfaces from ew-credentials ([0ed9855](https://github.com/energywebfoundation/iam-client-lib/commit/0ed98552c3fb98ac08b9a9389cf35d4c3cac2196))
* **vc:** add verifiable credential expiration date ([e76c66b](https://github.com/energywebfoundation/iam-client-lib/commit/e76c66b1c26b50a7854c3971042fe29ee1224e2e))
* verifiable credential poc ([a7f8df7](https://github.com/energywebfoundation/iam-client-lib/commit/a7f8df759f1bae954b19ac80c526aa3608551079))
* verifiable presentation poc ([a4732e3](https://github.com/energywebfoundation/iam-client-lib/commit/a4732e36ee9b4034a0986d0d99f550c4166eb98d))
* **verifiable-credentials:** add credential status eip712 type ([d9db01f](https://github.com/energywebfoundation/iam-client-lib/commit/d9db01ffe8cdaec5c7192f2ac134a7941e952555))
* **verifiable-credentials:** get credentials by definition ([5f2e7a8](https://github.com/energywebfoundation/iam-client-lib/commit/5f2e7a82d6c61432609f00dc972cc9441f432fcd))
* **verifyExp:** add documentation; address PR comments ([e7a50a5](https://github.com/energywebfoundation/iam-client-lib/commit/e7a50a5ca4ef7861d63184930be2fcac76b6c089))
* **verifyExp:** add exp verification method and tests for EIP and VP ([7099c09](https://github.com/energywebfoundation/iam-client-lib/commit/7099c0909d785a5c3eb0637542a1644cd5b3ab7d))
* **verifyExp:** remove comment ([1d96490](https://github.com/energywebfoundation/iam-client-lib/commit/1d964906d94637e041d10a1c540a5dfde47d769d))
* **verifyVc:** add jsonwebtoken and update package-lock ([81ff25d](https://github.com/energywebfoundation/iam-client-lib/commit/81ff25d6d8af124c5fedd2aa9de29978cfb61626))
* **verifyVc:** add unit tests ([c4390b1](https://github.com/energywebfoundation/iam-client-lib/commit/c4390b1c41ceca5970231ada1618803a290338b2))
* **verifyVC:** add verifyVC method to VC Base Service ([3187e5e](https://github.com/energywebfoundation/iam-client-lib/commit/3187e5e66253f429b9769e20a306ece5255325b5))
* **verifyVC:** make proof private; add error and return types ([0da3229](https://github.com/energywebfoundation/iam-client-lib/commit/0da322967191a75f6d2c57446c1df37ff1c743c4))
* **verifyVc:** remove comments and update test case descriptions ([04f9c9f](https://github.com/energywebfoundation/iam-client-lib/commit/04f9c9f4baebe79903cd0a782c1906f33b0a3bf8))
* **verifyVc:** resolve conflicts and add formatting ([b24f328](https://github.com/energywebfoundation/iam-client-lib/commit/b24f32830e77e582e5a5aa3b436eaa00b1decdfb))
* **verifyVC:** update ew-credentials ([877fad6](https://github.com/energywebfoundation/iam-client-lib/commit/877fad6af609df1baebf17cc9661c862af1095c8))
* **verifyVc:** update ew-credentials version and use to resolve credentials ([cd77eb0](https://github.com/energywebfoundation/iam-client-lib/commit/cd77eb05c526628a582306ecc9affab05461373d))
* **verifyVc:** update method and params ([9800557](https://github.com/energywebfoundation/iam-client-lib/commit/9800557e5ff96e341de069d97c6ee5804ee8a422))
* **verifyVc:** update method documentation ([86e47e1](https://github.com/energywebfoundation/iam-client-lib/commit/86e47e13b5864981284aedc61c90ea4c2008bb46))
* **verifyVc:** update resolve method and add method for offchain verify ([800c903](https://github.com/energywebfoundation/iam-client-lib/commit/800c903339c2cbc3908879816385731d37edef74))
* **verifyVc:** update unit tests ([9d5e7ba](https://github.com/energywebfoundation/iam-client-lib/commit/9d5e7ba7c1c3f2298b083f4d35195a06823075ff))
* **verifyVc:** update unit tests ([eb0c7e0](https://github.com/energywebfoundation/iam-client-lib/commit/eb0c7e07e9872e82b6d4cf431640297d2646ab53))
* **verifyVc:** update verify method name ([e5733c6](https://github.com/energywebfoundation/iam-client-lib/commit/e5733c64a6e3775d88c57cd5dc756912925dcc32))
* **verifyVc:** update verifyOffChainClaim method to accept Claim interface ([3034101](https://github.com/energywebfoundation/iam-client-lib/commit/3034101f37cdbd1d3b64b3fc0540d8996effa589))


### Bug Fixes

* add checking if service endpoint is a CID ([a0b5d1a](https://github.com/energywebfoundation/iam-client-lib/commit/a0b5d1ab44fdbe4551a4c18e1d96fec831676b9b))
* add vp request to return of initiate exchange ([ddecbaf](https://github.com/energywebfoundation/iam-client-lib/commit/ddecbafe973c19b0acb17abb94fec062bacc5c62))
* **addVcVerifier:** add VerifyVCIssuer method ([6052d41](https://github.com/energywebfoundation/iam-client-lib/commit/6052d41bd7fb7d22fbd16910d20d04c3a14381e1))
* **addVcVerifier:** return instance of domain reader ([ce037f4](https://github.com/energywebfoundation/iam-client-lib/commit/ce037f449ef0960129f4cf1f59f1460076f1c9ed))
* **addVcVerifier:** return type for Domain Reader ([84ba78f](https://github.com/energywebfoundation/iam-client-lib/commit/84ba78f82d5bfb6deedb0de366206cd49bd34ef6))
* **addVcVerifier:** update package-lock version ([9eb00ac](https://github.com/energywebfoundation/iam-client-lib/commit/9eb00ac0744acd88f275a9593c37c5ecdddf069e))
* avoid refreshing undefined token ([86bed3c](https://github.com/energywebfoundation/iam-client-lib/commit/86bed3c3bbe3a4ddc10dcc5cbb6f17ae0c21ba2a))
* cache client authentication ([619845d](https://github.com/energywebfoundation/iam-client-lib/commit/619845d320833e9adbc330bde5c35f15d735e57d))
* cache-client token refresh ([05e9f1a](https://github.com/energywebfoundation/iam-client-lib/commit/05e9f1a216f091d412319f8ce2590d5183080e46))
* **claim:** fix claim service issuance interfaces ([4c32a26](https://github.com/energywebfoundation/iam-client-lib/commit/4c32a265f602a10704d70bf7bf51263e8cb14d7b))
* **claim:** fix public claim publishing ([d77df34](https://github.com/energywebfoundation/iam-client-lib/commit/d77df340c4a1b204ee9fe23c2d71ea4b17074391))
* **claims:** dont reregister onchain claim ([ebd46c0](https://github.com/energywebfoundation/iam-client-lib/commit/ebd46c0b7fbe5f30f1f945891ab90ba1aba57caf))
* **did-registry:** optional encoding and algo of public key ([26a239f](https://github.com/energywebfoundation/iam-client-lib/commit/26a239f460363120305c37e8acfcc04a7cee13f1))
* **docs:** architecture ([f7daa96](https://github.com/energywebfoundation/iam-client-lib/commit/f7daa9688360350b2c797170328dbb1ed0b130e7))
* **docs:** guides ([627bc88](https://github.com/energywebfoundation/iam-client-lib/commit/627bc887dc7186ff531932a6619ed4020bb0d725))
* **domain:** fix domain service interfaces ([50a014e](https://github.com/energywebfoundation/iam-client-lib/commit/50a014ecf8244b9f70cf530f0ea67281b8fd5cee))
* don't remove deploy badge ([c216ed8](https://github.com/energywebfoundation/iam-client-lib/commit/c216ed81305bebff6d911850c01d1c537cda9f33))
* exchange credential tests grouping ([2b1e674](https://github.com/energywebfoundation/iam-client-lib/commit/2b1e6746169b05756125d37595c5744aea12b8ee))
* **exp:** do not use dflt validity period to calculate timestamp if n… ([#623](https://github.com/energywebfoundation/iam-client-lib/issues/623)) ([9ce524d](https://github.com/energywebfoundation/iam-client-lib/commit/9ce524da24ab41df0e0fdaf253abf723fa6f2d89))
* filter self-signed credential from presDef before sending to PEX ([6d43aeb](https://github.com/energywebfoundation/iam-client-lib/commit/6d43aeb5d7b530461ec92be663b30626e641c9db))
* fix backward compatibility for did registry interface ([a24a91c](https://github.com/energywebfoundation/iam-client-lib/commit/a24a91c15f487f48267bf410021d0778e18fdc27))
* fix delegate token payload ([56bfb1d](https://github.com/energywebfoundation/iam-client-lib/commit/56bfb1dac6d23b3146fee723a1245041701a9928))
* on-chain claim revocation ([df9eeea](https://github.com/energywebfoundation/iam-client-lib/commit/df9eeea62ed6b05fb13dfec074d52267c5efa335))
* retry failed requests on token refresh ([434e262](https://github.com/energywebfoundation/iam-client-lib/commit/434e2621a34bec16e51722e8454e9852ed5daed5))
* set check ethr signer for node clients ([#618](https://github.com/energywebfoundation/iam-client-lib/issues/618)) ([c198dc7](https://github.com/energywebfoundation/iam-client-lib/commit/c198dc73c5b7a6a2f092ad2719506a88a062da39))
* set index page for readthedocs ([f6b4a49](https://github.com/energywebfoundation/iam-client-lib/commit/f6b4a498e1af22d731f6a5636a808d7b196d2c27))
* throw an error when a did document update failed ([e7c1ae9](https://github.com/energywebfoundation/iam-client-lib/commit/e7c1ae9b892b9fbfafca6bdbe4c375d40317f1f8))
* **verifiable-credentials:** check errors in exchange initiating ([1bc8626](https://github.com/energywebfoundation/iam-client-lib/commit/1bc8626f0e97404c7f3edf222955c8c4399adfa8))
* **verifiable-credentials:** check errors on initiating exchange ([bce85a8](https://github.com/energywebfoundation/iam-client-lib/commit/bce85a8eca2a6abc2e89b93c13c44d63fa64bf02))
* **verifiable-credentials:** filter invalid issuer fields ([8c8b0c3](https://github.com/energywebfoundation/iam-client-lib/commit/8c8b0c3196077b0e1fcf8266c84803d38741cdd2))


### Refactoring

* apply naming convention ([cc41154](https://github.com/energywebfoundation/iam-client-lib/commit/cc41154a60091632e86b2b4f6304050b60f876d3))
* cleanup credential exchange code ([#602](https://github.com/energywebfoundation/iam-client-lib/issues/602)) ([56444c6](https://github.com/energywebfoundation/iam-client-lib/commit/56444c6657a4e83357f4f46c054c2487040df5e2))
* rename issuer credential status ([6c55143](https://github.com/energywebfoundation/iam-client-lib/commit/6c55143dbacf09c24a2e7c156e942ded09098a40))


### Documentation

* add changes in index.md ([0d5626a](https://github.com/energywebfoundation/iam-client-lib/commit/0d5626abd474d3f1bb7fd729de85866b524f9d37))
* add new index.md ([5da81dc](https://github.com/energywebfoundation/iam-client-lib/commit/5da81dc6dbb4519b5deb0a04f72234072ab0fc5e))
* **asset:** improve asset service documentation ([eada9b8](https://github.com/energywebfoundation/iam-client-lib/commit/eada9b858550fe64a4c2c621e78c4f537a1ef217))
* browser session management ([762a42e](https://github.com/energywebfoundation/iam-client-lib/commit/762a42ec905798bed29a6ec4a4d8234fdc94183a))
* **claim.md:** fix more links ([92b7f14](https://github.com/energywebfoundation/iam-client-lib/commit/92b7f1440fda12680da4a3a7d69fd8e41a967b28))
* **claim:** improve claim service documentation ([fa89229](https://github.com/energywebfoundation/iam-client-lib/commit/fa89229de9c9764acd37561076e1711bd5474583))
* **claims:** getClaimId ([affaef7](https://github.com/energywebfoundation/iam-client-lib/commit/affaef7c0c3c47b2536c95581cec1d1468ebb784))
* copy README to docs index.md and remove QUICKSTART file (not used anywhere) ([3ac8fbf](https://github.com/energywebfoundation/iam-client-lib/commit/3ac8fbf2e4ebaa83c5bcdb16be39e892675f08ab))
* **did-registry:** improve DID registry service documentation ([b0bbf6f](https://github.com/energywebfoundation/iam-client-lib/commit/b0bbf6fa9291b1a615eef41db901affb2eea54e8))
* document iam initialization ([1552965](https://github.com/energywebfoundation/iam-client-lib/commit/15529659f004e8695adc48ed8fbfd5254b0737f7))
* **domains:** improve domain service documentation ([861fbfd](https://github.com/energywebfoundation/iam-client-lib/commit/861fbfd37d5af256e2b9540bcd3b486126bfeed7))
* fix api links in guides files ([6934d4a](https://github.com/energywebfoundation/iam-client-lib/commit/6934d4aad092d46f22f2a242aee3db84113dcbb2))
* improve read the docs ([#613](https://github.com/energywebfoundation/iam-client-lib/issues/613)) ([ccc2358](https://github.com/energywebfoundation/iam-client-lib/commit/ccc235865c16a26fb139eacfa4dee01c57140689))
* **index.md:** remove out of date sections ([5874ed4](https://github.com/energywebfoundation/iam-client-lib/commit/5874ed49606923fc6c5b5837f11682694ccdbef3))
* install in browser application ([488106f](https://github.com/energywebfoundation/iam-client-lib/commit/488106f580ab8d254e909803a0716de441b32cbd))
* **messaging:** improve messaging service documentation ([509e201](https://github.com/energywebfoundation/iam-client-lib/commit/509e2014840758f8dee5698f85bd44b7f7909855))
* organize api by modules ([aae1c23](https://github.com/energywebfoundation/iam-client-lib/commit/aae1c2339bf9eaf5286a4603a8b9ef98b0e16b8f))
* **README.md:** update active maintainers ([1cb98c2](https://github.com/energywebfoundation/iam-client-lib/commit/1cb98c213ec431e5a67cdeb99a0f9858036ab8e5))
* **README:** fix link to read the docs ([8858048](https://github.com/energywebfoundation/iam-client-lib/commit/88580482564f71daea79c64501ddc5d9496b92f0))
* **README:** fix names of "set" methods ([37126ae](https://github.com/energywebfoundation/iam-client-lib/commit/37126ae5805fda3182a5e4bd7368b37270f89982))
* remove architecture intro section ([f8da541](https://github.com/energywebfoundation/iam-client-lib/commit/f8da54190fc32a07f581f24d60fced5ce1eb083d))
* remove quickstart from mkdocs structure ([b9919e1](https://github.com/energywebfoundation/iam-client-lib/commit/b9919e18e29584175505faff817021334d9bcfea))
* remove README from api ([78bc3a0](https://github.com/energywebfoundation/iam-client-lib/commit/78bc3a0b5911bf711cf3caad37d3eebb6da193c0))
* remove trailing spaces ([3ffb6af](https://github.com/energywebfoundation/iam-client-lib/commit/3ffb6af6f873127b1355deac3fd35dc66b110998))
* **signer:** improve signer service documentation ([7a8048d](https://github.com/energywebfoundation/iam-client-lib/commit/7a8048df2172f92a3a4e8ebf2a7221701b1f3202))
* update examples role objects ([99066bf](https://github.com/energywebfoundation/iam-client-lib/commit/99066bfd17e6379e540a6cb99fb36f886f51b169))
* update path to logo to be relative ([4fc7413](https://github.com/energywebfoundation/iam-client-lib/commit/4fc7413e992c98925bd534ac0c36598a76ce4060))
* update README template and add quick start documentation ([25b85c9](https://github.com/energywebfoundation/iam-client-lib/commit/25b85c9749894cc3409a3213e1e88578dc59a786))
* update verifiable credentials documentation ([a1d5a5e](https://github.com/energywebfoundation/iam-client-lib/commit/a1d5a5e09fc623f9a03e4c54cc310b805c1c9050))
* **vc:** improve verifiable credential service documentation ([f7191f1](https://github.com/energywebfoundation/iam-client-lib/commit/f7191f13a925d5b90b97ddeb19bcd1e56d13078a))

## [6.0.0-alpha.51](https://github.com/energywebfoundation/iam-client-lib/compare/v6.0.0-alpha.50...v6.0.0-alpha.51) (2022-08-12)


### ⚠ BREAKING CHANGES

* **infura:** Requiring object instead of string for IPFS config

* fix(infura): allow DID reg to take in Infura config

* fix(infura): create helper method for ipfs config for tests

* fix(infura): add return type

* fix(infura): use IFPS daemon for tests

* fix(infura): use ipfs config for initUser methods

* fix(infura): replace config with ipfs daemon for initUser methods

### Features

* **infura:** allow DID reg to take in Infura config ([#638](https://github.com/energywebfoundation/iam-client-lib/issues/638)) ([ad2ed1a](https://github.com/energywebfoundation/iam-client-lib/commit/ad2ed1abdaa94ca9ed40c21ab549bdc0921a326c))

## [6.0.0-alpha.50](https://github.com/energywebfoundation/iam-client-lib/compare/v6.0.0-alpha.49...v6.0.0-alpha.50) (2022-08-08)


### Documentation

* document iam initialization ([1552965](https://github.com/energywebfoundation/iam-client-lib/commit/15529659f004e8695adc48ed8fbfd5254b0737f7))

## [6.0.0-alpha.49](https://github.com/energywebfoundation/iam-client-lib/compare/v6.0.0-alpha.48...v6.0.0-alpha.49) (2022-08-08)


### Bug Fixes

* **did-registry:** optional encoding and algo of public key ([26a239f](https://github.com/energywebfoundation/iam-client-lib/commit/26a239f460363120305c37e8acfcc04a7cee13f1))

## [6.0.0-alpha.48](https://github.com/energywebfoundation/iam-client-lib/compare/v6.0.0-alpha.47...v6.0.0-alpha.48) (2022-08-05)

## [6.0.0-alpha.47](https://github.com/energywebfoundation/iam-client-lib/compare/v6.0.0-alpha.46...v6.0.0-alpha.47) (2022-08-04)


### Bug Fixes

* **exp:** do not use dflt validity period to calculate timestamp if n… ([#623](https://github.com/energywebfoundation/iam-client-lib/issues/623)) ([9ce524d](https://github.com/energywebfoundation/iam-client-lib/commit/9ce524da24ab41df0e0fdaf253abf723fa6f2d89))

## [6.0.0-alpha.46](https://github.com/energywebfoundation/iam-client-lib/compare/v6.0.0-alpha.45...v6.0.0-alpha.46) (2022-08-04)


### Features

* add documentation comments in dist ([cc34e96](https://github.com/energywebfoundation/iam-client-lib/commit/cc34e963e52342259277e2643ac8dc5819df47f8))

## [6.0.0-alpha.45](https://github.com/energywebfoundation/iam-client-lib/compare/v6.0.0-alpha.44...v6.0.0-alpha.45) (2022-07-29)

## [6.0.0-alpha.44](https://github.com/energywebfoundation/iam-client-lib/compare/v6.0.0-alpha.43...v6.0.0-alpha.44) (2022-07-28)


### Features

* **exp:** add explainer for expiration ([5441a4f](https://github.com/energywebfoundation/iam-client-lib/commit/5441a4f3164c87feb85bb8dce3023211c37eccff))
* **exp:** apply prettier formatting ([7261112](https://github.com/energywebfoundation/iam-client-lib/commit/72611120383a4b0ea94cd57ad27c9bde0d9052df))
* **exp:** fix issuerVerified as boolean ([d82eeeb](https://github.com/energywebfoundation/iam-client-lib/commit/d82eeebd1c36105fbf2156b0b04e7ec7487328e4))
* **exp:** remove method for expiration check; decrease test await ([9ae092c](https://github.com/energywebfoundation/iam-client-lib/commit/9ae092cf228862d6886a70ed96c543eeb5128e87))
* **verifyExp:** add documentation; address PR comments ([e7a50a5](https://github.com/energywebfoundation/iam-client-lib/commit/e7a50a5ca4ef7861d63184930be2fcac76b6c089))
* **verifyExp:** add exp verification method and tests for EIP and VP ([7099c09](https://github.com/energywebfoundation/iam-client-lib/commit/7099c0909d785a5c3eb0637542a1644cd5b3ab7d))
* **verifyExp:** remove comment ([1d96490](https://github.com/energywebfoundation/iam-client-lib/commit/1d964906d94637e041d10a1c540a5dfde47d769d))

## [6.0.0-alpha.43](https://github.com/energywebfoundation/iam-client-lib/compare/v6.0.0-alpha.42...v6.0.0-alpha.43) (2022-07-25)


### Bug Fixes

* **claims:** dont reregister onchain claim ([ebd46c0](https://github.com/energywebfoundation/iam-client-lib/commit/ebd46c0b7fbe5f30f1f945891ab90ba1aba57caf))

## [6.0.0-alpha.42](https://github.com/energywebfoundation/iam-client-lib/compare/v6.0.0-alpha.41...v6.0.0-alpha.42) (2022-07-25)


### Bug Fixes

* set check ethr signer for node clients ([#618](https://github.com/energywebfoundation/iam-client-lib/issues/618)) ([c198dc7](https://github.com/energywebfoundation/iam-client-lib/commit/c198dc73c5b7a6a2f092ad2719506a88a062da39))

## [6.0.0-alpha.41](https://github.com/energywebfoundation/iam-client-lib/compare/v6.0.0-alpha.40...v6.0.0-alpha.41) (2022-07-22)


### Features

* adding more details to error log line when http request fails ([#617](https://github.com/energywebfoundation/iam-client-lib/issues/617)) ([e99ceda](https://github.com/energywebfoundation/iam-client-lib/commit/e99cedac0e1ebc66369cfbfced39dce07822aab3))

## [6.0.0-alpha.40](https://github.com/energywebfoundation/iam-client-lib/compare/v6.0.0-alpha.39...v6.0.0-alpha.40) (2022-07-21)


### Features

* **revocation:** add credentialStatus to EIP191JWT ([52fec66](https://github.com/energywebfoundation/iam-client-lib/commit/52fec660c53ac04dbaf5f9aee07004c6ee786064))

## [6.0.0-alpha.39](https://github.com/energywebfoundation/iam-client-lib/compare/v6.0.0-alpha.38...v6.0.0-alpha.39) (2022-07-21)

## [6.0.0-alpha.38](https://github.com/energywebfoundation/iam-client-lib/compare/v6.0.0-alpha.37...v6.0.0-alpha.38) (2022-07-21)


### Features

* handle unexpected did service endpoint ([#610](https://github.com/energywebfoundation/iam-client-lib/issues/610)) ([a360e93](https://github.com/energywebfoundation/iam-client-lib/commit/a360e936bae152b336611a9105dea638af60349d))

## [6.0.0-alpha.37](https://github.com/energywebfoundation/iam-client-lib/compare/v6.0.0-alpha.36...v6.0.0-alpha.37) (2022-07-19)


### Bug Fixes

* **verifiable-credentials:** filter invalid issuer fields ([8c8b0c3](https://github.com/energywebfoundation/iam-client-lib/commit/8c8b0c3196077b0e1fcf8266c84803d38741cdd2))

## [6.0.0-alpha.36](https://github.com/energywebfoundation/iam-client-lib/compare/v6.0.0-alpha.35...v6.0.0-alpha.36) (2022-07-19)

## [6.0.0-alpha.35](https://github.com/energywebfoundation/iam-client-lib/compare/v6.0.0-alpha.34...v6.0.0-alpha.35) (2022-07-19)

## [6.0.0-alpha.34](https://github.com/energywebfoundation/iam-client-lib/compare/v6.0.0-alpha.33...v6.0.0-alpha.34) (2022-07-18)


### Features

* **addStatusToClaim:** add cred status to claim object ([f1f6328](https://github.com/energywebfoundation/iam-client-lib/commit/f1f6328e762b7d48dbf6a2a5dbdd4cca069090c0))

## [6.0.0-alpha.33](https://github.com/energywebfoundation/iam-client-lib/compare/v6.0.0-alpha.32...v6.0.0-alpha.33) (2022-07-18)

## [6.0.0-alpha.32](https://github.com/energywebfoundation/iam-client-lib/compare/v6.0.0-alpha.31...v6.0.0-alpha.32) (2022-07-15)

## [6.0.0-alpha.31](https://github.com/energywebfoundation/iam-client-lib/compare/v6.0.0-alpha.30...v6.0.0-alpha.31) (2022-07-15)


### Features

* **claims:** verify credential status ([b5da79f](https://github.com/energywebfoundation/iam-client-lib/commit/b5da79f74a1f1c86243799c3b42ef60fc6a36b2f))

## [6.0.0-alpha.30](https://github.com/energywebfoundation/iam-client-lib/compare/v6.0.0-alpha.29...v6.0.0-alpha.30) (2022-07-15)

## [6.0.0-alpha.29](https://github.com/energywebfoundation/iam-client-lib/compare/v6.0.0-alpha.28...v6.0.0-alpha.29) (2022-07-13)


### Features

* **verifyVc:** add jsonwebtoken and update package-lock ([81ff25d](https://github.com/energywebfoundation/iam-client-lib/commit/81ff25d6d8af124c5fedd2aa9de29978cfb61626))
* **verifyVc:** add unit tests ([c4390b1](https://github.com/energywebfoundation/iam-client-lib/commit/c4390b1c41ceca5970231ada1618803a290338b2))
* **verifyVC:** add verifyVC method to VC Base Service ([3187e5e](https://github.com/energywebfoundation/iam-client-lib/commit/3187e5e66253f429b9769e20a306ece5255325b5))
* **verifyVC:** make proof private; add error and return types ([0da3229](https://github.com/energywebfoundation/iam-client-lib/commit/0da322967191a75f6d2c57446c1df37ff1c743c4))
* **verifyVc:** remove comments and update test case descriptions ([04f9c9f](https://github.com/energywebfoundation/iam-client-lib/commit/04f9c9f4baebe79903cd0a782c1906f33b0a3bf8))
* **verifyVc:** resolve conflicts and add formatting ([b24f328](https://github.com/energywebfoundation/iam-client-lib/commit/b24f32830e77e582e5a5aa3b436eaa00b1decdfb))
* **verifyVC:** update ew-credentials ([877fad6](https://github.com/energywebfoundation/iam-client-lib/commit/877fad6af609df1baebf17cc9661c862af1095c8))
* **verifyVc:** update ew-credentials version and use to resolve credentials ([cd77eb0](https://github.com/energywebfoundation/iam-client-lib/commit/cd77eb05c526628a582306ecc9affab05461373d))
* **verifyVc:** update method and params ([9800557](https://github.com/energywebfoundation/iam-client-lib/commit/9800557e5ff96e341de069d97c6ee5804ee8a422))
* **verifyVc:** update method documentation ([86e47e1](https://github.com/energywebfoundation/iam-client-lib/commit/86e47e13b5864981284aedc61c90ea4c2008bb46))
* **verifyVc:** update resolve method and add method for offchain verify ([800c903](https://github.com/energywebfoundation/iam-client-lib/commit/800c903339c2cbc3908879816385731d37edef74))
* **verifyVc:** update unit tests ([9d5e7ba](https://github.com/energywebfoundation/iam-client-lib/commit/9d5e7ba7c1c3f2298b083f4d35195a06823075ff))
* **verifyVc:** update unit tests ([eb0c7e0](https://github.com/energywebfoundation/iam-client-lib/commit/eb0c7e07e9872e82b6d4cf431640297d2646ab53))
* **verifyVc:** update verify method name ([e5733c6](https://github.com/energywebfoundation/iam-client-lib/commit/e5733c64a6e3775d88c57cd5dc756912925dcc32))
* **verifyVc:** update verifyOffChainClaim method to accept Claim interface ([3034101](https://github.com/energywebfoundation/iam-client-lib/commit/3034101f37cdbd1d3b64b3fc0540d8996effa589))

## [6.0.0-alpha.28](https://github.com/energywebfoundation/iam-client-lib/compare/v6.0.0-alpha.27...v6.0.0-alpha.28) (2022-07-08)

## [6.0.0-alpha.27](https://github.com/energywebfoundation/iam-client-lib/compare/v6.0.0-alpha.26...v6.0.0-alpha.27) (2022-07-01)


### Features

* claim expieration ([#567](https://github.com/energywebfoundation/iam-client-lib/issues/567)) ([757de5a](https://github.com/energywebfoundation/iam-client-lib/commit/757de5a4458b0864d621cbb41c44f764c87b3b5c))

## [6.0.0-alpha.26](https://github.com/energywebfoundation/iam-client-lib/compare/v6.0.0-alpha.25...v6.0.0-alpha.26) (2022-07-01)

## [6.0.0-alpha.25](https://github.com/energywebfoundation/iam-client-lib/compare/v6.0.0-alpha.24...v6.0.0-alpha.25) (2022-06-29)


### Features

* add documentation ([543494f](https://github.com/energywebfoundation/iam-client-lib/commit/543494fb0a7caa0fe57fd0880cefb13090ea086d))
* apply prettier formatting ([abc5154](https://github.com/energywebfoundation/iam-client-lib/commit/abc5154b1cd9e509fc7f30d8115e9eaf243d94fd))
* **claims:** verify role vc ([b318dbd](https://github.com/energywebfoundation/iam-client-lib/commit/b318dbdc2771165b8bbc215abb02d3f14f2020f1))
* **domain-reader:** refactor domainreader initialisation ([9f7ea6e](https://github.com/energywebfoundation/iam-client-lib/commit/9f7ea6ed79acbb58f95773d1d17272c61312184f))
* types in claims service (EthersProviderIssuerResolver) ([11ac865](https://github.com/energywebfoundation/iam-client-lib/commit/11ac8656440c958df1c8216f7917e6ffce696e26))
* update types and interfaces from ew-credentials ([0ed9855](https://github.com/energywebfoundation/iam-client-lib/commit/0ed98552c3fb98ac08b9a9389cf35d4c3cac2196))


### Bug Fixes

* **addVcVerifier:** add VerifyVCIssuer method ([6052d41](https://github.com/energywebfoundation/iam-client-lib/commit/6052d41bd7fb7d22fbd16910d20d04c3a14381e1))
* **addVcVerifier:** return instance of domain reader ([ce037f4](https://github.com/energywebfoundation/iam-client-lib/commit/ce037f449ef0960129f4cf1f59f1460076f1c9ed))
* **addVcVerifier:** return type for Domain Reader ([84ba78f](https://github.com/energywebfoundation/iam-client-lib/commit/84ba78f82d5bfb6deedb0de366206cd49bd34ef6))
* **addVcVerifier:** update package-lock version ([9eb00ac](https://github.com/energywebfoundation/iam-client-lib/commit/9eb00ac0744acd88f275a9593c37c5ecdddf069e))

## [6.0.0-alpha.24](https://github.com/energywebfoundation/iam-client-lib/compare/v6.0.0-alpha.23...v6.0.0-alpha.24) (2022-06-28)


### Features

* **RevokeClaim:** add endpoint to fetch claims by revoker (current user) ([80cf934](https://github.com/energywebfoundation/iam-client-lib/commit/80cf93485d7f53460ab5df78b37f40fe5eedb4c7))
* **revokeClaim:** make did param required ([b6648d6](https://github.com/energywebfoundation/iam-client-lib/commit/b6648d6549b569fb6a74ccaba8b5c5b970ce7806))

## [6.0.0-alpha.23](https://github.com/energywebfoundation/iam-client-lib/compare/v6.0.0-alpha.22...v6.0.0-alpha.23) (2022-06-28)


### Bug Fixes

* cache client authentication ([619845d](https://github.com/energywebfoundation/iam-client-lib/commit/619845d320833e9adbc330bde5c35f15d735e57d))

## [6.0.0-alpha.22](https://github.com/energywebfoundation/iam-client-lib/compare/v6.0.0-alpha.21...v6.0.0-alpha.22) (2022-06-27)


### Features

* add createdAt property to Claim interface ([c71344d](https://github.com/energywebfoundation/iam-client-lib/commit/c71344d24ba3f99373306ba56cdcd94ed713d59f))

## [6.0.0-alpha.21](https://github.com/energywebfoundation/iam-client-lib/compare/v6.0.0-alpha.20...v6.0.0-alpha.21) (2022-06-23)


### Bug Fixes

* throw an error when a did document update failed ([e7c1ae9](https://github.com/energywebfoundation/iam-client-lib/commit/e7c1ae9b892b9fbfafca6bdbe4c375d40317f1f8))

## [6.0.0-alpha.20](https://github.com/energywebfoundation/iam-client-lib/compare/v6.0.0-alpha.19...v6.0.0-alpha.20) (2022-06-22)


### Bug Fixes

* cache-client token refresh ([05e9f1a](https://github.com/energywebfoundation/iam-client-lib/commit/05e9f1a216f091d412319f8ce2590d5183080e46))

## [6.0.0-alpha.19](https://github.com/energywebfoundation/iam-client-lib/compare/v6.0.0-alpha.18...v6.0.0-alpha.19) (2022-06-20)


### Features

* add method to get claims by revoker to cache client interface ([e24b506](https://github.com/energywebfoundation/iam-client-lib/commit/e24b506a929f5c7ff17df99b6d23dd7b31440efe))

## [6.0.0-alpha.18](https://github.com/energywebfoundation/iam-client-lib/compare/v6.0.0-alpha.17...v6.0.0-alpha.18) (2022-06-17)


### Features

* add credential revocation ([1f8f028](https://github.com/energywebfoundation/iam-client-lib/commit/1f8f0282a38853d3bc6fbbce3e02a028f68749ff))

## [6.0.0-alpha.17](https://github.com/energywebfoundation/iam-client-lib/compare/v6.0.0-alpha.16...v6.0.0-alpha.17) (2022-06-16)


### Bug Fixes

* filter self-signed credential from presDef before sending to PEX ([6d43aeb](https://github.com/energywebfoundation/iam-client-lib/commit/6d43aeb5d7b530461ec92be663b30626e641c9db))

## [6.0.0-alpha.16](https://github.com/energywebfoundation/iam-client-lib/compare/v6.0.0-alpha.15...v6.0.0-alpha.16) (2022-06-14)


### Features

* ens scripts ([d7f0df3](https://github.com/energywebfoundation/iam-client-lib/commit/d7f0df38c5eb0ff1d7b44159b6a83ec606927790))

## [6.0.0-alpha.15](https://github.com/energywebfoundation/iam-client-lib/compare/v6.0.0-alpha.14...v6.0.0-alpha.15) (2022-06-13)

## [6.0.0-alpha.14](https://github.com/energywebfoundation/iam-client-lib/compare/v6.0.0-alpha.13...v6.0.0-alpha.14) (2022-06-03)


### Bug Fixes

* **verifiable-credentials:** check errors in exchange initiating ([1bc8626](https://github.com/energywebfoundation/iam-client-lib/commit/1bc8626f0e97404c7f3edf222955c8c4399adfa8))

## [6.0.0-alpha.13](https://github.com/energywebfoundation/iam-client-lib/compare/v6.0.0-alpha.12...v6.0.0-alpha.13) (2022-06-03)


### Features

* update claim revocation registry address ([effe1d8](https://github.com/energywebfoundation/iam-client-lib/commit/effe1d899d8316005759a2c0050ec4d4c3513d0b))

## [6.0.0-alpha.12](https://github.com/energywebfoundation/iam-client-lib/compare/v6.0.0-alpha.11...v6.0.0-alpha.12) (2022-06-02)


### Bug Fixes

* add vp request to return of initiate exchange ([ddecbaf](https://github.com/energywebfoundation/iam-client-lib/commit/ddecbafe973c19b0acb17abb94fec062bacc5c62))

## [6.0.0-alpha.11](https://github.com/energywebfoundation/iam-client-lib/compare/v6.0.0-alpha.10...v6.0.0-alpha.11) (2022-06-02)


### Bug Fixes

* on-chain claim revocation ([df9eeea](https://github.com/energywebfoundation/iam-client-lib/commit/df9eeea62ed6b05fb13dfec074d52267c5efa335))

## [6.0.0-alpha.10](https://github.com/energywebfoundation/iam-client-lib/compare/v6.0.0-alpha.9...v6.0.0-alpha.10) (2022-06-02)


### Features

* **claims:** add status to vc ([28c556f](https://github.com/energywebfoundation/iam-client-lib/commit/28c556ffa0a9d53561507fdce95817a6672e43f3))
* **verifiable-credentials:** add credential status eip712 type ([d9db01f](https://github.com/energywebfoundation/iam-client-lib/commit/d9db01ffe8cdaec5c7192f2ac134a7941e952555))

## [6.0.0-alpha.9](https://github.com/energywebfoundation/iam-client-lib/compare/v6.0.0-alpha.8...v6.0.0-alpha.9) (2022-06-02)

## [6.0.0-alpha.8](https://github.com/energywebfoundation/iam-client-lib/compare/v6.0.0-alpha.7...v6.0.0-alpha.8) (2022-06-01)

## [6.0.0-alpha.7](https://github.com/energywebfoundation/iam-client-lib/compare/v6.0.0-alpha.6...v6.0.0-alpha.7) (2022-05-31)


### Bug Fixes

* **verifiable-credentials:** check errors on initiating exchange ([bce85a8](https://github.com/energywebfoundation/iam-client-lib/commit/bce85a8eca2a6abc2e89b93c13c44d63fa64bf02))

## [6.0.0-alpha.6](https://github.com/energywebfoundation/iam-client-lib/compare/v6.0.0-alpha.5...v6.0.0-alpha.6) (2022-05-27)


### Bug Fixes

* exchange credential tests grouping ([2b1e674](https://github.com/energywebfoundation/iam-client-lib/commit/2b1e6746169b05756125d37595c5744aea12b8ee))

## [6.0.0-alpha.5](https://github.com/energywebfoundation/iam-client-lib/compare/v6.0.0-alpha.4...v6.0.0-alpha.5) (2022-05-24)


### Features

* **assets:** fix assets service interfaces ([c9c6a87](https://github.com/energywebfoundation/iam-client-lib/commit/c9c6a8742c4389653a6b593261fab784c27b5ff2))


### Bug Fixes

* **domain:** fix domain service interfaces ([50a014e](https://github.com/energywebfoundation/iam-client-lib/commit/50a014ecf8244b9f70cf530f0ea67281b8fd5cee))

## [6.0.0-alpha.4](https://github.com/energywebfoundation/iam-client-lib/compare/v6.0.0-alpha.3...v6.0.0-alpha.4) (2022-05-24)


### Features

* add claim revocation ([2ab1d93](https://github.com/energywebfoundation/iam-client-lib/commit/2ab1d936e7afcc17ac2165272ccb8603412ed1fc))

## [6.0.0-alpha.3](https://github.com/energywebfoundation/iam-client-lib/compare/v6.0.0-alpha.2...v6.0.0-alpha.3) (2022-05-24)


### Features

* **verifiable-credentials:** get credentials by definition ([5f2e7a8](https://github.com/energywebfoundation/iam-client-lib/commit/5f2e7a82d6c61432609f00dc972cc9441f432fcd))

## [6.0.0-alpha.2](https://github.com/energywebfoundation/iam-client-lib/compare/v6.0.0-alpha.1...v6.0.0-alpha.2) (2022-05-20)

## [6.0.0-alpha.1](https://github.com/energywebfoundation/iam-client-lib/compare/v5.1.0-alpha.31...v6.0.0-alpha.1) (2022-05-19)


### ⚠ BREAKING CHANGES

* `VerifiableCredentialsService` is initialized earlier.

### Features

* remove verifiable credentials storage ([9501481](https://github.com/energywebfoundation/iam-client-lib/commit/9501481acd4fc1f11819e3f3564caf82d2f432ce))


### Bug Fixes

* add checking if service endpoint is a CID ([a0b5d1a](https://github.com/energywebfoundation/iam-client-lib/commit/a0b5d1ab44fdbe4551a4c18e1d96fec831676b9b))

## [5.1.0-alpha.31](https://github.com/energywebfoundation/iam-client-lib/compare/v5.1.0-alpha.30...v5.1.0-alpha.31) (2022-05-18)


### Features

* continue credentials exchange ([fd07ba0](https://github.com/energywebfoundation/iam-client-lib/commit/fd07ba0a67611b36f4b5e53ed054bf491e9d0375))

## [5.1.0-alpha.30](https://github.com/energywebfoundation/iam-client-lib/compare/v5.1.0-alpha.29...v5.1.0-alpha.30) (2022-05-17)


### Bug Fixes

* fix backward compatibility for did registry interface ([a24a91c](https://github.com/energywebfoundation/iam-client-lib/commit/a24a91c15f487f48267bf410021d0778e18fdc27))
* retry failed requests on token refresh ([434e262](https://github.com/energywebfoundation/iam-client-lib/commit/434e2621a34bec16e51722e8454e9852ed5daed5))

## [5.1.0-alpha.29](https://github.com/energywebfoundation/iam-client-lib/compare/v5.1.0-alpha.28...v5.1.0-alpha.29) (2022-05-17)

## [5.1.0-alpha.28](https://github.com/energywebfoundation/iam-client-lib/compare/v5.1.0-alpha.27...v5.1.0-alpha.28) (2022-05-16)


### Features

* export logger ([819e67c](https://github.com/energywebfoundation/iam-client-lib/commit/819e67c8f5ab64a137ffdeb2405684c972b0b1c2))

## [5.1.0-alpha.27](https://github.com/energywebfoundation/iam-client-lib/compare/v5.1.0-alpha.26...v5.1.0-alpha.27) (2022-05-16)

## [5.1.0-alpha.26](https://github.com/energywebfoundation/iam-client-lib/compare/v5.1.0-alpha.25...v5.1.0-alpha.26) (2022-05-16)


### Features

* add logs for axios errors ([2fa44c6](https://github.com/energywebfoundation/iam-client-lib/commit/2fa44c627ed2d11b79b566d90986a8c8e7d4d20c))

## [5.1.0-alpha.25](https://github.com/energywebfoundation/iam-client-lib/compare/v5.1.0-alpha.24...v5.1.0-alpha.25) (2022-05-16)


### Features

* **vc:** add verifiable credential expiration date ([e76c66b](https://github.com/energywebfoundation/iam-client-lib/commit/e76c66b1c26b50a7854c3971042fe29ee1224e2e))

## [5.1.0-alpha.24](https://github.com/energywebfoundation/iam-client-lib/compare/v5.1.0-alpha.23...v5.1.0-alpha.24) (2022-05-12)

## [5.1.0-alpha.23](https://github.com/energywebfoundation/iam-client-lib/compare/v5.1.0-alpha.22...v5.1.0-alpha.23) (2022-05-11)

## [5.1.0-alpha.22](https://github.com/energywebfoundation/iam-client-lib/compare/v5.1.0-alpha.21...v5.1.0-alpha.22) (2022-05-11)

## [5.1.0-alpha.21](https://github.com/energywebfoundation/iam-client-lib/compare/v5.1.0-alpha.20...v5.1.0-alpha.21) (2022-05-09)


### Bug Fixes

* don't remove deploy badge ([c216ed8](https://github.com/energywebfoundation/iam-client-lib/commit/c216ed81305bebff6d911850c01d1c537cda9f33))

## [5.1.0-alpha.20](https://github.com/energywebfoundation/iam-client-lib/compare/v5.1.0-alpha.19...v5.1.0-alpha.20) (2022-05-04)


### Bug Fixes

* **claim:** fix claim service issuance interfaces ([4c32a26](https://github.com/energywebfoundation/iam-client-lib/commit/4c32a265f602a10704d70bf7bf51263e8cb14d7b))

## [5.1.0-alpha.19](https://github.com/energywebfoundation/iam-client-lib/compare/v5.1.0-alpha.18...v5.1.0-alpha.19) (2022-05-02)

## [5.1.0-alpha.18](https://github.com/energywebfoundation/iam-client-lib/compare/v5.1.0-alpha.17...v5.1.0-alpha.18) (2022-04-27)

## [5.1.0-alpha.17](https://github.com/energywebfoundation/iam-client-lib/compare/v5.1.0-alpha.16...v5.1.0-alpha.17) (2022-04-25)

## [5.1.0-alpha.16](https://github.com/energywebfoundation/iam-client-lib/compare/v5.1.0-alpha.15...v5.1.0-alpha.16) (2022-04-25)

## [5.1.0-alpha.15](https://github.com/energywebfoundation/iam-client-lib/compare/v5.1.0-alpha.14...v5.1.0-alpha.15) (2022-04-25)

## [5.1.0-alpha.14](https://github.com/energywebfoundation/iam-client-lib/compare/v5.1.0-alpha.13...v5.1.0-alpha.14) (2022-04-22)


### Bug Fixes

* fix delegate token payload ([56bfb1d](https://github.com/energywebfoundation/iam-client-lib/commit/56bfb1dac6d23b3146fee723a1245041701a9928))

## [5.1.0-alpha.13](https://github.com/energywebfoundation/iam-client-lib/compare/v5.1.0-alpha.12...v5.1.0-alpha.13) (2022-04-22)


### Features

* initiate credential exchange ([099eb64](https://github.com/energywebfoundation/iam-client-lib/commit/099eb64b4087d5f3a9b486b5794452410673ee99))

## [5.1.0-alpha.12](https://github.com/energywebfoundation/iam-client-lib/compare/v5.1.0-alpha.11...v5.1.0-alpha.12) (2022-04-21)


### Bug Fixes

* avoid refreshing undefined token ([86bed3c](https://github.com/energywebfoundation/iam-client-lib/commit/86bed3c3bbe3a4ddc10dcc5cbb6f17ae0c21ba2a))

## [5.1.0-alpha.11](https://github.com/energywebfoundation/iam-client-lib/compare/v5.1.0-alpha.10...v5.1.0-alpha.11) (2022-04-21)

## [5.1.0-alpha.10](https://github.com/energywebfoundation/iam-client-lib/compare/v5.1.0-alpha.9...v5.1.0-alpha.10) (2022-04-20)


### Features

* **assets:** get asset owner ([1eb4832](https://github.com/energywebfoundation/iam-client-lib/commit/1eb48322b2736f0819366eef07a6fabb6cf8ff11))

## [5.1.0-alpha.9](https://github.com/energywebfoundation/iam-client-lib/compare/v5.1.0-alpha.8...v5.1.0-alpha.9) (2022-04-20)


### Features

* **docs:** quick start ([cd85c17](https://github.com/energywebfoundation/iam-client-lib/commit/cd85c1718a372509594db944fe6eb9d3beba667b))


### Bug Fixes

* **docs:** architecture ([f7daa96](https://github.com/energywebfoundation/iam-client-lib/commit/f7daa9688360350b2c797170328dbb1ed0b130e7))
* **docs:** guides ([627bc88](https://github.com/energywebfoundation/iam-client-lib/commit/627bc887dc7186ff531932a6619ed4020bb0d725))
* set index page for readthedocs ([f6b4a49](https://github.com/energywebfoundation/iam-client-lib/commit/f6b4a498e1af22d731f6a5636a808d7b196d2c27))

## [5.1.0-alpha.8](https://github.com/energywebfoundation/iam-client-lib/compare/v5.1.0-alpha.7...v5.1.0-alpha.8) (2022-04-20)


### Features

* authorize issuer ([7e8b864](https://github.com/energywebfoundation/iam-client-lib/commit/7e8b86480b81cc0d0f76588146c28271552ad589))

## [5.1.0-alpha.7](https://github.com/energywebfoundation/iam-client-lib/compare/v5.1.0-alpha.6...v5.1.0-alpha.7) (2022-04-19)

## [5.1.0-alpha.6](https://github.com/energywebfoundation/iam-client-lib/compare/v5.1.0-alpha.5...v5.1.0-alpha.6) (2022-04-12)


### Features

* **claim:** issue VC when approving role request ([a3eefbc](https://github.com/energywebfoundation/iam-client-lib/commit/a3eefbc243f39f5392f7918b1cdb4e782faf8001))

## [5.1.0-alpha.5](https://github.com/energywebfoundation/iam-client-lib/compare/v5.1.0-alpha.4...v5.1.0-alpha.5) (2022-04-12)


### Bug Fixes

* **claim:** fix public claim publishing ([d77df34](https://github.com/energywebfoundation/iam-client-lib/commit/d77df340c4a1b204ee9fe23c2d71ea4b17074391))

## [5.1.0-alpha.4](https://github.com/energywebfoundation/iam-client-lib/compare/v5.1.0-alpha.3...v5.1.0-alpha.4) (2022-04-08)


### Features

* verifiable credential poc ([a7f8df7](https://github.com/energywebfoundation/iam-client-lib/commit/a7f8df759f1bae954b19ac80c526aa3608551079))
* verifiable presentation poc ([a4732e3](https://github.com/energywebfoundation/iam-client-lib/commit/a4732e36ee9b4034a0986d0d99f550c4166eb98d))

## [5.1.0-alpha.3](https://github.com/energywebfoundation/iam-client-lib/compare/v5.1.0-alpha.2...v5.1.0-alpha.3) (2022-04-07)

## [5.1.0-alpha.2](https://github.com/energywebfoundation/iam-client-lib/compare/v5.1.0-alpha.1...v5.1.0-alpha.2) (2022-04-05)

## [5.1.0-alpha.1](https://github.com/energywebfoundation/iam-client-lib/compare/v5.0.0...v5.1.0-alpha.1) (2022-04-05)


### Features

* **domains:** add MulticallTx type ([3be1e6f](https://github.com/energywebfoundation/iam-client-lib/commit/3be1e6fb7435d3fc6a76c3772c668f7fe4ee5eca))

## [5.0.0](https://github.com/energywebfoundation/iam-client-lib/compare/v4.2.0...v5.0.0) (2022-04-01)


### ⚠ BREAKING CHANGES

* **claims:** backward compatible 'fields' props have been removed. Use 'requestorFields' instead

### Features

* add claim request origin to `Claim` interface ([0b5be66](https://github.com/energywebfoundation/iam-client-lib/commit/0b5be66172b0a66383cec60828238eb13085c7d8))
* **claims:** remove deprecated 'fields' property ([c2e4018](https://github.com/energywebfoundation/iam-client-lib/commit/c2e401818212e6dcf2e9f2807c1e70f310e3ed4a))
* **claimsService:** get published offchain claims ([f126882](https://github.com/energywebfoundation/iam-client-lib/commit/f126882ddf14951012162f4b283d9f23e5aca3d0))
* **core:** custom logger ([4ef8f49](https://github.com/energywebfoundation/iam-client-lib/commit/4ef8f49ffdbd2a419e8d9544ce6ba1e68c59b393))
* **did:** ts interface checker to validate did update request ([a0bfeeb](https://github.com/energywebfoundation/iam-client-lib/commit/a0bfeeb5a1e98537931e35e6cb24ca963c149007))


### Bug Fixes

* first level domains update ([c4d0c62](https://github.com/energywebfoundation/iam-client-lib/commit/c4d0c6229a4d1c60c4e134d4a53ffe3c9df4c7dc))

## [5.0.0-alpha.10](https://github.com/energywebfoundation/iam-client-lib/compare/v5.0.0-alpha.9...v5.0.0-alpha.10) (2022-04-01)

## [5.0.0-alpha.9](https://github.com/energywebfoundation/iam-client-lib/compare/v5.0.0-alpha.8...v5.0.0-alpha.9) (2022-03-31)

## [5.0.0-alpha.8](https://github.com/energywebfoundation/iam-client-lib/compare/v5.0.0-alpha.7...v5.0.0-alpha.8) (2022-03-29)


### Features

* **core:** custom logger ([4ef8f49](https://github.com/energywebfoundation/iam-client-lib/commit/4ef8f49ffdbd2a419e8d9544ce6ba1e68c59b393))

## [5.0.0-alpha.7](https://github.com/energywebfoundation/iam-client-lib/compare/v5.0.0-alpha.6...v5.0.0-alpha.7) (2022-03-22)

## [5.0.0-alpha.6](https://github.com/energywebfoundation/iam-client-lib/compare/v5.0.0-alpha.5...v5.0.0-alpha.6) (2022-03-18)

## [5.0.0-alpha.5](https://github.com/energywebfoundation/iam-client-lib/compare/v5.0.0-alpha.4...v5.0.0-alpha.5) (2022-03-17)


### Features

* **claimsService:** get published offchain claims ([f126882](https://github.com/energywebfoundation/iam-client-lib/commit/f126882ddf14951012162f4b283d9f23e5aca3d0))

## [5.0.0-alpha.4](https://github.com/energywebfoundation/iam-client-lib/compare/v5.0.0-alpha.3...v5.0.0-alpha.4) (2022-03-15)

## [5.0.0-alpha.3](https://github.com/energywebfoundation/iam-client-lib/compare/v5.0.0-alpha.2...v5.0.0-alpha.3) (2022-03-15)


### Features

* **did:** ts interface checker to validate did update request ([a0bfeeb](https://github.com/energywebfoundation/iam-client-lib/commit/a0bfeeb5a1e98537931e35e6cb24ca963c149007))

## [5.0.0-alpha.2](https://github.com/energywebfoundation/iam-client-lib/compare/v5.0.0-alpha.1...v5.0.0-alpha.2) (2022-03-14)


### Features

* add claim request origin to `Claim` interface ([0b5be66](https://github.com/energywebfoundation/iam-client-lib/commit/0b5be66172b0a66383cec60828238eb13085c7d8))

## [5.0.0-alpha.1](https://github.com/energywebfoundation/iam-client-lib/compare/v4.2.1-alpha.4...v5.0.0-alpha.1) (2022-03-09)


### ⚠ BREAKING CHANGES

* **claims:** backward compatible 'fields' props have been removed. Use 'requestorFields' instead

### Features

* **claims:** remove deprecated 'fields' property ([c2e4018](https://github.com/energywebfoundation/iam-client-lib/commit/c2e401818212e6dcf2e9f2807c1e70f310e3ed4a))

### [4.2.1-alpha.4](https://github.com/energywebfoundation/iam-client-lib/compare/v4.2.1-alpha.3...v4.2.1-alpha.4) (2022-03-08)

### [4.2.1-alpha.3](https://github.com/energywebfoundation/iam-client-lib/compare/v4.2.1-alpha.2...v4.2.1-alpha.3) (2022-03-04)


### Bug Fixes

* first level domains update ([c4d0c62](https://github.com/energywebfoundation/iam-client-lib/commit/c4d0c6229a4d1c60c4e134d4a53ffe3c9df4c7dc))

### [4.2.1-alpha.2](https://github.com/energywebfoundation/iam-client-lib/compare/v4.2.1-alpha.1...v4.2.1-alpha.2) (2022-03-04)

### [4.2.1-alpha.1](https://github.com/energywebfoundation/iam-client-lib/compare/v4.2.0...v4.2.1-alpha.1) (2022-03-03)

## [4.2.0](https://github.com/energywebfoundation/iam-client-lib/compare/v4.1.0...v4.2.0) (2022-03-02)


### Features

* **did:** getters and setters to DID publicKey, delegate, claims ([262f330](https://github.com/energywebfoundation/iam-client-lib/commit/262f330dfb37f49d3b5e088d75834c549f9cb9d2))
* **did:** renamed readServices to getServices for consistency ([33faaa4](https://github.com/energywebfoundation/iam-client-lib/commit/33faaa475111404501d897c06c8561b51b70eb51))
* upgrade resolver to v2 ([f708e40](https://github.com/energywebfoundation/iam-client-lib/commit/f708e4063ca46a055bc3a9bab49f4d9ae29b9bee))

## [4.2.0-alpha.3](https://github.com/energywebfoundation/iam-client-lib/compare/v4.2.0-alpha.2...v4.2.0-alpha.3) (2022-03-02)

## [4.2.0-alpha.2](https://github.com/energywebfoundation/iam-client-lib/compare/v4.2.0-alpha.1...v4.2.0-alpha.2) (2022-03-01)


### Features

* **did:** getters and setters to DID publicKey, delegate, claims ([262f330](https://github.com/energywebfoundation/iam-client-lib/commit/262f330dfb37f49d3b5e088d75834c549f9cb9d2))
* **did:** renamed readServices to getServices for consistency ([33faaa4](https://github.com/energywebfoundation/iam-client-lib/commit/33faaa475111404501d897c06c8561b51b70eb51))

## [4.2.0-alpha.1](https://github.com/energywebfoundation/iam-client-lib/compare/v4.1.0...v4.2.0-alpha.1) (2022-02-28)


### Features

* upgrade resolver to v2 ([f708e40](https://github.com/energywebfoundation/iam-client-lib/commit/f708e4063ca46a055bc3a9bab49f4d9ae29b9bee))

## [4.1.0](https://github.com/energywebfoundation/iam-client-lib/compare/v4.0.1...v4.1.0) (2022-02-28)


### ⚠ BREAKING CHANGES

* **staking:** StakingService is obsolete

### Features

* **claims:** enable on chain enrolment without previous request ([b80446d](https://github.com/energywebfoundation/iam-client-lib/commit/b80446da278d7435d98723ef8f1bede5b4aa22d2))
* **claims:** made accetpedBy and onChainProof requred for registerOnchain ([3db931b](https://github.com/energywebfoundation/iam-client-lib/commit/3db931b974a9074aaff956556ac0811188141808))
* **claims:** refactor towards unify off-chain and on-chain registration ([57151bf](https://github.com/energywebfoundation/iam-client-lib/commit/57151bf6d0cb193f814df60376ba2db921e53cf6))
* **config:** add default EWC messaging config ([e225e4e](https://github.com/energywebfoundation/iam-client-lib/commit/e225e4ece6fc29f166d22a52a5126317cb6a47e1))
* **config:** update default volta chain config ([69b3763](https://github.com/energywebfoundation/iam-client-lib/commit/69b37635daced08f5a92dcba9d9a85ff77a8cd28))
* get EWC chain config from `iam-contracts` ([32236d0](https://github.com/energywebfoundation/iam-client-lib/commit/32236d0cdbddd961cb19d43aab4679800acbb756))
* migrate definitions to resolver_v2 ([fdf373c](https://github.com/energywebfoundation/iam-client-lib/commit/fdf373cda22b6ea06189b7bae0d718b6b66b777b))
* **roles:** requestorFields in setRoleDefinition ([afac516](https://github.com/energywebfoundation/iam-client-lib/commit/afac51654325cd9383ae15951f798ed8bf7d05a6))


### Bug Fixes

* adopt correct role, app, org interfaces ([b1141eb](https://github.com/energywebfoundation/iam-client-lib/commit/b1141eb93ef99acd5637a47960d2c7fc6223231b))
* apply patches by git command ([9f00e68](https://github.com/energywebfoundation/iam-client-lib/commit/9f00e68445a631cca61e1ee4d377f460744f9397))
* **cache.config:** default for volta should be staging ([111d440](https://github.com/energywebfoundation/iam-client-lib/commit/111d44081a4dec67156ecfc384ccef8842711aca))
* change return type for `getAllowedRolesByIssuer` ([742f744](https://github.com/energywebfoundation/iam-client-lib/commit/742f744004e2e69bd5141adfa9fabe0a03511381))
* **claim:** fix issuing a claim with on-chain and off-chain request ([6d30ae1](https://github.com/energywebfoundation/iam-client-lib/commit/6d30ae10b60913f4311c4ceb1569e8ecb8b7a4f9))
* **core:** requestor fields typo fix ([0e7ea17](https://github.com/energywebfoundation/iam-client-lib/commit/0e7ea177bff52bfbf1cf2f2ba943745fad4f71f3))
* **core:** requestor fields typo fix ([85400d6](https://github.com/energywebfoundation/iam-client-lib/commit/85400d6f2403b2cbf2dfbfbc0d814db16c571403))
* **docs:** add breaking changes v4.1 logs ([5761ccb](https://github.com/energywebfoundation/iam-client-lib/commit/5761ccbbf2bbc8e42775876db6155e0a95815086))
* fix role, app, org interfaces ([ab3dea2](https://github.com/energywebfoundation/iam-client-lib/commit/ab3dea253d957757e09fdc7b2d87de98a3c41a7f))
* revert postinstall script with `patch-package` ([99f889f](https://github.com/energywebfoundation/iam-client-lib/commit/99f889f7be5f57790ca578eb4218eabf4dae8a24))
* setup nats connection options ([5d65ab6](https://github.com/energywebfoundation/iam-client-lib/commit/5d65ab6a0ad1b256bbf82e7e5ce258ad3fdd839f))
* **signer:** convert local strorage isEthSigner to boolean ([187f2e9](https://github.com/energywebfoundation/iam-client-lib/commit/187f2e9e83b39128a0fe761d3d93e1029ad6fdd4))
* **tests:** changes in e2e tests ([5087651](https://github.com/energywebfoundation/iam-client-lib/commit/5087651c89b5ed914bc139216d456fef8b0e15e3))
* update string role version to int ([2365d96](https://github.com/energywebfoundation/iam-client-lib/commit/2365d96c5431669691d7956f2685c88361d42d19))


### Code Refactoring

* **staking:** clean old staking ([697ff51](https://github.com/energywebfoundation/iam-client-lib/commit/697ff5121c619961b51cca9277db00c5cfc16399))

## [4.1.0-alpha.36](https://github.com/energywebfoundation/iam-client-lib/compare/v4.1.0-alpha.35...v4.1.0-alpha.36) (2022-02-28)


### Bug Fixes

* **cache.config:** default for volta should be staging ([111d440](https://github.com/energywebfoundation/iam-client-lib/commit/111d44081a4dec67156ecfc384ccef8842711aca))

## [4.1.0-alpha.35](https://github.com/energywebfoundation/iam-client-lib/compare/v4.1.0-alpha.34...v4.1.0-alpha.35) (2022-02-25)

## [4.1.0-alpha.34](https://github.com/energywebfoundation/iam-client-lib/compare/v4.1.0-alpha.33...v4.1.0-alpha.34) (2022-02-25)

## [4.1.0-alpha.33](https://github.com/energywebfoundation/iam-client-lib/compare/v4.1.0-alpha.32...v4.1.0-alpha.33) (2022-02-25)

## [4.1.0-alpha.32](https://github.com/energywebfoundation/iam-client-lib/compare/v4.1.0-alpha.31...v4.1.0-alpha.32) (2022-02-25)

## [4.1.0-alpha.31](https://github.com/energywebfoundation/iam-client-lib/compare/v4.1.0-alpha.30...v4.1.0-alpha.31) (2022-02-24)

## [4.1.0-alpha.30](https://github.com/energywebfoundation/iam-client-lib/compare/v4.1.0-alpha.29...v4.1.0-alpha.30) (2022-02-24)


### Bug Fixes

* apply patches by git command ([9f00e68](https://github.com/energywebfoundation/iam-client-lib/commit/9f00e68445a631cca61e1ee4d377f460744f9397))

## [4.1.0-alpha.29](https://github.com/energywebfoundation/iam-client-lib/compare/v4.1.0-alpha.28...v4.1.0-alpha.29) (2022-02-23)

## [4.1.0-alpha.28](https://github.com/energywebfoundation/iam-client-lib/compare/v4.1.0-alpha.27...v4.1.0-alpha.28) (2022-02-23)


### Bug Fixes

* revert postinstall script with `patch-package` ([99f889f](https://github.com/energywebfoundation/iam-client-lib/commit/99f889f7be5f57790ca578eb4218eabf4dae8a24))
* update string role version to int ([2365d96](https://github.com/energywebfoundation/iam-client-lib/commit/2365d96c5431669691d7956f2685c88361d42d19))

## [4.1.0-alpha.27](https://github.com/energywebfoundation/iam-client-lib/compare/v4.1.0-alpha.26...v4.1.0-alpha.27) (2022-02-22)

## [4.1.0-alpha.26](https://github.com/energywebfoundation/iam-client-lib/compare/v4.1.0-alpha.25...v4.1.0-alpha.26) (2022-02-22)

# [4.1.0-alpha.25](https://github.com/energywebfoundation/iam-client-lib/compare/v4.1.0-alpha.24...v4.1.0-alpha.25) (2022-02-22)

# [4.1.0-alpha.24](https://github.com/energywebfoundation/iam-client-lib/compare/v4.1.0-alpha.23...v4.1.0-alpha.24) (2022-02-22)

# [4.1.0-alpha.23](https://github.com/energywebfoundation/iam-client-lib/compare/v4.1.0-alpha.22...v4.1.0-alpha.23) (2022-02-22)


### Features

* migrate definitions to resolver_v2 ([fdf373c](https://github.com/energywebfoundation/iam-client-lib/commit/fdf373cda22b6ea06189b7bae0d718b6b66b777b))

# [4.1.0-alpha.22](https://github.com/energywebfoundation/iam-client-lib/compare/v4.1.0-alpha.21...v4.1.0-alpha.22) (2022-02-22)

# [4.1.0-alpha.21](https://github.com/energywebfoundation/iam-client-lib/compare/v4.1.0-alpha.20...v4.1.0-alpha.21) (2022-02-21)

# [4.1.0-alpha.20](https://github.com/energywebfoundation/iam-client-lib/compare/v4.1.0-alpha.19...v4.1.0-alpha.20) (2022-02-18)

# [4.1.0-alpha.19](https://github.com/energywebfoundation/iam-client-lib/compare/v4.1.0-alpha.18...v4.1.0-alpha.19) (2022-02-18)

# [4.1.0-alpha.18](https://github.com/energywebfoundation/iam-client-lib/compare/v4.1.0-alpha.17...v4.1.0-alpha.18) (2022-02-18)


### Bug Fixes

* **core:** requestor fields typo fix ([0e7ea17](https://github.com/energywebfoundation/iam-client-lib/commit/0e7ea177bff52bfbf1cf2f2ba943745fad4f71f3))

# [4.1.0-alpha.17](https://github.com/energywebfoundation/iam-client-lib/compare/v4.1.0-alpha.16...v4.1.0-alpha.17) (2022-02-17)


### Features

* **config:** add default EWC messaging config ([e225e4e](https://github.com/energywebfoundation/iam-client-lib/commit/e225e4ece6fc29f166d22a52a5126317cb6a47e1))
* **config:** update default volta chain config ([69b3763](https://github.com/energywebfoundation/iam-client-lib/commit/69b37635daced08f5a92dcba9d9a85ff77a8cd28))

# [4.1.0-alpha.16](https://github.com/energywebfoundation/iam-client-lib/compare/v4.1.0-alpha.15...v4.1.0-alpha.16) (2022-02-16)


### Bug Fixes

* **core:** requestor fields typo fix ([85400d6](https://github.com/energywebfoundation/iam-client-lib/commit/85400d6f2403b2cbf2dfbfbc0d814db16c571403))

# [4.1.0-alpha.15](https://github.com/energywebfoundation/iam-client-lib/compare/v4.1.0-alpha.14...v4.1.0-alpha.15) (2022-02-16)

# [4.1.0-alpha.14](https://github.com/energywebfoundation/iam-client-lib/compare/v4.1.0-alpha.13...v4.1.0-alpha.14) (2022-02-14)


### Features

* get EWC chain config from `iam-contracts` ([32236d0](https://github.com/energywebfoundation/iam-client-lib/commit/32236d0cdbddd961cb19d43aab4679800acbb756))

# [4.1.0-alpha.13](https://github.com/energywebfoundation/iam-client-lib/compare/v4.1.0-alpha.12...v4.1.0-alpha.13) (2022-02-11)


### Features

* **roles:** requestorFields in setRoleDefinition ([afac516](https://github.com/energywebfoundation/iam-client-lib/commit/afac51654325cd9383ae15951f798ed8bf7d05a6))

# [4.1.0-alpha.12](https://github.com/energywebfoundation/iam-client-lib/compare/v4.1.0-alpha.11...v4.1.0-alpha.12) (2022-02-10)

# [4.1.0-alpha.11](https://github.com/energywebfoundation/iam-client-lib/compare/v4.1.0-alpha.10...v4.1.0-alpha.11) (2022-02-10)

# [4.1.0-alpha.10](https://github.com/energywebfoundation/iam-client-lib/compare/v4.1.0-alpha.9...v4.1.0-alpha.10) (2022-02-09)


### Bug Fixes

* change return type for `getAllowedRolesByIssuer` ([742f744](https://github.com/energywebfoundation/iam-client-lib/commit/742f744004e2e69bd5141adfa9fabe0a03511381))

# [4.1.0-alpha.9](https://github.com/energywebfoundation/iam-client-lib/compare/v4.1.0-alpha.8...v4.1.0-alpha.9) (2022-02-08)


### Bug Fixes

* adopt correct role, app, org interfaces ([b1141eb](https://github.com/energywebfoundation/iam-client-lib/commit/b1141eb93ef99acd5637a47960d2c7fc6223231b))

# [4.1.0-alpha.8](https://github.com/energywebfoundation/iam-client-lib/compare/v4.1.0-alpha.7...v4.1.0-alpha.8) (2022-02-02)


### Bug Fixes

* **docs:** add breaking changes v4.1 logs ([5761ccb](https://github.com/energywebfoundation/iam-client-lib/commit/5761ccbbf2bbc8e42775876db6155e0a95815086))

# [4.1.0-alpha.7](https://github.com/energywebfoundation/iam-client-lib/compare/v4.1.0-alpha.6...v4.1.0-alpha.7) (2022-02-01)


### Code Refactoring

* **staking:** clean old staking ([697ff51](https://github.com/energywebfoundation/iam-client-lib/commit/697ff5121c619961b51cca9277db00c5cfc16399))


### BREAKING CHANGES

* **staking:** StakingService is obsolete

# [4.1.0-alpha.6](https://github.com/energywebfoundation/iam-client-lib/compare/v4.1.0-alpha.5...v4.1.0-alpha.6) (2022-02-01)


### Bug Fixes

* fix role, app, org interfaces ([ab3dea2](https://github.com/energywebfoundation/iam-client-lib/commit/ab3dea253d957757e09fdc7b2d87de98a3c41a7f))

# [4.1.0-alpha.5](https://github.com/energywebfoundation/iam-client-lib/compare/v4.1.0-alpha.4...v4.1.0-alpha.5) (2022-02-01)

# [4.1.0-alpha.4](https://github.com/energywebfoundation/iam-client-lib/compare/v4.1.0-alpha.3...v4.1.0-alpha.4) (2022-01-31)

# [4.1.0-alpha.3](https://github.com/energywebfoundation/iam-client-lib/compare/v4.1.0-alpha.2...v4.1.0-alpha.3) (2022-01-31)


### Bug Fixes

* **signer:** convert local strorage isEthSigner to boolean ([187f2e9](https://github.com/energywebfoundation/iam-client-lib/commit/187f2e9e83b39128a0fe761d3d93e1029ad6fdd4))

# [4.1.0-alpha.2](https://github.com/energywebfoundation/iam-client-lib/compare/v4.1.0-alpha.1...v4.1.0-alpha.2) (2022-01-31)

# [4.1.0-alpha.1](https://github.com/energywebfoundation/iam-client-lib/compare/v4.0.2-alpha.5...v4.1.0-alpha.1) (2022-01-26)


### Bug Fixes

* **tests:** changes in e2e tests ([5087651](https://github.com/energywebfoundation/iam-client-lib/commit/5087651c89b5ed914bc139216d456fef8b0e15e3))


### Features

* **claims:** enable on chain enrolment without previous request ([b80446d](https://github.com/energywebfoundation/iam-client-lib/commit/b80446da278d7435d98723ef8f1bede5b4aa22d2))
* **claims:** made acceptedBy and onChainProof requred for registerOnchain ([3db931b](https://github.com/energywebfoundation/iam-client-lib/commit/3db931b974a9074aaff956556ac0811188141808))
* **claims:** refactor towards unify off-chain and on-chain registration ([57151bf](https://github.com/energywebfoundation/iam-client-lib/commit/57151bf6d0cb193f814df60376ba2db921e53cf6))


### BREAKING CHANGES

* `claim` parameter of `registerOnChain` is extended with `subject`, `claimType` and `claimTypeVersion` optional properties, which should be specified when `token` is not 
* argument of `issueClaim` is extended with `registrationTypes` by default set to `[RegistrationTypes.OffChain]` and required `subject`
* argument of `publishPublicClaim` is extended with `registrationTypes` by default set to `[RegistrationTypes.OffChain]` and property `claim: {token?: string; claimType?: string}`

## [4.0.2-alpha.5](https://github.com/energywebfoundation/iam-client-lib/compare/v4.0.2-alpha.4...v4.0.2-alpha.5) (2022-01-26)

## [4.0.2-alpha.4](https://github.com/energywebfoundation/iam-client-lib/compare/v4.0.2-alpha.3...v4.0.2-alpha.4) (2022-01-26)


### Bug Fixes

* **claim:** fix issuing a claim with on-chain and off-chain request ([6d30ae1](https://github.com/energywebfoundation/iam-client-lib/commit/6d30ae10b60913f4311c4ceb1569e8ecb8b7a4f9))

## [4.0.2-alpha.3](https://github.com/energywebfoundation/iam-client-lib/compare/v4.0.2-alpha.2...v4.0.2-alpha.3) (2022-01-25)

## [4.0.2-alpha.2](https://github.com/energywebfoundation/iam-client-lib/compare/v4.0.2-alpha.1...v4.0.2-alpha.2) (2022-01-20)


### Bug Fixes

* setup nats connection options ([5d65ab6](https://github.com/energywebfoundation/iam-client-lib/commit/5d65ab6a0ad1b256bbf82e7e5ce258ad3fdd839f))

## [4.0.2-alpha.1](https://github.com/energywebfoundation/iam-client-lib/compare/v4.0.1...v4.0.2-alpha.1) (2022-01-19)

## [4.0.1](https://github.com/energywebfoundation/iam-client-lib/compare/v4.0.0...v4.0.1) (2022-01-19)


### Bug Fixes

* **ci:** fetch latest master before merge ([47fee38](https://github.com/energywebfoundation/iam-client-lib/commit/47fee38c9ab818785e0c08de24bd68efb51100ec))
* **didRegistry:** update asset document ([f219a5e](https://github.com/energywebfoundation/iam-client-lib/commit/f219a5e32b7dc6174fa6e87726d74c2189b01f34))

## [4.0.1-alpha.4](https://github.com/energywebfoundation/iam-client-lib/compare/v4.0.1-alpha.3...v4.0.1-alpha.4) (2022-01-18)


### Bug Fixes

* **didRegistry:** update asset document ([f219a5e](https://github.com/energywebfoundation/iam-client-lib/commit/f219a5e32b7dc6174fa6e87726d74c2189b01f34))

## [4.0.1-alpha.3](https://github.com/energywebfoundation/iam-client-lib/compare/v4.0.1-alpha.2...v4.0.1-alpha.3) (2022-01-17)

## [4.0.1-alpha.2](https://github.com/energywebfoundation/iam-client-lib/compare/v4.0.1-alpha.1...v4.0.1-alpha.2) (2022-01-14)

## [4.0.1-alpha.1](https://github.com/energywebfoundation/iam-client-lib/compare/v4.0.0...v4.0.1-alpha.1) (2022-01-14)


### Bug Fixes

* **ci:** fetch latest master before merge ([47fee38](https://github.com/energywebfoundation/iam-client-lib/commit/47fee38c9ab818785e0c08de24bd68efb51100ec))

# [4.0.0](https://github.com/energywebfoundation/iam-client-lib/compare/v3.2.0...v4.0.0) (2022-01-14)


### Bug Fixes

* **test:** expect requestorField in claim ([a5fe8af](https://github.com/energywebfoundation/iam-client-lib/commit/a5fe8af7d6769f28aff1d46e73cec1d78031b774))
* disable staking pool initialization ([78c7815](https://github.com/energywebfoundation/iam-client-lib/commit/78c781512df09e5d91f575034856450fe40f6698))
* ensure eth_sign signature ([5b4dec3](https://github.com/energywebfoundation/iam-client-lib/commit/5b4dec39f66dd642936bb0e8ef533f199b0f59f7))
* revert config changes from dev to volta ([adafda4](https://github.com/energywebfoundation/iam-client-lib/commit/adafda4f44ebf4aa6c08f99909c1f5048693ac1c))
* **assets:** rollback asset event type to uppercase ([52359cd](https://github.com/energywebfoundation/iam-client-lib/commit/52359cd01bce95ae778b8ddf345e66880070e839))
* **assets:** rollback asset event type to uppercase ([4b1b314](https://github.com/energywebfoundation/iam-client-lib/commit/4b1b3144c39c0e7c70a0bf7ee399ee26dd71081b))
* **build:** use github token for pr in dev ([6e83292](https://github.com/energywebfoundation/iam-client-lib/commit/6e832926ccfccef644aa5b4514e94e517d560623))
* **cache:** separate failed test reloging from unauthenticated ([d07a084](https://github.com/energywebfoundation/iam-client-lib/commit/d07a0849f4cdbfe6ea420c06231a659ed695eeb3))
* **cacheClient:** recalculate identity token on login ([aaaf929](https://github.com/energywebfoundation/iam-client-lib/commit/aaaf9291ffa5e679b14bd8c215731442104a95c9))
* **cacheClient:** set auth header ([ba9e870](https://github.com/energywebfoundation/iam-client-lib/commit/ba9e8703fb275b6cd2b0d50c50cabff2e0431fda))
* **cacheClient:** test cache login ([dec430f](https://github.com/energywebfoundation/iam-client-lib/commit/dec430f0e5d2f334eb77a0d809f7b0a408d8c4c1))
* **cacheClient:** trigging release of previous commit ([c1445f6](https://github.com/energywebfoundation/iam-client-lib/commit/c1445f65f23f3d1dc5587c21d5409ec66c9cef60))
* **ci:** set secret for develop publish ([97f94c8](https://github.com/energywebfoundation/iam-client-lib/commit/97f94c8aea9fd60597eedf5adfeb9b2a854091bf))
* **ci:** set secret to publish develop ([83889cc](https://github.com/energywebfoundation/iam-client-lib/commit/83889cc653ed6e70a55bc7856e476c9043f950dc))
* **claim:** register with issuer ([6ad22df](https://github.com/energywebfoundation/iam-client-lib/commit/6ad22df243995f3d6410ab40cf1ab4599a1cf3c4))
* **claim:** stripped fields from issueClaim function ([b4bf01e](https://github.com/energywebfoundation/iam-client-lib/commit/b4bf01ec8015c6ac4604b93767b331842199f36e))
* **claims:** enrich claim request with type and version ([a633530](https://github.com/energywebfoundation/iam-client-lib/commit/a63353051d4afe51ff27bf1a5a38f468b4ffe1cf))
* **claims:** remove fields from claims ([8a0c91b](https://github.com/energywebfoundation/iam-client-lib/commit/8a0c91b7704b07bc167df001e3bef74be0ddf63e))
* **did:** verify public claim ([f0df566](https://github.com/energywebfoundation/iam-client-lib/commit/f0df5667da0cc9c11c2c63d8c83e585e6690d8ae))
* **didRegistry:** update owned document ([7f69fdb](https://github.com/energywebfoundation/iam-client-lib/commit/7f69fdbb69b0380a4d9bfa41d76613b1c0b1dc51))
* **domains.service:** remove addressOf from owner param ([2458507](https://github.com/energywebfoundation/iam-client-lib/commit/24585076952e7f2e366e62802011d252be41c4fe))
* **domainsService:** save chain id ([6e4255a](https://github.com/energywebfoundation/iam-client-lib/commit/6e4255a8ca88a8ac442d0ff9ca037c3794b7ebeb))
* **issuerFields:** fix to issuerFields on publishPublicClaim ([f3b32f9](https://github.com/energywebfoundation/iam-client-lib/commit/f3b32f9602da70827ed24472e55f8c56ee4f4c36))
* **jest:** make work of the npm test:watch and test:watch:windows ([6a799b5](https://github.com/energywebfoundation/iam-client-lib/commit/6a799b5e9a7605c037e8a0c1364fa69499813cc3))
* **messaging:** subsribe to channels from claims channel ([4788a97](https://github.com/energywebfoundation/iam-client-lib/commit/4788a9782efda7be2e6ccc55bc6f30ad5b83fcbb))
* **nats:** changed subject mask to ensure all events for did are captured ([3959f54](https://github.com/energywebfoundation/iam-client-lib/commit/3959f54707fde3dc5177600eaf398014bda9eeee))
* **nats:** fix http to ws replacement ([17de265](https://github.com/energywebfoundation/iam-client-lib/commit/17de2654d3f8d3918394329588e3ad824813fc3b))
* **nats:** fix http to ws replacement ([af16531](https://github.com/energywebfoundation/iam-client-lib/commit/af16531e1afb7d39c49628341ea83c8c5830f01c))
* disable staking-pool tests ([e6af3bb](https://github.com/energywebfoundation/iam-client-lib/commit/e6af3bbf5627cb030e984a35abc19fc47b79ea48))
* resume failed requests ([f53a5d9](https://github.com/energywebfoundation/iam-client-lib/commit/f53a5d972963b801e334a862f5a80bc4abb46d9b))
* **signer:** listen to wallet events ([dca58b1](https://github.com/energywebfoundation/iam-client-lib/commit/dca58b10ea5fb18f3e0ff47f4017960f9fb3f8ad))
* **test:** increase faucet capacity ([d0b7ebb](https://github.com/energywebfoundation/iam-client-lib/commit/d0b7ebb90434d6729ade407c263a357d31fbb88f))
* merge updated master to develop ([5f1a3fc](https://github.com/energywebfoundation/iam-client-lib/commit/5f1a3fcf136782030e5f5928b306a03a69ce805a))


### Code Refactoring

* replace IAM and IAMBase with modules ([aa037a0](https://github.com/energywebfoundation/iam-client-lib/commit/aa037a0be9e8b2416e467ac5f2828a0f38abd6cd))


### Features

* **cache-client:** update cache client interface ([78f4517](https://github.com/energywebfoundation/iam-client-lib/commit/78f451785fcb1d27db1f5afbb0847337fd6c79ba))
* **cache-client:** update test login endpoint ([09d8a6b](https://github.com/energywebfoundation/iam-client-lib/commit/09d8a6b51664613353bb8f107f4a2a3d0d9eecb9))
* get isEthSigner from browser ([96de2d8](https://github.com/energywebfoundation/iam-client-lib/commit/96de2d8203e8e38a41c9d65cd98c47fb12cf33d5))
* **cache.config:** add EWC config ([f42ba11](https://github.com/energywebfoundation/iam-client-lib/commit/f42ba117a87b443ab65c7a42b9fbfd4c30d37db8))
* **chain.config:** add EWC config ([6353a20](https://github.com/energywebfoundation/iam-client-lib/commit/6353a200724d919ad3ca881e1e00237059ae5e82))
* **claims:** rejection reason while rejecting the claim ([ae82f18](https://github.com/energywebfoundation/iam-client-lib/commit/ae82f18c25081bbf0618efcfac9ee0fd22d7c7f0))
* **claims:** rename fields to requestorFields for better readibility ([1f90d7c](https://github.com/energywebfoundation/iam-client-lib/commit/1f90d7c4e78913c3a8ae080470546f3ba7a612b5))
* add chain name to DID format ([460d5fa](https://github.com/energywebfoundation/iam-client-lib/commit/460d5fa10d678675f5374df607a9aa5fb3795f9b))
* add hardcap to staking pool, improve tests ([65dd861](https://github.com/energywebfoundation/iam-client-lib/commit/65dd861347570fea3efa45c57ace5ebb4ab8acf6))
* add issuance of Role without previous request ([7ca982d](https://github.com/energywebfoundation/iam-client-lib/commit/7ca982d36473c693712687ba84be506e51f12fa9))
* add method for getting ratio from staking pool. ([3daf9c0](https://github.com/energywebfoundation/iam-client-lib/commit/3daf9c03a4bc19cfb3bcb53926ccad61fa62be68))
* add method to get total staked value. ([3f367aa](https://github.com/energywebfoundation/iam-client-lib/commit/3f367aa08480d440cd39c829488c7a5d6b7bd7af))
* add missing properties in asset interface. ([ab40f31](https://github.com/energywebfoundation/iam-client-lib/commit/ab40f31d5e13b9884cc2640ed8a47aba42c5729b))
* create energyweb under authewc ([19f65bb](https://github.com/energywebfoundation/iam-client-lib/commit/19f65bb4917995729e0617479becc090402e5b58))
* ES256 delegate ([a3a9ba8](https://github.com/energywebfoundation/iam-client-lib/commit/a3a9ba8fa884757a38d50986fa6a431bda840b6b))
* integrate staking-pool ([0173b27](https://github.com/energywebfoundation/iam-client-lib/commit/0173b27cfccbe0419d3d11d20f4f1002f8f26093))
* retrieve roles by issuer ICS-86 ([597ea1e](https://github.com/energywebfoundation/iam-client-lib/commit/597ea1e69697c7b2b1eb2e9a7ea0eb67f9cf611c))
* scripts to create and transfer energyweb ([b03155d](https://github.com/energywebfoundation/iam-client-lib/commit/b03155dece231109a2f184be63b198c7c7c6e1cd))
* sign with EKC ([ea2c3b3](https://github.com/energywebfoundation/iam-client-lib/commit/ea2c3b3c001d1abf7e88d386f74ef329fa023c57))
* update staking pool version, remove tests ([7ecbafd](https://github.com/energywebfoundation/iam-client-lib/commit/7ecbafd0b9ea6f64a200d9d0650be24c58f1c677))
* use Chain enum from ew-did-reg/did ([00aeab1](https://github.com/energywebfoundation/iam-client-lib/commit/00aeab1de345ef5c5c6aff17a004f5562cecec7c))
* **claim:** move register onchain from issue ([926eb95](https://github.com/energywebfoundation/iam-client-lib/commit/926eb95c094ef5ddb7c3f67a500134262a6658c2))
* **claims:** check is claim issued ([1cb6d83](https://github.com/energywebfoundation/iam-client-lib/commit/1cb6d83f3ec9a9b804d3ae89ea4a8ccc5d3d1a4f))
* **claims:** issuer fields ([0b7d6c4](https://github.com/energywebfoundation/iam-client-lib/commit/0b7d6c45f096a057c6d9d8b131c42745bfa336c9))
* **claims:** key value list when issuing credential to asset ([ab72d0d](https://github.com/energywebfoundation/iam-client-lib/commit/ab72d0d6d09d26f699cf368715e72a92f9b208c6))
* **claims:** new getClaimById method ([4fddb22](https://github.com/energywebfoundation/iam-client-lib/commit/4fddb2277f1f1b2edaa4e8d76f0b6317d3feff22))
* **claims:** register onchain claim optionally ([c7eb237](https://github.com/energywebfoundation/iam-client-lib/commit/c7eb237ff97dce662a2eae20b1b2408496010c59))
* **claims.service:** ICL-159 add hasOnChainRole utility ([abe6d86](https://github.com/energywebfoundation/iam-client-lib/commit/abe6d86b590e84094615ecaed1def7625eff2c6f))
* **deps:** update ekc package ([839070a](https://github.com/energywebfoundation/iam-client-lib/commit/839070af1a4a346d3f9b3448593477f8772634f2))
* **did:** remove support for did:ethr ([5b853ac](https://github.com/energywebfoundation/iam-client-lib/commit/5b853acd05c466c52c27bdfd7735358e0df253b4))
* **DID:** remove did document creation upon initialization ([b2feede](https://github.com/energywebfoundation/iam-client-lib/commit/b2feede866bd255166b8a03e391f1f01d1f7737b))
* **messaging:** disable nats messaging method for Node.js ([febabd2](https://github.com/energywebfoundation/iam-client-lib/commit/febabd295b1dbae2553fea4eef6b965504c67484))
* **nats:** event types and new catch-all message pattern ([a5f460a](https://github.com/energywebfoundation/iam-client-lib/commit/a5f460add711199eaaac55c8f85a772f9b4009c6))
* **nats:** moving sensitive data away from  NATS ([6fe33d5](https://github.com/energywebfoundation/iam-client-lib/commit/6fe33d5fe5525b9624eb23caec2fa0f137c19dd0))
* **staking-pool:** add partial withdraw ([7801dc4](https://github.com/energywebfoundation/iam-client-lib/commit/7801dc4aebecd0e09eead3c5284e591477a9a804))
* **utils/did:** use Chain from ew-did-reg/did ([03b7624](https://github.com/energywebfoundation/iam-client-lib/commit/03b7624cae6b9316d61bdd173c863642a57217a2))
* update ew-did-reg to 0.6.3-alpha.367.0 ([98f282c](https://github.com/energywebfoundation/iam-client-lib/commit/98f282c03020ad8741085b310aeb406f62814248))
* **staking-pool:** improve testing, bump staking pool ([6060fb2](https://github.com/energywebfoundation/iam-client-lib/commit/6060fb264877e4b2df1f41f4eb584af147e22a16))


### BREAKING CHANGES

* **did:** did:ethr is not supported
iam-client-lib will only be tested on volta and ewc in near future
mainnet support could be added in the future
* initialize modules in order

# [4.0.0-alpha.27](https://github.com/energywebfoundation/iam-client-lib/compare/v4.0.0-alpha.26...v4.0.0-alpha.27) (2022-01-13)

# [4.0.0-alpha.26](https://github.com/energywebfoundation/iam-client-lib/compare/v4.0.0-alpha.25...v4.0.0-alpha.26) (2022-01-12)

# [4.0.0-alpha.25](https://github.com/energywebfoundation/iam-client-lib/compare/v4.0.0-alpha.24...v4.0.0-alpha.25) (2022-01-11)


### Bug Fixes

* **test:** expect requestorField in claim ([a5fe8af](https://github.com/energywebfoundation/iam-client-lib/commit/a5fe8af7d6769f28aff1d46e73cec1d78031b774))
* ensure eth_sign signature ([5b4dec3](https://github.com/energywebfoundation/iam-client-lib/commit/5b4dec39f66dd642936bb0e8ef533f199b0f59f7))


### Features

* get isEthSigner from browser ([96de2d8](https://github.com/energywebfoundation/iam-client-lib/commit/96de2d8203e8e38a41c9d65cd98c47fb12cf33d5))
* **claims:** rename fields to requestorFields for better readibility ([1f90d7c](https://github.com/energywebfoundation/iam-client-lib/commit/1f90d7c4e78913c3a8ae080470546f3ba7a612b5))

# [4.0.0-alpha.24](https://github.com/energywebfoundation/iam-client-lib/compare/v4.0.0-alpha.23...v4.0.0-alpha.24) (2022-01-11)

# [4.0.0-alpha.23](https://github.com/energywebfoundation/iam-client-lib/compare/v4.0.0-alpha.22...v4.0.0-alpha.23) (2022-01-10)

# [4.0.0-alpha.22](https://github.com/energywebfoundation/iam-client-lib/compare/v4.0.0-alpha.21...v4.0.0-alpha.22) (2022-01-10)

# [4.0.0-alpha.21](https://github.com/energywebfoundation/iam-client-lib/compare/v4.0.0-alpha.20...v4.0.0-alpha.21) (2022-01-10)

# [4.0.0-alpha.20](https://github.com/energywebfoundation/iam-client-lib/compare/v4.0.0-alpha.19...v4.0.0-alpha.20) (2022-01-07)


### Features

* **cache-client:** update test login endpoint ([09d8a6b](https://github.com/energywebfoundation/iam-client-lib/commit/09d8a6b51664613353bb8f107f4a2a3d0d9eecb9))

# [4.0.0-alpha.19](https://github.com/energywebfoundation/iam-client-lib/compare/v4.0.0-alpha.18...v4.0.0-alpha.19) (2022-01-07)


### Features

* **cache-client:** update cache client interface ([78f4517](https://github.com/energywebfoundation/iam-client-lib/commit/78f451785fcb1d27db1f5afbb0847337fd6c79ba))

# [4.0.0-alpha.18](https://github.com/energywebfoundation/iam-client-lib/compare/v4.0.0-alpha.17...v4.0.0-alpha.18) (2022-01-05)

# [4.0.0-alpha.17](https://github.com/energywebfoundation/iam-client-lib/compare/v4.0.0-alpha.16...v4.0.0-alpha.17) (2022-01-05)

# [4.0.0-alpha.16](https://github.com/energywebfoundation/iam-client-lib/compare/v4.0.0-alpha.15...v4.0.0-alpha.16) (2022-01-05)


### Bug Fixes

* **did:** verify public claim ([f0df566](https://github.com/energywebfoundation/iam-client-lib/commit/f0df5667da0cc9c11c2c63d8c83e585e6690d8ae))

# [4.0.0-alpha.15](https://github.com/energywebfoundation/iam-client-lib/compare/v4.0.0-alpha.14...v4.0.0-alpha.15) (2022-01-04)

# [4.0.0-alpha.14](https://github.com/energywebfoundation/iam-client-lib/compare/v4.0.0-alpha.13...v4.0.0-alpha.14) (2021-12-15)

# [4.0.0-alpha.13](https://github.com/energywebfoundation/iam-client-lib/compare/v4.0.0-alpha.12...v4.0.0-alpha.13) (2021-12-15)


### Features

* **claims:** rejection reason while rejecting the claim ([ae82f18](https://github.com/energywebfoundation/iam-client-lib/commit/ae82f18c25081bbf0618efcfac9ee0fd22d7c7f0))

# [4.0.0-alpha.12](https://github.com/energywebfoundation/iam-client-lib/compare/v4.0.0-alpha.11...v4.0.0-alpha.12) (2021-12-15)


### Bug Fixes

* disable staking pool initialization ([78c7815](https://github.com/energywebfoundation/iam-client-lib/commit/78c781512df09e5d91f575034856450fe40f6698))

# [4.0.0-alpha.11](https://github.com/energywebfoundation/iam-client-lib/compare/v4.0.0-alpha.10...v4.0.0-alpha.11) (2021-12-14)


### Bug Fixes

* revert config changes from dev to volta ([adafda4](https://github.com/energywebfoundation/iam-client-lib/commit/adafda4f44ebf4aa6c08f99909c1f5048693ac1c))


### Features

* **cache.config:** add EWC config ([f42ba11](https://github.com/energywebfoundation/iam-client-lib/commit/f42ba117a87b443ab65c7a42b9fbfd4c30d37db8))
* **chain.config:** add EWC config ([6353a20](https://github.com/energywebfoundation/iam-client-lib/commit/6353a200724d919ad3ca881e1e00237059ae5e82))
* create energyweb under authewc ([19f65bb](https://github.com/energywebfoundation/iam-client-lib/commit/19f65bb4917995729e0617479becc090402e5b58))
* scripts to create and transfer energyweb ([b03155d](https://github.com/energywebfoundation/iam-client-lib/commit/b03155dece231109a2f184be63b198c7c7c6e1cd))

# [4.0.0-alpha.10](https://github.com/energywebfoundation/iam-client-lib/compare/v4.0.0-alpha.9...v4.0.0-alpha.10) (2021-12-10)


### Bug Fixes

* **cacheClient:** trigging release of previous commit ([c1445f6](https://github.com/energywebfoundation/iam-client-lib/commit/c1445f65f23f3d1dc5587c21d5409ec66c9cef60))

# [4.0.0-alpha.9](https://github.com/energywebfoundation/iam-client-lib/compare/v4.0.0-alpha.8...v4.0.0-alpha.9) (2021-12-10)


### Bug Fixes

* **nats:** changed subject mask to ensure all events for did are captured ([3959f54](https://github.com/energywebfoundation/iam-client-lib/commit/3959f54707fde3dc5177600eaf398014bda9eeee))

# [4.0.0-alpha.8](https://github.com/energywebfoundation/iam-client-lib/compare/v4.0.0-alpha.7...v4.0.0-alpha.8) (2021-12-10)


### Bug Fixes

* **claim:** register with issuer ([6ad22df](https://github.com/energywebfoundation/iam-client-lib/commit/6ad22df243995f3d6410ab40cf1ab4599a1cf3c4))

# [4.0.0-alpha.7](https://github.com/energywebfoundation/iam-client-lib/compare/v4.0.0-alpha.6...v4.0.0-alpha.7) (2021-12-10)


### Bug Fixes

* **nats:** fix http to ws replacement ([17de265](https://github.com/energywebfoundation/iam-client-lib/commit/17de2654d3f8d3918394329588e3ad824813fc3b))
* **nats:** fix http to ws replacement ([af16531](https://github.com/energywebfoundation/iam-client-lib/commit/af16531e1afb7d39c49628341ea83c8c5830f01c))

# [4.0.0-alpha.6](https://github.com/energywebfoundation/iam-client-lib/compare/v4.0.0-alpha.5...v4.0.0-alpha.6) (2021-12-09)


### Bug Fixes

* **claims:** enrich claim request with type and version ([a633530](https://github.com/energywebfoundation/iam-client-lib/commit/a63353051d4afe51ff27bf1a5a38f468b4ffe1cf))

# [4.0.0-alpha.5](https://github.com/energywebfoundation/iam-client-lib/compare/v4.0.0-alpha.4...v4.0.0-alpha.5) (2021-12-09)


### Bug Fixes

* resume failed requests ([f53a5d9](https://github.com/energywebfoundation/iam-client-lib/commit/f53a5d972963b801e334a862f5a80bc4abb46d9b))

# [4.0.0-alpha.4](https://github.com/energywebfoundation/iam-client-lib/compare/v4.0.0-alpha.3...v4.0.0-alpha.4) (2021-12-08)


### Features

* add method for getting ratio from staking pool. ([3daf9c0](https://github.com/energywebfoundation/iam-client-lib/commit/3daf9c03a4bc19cfb3bcb53926ccad61fa62be68))

# [4.0.0-alpha.3](https://github.com/energywebfoundation/iam-client-lib/compare/v4.0.0-alpha.2...v4.0.0-alpha.3) (2021-12-07)


### Bug Fixes

* **domains.service:** remove addressOf from owner param ([2458507](https://github.com/energywebfoundation/iam-client-lib/commit/24585076952e7f2e366e62802011d252be41c4fe))

# [4.0.0-alpha.2](https://github.com/energywebfoundation/iam-client-lib/compare/v4.0.0-alpha.1...v4.0.0-alpha.2) (2021-12-07)


### Bug Fixes

* **assets:** rollback asset event type to uppercase ([52359cd](https://github.com/energywebfoundation/iam-client-lib/commit/52359cd01bce95ae778b8ddf345e66880070e839))
* **assets:** rollback asset event type to uppercase ([4b1b314](https://github.com/energywebfoundation/iam-client-lib/commit/4b1b3144c39c0e7c70a0bf7ee399ee26dd71081b))

# [4.0.0-alpha.1](https://github.com/energywebfoundation/iam-client-lib/compare/v3.3.0-alpha.31...v4.0.0-alpha.1) (2021-12-06)


### Features

* use Chain enum from ew-did-reg/did ([00aeab1](https://github.com/energywebfoundation/iam-client-lib/commit/00aeab1de345ef5c5c6aff17a004f5562cecec7c))
* **did:** remove support for did:ethr ([5b853ac](https://github.com/energywebfoundation/iam-client-lib/commit/5b853acd05c466c52c27bdfd7735358e0df253b4))
* **utils/did:** use Chain from ew-did-reg/did ([03b7624](https://github.com/energywebfoundation/iam-client-lib/commit/03b7624cae6b9316d61bdd173c863642a57217a2))
* add chain name to DID format ([460d5fa](https://github.com/energywebfoundation/iam-client-lib/commit/460d5fa10d678675f5374df607a9aa5fb3795f9b))


### BREAKING CHANGES

* **did:** did:ethr is not supported
iam-client-lib will only be tested on volta and ewc in near future
mainnet support could be added in the future

# [3.3.0-alpha.31](https://github.com/energywebfoundation/iam-client-lib/compare/v3.3.0-alpha.30...v3.3.0-alpha.31) (2021-12-06)


### Features

* update staking pool version, remove tests ([7ecbafd](https://github.com/energywebfoundation/iam-client-lib/commit/7ecbafd0b9ea6f64a200d9d0650be24c58f1c677))

# [3.3.0-alpha.30](https://github.com/energywebfoundation/iam-client-lib/compare/v3.3.0-alpha.29...v3.3.0-alpha.30) (2021-12-03)


### Features

* **claims:** register onchain claim optionally ([c7eb237](https://github.com/energywebfoundation/iam-client-lib/commit/c7eb237ff97dce662a2eae20b1b2408496010c59))

# [3.3.0-alpha.29](https://github.com/energywebfoundation/iam-client-lib/compare/v3.3.0-alpha.28...v3.3.0-alpha.29) (2021-12-03)


### Features

* **claim:** move register onchain from issue ([926eb95](https://github.com/energywebfoundation/iam-client-lib/commit/926eb95c094ef5ddb7c3f67a500134262a6658c2))
* **claims:** check is claim issued ([1cb6d83](https://github.com/energywebfoundation/iam-client-lib/commit/1cb6d83f3ec9a9b804d3ae89ea4a8ccc5d3d1a4f))

# [3.3.0-alpha.28](https://github.com/energywebfoundation/iam-client-lib/compare/v3.3.0-alpha.27...v3.3.0-alpha.28) (2021-12-03)


### Features

* **nats:** event types and new catch-all message pattern ([a5f460a](https://github.com/energywebfoundation/iam-client-lib/commit/a5f460add711199eaaac55c8f85a772f9b4009c6))

# [3.3.0-alpha.27](https://github.com/energywebfoundation/iam-client-lib/compare/v3.3.0-alpha.26...v3.3.0-alpha.27) (2021-12-03)


### Features

* **claims.service:** ICL-159 add hasOnChainRole utility ([abe6d86](https://github.com/energywebfoundation/iam-client-lib/commit/abe6d86b590e84094615ecaed1def7625eff2c6f))

# [3.3.0-alpha.26](https://github.com/energywebfoundation/iam-client-lib/compare/v3.3.0-alpha.25...v3.3.0-alpha.26) (2021-12-02)


### Features

* update ew-did-reg to 0.6.3-alpha.367.0 ([98f282c](https://github.com/energywebfoundation/iam-client-lib/commit/98f282c03020ad8741085b310aeb406f62814248))

# [3.3.0-alpha.25](https://github.com/energywebfoundation/iam-client-lib/compare/v3.3.0-alpha.24...v3.3.0-alpha.25) (2021-12-02)


### Features

* add method to get total staked value. ([3f367aa](https://github.com/energywebfoundation/iam-client-lib/commit/3f367aa08480d440cd39c829488c7a5d6b7bd7af))

# [3.3.0-alpha.24](https://github.com/energywebfoundation/iam-client-lib/compare/v3.3.0-alpha.23...v3.3.0-alpha.24) (2021-12-01)

# [3.3.0-alpha.23](https://github.com/energywebfoundation/iam-client-lib/compare/v3.3.0-alpha.22...v3.3.0-alpha.23) (2021-12-01)


### Bug Fixes

* disable staking-pool tests ([e6af3bb](https://github.com/energywebfoundation/iam-client-lib/commit/e6af3bbf5627cb030e984a35abc19fc47b79ea48))
* **build:** use github token for pr in dev ([6e83292](https://github.com/energywebfoundation/iam-client-lib/commit/6e832926ccfccef644aa5b4514e94e517d560623))
* **ci:** set secret for develop publish ([97f94c8](https://github.com/energywebfoundation/iam-client-lib/commit/97f94c8aea9fd60597eedf5adfeb9b2a854091bf))
* **ci:** set secret to publish develop ([83889cc](https://github.com/energywebfoundation/iam-client-lib/commit/83889cc653ed6e70a55bc7856e476c9043f950dc))


### Features

* **claims:** new getClaimById method ([4fddb22](https://github.com/energywebfoundation/iam-client-lib/commit/4fddb2277f1f1b2edaa4e8d76f0b6317d3feff22))
* **nats:** moving sensitive data away from  NATS ([6fe33d5](https://github.com/energywebfoundation/iam-client-lib/commit/6fe33d5fe5525b9624eb23caec2fa0f137c19dd0))
* **staking-pool:** add partial withdraw ([7801dc4](https://github.com/energywebfoundation/iam-client-lib/commit/7801dc4aebecd0e09eead3c5284e591477a9a804))
* **staking-pool:** improve testing, bump staking pool ([6060fb2](https://github.com/energywebfoundation/iam-client-lib/commit/6060fb264877e4b2df1f41f4eb584af147e22a16))
* add missing properties in asset interface. ([ab40f31](https://github.com/energywebfoundation/iam-client-lib/commit/ab40f31d5e13b9884cc2640ed8a47aba42c5729b))

# [3.3.0-alpha.22](https://github.com/energywebfoundation/iam-client-lib/compare/v3.3.0-alpha.21...v3.3.0-alpha.22) (2021-11-26)


### Features

* **messaging:** disable nats messaging method for Node.js ([febabd2](https://github.com/energywebfoundation/iam-client-lib/commit/febabd295b1dbae2553fea4eef6b965504c67484))

# [3.3.0-alpha.21](https://github.com/energywebfoundation/iam-client-lib/compare/v3.3.0-alpha.20...v3.3.0-alpha.21) (2021-11-25)


### Bug Fixes

* **test:** increase faucet capacity ([d0b7ebb](https://github.com/energywebfoundation/iam-client-lib/commit/d0b7ebb90434d6729ade407c263a357d31fbb88f))

# [3.3.0-alpha.20](https://github.com/energywebfoundation/iam-client-lib/compare/v3.3.0-alpha.19...v3.3.0-alpha.20) (2021-11-25)


### Bug Fixes

* **cacheClient:** set auth header ([ba9e870](https://github.com/energywebfoundation/iam-client-lib/commit/ba9e8703fb275b6cd2b0d50c50cabff2e0431fda))


### Features

* **deps:** update ekc package ([839070a](https://github.com/energywebfoundation/iam-client-lib/commit/839070af1a4a346d3f9b3448593477f8772634f2))

# [3.3.0-alpha.19](https://github.com/energywebfoundation/iam-client-lib/compare/v3.3.0-alpha.18...v3.3.0-alpha.19) (2021-11-23)


### Features

* add hardcap to staking pool, improve tests ([65dd861](https://github.com/energywebfoundation/iam-client-lib/commit/65dd861347570fea3efa45c57ace5ebb4ab8acf6))
* integrate staking-pool ([0173b27](https://github.com/energywebfoundation/iam-client-lib/commit/0173b27cfccbe0419d3d11d20f4f1002f8f26093))

# [3.3.0-alpha.18](https://github.com/energywebfoundation/iam-client-lib/compare/v3.3.0-alpha.17...v3.3.0-alpha.18) (2021-11-22)


### Bug Fixes

* **signer:** listen to wallet events ([dca58b1](https://github.com/energywebfoundation/iam-client-lib/commit/dca58b10ea5fb18f3e0ff47f4017960f9fb3f8ad))

# [3.3.0-alpha.17](https://github.com/energywebfoundation/iam-client-lib/compare/v3.3.0-alpha.16...v3.3.0-alpha.17) (2021-11-22)


### Bug Fixes

* **cache:** separate failed test reloging from unauthenticated ([d07a084](https://github.com/energywebfoundation/iam-client-lib/commit/d07a0849f4cdbfe6ea420c06231a659ed695eeb3))
* **cacheClient:** test cache login ([dec430f](https://github.com/energywebfoundation/iam-client-lib/commit/dec430f0e5d2f334eb77a0d809f7b0a408d8c4c1))

# [3.3.0-alpha.16](https://github.com/energywebfoundation/iam-client-lib/compare/v3.3.0-alpha.15...v3.3.0-alpha.16) (2021-11-19)


### Features

* **DID:** remove did document creation upon initialization ([b2feede](https://github.com/energywebfoundation/iam-client-lib/commit/b2feede866bd255166b8a03e391f1f01d1f7737b))

# [3.3.0-alpha.15](https://github.com/energywebfoundation/iam-client-lib/compare/v3.3.0-alpha.14...v3.3.0-alpha.15) (2021-11-18)


### Bug Fixes

* **claim:** stripped fields from issueClaim function ([b4bf01e](https://github.com/energywebfoundation/iam-client-lib/commit/b4bf01ec8015c6ac4604b93767b331842199f36e))
* **issuerFields:** fix to issuerFields on publishPublicClaim ([f3b32f9](https://github.com/energywebfoundation/iam-client-lib/commit/f3b32f9602da70827ed24472e55f8c56ee4f4c36))

# [3.3.0-alpha.14](https://github.com/energywebfoundation/iam-client-lib/compare/v3.3.0-alpha.13...v3.3.0-alpha.14) (2021-11-17)


### Bug Fixes

* **messaging:** subsribe to channels from claims channel ([4788a97](https://github.com/energywebfoundation/iam-client-lib/commit/4788a9782efda7be2e6ccc55bc6f30ad5b83fcbb))

# [3.3.0-alpha.13](https://github.com/energywebfoundation/iam-client-lib/compare/v3.3.0-alpha.12...v3.3.0-alpha.13) (2021-11-17)


### Bug Fixes

* **cacheClient:** recalculate identity token on login ([aaaf929](https://github.com/energywebfoundation/iam-client-lib/commit/aaaf9291ffa5e679b14bd8c215731442104a95c9))

# [3.3.0-alpha.12](https://github.com/energywebfoundation/iam-client-lib/compare/v3.3.0-alpha.11...v3.3.0-alpha.12) (2021-11-16)


### Features

* **claims:** issuer fields ([0b7d6c4](https://github.com/energywebfoundation/iam-client-lib/commit/0b7d6c45f096a057c6d9d8b131c42745bfa336c9))

# [3.3.0-alpha.11](https://github.com/energywebfoundation/iam-client-lib/compare/v3.3.0-alpha.10...v3.3.0-alpha.11) (2021-11-16)


### Bug Fixes

* **jest:** make work of the npm test:watch and test:watch:windows ([6a799b5](https://github.com/energywebfoundation/iam-client-lib/commit/6a799b5e9a7605c037e8a0c1364fa69499813cc3))

# [3.3.0-alpha.10](https://github.com/energywebfoundation/iam-client-lib/compare/v3.3.0-alpha.9...v3.3.0-alpha.10) (2021-11-09)


### Bug Fixes

* **didRegistry:** update owned document ([7f69fdb](https://github.com/energywebfoundation/iam-client-lib/commit/7f69fdbb69b0380a4d9bfa41d76613b1c0b1dc51))

# [3.3.0-alpha.9](https://github.com/energywebfoundation/iam-client-lib/compare/v3.3.0-alpha.8...v3.3.0-alpha.9) (2021-11-09)


### Bug Fixes

* **domainsService:** save chain id ([6e4255a](https://github.com/energywebfoundation/iam-client-lib/commit/6e4255a8ca88a8ac442d0ff9ca037c3794b7ebeb))

# [3.3.0-alpha.8](https://github.com/energywebfoundation/iam-client-lib/compare/v3.3.0-alpha.7...v3.3.0-alpha.8) (2021-11-09)


### Code Refactoring

* replace IAM and IAMBase with modules ([aa037a0](https://github.com/energywebfoundation/iam-client-lib/commit/aa037a0be9e8b2416e467ac5f2828a0f38abd6cd))


### BREAKING CHANGES

* initialize modules in order

# [3.3.0-alpha.7](https://github.com/energywebfoundation/iam-client-lib/compare/v3.3.0-alpha.6...v3.3.0-alpha.7) (2021-11-04)


### Features

* sign with EKC ([ea2c3b3](https://github.com/energywebfoundation/iam-client-lib/commit/ea2c3b3c001d1abf7e88d386f74ef329fa023c57))

# [3.3.0-alpha.6](https://github.com/energywebfoundation/iam-client-lib/compare/v3.3.0-alpha.5...v3.3.0-alpha.6) (2021-11-03)


### Features

* ES256 delegate ([a3a9ba8](https://github.com/energywebfoundation/iam-client-lib/commit/a3a9ba8fa884757a38d50986fa6a431bda840b6b))

# [3.3.0-alpha.5](https://github.com/energywebfoundation/iam-client-lib/compare/v3.3.0-alpha.4...v3.3.0-alpha.5) (2021-11-03)


### Bug Fixes

* merge updated master to develop ([5f1a3fc](https://github.com/energywebfoundation/iam-client-lib/commit/5f1a3fcf136782030e5f5928b306a03a69ce805a))

# [3.3.0-alpha.4](https://github.com/energywebfoundation/iam-client-lib/compare/v3.3.0-alpha.3...v3.3.0-alpha.4) (2021-11-02)


### Bug Fixes

* **claims:** remove fields from claims ([8a0c91b](https://github.com/energywebfoundation/iam-client-lib/commit/8a0c91b7704b07bc167df001e3bef74be0ddf63e))

# [3.3.0-alpha.3](https://github.com/energywebfoundation/iam-client-lib/compare/v3.3.0-alpha.2...v3.3.0-alpha.3) (2021-10-30)


### Features

* retrieve roles by issuer ICS-86 ([597ea1e](https://github.com/energywebfoundation/iam-client-lib/commit/597ea1e69697c7b2b1eb2e9a7ea0eb67f9cf611c))

# [3.3.0-alpha.2](https://github.com/energywebfoundation/iam-client-lib/compare/v3.3.0-alpha.1...v3.3.0-alpha.2) (2021-10-29)


### Features

* **claims:** key value list when issuing credential to asset ([ab72d0d](https://github.com/energywebfoundation/iam-client-lib/commit/ab72d0d6d09d26f699cf368715e72a92f9b208c6))

# [3.3.0-alpha.1](https://github.com/energywebfoundation/iam-client-lib/compare/v3.2.0...v3.3.0-alpha.1) (2021-10-28)


### Features

* add issuance of Role without previous request ([7ca982d](https://github.com/energywebfoundation/iam-client-lib/commit/7ca982d36473c693712687ba84be506e51f12fa9))

# [3.2.0](https://github.com/energywebfoundation/iam-client-lib/compare/v3.1.0...v3.2.0) (2021-10-27)


### Bug Fixes

* **nats:** upgraded to latest nats version working with BackEnd and FrontEnd ([8b654dc](https://github.com/energywebfoundation/iam-client-lib/commit/8b654dc81751ec171551513a7b4360b035765a87))
* **WalletConnect:** fix walletconnect login ([4201fcb](https://github.com/energywebfoundation/iam-client-lib/commit/4201fcb491d21f0bdc242027dd56cd53ffada4e3))


### Features

* get owned domains with relatiosn ([9d3b08e](https://github.com/energywebfoundation/iam-client-lib/commit/9d3b08e670f97134f35235157b1f2d89f2d2b1e7))
* remove `patch-package` dependency ([ae7db96](https://github.com/energywebfoundation/iam-client-lib/commit/ae7db9690cc3dbf14945677b390aa264eef0a4f7))
* **build:** include `patches` into build ([0bbbdc0](https://github.com/energywebfoundation/iam-client-lib/commit/0bbbdc00d3e781b46898be520a1429101c6b4b1e))
* add `patches` to build files ([f37bcc1](https://github.com/energywebfoundation/iam-client-lib/commit/f37bcc1625df8167a60bb7183c446c3b50f161ee))
* **WalletConnect:** change to public relay ([3f114c3](https://github.com/energywebfoundation/iam-client-lib/commit/3f114c32ca35c262e30cd4bc437a9c6d0a8c4dac))
* improve performance of `registrationTypesOfRoles` function ([8e39e28](https://github.com/energywebfoundation/iam-client-lib/commit/8e39e28070fcb9c5bc97c4b28b7696f0c573d6c6))

# [3.2.0-alpha.9](https://github.com/energywebfoundation/iam-client-lib/compare/v3.2.0-alpha.8...v3.2.0-alpha.9) (2021-10-27)

# [3.2.0-alpha.8](https://github.com/energywebfoundation/iam-client-lib/compare/v3.2.0-alpha.7...v3.2.0-alpha.8) (2021-10-21)

# [3.2.0-alpha.7](https://github.com/energywebfoundation/iam-client-lib/compare/v3.2.0-alpha.6...v3.2.0-alpha.7) (2021-10-20)


### Features

* get owned domains with relatiosn ([9d3b08e](https://github.com/energywebfoundation/iam-client-lib/commit/9d3b08e670f97134f35235157b1f2d89f2d2b1e7))

# [3.2.0-alpha.6](https://github.com/energywebfoundation/iam-client-lib/compare/v3.2.0-alpha.5...v3.2.0-alpha.6) (2021-10-19)


### Features

* remove `patch-package` dependency ([ae7db96](https://github.com/energywebfoundation/iam-client-lib/commit/ae7db9690cc3dbf14945677b390aa264eef0a4f7))

# [3.2.0-alpha.5](https://github.com/energywebfoundation/iam-client-lib/compare/v3.2.0-alpha.4...v3.2.0-alpha.5) (2021-10-18)


### Features

* **build:** include `patches` into build ([0bbbdc0](https://github.com/energywebfoundation/iam-client-lib/commit/0bbbdc00d3e781b46898be520a1429101c6b4b1e))

# [3.2.0-alpha.4](https://github.com/energywebfoundation/iam-client-lib/compare/v3.2.0-alpha.3...v3.2.0-alpha.4) (2021-10-18)


### Features

* add `patches` to build files ([f37bcc1](https://github.com/energywebfoundation/iam-client-lib/commit/f37bcc1625df8167a60bb7183c446c3b50f161ee))

# [3.2.0-alpha.3](https://github.com/energywebfoundation/iam-client-lib/compare/v3.2.0-alpha.2...v3.2.0-alpha.3) (2021-10-18)


### Bug Fixes

* **WalletConnect:** fix walletconnect login ([4201fcb](https://github.com/energywebfoundation/iam-client-lib/commit/4201fcb491d21f0bdc242027dd56cd53ffada4e3))


### Features

* **WalletConnect:** change to public relay ([3f114c3](https://github.com/energywebfoundation/iam-client-lib/commit/3f114c32ca35c262e30cd4bc437a9c6d0a8c4dac))

# [3.2.0-alpha.2](https://github.com/energywebfoundation/iam-client-lib/compare/v3.2.0-alpha.1...v3.2.0-alpha.2) (2021-10-13)


### Bug Fixes

* **nats:** upgraded to latest nats version working with BackEnd and FrontEnd ([8b654dc](https://github.com/energywebfoundation/iam-client-lib/commit/8b654dc81751ec171551513a7b4360b035765a87))

# [3.2.0-alpha.1](https://github.com/energywebfoundation/iam-client-lib/compare/v3.1.0...v3.2.0-alpha.1) (2021-10-12)


### Features

* improve performance of `registrationTypesOfRoles` function ([8e39e28](https://github.com/energywebfoundation/iam-client-lib/commit/8e39e28070fcb9c5bc97c4b28b7696f0c573d6c6))

# [3.1.0](https://github.com/energywebfoundation/iam-client-lib/compare/v3.0.0...v3.1.0) (2021-10-08)


### Bug Fixes

* **auth:** using private key in browser to login. ([cdb3d20](https://github.com/energywebfoundation/iam-client-lib/commit/cdb3d206aa062ba965d6dc37ad43f8c86ea3a6ab))
* **core:** update cache server interface to latest version and secure types ([7752b45](https://github.com/energywebfoundation/iam-client-lib/commit/7752b451f63a813ce1a574d1fb8e16f54eadcb5b))
* **createDelegateProof:** set issuer identity ([77661c6](https://github.com/energywebfoundation/iam-client-lib/commit/77661c664e431684437d496d880d939af7f512ac))
* **doc:** package.json with correct version ([ac05bc9](https://github.com/energywebfoundation/iam-client-lib/commit/ac05bc9d13afd47df150332ba51ddf0a30fef456))
* **modules:** fixing ethereumjs-abi install ([c095152](https://github.com/energywebfoundation/iam-client-lib/commit/c095152dbd95f6758a9a77f2b5cf84259290bd71))
* **modules:** fixing ethereumjs-abi install ([ac195a8](https://github.com/energywebfoundation/iam-client-lib/commit/ac195a8966a21bc0f8a68c3e683cd124993f6458))
* **modules:** fixing packages installation ([3386a8e](https://github.com/energywebfoundation/iam-client-lib/commit/3386a8e345165d069d12a38846c34628b8020e28))
* **modules:** fixing packages installation ([e2998a3](https://github.com/energywebfoundation/iam-client-lib/commit/e2998a3b97ffdd607ea19b277c793216d279cc11))
* **nats:** change in the way nats is referenced ([b4fd123](https://github.com/energywebfoundation/iam-client-lib/commit/b4fd1234d59fb78b99a128cd7ec4f8fc57e83487))
* **nats:** changed path to nats.ws from absolute to relative ([4671db9](https://github.com/energywebfoundation/iam-client-lib/commit/4671db99f20ae92846bb1ac2fcbab14150dc1156))
* **nats:** revert nats to non cjs version due to imcompatibilities ([68ab4b7](https://github.com/energywebfoundation/iam-client-lib/commit/68ab4b776c5f204a83c2107a21cfd9ecd2498f96))
* **packages:** rebasing on dev ([0c557fa](https://github.com/energywebfoundation/iam-client-lib/commit/0c557fa7e307b552a9e18d99a4a4079df518b9a4))
* **test:** typeCasting decoded args ([1918033](https://github.com/energywebfoundation/iam-client-lib/commit/1918033fa114a7d60e9558af81aa92edbb1354ef))
* create DID before loging to cache server ([bda3296](https://github.com/energywebfoundation/iam-client-lib/commit/bda32968f5f7f3018a899568c2acefebb6073429))
* detecting execution environment, when browser have declared global property. ([4d11e58](https://github.com/energywebfoundation/iam-client-lib/commit/4d11e58f2731fa8201e8b3d5e09985c2a4972b7e))
* revert change initialization order ([1a49f65](https://github.com/energywebfoundation/iam-client-lib/commit/1a49f65184aff675a74be01a67356a30393c19a6))
* update ew-did to fix invalid signature ([867ecf2](https://github.com/energywebfoundation/iam-client-lib/commit/867ecf276a242c971b63b36b00af5e5593bb65fa))
* **packaging:** update of nats.ws package to latest version ([d739480](https://github.com/energywebfoundation/iam-client-lib/commit/d73948069c1eba4c4098f55415305d0370f16dcd))


### Features

* update ew-did-reg packages to stable version ([8de8c77](https://github.com/energywebfoundation/iam-client-lib/commit/8de8c779df7b236b13659ab5b13f47647d8302ad))
* **core:** expose chain and account on initializeConnection ([038fed6](https://github.com/energywebfoundation/iam-client-lib/commit/038fed677d83ff87173ef70701aa16fd2f686aaa))
* **createDelegateProof:** using ew-did-registry/jwt ([db37306](https://github.com/energywebfoundation/iam-client-lib/commit/db37306850301d931f8174355a5cccab319e7b47))
* **createDelegateProof:** using ew-did-registry/jwt ([706a082](https://github.com/energywebfoundation/iam-client-lib/commit/706a08201a4aeefe6c8a0deb9b72ffba0cff0018))
* **createDelegateProof:** using ew-did-registry/jwt ([cea0e8d](https://github.com/energywebfoundation/iam-client-lib/commit/cea0e8dcc4850edaf5813e3ca584d1884ccce2ee))
* **createDelegateProof:** using ew-did-registry/jwt ([a372742](https://github.com/energywebfoundation/iam-client-lib/commit/a3727429624a8179bf8ee503da31ad74d6a3ce71))
* **deps:** downgrade `nats.ws` and `@walletconnect/web3-provider` packages ([daf2782](https://github.com/energywebfoundation/iam-client-lib/commit/daf278239fa7821d798b45d729ab4f9087f9c321))

# [3.1.0-alpha.17](https://github.com/energywebfoundation/iam-client-lib/compare/v3.1.0-alpha.16...v3.1.0-alpha.17) (2021-10-08)


### Features

* update ew-did-reg packages to stable version ([8de8c77](https://github.com/energywebfoundation/iam-client-lib/commit/8de8c779df7b236b13659ab5b13f47647d8302ad))

# [3.1.0-alpha.16](https://github.com/energywebfoundation/iam-client-lib/compare/v3.1.0-alpha.15...v3.1.0-alpha.16) (2021-10-07)


### Bug Fixes

* **createDelegateProof:** set issuer identity ([77661c6](https://github.com/energywebfoundation/iam-client-lib/commit/77661c664e431684437d496d880d939af7f512ac))

# [3.1.0-alpha.15](https://github.com/energywebfoundation/iam-client-lib/compare/v3.1.0-alpha.14...v3.1.0-alpha.15) (2021-10-07)


### Features

* **deps:** downgrade `nats.ws` and `@walletconnect/web3-provider` packages ([daf2782](https://github.com/energywebfoundation/iam-client-lib/commit/daf278239fa7821d798b45d729ab4f9087f9c321))

# [3.1.0-alpha.14](https://github.com/energywebfoundation/iam-client-lib/compare/v3.1.0-alpha.13...v3.1.0-alpha.14) (2021-10-07)

# [3.1.0-alpha.13](https://github.com/energywebfoundation/iam-client-lib/compare/v3.1.0-alpha.12...v3.1.0-alpha.13) (2021-10-06)


### Bug Fixes

* **modules:** fixing ethereumjs-abi install ([c095152](https://github.com/energywebfoundation/iam-client-lib/commit/c095152dbd95f6758a9a77f2b5cf84259290bd71))
* **modules:** fixing ethereumjs-abi install ([ac195a8](https://github.com/energywebfoundation/iam-client-lib/commit/ac195a8966a21bc0f8a68c3e683cd124993f6458))
* **modules:** fixing packages installation ([3386a8e](https://github.com/energywebfoundation/iam-client-lib/commit/3386a8e345165d069d12a38846c34628b8020e28))
* **modules:** fixing packages installation ([e2998a3](https://github.com/energywebfoundation/iam-client-lib/commit/e2998a3b97ffdd607ea19b277c793216d279cc11))
* **packages:** rebasing on dev ([0c557fa](https://github.com/energywebfoundation/iam-client-lib/commit/0c557fa7e307b552a9e18d99a4a4079df518b9a4))
* **test:** typeCasting decoded args ([1918033](https://github.com/energywebfoundation/iam-client-lib/commit/1918033fa114a7d60e9558af81aa92edbb1354ef))


### Features

* **createDelegateProof:** using ew-did-registry/jwt ([db37306](https://github.com/energywebfoundation/iam-client-lib/commit/db37306850301d931f8174355a5cccab319e7b47))
* **createDelegateProof:** using ew-did-registry/jwt ([706a082](https://github.com/energywebfoundation/iam-client-lib/commit/706a08201a4aeefe6c8a0deb9b72ffba0cff0018))
* **createDelegateProof:** using ew-did-registry/jwt ([cea0e8d](https://github.com/energywebfoundation/iam-client-lib/commit/cea0e8dcc4850edaf5813e3ca584d1884ccce2ee))
* **createDelegateProof:** using ew-did-registry/jwt ([a372742](https://github.com/energywebfoundation/iam-client-lib/commit/a3727429624a8179bf8ee503da31ad74d6a3ce71))

# [3.1.0-alpha.12](https://github.com/energywebfoundation/iam-client-lib/compare/v3.1.0-alpha.11...v3.1.0-alpha.12) (2021-10-06)


### Bug Fixes

* **doc:** package.json with correct version ([ac05bc9](https://github.com/energywebfoundation/iam-client-lib/commit/ac05bc9d13afd47df150332ba51ddf0a30fef456))

# [3.1.0-alpha.11](https://github.com/energywebfoundation/iam-client-lib/compare/v3.1.0-alpha.10...v3.1.0-alpha.11) (2021-10-04)


### Bug Fixes

* **auth:** using private key in browser to login. ([cdb3d20](https://github.com/energywebfoundation/iam-client-lib/commit/cdb3d206aa062ba965d6dc37ad43f8c86ea3a6ab))

# [3.1.0-alpha.10](https://github.com/energywebfoundation/iam-client-lib/compare/v3.1.0-alpha.9...v3.1.0-alpha.10) (2021-10-04)


### Bug Fixes

* detecting execution environment, when browser have declared global property. ([4d11e58](https://github.com/energywebfoundation/iam-client-lib/commit/4d11e58f2731fa8201e8b3d5e09985c2a4972b7e))

# [3.1.0-alpha.9](https://github.com/energywebfoundation/iam-client-lib/compare/v3.1.0-alpha.8...v3.1.0-alpha.9) (2021-10-01)

# [3.1.0-alpha.8](https://github.com/energywebfoundation/iam-client-lib/compare/v3.1.0-alpha.7...v3.1.0-alpha.8) (2021-10-01)


### Bug Fixes

* **core:** update cache server interface to latest version and secure types ([7752b45](https://github.com/energywebfoundation/iam-client-lib/commit/7752b451f63a813ce1a574d1fb8e16f54eadcb5b))

# [3.1.0-alpha.7](https://github.com/energywebfoundation/iam-client-lib/compare/v3.1.0-alpha.6...v3.1.0-alpha.7) (2021-09-30)


### Bug Fixes

* **nats:** revert nats to non cjs version due to imcompatibilities ([68ab4b7](https://github.com/energywebfoundation/iam-client-lib/commit/68ab4b776c5f204a83c2107a21cfd9ecd2498f96))

# [3.1.0-alpha.6](https://github.com/energywebfoundation/iam-client-lib/compare/v3.1.0-alpha.5...v3.1.0-alpha.6) (2021-09-30)


### Bug Fixes

* revert change initialization order ([1a49f65](https://github.com/energywebfoundation/iam-client-lib/commit/1a49f65184aff675a74be01a67356a30393c19a6))

# [3.1.0-alpha.5](https://github.com/energywebfoundation/iam-client-lib/compare/v3.1.0-alpha.4...v3.1.0-alpha.5) (2021-09-30)


### Bug Fixes

* create DID before loging to cache server ([bda3296](https://github.com/energywebfoundation/iam-client-lib/commit/bda32968f5f7f3018a899568c2acefebb6073429))

# [3.1.0-alpha.4](https://github.com/energywebfoundation/iam-client-lib/compare/v3.1.0-alpha.3...v3.1.0-alpha.4) (2021-09-29)


### Bug Fixes

* **nats:** changed path to nats.ws from absolute to relative ([4671db9](https://github.com/energywebfoundation/iam-client-lib/commit/4671db99f20ae92846bb1ac2fcbab14150dc1156))

# [3.1.0-alpha.3](https://github.com/energywebfoundation/iam-client-lib/compare/v3.1.0-alpha.2...v3.1.0-alpha.3) (2021-09-29)


### Bug Fixes

* update ew-did to fix invalid signature ([867ecf2](https://github.com/energywebfoundation/iam-client-lib/commit/867ecf276a242c971b63b36b00af5e5593bb65fa))

# [3.1.0-alpha.2](https://github.com/energywebfoundation/iam-client-lib/compare/v3.1.0-alpha.1...v3.1.0-alpha.2) (2021-09-29)


### Bug Fixes

* **nats:** change in the way nats is referenced ([b4fd123](https://github.com/energywebfoundation/iam-client-lib/commit/b4fd1234d59fb78b99a128cd7ec4f8fc57e83487))

# [3.1.0-alpha.1](https://github.com/energywebfoundation/iam-client-lib/compare/v3.0.1-alpha.2...v3.1.0-alpha.1) (2021-09-23)


### Features

* **core:** expose chain and account on initializeConnection ([038fed6](https://github.com/energywebfoundation/iam-client-lib/commit/038fed677d83ff87173ef70701aa16fd2f686aaa))

## [3.0.1-alpha.2](https://github.com/energywebfoundation/iam-client-lib/compare/v3.0.1-alpha.1...v3.0.1-alpha.2) (2021-09-23)


### Bug Fixes

* **packaging:** update of nats.ws package to latest version ([d739480](https://github.com/energywebfoundation/iam-client-lib/commit/d73948069c1eba4c4098f55415305d0370f16dcd))

## [3.0.1-alpha.1](https://github.com/energywebfoundation/iam-client-lib/compare/v3.0.0...v3.0.1-alpha.1) (2021-09-22)

# [3.0.0](https://github.com/energywebfoundation/iam-client-lib/compare/v2.2.0...v3.0.0) (2021-09-21)


### Bug Fixes

* add subject in claim request ([7859337](https://github.com/energywebfoundation/iam-client-lib/commit/7859337fe91320ff474622ca2debaa9563fd72c0))
* adds build:api_docs to deployment process ([f191600](https://github.com/energywebfoundation/iam-client-lib/commit/f1916000a5827a62eb23ef6d6d9d3e362620459c))
* adds build:api_docs to deployment process ([6343e86](https://github.com/energywebfoundation/iam-client-lib/commit/6343e86fb9a07160f91179819e253caaf904a958))
* adds method to parse did ([8107ce8](https://github.com/energywebfoundation/iam-client-lib/commit/8107ce897a941a71579edd6baa47c091b86ebef4))
* auth semantic-release to gh ([4fa4c95](https://github.com/energywebfoundation/iam-client-lib/commit/4fa4c9503c030a2026ed932a33211681c9431d97))
* catch env detect error ([8c8edca](https://github.com/energywebfoundation/iam-client-lib/commit/8c8edca1ed9ea4b696cd81a3b1ca72e3e6358eee))
* check pub key from cache ([4f6180f](https://github.com/energywebfoundation/iam-client-lib/commit/4f6180fd9abe0f1aba34cc7a894c34bbaa77df48))
* check sub is DID ([4c8513f](https://github.com/energywebfoundation/iam-client-lib/commit/4c8513f16e11939103a41a4bf1484cacf468c525))
* correct description ([3fc3653](https://github.com/energywebfoundation/iam-client-lib/commit/3fc3653e5b0dc5f51b3d8c0122071c4ad4f666dc))
* create proxy operator for identity addr ([3e799a4](https://github.com/energywebfoundation/iam-client-lib/commit/3e799a42a059047a40ebb3b86d15750d5c055392))
* default claim subject to requester ([390d8fa](https://github.com/energywebfoundation/iam-client-lib/commit/390d8fa02dcaf47291705e4d3a8f41ad32efd47f))
* dont commit unstage ([eaf521b](https://github.com/energywebfoundation/iam-client-lib/commit/eaf521baeda8fba1b72db96b14d5a1dd48896ab3))
* double node migration ([101e4d2](https://github.com/energywebfoundation/iam-client-lib/commit/101e4d2b8fd6e29cb95343a018ef9d95b297566c))
* exporting interfaces for claim data. ([ac9d5d2](https://github.com/energywebfoundation/iam-client-lib/commit/ac9d5d269724a3190ac1081f464e82d78890685e))
* init did signer from Metamask ([d783d44](https://github.com/energywebfoundation/iam-client-lib/commit/d783d44b372ba1ae79b8d5c84c4d5e679d88a7df))
* login as different account issus ([5f75176](https://github.com/energywebfoundation/iam-client-lib/commit/5f75176ac6c07c214ac5e452354520a00ed46018))
* maintain login on reload ([9018f07](https://github.com/energywebfoundation/iam-client-lib/commit/9018f0747ee8a75baf1535aeb9f810d44fe13abf))
* make did to be address agnostic ([1831949](https://github.com/energywebfoundation/iam-client-lib/commit/1831949cdfbc7581fcb50783b075055e68b54e49))
* merge published master in dev ([5c7493d](https://github.com/energywebfoundation/iam-client-lib/commit/5c7493d53d2376c5991928af0c0c7caac3eaac67))
* no sense setting DID if address hasn't been set ([8b182df](https://github.com/energywebfoundation/iam-client-lib/commit/8b182df9f291bf09d1f526e6399fbeb9109ddffd))
* not create asset document ([9b91177](https://github.com/energywebfoundation/iam-client-lib/commit/9b91177d814de61a00960f120145f843168ebb60))
* persist gh token in action ([8ed156f](https://github.com/energywebfoundation/iam-client-lib/commit/8ed156f6d139bb8e8d1d45a70ae353d2d15f3bff))
* rename get claim flags ([435e360](https://github.com/energywebfoundation/iam-client-lib/commit/435e360c6ba0e8689a67570b74b22f926d2ce0dc))
* rename getIssuedClaims ([6dde43b](https://github.com/energywebfoundation/iam-client-lib/commit/6dde43bbf4de929dafc34343a0cf83fc87223a2d))
* rename getRequestedClaims ([3657128](https://github.com/energywebfoundation/iam-client-lib/commit/3657128121d7474b7df9b7515d43e3b1d7c3bff8))
* rename namespace query param ([11d7001](https://github.com/energywebfoundation/iam-client-lib/commit/11d7001d5b21a236e8e284642151074b262e24ba))
* replace GITHUB_TOKEN with PAT ([3c81daf](https://github.com/energywebfoundation/iam-client-lib/commit/3c81dafaa8efe6c64511cb92c57aa2f2a03f8af4))
* rm double develop fetch ([d2b5ac8](https://github.com/energywebfoundation/iam-client-lib/commit/d2b5ac86ce1c6ceb20e39d3dd56ec8ab8dc1b9ba))
* rm double develop fetch ([b1ef6b1](https://github.com/energywebfoundation/iam-client-lib/commit/b1ef6b1cf2453fd93adfc5b5a7294f4f70ef247d))
* scripts for building and testing in windows operating system ([50d02d5](https://github.com/energywebfoundation/iam-client-lib/commit/50d02d538d12461970b1beedb5e62707dd49959e))
* setting session in local storage after successful login. ([206bcaa](https://github.com/energywebfoundation/iam-client-lib/commit/206bcaaddde1f3b2795e27ac8526b30a65acc06c))
* throwing an error when initializing wallet provider. ([bea90e3](https://github.com/energywebfoundation/iam-client-lib/commit/bea90e3e2811a0580151ca080d915a2495476b07))
* use precise version of ew-did-registry packages ([4361bf5](https://github.com/energywebfoundation/iam-client-lib/commit/4361bf563b96f8db79ed79591f37400b4d618e3b))
* **cacheServerClient:** log in if refresh token is expired ([557a767](https://github.com/energywebfoundation/iam-client-lib/commit/557a76787a869a007475c06d941472d0e9ab77cf))
* **chainConfig:** fixed public RPC url for Volta ([8faf28f](https://github.com/energywebfoundation/iam-client-lib/commit/8faf28f009a9c47d21a9bd897096093ac121cc8a))
* **change_resolver:** remove import from ethers subpaths ([8397652](https://github.com/energywebfoundation/iam-client-lib/commit/83976526abc60d98f088afc6706c0efd214284ff))
* **claims:** revert rm Claim.subject ([8cebeee](https://github.com/energywebfoundation/iam-client-lib/commit/8cebeee4eb34b8815aa3eaa1a2f6fb77bf2dc0d5))
* **createClaimRequest:** use subjectAgreement ([427f4a8](https://github.com/energywebfoundation/iam-client-lib/commit/427f4a89b666501871abdacdb918c05410da84d3))
* **deleteClaim:** throw CacheClientNotProvided if necessary ([3af43ee](https://github.com/energywebfoundation/iam-client-lib/commit/3af43ee7cd3b386ae1523fefbd3183a78991be10))
* **iam:** parse claimData from requested token ([8de9935](https://github.com/energywebfoundation/iam-client-lib/commit/8de99356be7513c29fc046265c52173da7f534b7))
* **iam.issueClaim:** move claimTypeVersion into claimData ([3a72523](https://github.com/energywebfoundation/iam-client-lib/commit/3a72523bba45c841ff1b34f4492faf322ce28b1c))
* **iam.issueClaimRequest:** remove claimTypeVersion from jwt.decode ([5665ba1](https://github.com/energywebfoundation/iam-client-lib/commit/5665ba1c7e50adb2442119e65d8e00922a6c5596))
* **init:** prioritize loginToCacheServer key if available ([905fa75](https://github.com/energywebfoundation/iam-client-lib/commit/905fa75144cad794dc133021a736c41180ad65b9))
* **staking:** blockchain now ([768dc5d](https://github.com/energywebfoundation/iam-client-lib/commit/768dc5d7757beb921c462fad21c7d07e9050d1c9))
* **staking:** delay getters to return number ([253888f](https://github.com/energywebfoundation/iam-client-lib/commit/253888f01e5b8af9c603736e61629ba75ad58f00))
* **staking:** hardcode tx overrides ([5ed6eda](https://github.com/energywebfoundation/iam-client-lib/commit/5ed6edafed3235f023119886c422c164af04a925))
* **staking:** update iam-contracts ([bcd3bc9](https://github.com/energywebfoundation/iam-client-lib/commit/bcd3bc9cae41b3e34aa1f35ea120e7de65c6df7d))
* update asset manager ([2edbe6e](https://github.com/energywebfoundation/iam-client-lib/commit/2edbe6e875b498ff2244f0fa7b638da108bf3d37))
* updates documentation to state DID document perequisite ([4057da9](https://github.com/energywebfoundation/iam-client-lib/commit/4057da98a5e56c88fc7a472c79929babf7417a7f))
* verify prerequisites registered onchain ([3491357](https://github.com/energywebfoundation/iam-client-lib/commit/3491357234d88e329d7ffe91c9d6abf7a0768ca6))
* **staking:** withdrawalDelay ([f97fedf](https://github.com/energywebfoundation/iam-client-lib/commit/f97fedf24b1b606c6c6ee4d1b1bc5287b9ff2737))


### Performance Improvements

* decrease staking delay ([4eb64ad](https://github.com/energywebfoundation/iam-client-lib/commit/4eb64ad31a2a35343cc7d7ef6d8e7c88d689fe3e))
* mock ipfs in tests ([f710747](https://github.com/energywebfoundation/iam-client-lib/commit/f710747234e99ba3d3897e268ef908cee055aee4))
* remove listeners in tests ([3122275](https://github.com/energywebfoundation/iam-client-lib/commit/3122275c7bffb01285658c16f46d7b4b29f817ff))


* Merge pull request #254 from energywebfoundation/transfer_assets_use_address ([624e37c](https://github.com/energywebfoundation/iam-client-lib/commit/624e37c6844acdc7f728c0f023eea88ce63dc173)), closes [#254](https://github.com/energywebfoundation/iam-client-lib/issues/254)
* refactor!: rename verifyPublicToken param name ([1d65b89](https://github.com/energywebfoundation/iam-client-lib/commit/1d65b897484a7760a80c3fbfc87223a8287f6707))


### chore

* unsubscribe from given subscription ([6984c11](https://github.com/energywebfoundation/iam-client-lib/commit/6984c114a882561d6a739074984d4f67d2c571de))


### Code Refactoring

* **asset:** drop support for DID format when offering asset. Use address instead ([8e2836f](https://github.com/energywebfoundation/iam-client-lib/commit/8e2836fa7899f0926d1f4bf8f88b71ac1c949c38))
* rename initDID to createDocument ([585a4ee](https://github.com/energywebfoundation/iam-client-lib/commit/

### Features

* init signer by provider type ([00b4e56](https://github.com/energywebfoundation/iam-client-lib/commit/00b4e565f5fb91cf4ac110b25bf8222efd5e0a51))
* separate conn to cache and DID reg ([06b990b](https://github.com/energywebfoundation/iam-client-lib/commit/06b990b4b6b714e04756d43c2e9a582a5b8f0969))
* stake whole balance ([07ad380](https://github.com/energywebfoundation/iam-client-lib/commit/07ad380046bcf73a2739517216c786e9d56f9906))
* update did-reg package to fix EDR-36 ([f5dd772](https://github.com/energywebfoundation/iam-client-lib/commit/f5dd772f04314b16d78d40400f116b8ed971b1a2))
* update ew-did-registry ([639ff91](https://github.com/energywebfoundation/iam-client-lib/commit/639ff9171ad9e67c751108bcbbe6abea66a11ec7))
* **iam:** migrate legacy definitions during edit ([9656515](https://github.com/energywebfoundation/iam-client-lib/commit/9656515fc35235081bdcceea6e71ee2351d8cb7e))
* **staking:** check balance is sufficient ([0f049ee](https://github.com/energywebfoundation/iam-client-lib/commit/0f049ee55a270f85b58a83b2200394677fc79e26))
* **staking:** expose staking API ([6d6936f](https://github.com/energywebfoundation/iam-client-lib/commit/6d6936fe952240021f1975e47cb44d169c6c1aee))
* **staking:** speed up tx ([572d9dd](https://github.com/energywebfoundation/iam-client-lib/commit/572d9dded69392ce2e6cf9cc6250b0154596dd12))
* add @energyweb/iam-contracts ([00376e8](https://github.com/energywebfoundation/iam-client-lib/commit/00376e8703ef1e3e4137d39e6d020241e7ceefa7))
* add RegistrationTypes export ([1881b60](https://github.com/energywebfoundation/iam-client-lib/commit/1881b60270af22ed2014a49ada06183b517be1da))
* enroll with registration types ([d8f12d7](https://github.com/energywebfoundation/iam-client-lib/commit/d8f12d773eb51a3cf71fd567a3136c5c14ba403a))
* get claims by subjects ([0728bc4](https://github.com/energywebfoundation/iam-client-lib/commit/0728bc4371350621346fe8198bb5931f77777881))
* get role registration types ([ffd22ec](https://github.com/energywebfoundation/iam-client-lib/commit/ffd22ec1bbdf10287c7aa3b89082404db8ebc009))
* issue on-chain role ([db0d42a](https://github.com/energywebfoundation/iam-client-lib/commit/db0d42ad5baa5423d0fbb17a50fa8c7ba1e16e4c))
* issued claim includes only role info ([0d403a0](https://github.com/energywebfoundation/iam-client-lib/commit/0d403a0e1e0168fb2735fd6ba463ffb4303c646d))
* no need to provide issues to request role ([95dab41](https://github.com/energywebfoundation/iam-client-lib/commit/95dab417b83d136c844c69e56922eebbb395ce78))
* publish owned identity claim ([da8e375](https://github.com/energywebfoundation/iam-client-lib/commit/da8e375de66016c7974de101f93f3bdb1da8c3dc))
* read and write of new roledefinition smart contract ([dc632c8](https://github.com/energywebfoundation/iam-client-lib/commit/dc632c89cf3740eaed07ee378e854ac5708d68eb))
* request asset enrollment ([c65e883](https://github.com/energywebfoundation/iam-client-lib/commit/c65e88338c4c7405006a972eb9230fda5e5a716a))
* update iam-contracts to 1.15.2 ([c7dff19](https://github.com/energywebfoundation/iam-client-lib/commit/c7dff1998f67f91b3bd43f5342accd3083ec1c58))
* update identity manager address ([75bd012](https://github.com/energywebfoundation/iam-client-lib/commit/75bd0121763a2e92688b9d22751a6e238d78ce17))
* using IPublicClaim to issue credential ([12dcedf](https://github.com/energywebfoundation/iam-client-lib/commit/12dcedf47dc633d8f53fa005f815665bd4be8063))
* **assets:** add asset smart contract integration ([68b68db](https://github.com/energywebfoundation/iam-client-lib/commit/68b68dbdd1ec710a4132721eb06719cef730f2aa))


### BREAKING CHANGES

* transferring asset do not allow anymore to use DID format. Allowed is address.
* **asset:** transferring asset do not allow anymore to use DID format. Allowed is address.
* Rename the prop name from `issuedToken` to `claimUrl` in method `verifyPublicClaim` in `IAM` class.
* change initialization API
* signature of unsubscribe and subscribe changed

# [3.0.0-alpha.53](https://github.com/energywebfoundation/iam-client-lib/compare/v3.0.0-alpha.52...v3.0.0-alpha.53) (2021-09-17)


### Bug Fixes

* double node migration ([101e4d2](https://github.com/energywebfoundation/iam-client-lib/commit/101e4d2b8fd6e29cb95343a018ef9d95b297566c))


### Performance Improvements

* decrease staking delay ([4eb64ad](https://github.com/energywebfoundation/iam-client-lib/commit/4eb64ad31a2a35343cc7d7ef6d8e7c88d689fe3e))
* remove listeners in tests ([3122275](https://github.com/energywebfoundation/iam-client-lib/commit/3122275c7bffb01285658c16f46d7b4b29f817ff))

# [3.0.0-alpha.52](https://github.com/energywebfoundation/iam-client-lib/compare/v3.0.0-alpha.51...v3.0.0-alpha.52) (2021-09-16)


### Bug Fixes

* auth semantic-release to gh ([4fa4c95](https://github.com/energywebfoundation/iam-client-lib/commit/4fa4c9503c030a2026ed932a33211681c9431d97))
* persist gh token in action ([8ed156f](https://github.com/energywebfoundation/iam-client-lib/commit/8ed156f6d139bb8e8d1d45a70ae353d2d15f3bff))
* replace GITHUB_TOKEN with PAT ([3c81daf](https://github.com/energywebfoundation/iam-client-lib/commit/3c81dafaa8efe6c64511cb92c57aa2f2a03f8af4))


### Performance Improvements

* mock ipfs in tests ([f710747](https://github.com/energywebfoundation/iam-client-lib/commit/f710747234e99ba3d3897e268ef908cee055aee4))

# [3.0.0-alpha.51](https://github.com/energywebfoundation/iam-client-lib/compare/v3.0.0-alpha.50...v3.0.0-alpha.51) (2021-09-15)


### Features

* stake whole balance ([07ad380](https://github.com/energywebfoundation/iam-client-lib/commit/07ad380046bcf73a2739517216c786e9d56f9906))
