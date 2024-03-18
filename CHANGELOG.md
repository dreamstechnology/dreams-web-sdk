# 2.0.0

### BREAKING CHANGES

- No more default export of `DreamsSDK`.
  Instead of `const DreamsSDK = require('dreams-web-sdk')` use
  `const { DreamsSDK } = require('dreams-web-sdk')`. Please refer to new
  examples in the [README.md](https://github.com/dreamstechnology/dreams-web-sdk/blob/v2.0.0/README.md)
  and in the [examples](https://github.com/dreamstechnology/dreams-web-sdk/blob/v2.0.0/examples) folder.

### Features

- Distributions in all of UMD, ESM and CJS module systems, as well as Typescript type definitions

### Bug Fixes

- Exported missing type declarations
  - `TransferConsentRequestedEvent`,
  - `TransferConsentRequestedMessage`,
  - `TransferConsentRequestCancelledMessage`,
  - `TransferConsentRequestSucceededMessage`

## [1.4.1](https://github.com/dreamstechnology/dreams-web-sdk/compare/v1.4.0...v1.4.1) (2023-08-09)

# [1.4.0](https://github.com/dreamstechnology/dreams-web-sdk/compare/v1.3.0...v1.4.0) (2023-03-24)


### Features

* **account requested:** implementation ([#36](https://github.com/dreamstechnology/dreams-web-sdk/issues/36)) ([40dca39](https://github.com/dreamstechnology/dreams-web-sdk/commit/40dca394f7437062ea935fb15ecd27315ec8650b))

# [1.3.0](https://github.com/dreamstechnology/dreams-web-sdk/compare/v1.2.0...v1.3.0) (2023-01-03)


### Features

* **transfer consent:** implementation ([9bbc58b](https://github.com/dreamstechnology/dreams-web-sdk/commit/9bbc58b7cc896c2f938afd8648c45baf9d32194d))
* **transfer consent:** implementation ([d165581](https://github.com/dreamstechnology/dreams-web-sdk/commit/d16558104fd0e51670776a58a07e471aa43412d5))

# [1.2.0](https://github.com/dreamstechnology/dreams-web-sdk/compare/v1.1.0...v1.2.0) (2022-03-28)


### Features

* **oninvestmentsellrequest:** implementation ([6827d2c](https://github.com/dreamstechnology/dreams-web-sdk/commit/6827d2cc211099579b1fad212f1cf77c05437a96))

# [1.1.0](https://github.com/dreamstechnology/dreams-web-sdk/compare/v1.0.0...v1.1.0) (2022-03-16)


### Features

* **provisioning:** add errorUrl and cancelUrl ([768d9e4](https://github.com/dreamstechnology/dreams-web-sdk/commit/768d9e42c357d27715b7b5d0eb5738d127f2d614))

# [1.0.0](https://github.com/dreamstechnology/dreams-web-sdk/compare/v0.3.1...v1.0.0) (2022-03-15)


### Bug Fixes

* **events:** partner events ([24efafb](https://github.com/dreamstechnology/dreams-web-sdk/commit/24efafb516b2ccde40fe986f98c933d83dce1407))


### BREAKING CHANGES

* **events:** new PartnerEvent types

## [0.3.1](https://github.com/dreamstechnology/dreams-web-sdk/compare/v0.3.0...v0.3.1) (2022-03-04)


### Bug Fixes

* require redirect url in investmern provision msg ([baddc76](https://github.com/dreamstechnology/dreams-web-sdk/commit/baddc76344b6774fe29a526b3205baf78c9ec8e8))

# [0.3.0](https://github.com/dreamstechnology/dreams-web-sdk/compare/v0.2.2...v0.3.0) (2022-02-08)


### Bug Fixes

* don't require dreamId in account provision message ([3bf1bae](https://github.com/dreamstechnology/dreams-web-sdk/commit/3bf1baefee05d5628106a697525e222a2e2fb843))
* export client callbacks for later usage ([303b098](https://github.com/dreamstechnology/dreams-web-sdk/commit/303b0982143e64e6d6789a1cfa0d339e08222658))
* fix how messages are used in web-sdk ([2aea221](https://github.com/dreamstechnology/dreams-web-sdk/commit/2aea221cf1c74a6e2b6ebd24e8dff7756a8680ca))
* investment callback has to return something ([5194854](https://github.com/dreamstechnology/dreams-web-sdk/commit/51948543155a7cd1e0a7bff4e64dff9e4ed5eaa6))
* messages ([66d9d99](https://github.com/dreamstechnology/dreams-web-sdk/commit/66d9d9923ebfbc684bfaa1cad9d3e7b90ce2d903))
* messages ([1bb3125](https://github.com/dreamstechnology/dreams-web-sdk/commit/1bb312511e2e4f8d66f4bc1c3e5ddd2cdce5131b))
* rename messages and it's usage ([f1d3845](https://github.com/dreamstechnology/dreams-web-sdk/commit/f1d3845b45fb2c13682e7511abf711ccbb76712f))
* typo ([9a612f9](https://github.com/dreamstechnology/dreams-web-sdk/commit/9a612f911ba1c8f2390af365d14338c506c9e9ae))


### Features

* add on investment account provision requested handler ([417ffda](https://github.com/dreamstechnology/dreams-web-sdk/commit/417ffdaa10d554a03bfe1de1d418e232fd7c311c))

## [0.2.2](https://github.com/dreamstechnology/dreams-web-sdk/compare/v0.2.1...v0.2.2) (2022-02-04)

## [0.2.1](https://github.com/dreamstechnology/dreams-web-sdk/compare/v0.2.0...v0.2.1) (2022-01-21)

# [0.2.0](https://github.com/getdreams/dreams-web-sdk/compare/v0.1.5...v0.2.0) (2021-11-19)


### Features

* pass location param as an input in the form ([8a0e174](https://github.com/getdreams/dreams-web-sdk/commit/8a0e174f3895a3c8110af18a8d3895b3dc639dad))

## [0.1.5](https://github.com/getdreams/dreams-web-sdk/compare/v0.1.4...v0.1.5) (2021-10-20)


### Bug Fixes

* **deps:** bump dev dependencies ([28e6544](https://github.com/getdreams/dreams-web-sdk/commit/28e65440dded7ca4dff0d75b53ca1f55250a7bda))

## [0.1.4](https://github.com/getdreams/dreams-web-sdk/compare/v0.1.3...v0.1.4) (2021-10-20)

## [0.1.3](https://github.com/getdreams/dreams-web-sdk/compare/v0.1.2...v0.1.3) (2021-10-06)

## [0.1.2](https://github.com/getdreams/dreams-web-sdk/compare/v0.1.1...v0.1.2) (2021-10-06)


### Bug Fixes

* change how we export modules ([dca0348](https://github.com/getdreams/dreams-web-sdk/commit/dca03485dcba3935296f47eb0ff7bb39fc622a97))

## [0.1.1](https://github.com/getdreams/dreams-web-sdk/compare/v0.1.0...v0.1.1) (2021-10-06)
