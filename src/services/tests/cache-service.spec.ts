import CacheService from "@services/cache-service";
import moment from "moment";
import {
    ad,
    adsList,
    bdo,
    controlWork,
    controlWorkList,
    homework,
    homeworkList,
    marks,
    randomLessons,
    savedRandomLessonByISODates,
    schedule,
    user
} from "../../../test/fixtures";

describe("Testing cache service", () => {
    afterEach(() => {
        // @ts-ignore
        delete global["localStorage"];
        jest.clearAllMocks();
    })

    describe("testing get showWelcomeTile", () => {
        afterAll(() => {
            // @ts-ignore
            delete global["localStorage"]
            jest.clearAllMocks();
        })

        it("should get correct result if it's in cache #1", () => {
            global["localStorage"] = {
                key: jest.fn(),
                length: 0,
                removeItem: jest.fn(),
                setItem: jest.fn(),
                clear: jest.fn(),
                getItem: jest.fn().mockReturnValueOnce("true")
            };

            expect(CacheService.showWelcomeTile).toBe(true);
        })

        it("should get correct result if it's in cache #2", () => {
            global["localStorage"] = {
                key: jest.fn(),
                length: 0,
                removeItem: jest.fn(),
                setItem: jest.fn(),
                clear: jest.fn(),
                getItem: jest.fn().mockReturnValueOnce("false")
            };

            expect(CacheService.showWelcomeTile).toBe(false);
        })

        it("should return true if no localstorage is null", () => {
            expect(CacheService.showWelcomeTile).toBe(true);
        });

        it("should return false if not cached", () => {
            global["localStorage"] = {
                key: jest.fn(),
                length: 0,
                removeItem: jest.fn(),
                setItem: jest.fn(),
                clear: jest.fn(),
                getItem: jest.fn().mockReturnValueOnce(null)
            };

            expect(CacheService.showWelcomeTile).toBe(true);
        })
    });

    it("should save marker that no need to show welcome tile", () => {
        const localStorageMock = {
            key: jest.fn(),
            length: 0,
            removeItem: jest.fn(),
            setItem: jest.fn(),
            clear: jest.fn(),
            getItem: jest.fn()
        };
        global["localStorage"] = localStorageMock

        CacheService.doNotShowWelcomeTile()
        expect(localStorageMock.setItem).toBeCalledWith("need-show-welcome-tile", "false")
    });

    describe("testing set bigDataObject", () => {
        afterAll(() => {
            // @ts-ignore
            delete global["localStorage"]
            jest.clearAllMocks();
            // @ts-ignore

        })

        it("should cache bdo", () => {

            const setUser = jest.spyOn(CacheService, "setUser").mockImplementation();
            const setWeekSchedule = jest.spyOn(CacheService, "setWeekSchedule").mockImplementation();
            const setHomework = jest.spyOn(CacheService, "setHomework").mockImplementation();
            const setControlWorks = jest.spyOn(CacheService, "setControlWorks").mockImplementation();
            const setAdvertisements = jest.spyOn(CacheService, "setAdvertisements").mockImplementation();
            const setMarks = jest.spyOn(CacheService, "setMarks").mockImplementation();

            CacheService.bigDataObject = bdo;

            expect(CacheService.setUser).toBeCalledWith(bdo.user);
            expect(CacheService.setUser).toBeCalledTimes(1);
            expect(CacheService.setWeekSchedule).toBeCalledWith(bdo.lessons);
            expect(CacheService.setWeekSchedule).toBeCalledTimes(1);
            expect(CacheService.setHomework).toBeCalledWith(bdo.homework);
            expect(CacheService.setHomework).toBeCalledTimes(1);
            expect(CacheService.setControlWorks).toBeCalledWith(bdo.controlWorks);
            expect(CacheService.setControlWorks).toBeCalledTimes(1);
            expect(CacheService.setAdvertisements).toBeCalledWith(bdo.advertisements);
            expect(CacheService.setAdvertisements).toBeCalledTimes(1);
            expect(CacheService.setMarks).toBeCalledWith(bdo.marks);
            expect(CacheService.setMarks).toBeCalledTimes(1);

            setUser.mockRestore();
            setWeekSchedule.mockRestore();
            setHomework.mockRestore();
            setControlWorks.mockRestore();
            setAdvertisements.mockRestore();
            setMarks.mockRestore();
        });

        it("should ignore null argument", () => {
            const setUser = jest.spyOn(CacheService, "setUser").mockImplementation();
            const setWeekSchedule = jest.spyOn(CacheService, "setWeekSchedule").mockImplementation();
            const setHomework = jest.spyOn(CacheService, "setHomework").mockImplementation();
            const setControlWorks = jest.spyOn(CacheService, "setControlWorks").mockImplementation();
            const setAdvertisements = jest.spyOn(CacheService, "setAdvertisements").mockImplementation();
            const setMarks = jest.spyOn(CacheService, "setMarks").mockImplementation();

            CacheService.bigDataObject = null;

            expect(CacheService.setUser).not.toBeCalled();
            expect(CacheService.setWeekSchedule).not.toBeCalled();
            expect(CacheService.setHomework).not.toBeCalled();
            expect(CacheService.setControlWorks).not.toBeCalled();
            expect(CacheService.setAdvertisements).not.toBeCalled();
            expect(CacheService.setMarks).not.toBeCalled();

            setUser.mockRestore();
            setWeekSchedule.mockRestore();
            setHomework.mockRestore();
            setControlWorks.mockRestore();
            setAdvertisements.mockRestore();
            setMarks.mockRestore();
        })
    })

    describe("testing getScheduleAt()", () => {
        afterAll(() => {
            // @ts-ignore
            delete global["localStorage"]
            jest.clearAllMocks();
        })
        describe("should get correct schedule", () => {
            it("should get correct schedule #1", () => {
                global["localStorage"] = {
                    key: jest.fn(),
                    length: 0,
                    removeItem: jest.fn(),
                    setItem: jest.fn(),
                    clear: jest.fn(),
                    getItem: jest.fn().mockReturnValueOnce(JSON.stringify(schedule))
                };
                expect(CacheService.getScheduleAt(new Date(2021, 11, 21))).toEqual(schedule["2021-12-20T19:00:00.000Z"])
            });

            it("should get correct schedule #2", () => {
                global["localStorage"] = {
                    key: jest.fn(),
                    length: 0,
                    removeItem: jest.fn(),
                    setItem: jest.fn(),
                    clear: jest.fn(),
                    getItem: jest.fn().mockReturnValueOnce(JSON.stringify(schedule))
                };
                expect(CacheService.getScheduleAt(new Date(2021, 11, 22))).toEqual(schedule["2021-12-21T19:00:00.000Z"])
            });

            it("should get correct schedule #3", () => {
                global["localStorage"] = {
                    key: jest.fn(),
                    length: 0,
                    removeItem: jest.fn(),
                    setItem: jest.fn(),
                    clear: jest.fn(),
                    getItem: jest.fn().mockReturnValueOnce(JSON.stringify(schedule))
                };
                expect(CacheService.getScheduleAt(new Date(2021, 11, 23))).toEqual(schedule["2021-12-22T19:00:00.000Z"])
            });

            it("should get correct schedule #4", () => {
                expect(CacheService.getScheduleAt(new Date(2021, 11, 25))).toEqual(null)
            });
        })

        it("should return null if localStorage is null", () => {
            expect(CacheService.getScheduleAt(new Date(2021, 11, 21))).toEqual(null)
        });
    })

    describe("testing setWeekSchedule", () => {
        afterAll(() => {
            // @ts-ignore
            delete global["localStorage"]
            jest.clearAllMocks();
        })

        it("should correct set empty week schedule", () => {
            global["localStorage"] = {
                key: jest.fn(),
                length: 0,
                removeItem: jest.fn(),
                setItem: jest.fn((_, value) => {
                    const obj = JSON.parse(value);
                    for (let key of Object.keys(obj)) {
                        obj[key].sort((a: any, b: any) => a.id >= b.id ? 1 : -1);
                    }
                    expect(obj).toEqual(savedRandomLessonByISODates)
                }),
                clear: jest.fn(),
                getItem: jest.fn().mockReturnValueOnce(null)
            };

            CacheService.setWeekSchedule(randomLessons);
        });

        it("should use previously cached week schedule", () => {
            global["localStorage"] = {
                key: jest.fn(),
                length: 0,
                removeItem: jest.fn(),
                setItem: jest.fn((_, value) => {
                    expect(JSON.parse(value)).toEqual({
                        "2021-12-20T19:00:00.000Z": [
                            {
                                "date": "2021-12-20T19:00:00.000Z",
                                "duration": 40,
                                "groupId": 1,
                                "id": 3,
                                "room": "202",
                                "subject": "Алгебра"
                            }
                        ],
                        "2021-12-21T19:00:00.000Z": [
                            {
                                "date": "2021-12-21T19:00:00.000Z",
                                "duration": 40,
                                "groupId": 1,
                                "id": 1,
                                "room": "202",
                                "subject": "Алгебра"
                            }
                        ]
                    })
                }),
                clear: jest.fn(),
                getItem: jest.fn(() => {
                    return JSON.stringify({
                        "2021-12-20T19:00:00.000Z": [
                            {
                                "date": "2021-12-20T19:00:00.000Z",
                                "duration": 40,
                                "groupId": 1,
                                "id": 0,
                                "room": "202",
                                "subject": "Алгебра"
                            }
                        ],
                    })
                })
            };

            CacheService.setWeekSchedule([
                {
                    "date": "2021-12-20T19:00:00.000Z",
                    "duration": 40,
                    "groupId": 1,
                    "id": 3,
                    "room": "202",
                    "subject": "Алгебра"
                },
                {
                    "date": "2021-12-21T19:00:00.000Z",
                    "duration": 40,
                    "groupId": 1,
                    "id": 1,
                    "room": "202",
                    "subject": "Алгебра"
                },

            ]);
        });
    })

    it("should setHomework", () => {
        const mockLocalStorage = {
            key: jest.fn(),
            length: 0,
            removeItem: jest.fn(),
            setItem: jest.fn(),
            clear: jest.fn(),
            getItem: jest.fn()
        };
        global["localStorage"] = mockLocalStorage

        CacheService.setHomework(homeworkList);

        expect(mockLocalStorage.setItem).toBeCalledTimes(1);
        expect(mockLocalStorage.setItem).toBeCalledWith("cached-homework", JSON.stringify(homeworkList));
    });

    it("should getHomework", () => {
        const mockLocalStorage = {
            key: jest.fn(),
            length: 0,
            removeItem: jest.fn(),
            setItem: jest.fn(),
            clear: jest.fn(),
            getItem: jest.fn().mockReturnValueOnce(JSON.stringify(homeworkList))
        };
        global["localStorage"] = mockLocalStorage

        expect(CacheService.getHomework()).toEqual(homeworkList);

        expect(mockLocalStorage.getItem).toBeCalledTimes(1);
        expect(mockLocalStorage.getItem).toBeCalledWith("cached-homework");
    });

    describe("testing setIsHomeworkDone()", () => {
        // @ts-ignore
        afterEach(() => delete global["localStorage"])

        it("should set correctly #1", () => {
            const mockLocalStorage = {
                key: jest.fn(),
                length: 0,
                removeItem: jest.fn(),
                setItem: jest.fn(),
                clear: jest.fn(),
                getItem: jest.fn()
                    .mockReturnValueOnce(JSON.stringify([{ ...homework, id: 124 }, ...homeworkList]))
            };
            global["localStorage"] = mockLocalStorage

            CacheService.setIsHomeworkDone(124, true);

            expect(mockLocalStorage.setItem).toBeCalledWith("cached-homework", JSON.stringify(
                [{ ...homework, id: 124, done: true }, ...homeworkList]
            ))
        });

        it("should set correctly #2", () => {
            const mockLocalStorage = {
                key: jest.fn(),
                length: 0,
                removeItem: jest.fn(),
                setItem: jest.fn(),
                clear: jest.fn(),
                getItem: jest.fn()
                    .mockReturnValueOnce(JSON.stringify([{ ...homework, id: 124 }, ...homeworkList]))
            };
            global["localStorage"] = mockLocalStorage

            CacheService.setIsHomeworkDone(124, false);

            expect(mockLocalStorage.setItem).toBeCalledWith("cached-homework", JSON.stringify(
                [{ ...homework, id: 124, done: false }, ...homeworkList]
            ))
        });

        it("should set correctly multiple entities #2", () => {
            const mockLocalStorage = {
                key: jest.fn(),
                length: 0,
                removeItem: jest.fn(),
                setItem: jest.fn(),
                clear: jest.fn(),
                getItem: jest.fn()
                    .mockReturnValueOnce(JSON.stringify([
                        { ...homework, id: 1, done: false },
                        { ...homework, id: 2, done: true },
                        { ...homework, id: 3, done: true },
                        { ...homework, id: 4, done: false },
                        { ...homework, id: 5, done: false },
                    ]))
                    .mockReturnValueOnce(JSON.stringify([
                        { ...homework, id: 1, done: true },
                        { ...homework, id: 2, done: true },
                        { ...homework, id: 3, done: true },
                        { ...homework, id: 4, done: false },
                        { ...homework, id: 5, done: false },
                    ]))
                    .mockReturnValueOnce(JSON.stringify([
                        { ...homework, id: 1, done: true },
                        { ...homework, id: 2, done: false },
                        { ...homework, id: 3, done: true },
                        { ...homework, id: 4, done: false },
                        { ...homework, id: 5, done: false },
                    ]))
                    .mockReturnValueOnce(JSON.stringify([
                        { ...homework, id: 1, done: true },
                        { ...homework, id: 2, done: false },
                        { ...homework, id: 3, done: true },
                        { ...homework, id: 4, done: false },
                        { ...homework, id: 5, done: false },
                    ]))
                    .mockReturnValueOnce(JSON.stringify([
                        { ...homework, id: 1, done: true },
                        { ...homework, id: 2, done: false },
                        { ...homework, id: 3, done: true },
                        { ...homework, id: 4, done: false },
                        { ...homework, id: 5, done: false },
                    ]))
            };
            global["localStorage"] = mockLocalStorage

            CacheService.setIsHomeworkDone(1, true);
            CacheService.setIsHomeworkDone(2, false);
            CacheService.setIsHomeworkDone(3, true);
            CacheService.setIsHomeworkDone(4, false);

            expect(mockLocalStorage.setItem.mock.calls).toEqual([
                ["cached-homework", JSON.stringify([
                    { ...homework, id: 1, done: true },
                    { ...homework, id: 2, done: true },
                    { ...homework, id: 3, done: true },
                    { ...homework, id: 4, done: false },
                    { ...homework, id: 5, done: false },
                ])],
                ["cached-homework", JSON.stringify([
                    { ...homework, id: 1, done: true },
                    { ...homework, id: 2, done: false },
                    { ...homework, id: 3, done: true },
                    { ...homework, id: 4, done: false },
                    { ...homework, id: 5, done: false },
                ])],
                ["cached-homework", JSON.stringify([
                    { ...homework, id: 1, done: true },
                    { ...homework, id: 2, done: false },
                    { ...homework, id: 3, done: true },
                    { ...homework, id: 4, done: false },
                    { ...homework, id: 5, done: false },
                ])],
                ["cached-homework", JSON.stringify([
                    { ...homework, id: 1, done: true },
                    { ...homework, id: 2, done: false },
                    { ...homework, id: 3, done: true },
                    { ...homework, id: 4, done: false },
                    { ...homework, id: 5, done: false },
                ])],
            ])
        });

        it("should do nothing if id is invalid", () => {
            const mockLocalStorage = {
                key: jest.fn(),
                length: 0,
                removeItem: jest.fn(),
                setItem: jest.fn(),
                clear: jest.fn(),
                getItem: jest.fn().mockReturnValueOnce(JSON.stringify(homeworkList))
            };
            global["localStorage"] = mockLocalStorage

            CacheService.setIsHomeworkDone(10000, true);

            expect(mockLocalStorage.setItem).not.toBeCalled()
        });
    });

    it("should setAdvertisements", () => {
        const mockLocalStorage = {
            key: jest.fn(),
            length: 0,
            removeItem: jest.fn(),
            setItem: jest.fn(),
            clear: jest.fn(),
            getItem: jest.fn()
        };
        global["localStorage"] = mockLocalStorage

        CacheService.setAdvertisements(adsList);

        expect(mockLocalStorage.setItem).toBeCalledWith("cached-advertisements", JSON.stringify(adsList))
        expect(mockLocalStorage.setItem).toBeCalledTimes(1)
    })

    it("should addAdvertisement ", () => {
        const getSpy = jest.spyOn(CacheService, "getAdvertisements").mockReturnValueOnce(adsList);
        const setSpy = jest.spyOn(CacheService, "setAdvertisements").mockImplementation();

        CacheService.addAdvertisement(ad);

        expect(CacheService.setAdvertisements).toBeCalledWith([...adsList, ad]);
        
        getSpy.mockRestore();
        setSpy.mockRestore();
    });

    describe("testing getAdvertisements()", () => {
        it("should get non null ads", () => {
            global["localStorage"] = {
                key: jest.fn(),
                length: 0,
                removeItem: jest.fn(),
                setItem: jest.fn(),
                clear: jest.fn(),
                getItem: jest.fn().mockReturnValueOnce(JSON.stringify(adsList))
            }

            expect(CacheService.getAdvertisements()).toEqual(adsList);
        });

        it("should get null ads", () => {
            global["localStorage"] = {
                key: jest.fn(),
                length: 0,
                removeItem: jest.fn(),
                setItem: jest.fn(),
                clear: jest.fn(),
                getItem: jest.fn().mockReturnValueOnce(null)
            }

            expect(CacheService.getAdvertisements()).toEqual(null);
        });
    })

    describe("testing getUser()", () => {
        it("should get non null user", () => {
            global["localStorage"] = {
                key: jest.fn(),
                length: 0,
                removeItem: jest.fn(),
                setItem: jest.fn(),
                clear: jest.fn(),
                getItem: jest.fn().mockReturnValueOnce(JSON.stringify(user))
            }

            expect(CacheService.getUser()).toEqual(user);
        });

        it("should get null user", () => {
            global["localStorage"] = {
                key: jest.fn(),
                length: 0,
                removeItem: jest.fn(),
                setItem: jest.fn(),
                clear: jest.fn(),
                getItem: jest.fn().mockReturnValueOnce(null)
            }

            expect(CacheService.getUser()).toEqual(null);
        });
    })

    it("should setUser", () => {
        const mockLocalStorage = {
            key: jest.fn(),
            length: 0,
            removeItem: jest.fn(),
            setItem: jest.fn(),
            clear: jest.fn(),
            getItem: jest.fn()
        };
        global["localStorage"] = mockLocalStorage

        CacheService.setUser(user);

        expect(mockLocalStorage.setItem).toBeCalledWith("cached-user", JSON.stringify(user))
        expect(mockLocalStorage.setItem).toBeCalledTimes(1)
    })

    describe("testing getControlWorks()", () => {
        it("should get non null control works", () => {
            global["localStorage"] = {
                key: jest.fn(),
                length: 0,
                removeItem: jest.fn(),
                setItem: jest.fn(),
                clear: jest.fn(),
                getItem: jest.fn().mockReturnValueOnce(JSON.stringify(controlWorkList))
            }

            expect(CacheService.getControlWorks()).toEqual(controlWorkList);
        });

        it("should get null control works", () => {
            global["localStorage"] = {
                key: jest.fn(),
                length: 0,
                removeItem: jest.fn(),
                setItem: jest.fn(),
                clear: jest.fn(),
                getItem: jest.fn().mockReturnValueOnce(null)
            }

            expect(CacheService.getControlWorks()).toEqual(null);
        });
    })

    it("should setControlWorks", () => {
        const mockLocalStorage = {
            key: jest.fn(),
            length: 0,
            removeItem: jest.fn(),
            setItem: jest.fn(),
            clear: jest.fn(),
            getItem: jest.fn()
        };
        global["localStorage"] = mockLocalStorage

        CacheService.setControlWorks(controlWorkList);

        expect(mockLocalStorage.setItem).toBeCalledWith("cached-control_works", JSON.stringify(controlWorkList))
        expect(mockLocalStorage.setItem).toBeCalledTimes(1)
    })

    it("should addControlWork ", () => {
        CacheService.getControlWorks = jest.fn().mockReturnValueOnce(controlWorkList);
        CacheService.setControlWorks = jest.fn()

        CacheService.addControlWork({ ...controlWork, id: 1000 });

        expect(CacheService.getControlWorks).toBeCalledTimes(1)
        expect(CacheService.setControlWorks).toHaveBeenCalledWith([...controlWorkList, { ...controlWork, id: 1000 }]);
    });

    describe("testing getMarks()", () => {
        it("should get non null marks", () => {
            global["localStorage"] = {
                key: jest.fn(),
                length: 0,
                removeItem: jest.fn(),
                setItem: jest.fn(),
                clear: jest.fn(),
                getItem: jest.fn().mockReturnValueOnce(JSON.stringify(marks))
            }

            expect(CacheService.getMarks()).toEqual(marks);
        });

        it("should get null marks", () => {
            global["localStorage"] = {
                key: jest.fn(),
                length: 0,
                removeItem: jest.fn(),
                setItem: jest.fn(),
                clear: jest.fn(),
                getItem: jest.fn().mockReturnValueOnce(null)
            }

            expect(CacheService.getMarks()).toEqual(null);
        });
    })

    it("should setMarks", () => {
        const mockLocalStorage = {
            key: jest.fn(),
            length: 0,
            removeItem: jest.fn(),
            setItem: jest.fn(),
            clear: jest.fn(),
            getItem: jest.fn()
        };
        global["localStorage"] = mockLocalStorage

        CacheService.setMarks(marks);

        expect(mockLocalStorage.setItem).toBeCalledWith("cached-marks", JSON.stringify(marks))
        expect(mockLocalStorage.setItem).toBeCalledTimes(1)
    })

    it("should clear only necessary fields", () => {
        const mockLocalStorage = {
            key: jest.fn(),
            length: 0,
            removeItem: jest.fn(),
            setItem: jest.fn(),
            clear: jest.fn(),
            getItem: jest.fn()
        };
        global["localStorage"] = mockLocalStorage

        CacheService.clearAll()

        expect(mockLocalStorage.removeItem.mock.calls.sort()).toEqual([
            ["cached-schedule"],
            ["cached-homework"],
            ["cached-advertisements"],
            ["cached-user"],
            ["cached-control_works"],
            ["cached-marks"],
        ].sort())
    });

    describe("testing isEmpty", () => {
        it("should return true", () => {
            global["localStorage"] = {
                key: jest.fn(),
                length: 0,
                removeItem: jest.fn(),
                setItem: jest.fn(),
                clear: jest.fn(),
                getItem: jest.fn().mockReturnValueOnce(null)
            }

            expect(CacheService.isEmpty()).toEqual(true)
        });

        it("should return false", () => {
            global["localStorage"] = {
                key: jest.fn(),
                length: 0,
                removeItem: jest.fn(),
                setItem: jest.fn(),
                clear: jest.fn(),
                getItem: jest.fn().mockReturnValueOnce(schedule)
            }

            expect(CacheService.isEmpty()).toEqual(false)
        });
    })
})

