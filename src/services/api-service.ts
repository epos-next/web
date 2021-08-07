import client from "@utils/api/client";
import ApiRoutes from "@utils/api/routes";
import { bigDataObjectIsoStringToDate } from "@utils/index";
import { Advertisement } from "../models/advertisement";
import { ControlWork } from "../models/control-work";
import { Homework } from "../models/homework";
import { Lesson } from "../models/lesson";
import { Marks } from "../models/marks";
import { User } from "../models/user";

export default class ApiService {

    /**
     * @throws forbidden
     * @throws not-found
     * @throws server-error
     */
    static async getData(): Promise<BigDataObject> {
        const response = await client.get(ApiRoutes.fetchData);

        // Ok
        if (response.status === 200 && response.data.success === true) {
            let data: BigDataObject = response.data.data;

            // change iso string --> date
            data = bigDataObjectIsoStringToDate(data);

            return data;
        }

        // Forbidden
        if (response.status === 401) throw "forbidden";

        // Not found
        if (response.status === 404) throw "not-found";

        // Server error
        throw "server-error";
    }

    /**
     * @throws bad-request
     * @throws forbidden
     * @throws not-found
     * @throws server-error
     */
    static async getLessons(from: Date, to: Date): Promise<Lesson[]> {
        const response = await client.get(ApiRoutes.fetchLessons(from, to));

        // Ok
        if (response.status === 200 && response.data.success === true) {
            return response.data.data as Lesson[];
        }

        // Bad request
        if (response.status === 400) throw "bad-request";

        // Forbidden
        if (response.status === 403) throw "forbidden";

        // Not found
        if (response.status === 404) throw "not-found";

        // Server error
        throw "server-error";
    }

    /**
     * @param controlWork what you want to create
     * @return id of created control work
     * @throws bad-request
     * @throws forbidden
     * @throws server-error
     */
    static async createControlWork(controlWork: ControlWork): Promise<number> {
        const response = await client.post(
            ApiRoutes.createControlWork,
            controlWork
        );

        // Ok
        if (response.status === 200 && response.data.success === true) {
            return response.data.id;
        }

        // Bad request
        if (response.status === 400) throw "bad-request";

        // Forbidden
        if (response.status === 403) throw "forbidden";

        // Server error
        throw "server-error";
    }

    /**
     * @param ad what you want to create
     * @return id of created ad
     * @throws bad-request
     * @throws forbidden
     * @throws server-error
     */
    static async createAdvertisement(ad: Advertisement): Promise<number> {
        const response = await client.post(
            ApiRoutes.createAd,
            ad
        );

        // Ok
        if (response.status === 200 && response.data.success === true) {
            return response.data.id;
        }

        // Bad request
        if (response.status === 400) throw "bad-request";

        // Forbidden
        if (response.status === 403) throw "forbidden";

        // Server error
        throw "server-error";
    }
}

export type BigDataObject = {
    user: User,
    lessons: Lesson[],
    homework: Homework[],
    controlWorks: ControlWork[],
    advertisements: Advertisement[],
    marks: Marks,
}


