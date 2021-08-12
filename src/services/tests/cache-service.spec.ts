import CacheService from "@services/cache-service";
import moment from "moment";
import {
    adsList,
    bdo,
    homework,
    homeworkList,
    randomLessons,
    savedRandomLessonByISODates,
    schedule
} from "../../../test/fixtures";

describe("Testing cache service", () => {
    // @ts-ignore
    afterEach(() => global["localStorage"] = undefined)

    describe("testing get showWelcomeTile", () => {
        // @ts-ignore
        afterAll(() => global["localStorage"] = undefined)

        it("should get correct result if it's in cache #1", () => {
            global["localStorage"] = {
                key: jest.fn(),
                length: 0,
                removeItem: jest.fn(),
                setItem: jest.fn(),
                clear: jest.fn(),
                getItem: jest.fn().mockReturnValue("true")
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
                getItem: jest.fn().mockReturnValue("false")
            };

            expect(CacheService.showWelcomeTile).toBe(false);
        })

        it("should return false if no localstorage is null", () => {
            expect(CacheService.showWelcomeTile).toBe(false);
        });

        it("should return false if not cached", () => {
            global["localStorage"] = {
                key: jest.fn(),
                length: 0,
                removeItem: jest.fn(),
                setItem: jest.fn(),
                clear: jest.fn(),
                getItem: jest.fn().mockReturnValue(null)
            };

            expect(CacheService.showWelcomeTile).toBe(true);
        })
    });

    it("should save marker that no need to show welcome tile", () => {
        // @ts-ignore
        afterAll(() => global["localStorage"] = undefined)

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
        // @ts-ignore
        afterAll(() => global["localStorage"] = undefined)

        it("should cache bdo", () => {
            CacheService.setUser = jest.fn();
            CacheService.setWeekSchedule = jest.fn();
            CacheService.setHomework = jest.fn();
            CacheService.setControlWorks = jest.fn();
            CacheService.setAdvertisements = jest.fn();
            CacheService.setMarks = jest.fn();

            CacheService.bigDataObject = bdo;

            const start = moment().startOf("isoWeek").toDate()
            expect(CacheService.setUser).toBeCalledWith(bdo.user);
            expect(CacheService.setUser).toBeCalledTimes(1);
            expect(CacheService.setWeekSchedule).toBeCalledWith(bdo.lessons, start);
            expect(CacheService.setWeekSchedule).toBeCalledTimes(1);
            expect(CacheService.setHomework).toBeCalledWith(bdo.homework);
            expect(CacheService.setHomework).toBeCalledTimes(1);
            expect(CacheService.setControlWorks).toBeCalledWith(bdo.controlWorks);
            expect(CacheService.setControlWorks).toBeCalledTimes(1);
            expect(CacheService.setAdvertisements).toBeCalledWith(bdo.advertisements);
            expect(CacheService.setAdvertisements).toBeCalledTimes(1);
            expect(CacheService.setMarks).toBeCalledWith(bdo.marks);
            expect(CacheService.setMarks).toBeCalledTimes(1);
        });

        it("should ignore null argument", () => {
            CacheService.setUser = jest.fn();
            CacheService.setWeekSchedule = jest.fn();
            CacheService.setHomework = jest.fn();
            CacheService.setControlWorks = jest.fn();
            CacheService.setAdvertisements = jest.fn();
            CacheService.setMarks = jest.fn();

            CacheService.bigDataObject = null;

            expect(CacheService.setUser).not.toBeCalled();
            expect(CacheService.setWeekSchedule).not.toBeCalled();
            expect(CacheService.setHomework).not.toBeCalled();
            expect(CacheService.setControlWorks).not.toBeCalled();
            expect(CacheService.setAdvertisements).not.toBeCalled();
            expect(CacheService.setMarks).not.toBeCalled();
        })
    })

    describe("testing getScheduleAt()", () => {
        // @ts-ignore
        afterAll(() => global["localStorage"] = undefined)

        describe("should get correct schedule", () => {
            global["localStorage"] = {
                key: jest.fn(),
                length: 0,
                removeItem: jest.fn(),
                setItem: jest.fn(),
                clear: jest.fn(),
                getItem: jest.fn().mockReturnValue(JSON.stringify(schedule))
            };

            // @ts-ignore
            afterAll(() => global["localStorage"] = undefined)

            it("should get correct schedule #1", () => {
                expect(CacheService.getScheduleAt(new Date(2021, 11, 21))).toEqual(schedule["2021-12-20T19:00:00.000Z"])
            });

            it("should get correct schedule #2", () => {
                expect(CacheService.getScheduleAt(new Date(2021, 11, 22))).toEqual(schedule["2021-12-21T19:00:00.000Z"])
            });

            it("should get correct schedule #3", () => {
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
                getItem: jest.fn().mockReturnValue(null)
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
            getItem: jest.fn().mockReturnValue(JSON.stringify(homeworkList))
        };
        global["localStorage"] = mockLocalStorage

        expect(CacheService.getHomework()).toEqual(homeworkList);

        expect(mockLocalStorage.getItem).toBeCalledTimes(1);
        expect(mockLocalStorage.getItem).toBeCalledWith("cached-homework");
    });

    describe("testing setIsHomeworkDone()", () => {
        // @ts-ignore
        afterEach(() => global["localStorage"] = undefined)

        it("should set correctly #1", () => {
            const mockLocalStorage = {
                key: jest.fn(),
                length: 0,
                removeItem: jest.fn(),
                setItem: jest.fn(),
                clear: jest.fn(),
                getItem: jest.fn()
                    .mockReturnValue(JSON.stringify([{ ...homework, id: 124 }, ...homeworkList]))
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
                    .mockReturnValue(JSON.stringify([{ ...homework, id: 124 }, ...homeworkList]))
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
                getItem: jest.fn().mockReturnValue(JSON.stringify(homeworkList))
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
});
