import CacheService from "@services/cache-service";
import moment from "moment";
import { bdo } from "../../../test/fixtures";

describe("Testing cache service", () => {

    describe("testing get showWelcomeTile", () => {

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
});
