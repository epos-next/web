import CacheService from "@services/cache-service";

describe("Testing cache service", () => {

    describe("testing get showWelcomeTile()", () => {

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
});
