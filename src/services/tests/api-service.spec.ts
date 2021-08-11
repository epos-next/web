import ApiService from "@services/api-service";
import client from "@utils/api/client";
import ApiRoutes from "@utils/api/routes";
import MockAdapter from 'axios-mock-adapter';
import { bdo, bdoJson } from "../../../test/fixtures";

describe("Testing api service", () => {

    describe("testing getData()", () => {
        it("should handle status 200", async () => {
            const mock = new MockAdapter(client);
            const data = { success: true, data: bdoJson }
            mock.onGet(ApiRoutes.fetchData).replyOnce(200, data);

            expect(await ApiService.getData()).toEqual(bdo)
            expect(mock.history.get.length).toBe(1);
        })

        it("should handle status 401", async () => {
            const mock = new MockAdapter(client, );
            const data = { success: false, error: "forbidden" }
            mock.onGet(ApiRoutes.fetchData).replyOnce(403, data);
            mock.onPost(ApiRoutes.updateToken).replyOnce(200, {
                "success": false,
                "error": "not-validated-error"
            });

            await expect(ApiService.getData).rejects.toEqual("forbidden")
            expect(mock.history.get.length).toBe(1);
        })

        it("should handle status 404", async () => {
            const mock = new MockAdapter(client);
            const data = { success: false, error: "not-found" }
            mock.onGet(ApiRoutes.fetchData).replyOnce(404, data);

            await expect(ApiService.getData).rejects.toEqual("not-found")
            expect(mock.history.get.length).toBe(1);
        })

        it("should handle unexpected status", async () => {
            const mock = new MockAdapter(client);
            mock.onGet(ApiRoutes.fetchData).replyOnce(500);

            await expect(ApiService.getData).rejects.toEqual("server-error")
            expect(mock.history.get.length).toBe(1);
        })
    })
})
