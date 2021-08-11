import ApiService, { BigDataObject } from "@services/api-service";
import CacheService from "@services/cache-service";
import { getData } from "@services/data-service";
import { bdo, bdo2 } from "../../../test/fixtures";


describe("Testing data service", () => {

    jest.mock('../api-service')

    it("should fetch new data", async() => {
        ApiService.getData = jest.fn(() => Promise.resolve(bdo))
        jest.spyOn(CacheService, "bigDataObject", "get").mockReturnValue(null)
        jest.spyOn(CacheService, "bigDataObject", "set").mockImplementation()

        const onSuccess = jest.fn((data: BigDataObject) => expect(data).toEqual(bdo));
        const onError = jest.fn((error: any) => expect(error).not.toBeCalled());

        await getData(onSuccess, onError)
        expect(onSuccess).toBeCalled()
        expect(onSuccess).toBeCalledTimes(1)
        expect(onError).not.toBeCalled()
    })

    it("should cache fetched data", async() => {
        ApiService.getData = jest.fn(() => Promise.resolve(bdo))
        jest.spyOn(CacheService, "bigDataObject", "get").mockReturnValue(null)
        jest.spyOn(CacheService, "bigDataObject", "set").mockImplementation((v) => {
            expect(v).toEqual(bdo);
        })

        const onSuccess = jest.fn((data: BigDataObject) => expect(data).toEqual(bdo));
        const onError = jest.fn((error: any) => expect(error).not.toBeCalled());

        await getData(onSuccess, onError)
    })

    it("should return cached data and fetch new", async () => {
        ApiService.getData = jest.fn(() => Promise.resolve(bdo))
        jest.spyOn(CacheService, "bigDataObject", "get").mockReturnValue(bdo2)
        jest.spyOn(CacheService, "bigDataObject", "set").mockImplementation((v) => {
            expect(v).toEqual(bdo);
        })

        const onSuccess = jest.fn();
        const onError = jest.fn();

        await getData(onSuccess, onError)
        expect(onSuccess).toBeCalledTimes(2)
        expect(onError).not.toBeCalled()
        expect(onSuccess.mock.calls).toEqual([
            [bdo2],
            [bdo],
        ])
    })

    it("should catch error", async () => {
        ApiService.getData = jest.fn(() => Promise.reject("not-found"))
        jest.spyOn(CacheService, "bigDataObject", "get").mockReturnValue(null)
        jest.spyOn(CacheService, "bigDataObject", "set").mockImplementation()

        const onSuccess = jest.fn();
        const onError = jest.fn();

        await getData(onSuccess, onError)
        expect(onSuccess).not.toBeCalled()
        expect(onError).toBeCalledTimes(1)
        expect(onError).toBeCalledWith("not-found")

    })
})
