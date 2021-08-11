import ApiService from "@services/api-service";
import client from "@utils/api/client";
import ApiRoutes from "@utils/api/routes";
import MockAdapter from 'axios-mock-adapter';
import * as queryString from "querystring";
import { bdo, bdoJson, controlWork, lessonsList } from "../../../test/fixtures";

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
            const mock = new MockAdapter(client,);
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

    describe("testing getLessons()", () => {
        const from = new Date(2021, 11, 21)
        const to = new Date(2021, 12, 21);

        it("should handle status 200", async () => {
            const mock = new MockAdapter(client);
            const data = { success: true, data: lessonsList }
            mock.onGet(ApiRoutes.fetchLessons(from, to)).replyOnce(200, data);

            expect(await ApiService.getLessons(from, to)).toEqual(lessonsList)
            expect(mock.history.get.length).toBe(1);
        })

        it("should pass correct query params", async () => {
            const mock = new MockAdapter(client);
            const data = { success: true, data: lessonsList }
            mock.onGet(ApiRoutes.fetchLessons(from, to)).replyOnce(200, data);

            await ApiService.getLessons(from, to)

            expect(mock.history.get[0].url).toBeDefined()
            const query = mock.history.get[0].url?.split("?")[1] as string
            expect(queryString.parse(query)).toEqual({
                from: from.toISOString(),
                to: to.toISOString(),
            });
        })

        it("should pass correct query params #2", async () => {
            const mock = new MockAdapter(client);
            const data = { success: true, data: lessonsList }
            const from = new Date()
            const to = new Date();
            mock.onGet(ApiRoutes.fetchLessons(from, to)).replyOnce(200, data);

            await ApiService.getLessons(from, to)

            expect(mock.history.get[0].url).toBeDefined()
            const query = mock.history.get[0].url?.split("?")[1] as string
            expect(queryString.parse(query)).toEqual({
                from: from.toISOString(),
                to: to.toISOString(),
            });
        })

        it("should throw error on incorrect params", async () => {
            // @ts-ignore
            const action = async () => await ApiService.getLessons(null, null)
            await expect(action).rejects.toThrow(TypeError)
        })

        it("should handle status 400", async () => {
            const mock = new MockAdapter(client,);
            const data = { success: false, error: "not-validated-error" }
            mock.onGet(ApiRoutes.fetchLessons(from, to)).replyOnce(400, data);
            mock.onPost(ApiRoutes.updateToken).replyOnce(200, {
                "success": false,
                "error": "not-validated-error"
            });

            await expect(() => ApiService.getLessons(from, to)).rejects.toEqual("bad-request")
        })

        it("should handle status 403", async () => {
            const mock = new MockAdapter(client);
            const data = { success: false, error: "forbidden" }
            mock.onGet(ApiRoutes.fetchLessons(from, to)).replyOnce(403, data);
            mock.onPost(ApiRoutes.updateToken).replyOnce(200, {
                "success": false,
                "error": "not-validated-error"
            });

            await expect(() => ApiService.getLessons(from, to)).rejects.toEqual("forbidden")
        })

        it("should handle status 404", async () => {
            const mock = new MockAdapter(client);
            const data = { success: false, error: "not-found" }
            mock.onGet(ApiRoutes.fetchLessons(from, to)).replyOnce(404, data);

            await expect(() => ApiService.getLessons(from, to)).rejects.toEqual("not-found")
        })

        it("should handle unexpected status", async () => {
            const mock = new MockAdapter(client);
            mock.onGet(ApiRoutes.fetchLessons(from, to)).replyOnce(500);

            await expect(() => ApiService.getLessons(from, to)).rejects.toEqual("server-error")
        })
    })

    describe("testing createControlWork()", () => {
        it("should call correct endpoint with correct data", async () => {
            const mock = new MockAdapter(client);
            const data = { success: true, id: 1 }
            mock.onPost(ApiRoutes.createControlWork).replyOnce(200, data);

            await ApiService.createControlWork(controlWork)

            expect(mock.history.post.length).toBe(1);
            expect(mock.history.post[0].data).toEqual(JSON.stringify({
                lesson: "Физика",
                date: controlWork.date.toISOString(),
                name: "Кр",
            }));
        });

        it("should return correct id", async () => {
            const mock = new MockAdapter(client);
            const data = { success: true, id: 1 }
            mock.onPost(ApiRoutes.createControlWork).replyOnce(200, data);

            expect(await ApiService.createControlWork(controlWork)).toEqual(1)
            expect(mock.history.post.length).toBe(1);
        });

        it("should handle status 400", async () => {
            const mock = new MockAdapter(client);
            const data = { success: false, error: "not-validated" }
            mock.onPost(ApiRoutes.createControlWork).replyOnce(400, data);

            const action = async () => await ApiService.createControlWork(controlWork)
            await expect(action).rejects.toEqual("bad-request")
            expect(mock.history.post.length).toBe(1);
        });

        it("should handle status 403", async () => {
            const mock = new MockAdapter(client);
            const data = { success: false, error: "forbidden" }
            mock.onPost(ApiRoutes.createControlWork).replyOnce(403, data);
            mock.onPost(ApiRoutes.updateToken).replyOnce(200, {
                "success": false,
                "error": "not-validated-error"
            });

            const action = async () => await ApiService.createControlWork(controlWork)
            await expect(action).rejects.toEqual("forbidden")
            expect(mock.history.post.length).toBe(1);
        });

        it("should handle unexpected status", async () => {
            const mock = new MockAdapter(client);
            mock.onPost(ApiRoutes.createControlWork).replyOnce(500);

            const action = async () => await ApiService.createControlWork(controlWork)
            await expect(action).rejects.toEqual("server-error")
            expect(mock.history.post.length).toBe(1);
        });
    })
})
