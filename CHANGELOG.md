# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.0.4](https://github.com/epos-next/web/compare/v0.0.0...v0.0.4) (2021-08-20)


### Features

* **ads:** handle error on advertisement list ([1ef50ed](https://github.com/epos-next/web/commit/1ef50ed0b10b4ccf77acf7bee002bd7465de30c2))
* **controlWorks:** handle error on control work list ([9fe9e72](https://github.com/epos-next/web/commit/9fe9e721fc7f1e78d7ec24edc64fd02080a7a4b6))


### Bug Fixes

* **apiService:** remove success bool from return type of authenticate() ([f205af4](https://github.com/epos-next/web/commit/f205af4e0bcc39c5acb614fb23df65f58f4d9cac))
* **test:** change date-input location ([72b6953](https://github.com/epos-next/web/commit/72b69539bf7f3c7af2e5fb9293547686032a5d0b))

## [0.0.3](https://github.com/epos-next/web/compare/0.0.2...0.0.3) - 2021-08-12

### Commits

- fix 0.0.3 date [`20caed9`](https://github.com/epos-next/web/commit/20caed9daec7d69946478fa71afc8a3819cc5a90)
- Cover services with unit tests [`ad78d53`](https://github.com/epos-next/web/commit/ad78d530755ccf7009917e2292553db62299482b)
- test: ApiService.getData [`6840ee0`](https://github.com/epos-next/web/commit/6840ee0c4b1ec88eb17e4ba049c17f940f34df6f)
- fix(CacheServiceTests): replace jest.fb with jest.spyOn [`0fbab91`](https://github.com/epos-next/web/commit/0fbab919a757213327dc9033172f9a219d26c7c3)
- test(CacheService): setIsHomeworkDone [`050f65a`](https://github.com/epos-next/web/commit/050f65a10cde4e1e0adb5cf6dad627239feacfcf)
- test(CacheService): setWeekSchedule [`b4ed43f`](https://github.com/epos-next/web/commit/b4ed43f8faa6de2d3d5869009bc963c16561b182)
- test: ApiService.getLessons [`34db1cb`](https://github.com/epos-next/web/commit/34db1cb636ce8d3d38f6985e84f6872bd3178eb8)
- test: cover data service with unit tests [`f6f1ca4`](https://github.com/epos-next/web/commit/f6f1ca402f08de9718680157fca6931fff044d32)
- test: ApiService.createAdvertisement [`00d47e3`](https://github.com/epos-next/web/commit/00d47e300e7bcc8818eef07f33c81f947033c5fe)
- test: ApiService.createControlWork [`7144387`](https://github.com/epos-next/web/commit/714438798ae70d3d8661207ca0729b5728979af7)
- test(CacheService): getScheduleAt() [`7e18b5f`](https://github.com/epos-next/web/commit/7e18b5f1e420052003662c8483ad80286990bc9f)
- test(CacheService): getMarks [`2af97e3`](https://github.com/epos-next/web/commit/2af97e36a2a2d1730a8cbed1f8039a40b3388069)
- improve CacheService.setWeekSchedule [`86cb336`](https://github.com/epos-next/web/commit/86cb336cf54a26de7217bdf3354ad535221a6aa3)
- test(CacheService): get showWelcomeTile() [`314a7b1`](https://github.com/epos-next/web/commit/314a7b19143ba1d4a5776763fefa76b0586baa15)
- test(CacheService): set bigDataObject [`ef8ed5c`](https://github.com/epos-next/web/commit/ef8ed5cf1e2247eb841d7992b0f913c54227b621)
- test(CacheService): getControlWorks [`9afa38c`](https://github.com/epos-next/web/commit/9afa38c56ca3cb464a0c03ead1dfee88d5a86419)
- test(CacheService): getAdvertisements [`9722f6c`](https://github.com/epos-next/web/commit/9722f6c338c8c85187416ec5fd9446a3b8faca32)
- test(CacheService): isEmpty [`fc14935`](https://github.com/epos-next/web/commit/fc14935208281e5bd6998fec05c3334366f7e419)
- test(CacheService): getUser [`e7a3f15`](https://github.com/epos-next/web/commit/e7a3f157431697d71acefbee435344ddd8b63abc)
- update changelog [`5d1965f`](https://github.com/epos-next/web/commit/5d1965fa040cf2189381ca45c8a428ced0682e8c)
- test(CacheService): clearAll [`216bbe4`](https://github.com/epos-next/web/commit/216bbe40aeabd4e72ff1b16771de457e9f2b63a4)
- test(CacheService): getHomework [`7caa83d`](https://github.com/epos-next/web/commit/7caa83dd468e327f58795fe43838472ed0d27ffc)
- test(CacheService): setHomework [`9f9b907`](https://github.com/epos-next/web/commit/9f9b90786a185158085dd0408b2496e5c08e20ac)
- test(CacheService): setAdvertisements [`3eada8d`](https://github.com/epos-next/web/commit/3eada8d724629d7c275c995dd845f5b2dfb2dd12)
- test(CacheService): setMarks [`d893ba3`](https://github.com/epos-next/web/commit/d893ba3fb44a63f1f034859208e77c9d1efd853b)
- test(CacheService): setControlWorks [`3a92bbe`](https://github.com/epos-next/web/commit/3a92bbeb583b74f03ff6f80865f715c922efe581)
- test(CacheService): setUser [`c4ee191`](https://github.com/epos-next/web/commit/c4ee191c39a287d3f7b521cb3983ad92c274bcbf)
- test(CacheService): addAdvertisement [`f4ef7da`](https://github.com/epos-next/web/commit/f4ef7daa66732c34a1ee90912d20b47813ee45d4)
- test(CacheService): doNotShowWelcomeTile [`d3f089a`](https://github.com/epos-next/web/commit/d3f089a3cada670be1c4441487cc1b2bf7eb4a34)
- test(CacheService): addControlWork [`9f7fa41`](https://github.com/epos-next/web/commit/9f7fa415877280997f7596ba52a88ad64833b52c)
- refactor: remove deprecated CachedSchedule type [`ac25b04`](https://github.com/epos-next/web/commit/ac25b04f0571b0b6cf0596ec7cb905ac1f8c04aa)
- rename test page to prevent testing it with jest [`2ce0125`](https://github.com/epos-next/web/commit/2ce012552d6768024784e62c16b729564725e2c8)

## 0.0.2 - 2021-08-11

### Commits

- add changelog [`34fa032`](https://github.com/epos-next/web/commit/34fa032c948249f9f32fd88cdf11bbb2d444fd65)
- refactor: Impove reducers and split state management  [`ccd2f61`](https://github.com/epos-next/web/commit/ccd2f6161c00ddd23ffca57f22c8e2d193e3fb97)
- move project from @zotovY to @epos-next organisation [`4066e1c`](https://github.com/epos-next/web/commit/4066e1c61485c1fb45d63afc1d319afd74f99934)
- setup jest [`f26e094`](https://github.com/epos-next/web/commit/f26e0948623b51417fb78f10c610f2d909044e98)
- Revert "Revert "test(HomePage) by screenshots"" [`7ff24b3`](https://github.com/epos-next/web/commit/7ff24b36547cb054adce11825186e9c56d505363)
- Revert "test(HomePage) by screenshots" [`259ec53`](https://github.com/epos-next/web/commit/259ec5319a2ef7d049b24b907bb0db51c1e328cb)
- test(HomePage) by screenshots [`ff54dd0`](https://github.com/epos-next/web/commit/ff54dd052c5df76744ea902f1287cc66b272b06a)
- add cypress and start-server-and-test dev dependencies [`17c55a1`](https://github.com/epos-next/web/commit/17c55a11b4bb8b6dd0638adfcc3dc11b9d3fde37)
- remove useHomePage [`63fdbf9`](https://github.com/epos-next/web/commit/63fdbf98f79ea87283e3048d014340740ef4bba7)
- split ads and control work to independent component [`8ba2a50`](https://github.com/epos-next/web/commit/8ba2a5013d14ce43c5a6728ef8b02710406fb5a8)
- rewrite store interaction [`98be20b`](https://github.com/epos-next/web/commit/98be20be7dec447c6e020301313a74d18f073120)
- rewrite lessons and user reducers using redix-toolkit [`5e8bb51`](https://github.com/epos-next/web/commit/5e8bb5173eda9659b8a2708eb9ac8784366f94a2)
- setup cypress [`0c8f5df`](https://github.com/epos-next/web/commit/0c8f5df48d5aa4c39a07ac9ed68de994a58f8d09)
- test: login page [`42165aa`](https://github.com/epos-next/web/commit/42165aaf758847a767954c1310e6ad91a69c5ce0)
- Revert "change(TimeLeft): logic inside component" [`dbd5551`](https://github.com/epos-next/web/commit/dbd5551fc2722293fb3d6c7f25534f90e7e99785)
- change(TimeLeft): logic inside component [`3521331`](https://github.com/epos-next/web/commit/3521331f22390ad09cc68759a5c22e669d0ee55a)
- split next lesson logic in independent component [`4914c51`](https://github.com/epos-next/web/commit/4914c51eb6484c560aa43b331fba2494536fa54a)
- Revert "change(ControlWorkState) to be like sealed" [`dc36a5e`](https://github.com/epos-next/web/commit/dc36a5e759853c5f4f10f76d7f935a0ef4a02678)
- change(ControlWorkState) to be like sealed [`539d55c`](https://github.com/epos-next/web/commit/539d55cf3aa3e731a99615b09483ade9d4ec38ef)
- Revert "change(UserState) to be like sealed" [`b753532`](https://github.com/epos-next/web/commit/b75353238842f30b1d3edc1dcf12d2593f38e98b)
- change(UserState) to be like sealed [`0ecc58f`](https://github.com/epos-next/web/commit/0ecc58f3ba8d0b53999815a0a671dcda26c27d8c)
- Revert "change(AdState) to be like sealed" [`22048d4`](https://github.com/epos-next/web/commit/22048d4d06c6094e388c269aa05655057c6bbf28)
- change(AdState) to be like sealed [`695a57c`](https://github.com/epos-next/web/commit/695a57c971f4e2563a2f88cbfc97bf8079c4fd0c)
- split homework list logic in independent component [`d0db761`](https://github.com/epos-next/web/commit/d0db7610f25dabd555690093efbdc2658a4d6f04)
- rewrite advertisement reducer using redux-toolkit [`ec25b50`](https://github.com/epos-next/web/commit/ec25b506c0a3195604624f645a9ac4ce4020e56b)
- rewrite control work reducer using redux-toolkit [`355c515`](https://github.com/epos-next/web/commit/355c5157c5f76600906488af94869bbd18c1ebb6)
- Revert "change(NextLesson): logic inside component" [`f8727f0`](https://github.com/epos-next/web/commit/f8727f02c7ef8c59d4ff4e6455772e2f37a108da)
- change(NextLesson): logic inside component [`ba3b2c9`](https://github.com/epos-next/web/commit/ba3b2c9028852d54a064ce6078663493b052a0ca)
- rewrite homework reducer using redux-toolkit [`6828644`](https://github.com/epos-next/web/commit/6828644fe5541d60ecb719aba16d44b25cc736cb)
- Revert "split Lesson reducer and change to be like sealed" [`a03a0f8`](https://github.com/epos-next/web/commit/a03a0f8a24382876d2a476584d6805bb107db2ad)
- split Lesson reducer and change to be like sealed [`e1e2ae6`](https://github.com/epos-next/web/commit/e1e2ae61c7866007360e0e6a77840eecf1c82a4a)
- cover lesson-reducer with unit tests [`b5e21a8`](https://github.com/epos-next/web/commit/b5e21a81cdf51404b6bcc19ba988e8dc2d603d3d)
- Revert "change(NextLessonsState) to be like sealed" [`759ae83`](https://github.com/epos-next/web/commit/759ae83ba523c45dc9e8302994d2c29e459749f0)
- change(NextLessonsState) to be like sealed [`cfa8b2e`](https://github.com/epos-next/web/commit/cfa8b2ee84942c9030637004f39532ad83ba8734)
- Revert "change(MarksState) to be like sealed" [`2746006`](https://github.com/epos-next/web/commit/274600603b19dd76e4f9dbc8e75081b25b17406c)
- change(MarksState) to be like sealed [`8c1b806`](https://github.com/epos-next/web/commit/8c1b8068097571d7314e67a10045c8aea2a86691)
- Revert "change(HomeworkState) to be liked sealed" [`c44d52b`](https://github.com/epos-next/web/commit/c44d52bb720ea3b1e621585afe7b8a6b0d07866c)
- change(HomeworkState) to be liked sealed [`7cf369d`](https://github.com/epos-next/web/commit/7cf369d801d29aaf96761ccd3b61d162162dde24)
- change(SideMenuLayout): remove props and start using side menu [`44d6fb0`](https://github.com/epos-next/web/commit/44d6fb0b410a69a08cf06098878ecf4cb3982bb5)
- cover control-work reducer with unit tests [`425684c`](https://github.com/epos-next/web/commit/425684ce084fad71bc326cc16f430ec249c8de77)
- cover advertisement-reducer with unit tests [`c1db0bf`](https://github.com/epos-next/web/commit/c1db0bf7e5358a2dd708d5c140154e285e84bbd2)
- cover marks-reducer with unit tests [`2fe7387`](https://github.com/epos-next/web/commit/2fe7387d391a1416772fffff219f0023438c5240)
- cover homework-reducer with unit tests [`00f7dca`](https://github.com/epos-next/web/commit/00f7dcad53d4de0396bb15a2a0aef9c116293e6b)
- rewrite marks reducer using redux-toolkit [`c637101`](https://github.com/epos-next/web/commit/c637101e1f20a1ae30862cb9f0399d44dd086d84)
- cover user-reducer with unit tests [`cce94dc`](https://github.com/epos-next/web/commit/cce94dc4c451e6ea80e6d503f3502395d419e6e1)
- fix typescript paths for jest [`31616cb`](https://github.com/epos-next/web/commit/31616cb5bed82d297e53a3ddb0865cba984ac305)
- fix(login): save email and password as state [`506ba3b`](https://github.com/epos-next/web/commit/506ba3bc7241daa3aebf3385bc28e2077929cc46)
- add .DS_Store to .gitignore [`505f840`](https://github.com/epos-next/web/commit/505f8401cf861971305f7ec5e83b05abd349ac05)
