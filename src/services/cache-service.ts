import DateHelper from "@helpers/date-helper";
import FormatHelper from "@helpers/format-helper";
import { BigDataObject } from "@services/api-service";
import { bigDataObjectIsoStringToDate } from "@utils/index";
import moment from "moment";
import { extractTodayLessons } from "../hooks/useIndexPage";
import { Advertisement } from "../models/advertisement";
import { ControlWork } from "../models/control-work";
import { Homework } from "../models/homework";
import { Lesson } from "../models/lesson";
import { Marks } from "../models/marks";
import { User } from "../models/user";

export default class CacheService {

    static get showWelcomeTile() {
        const item = typeof localStorage !== "undefined"
            ? localStorage.getItem("need-show-welcome-tile")
            : null;
        return item === null || item === "true";
    }

    static doNotShowWelcomeTile = () => localStorage.setItem("need-show-welcome-tile", "false");

    static get bigDataObject(): BigDataObject | null {
        // user
        const user = this.getUser();
        if (!user) return null;

        // lessons
        const lessons = this.getScheduleAt(DateHelper.now);
        if (!lessons) return null;

        // homework
        const homework = this.getHomework();
        if (!homework) return null;

        // control works
        const controlWorks = this.getControlWorks();
        if (!controlWorks) return null;

        // advertisements
        const advertisements = this.getAdvertisements();
        if (!advertisements) return null;

        // marks
        const marks = this.getMarks();
        if (!marks) return null;

        const obj: BigDataObject = {
            user,
            lessons,
            homework,
            controlWorks,
            advertisements,
            marks,
        }

        return bigDataObjectIsoStringToDate(obj);
    }

    static set bigDataObject(data: BigDataObject | null) {
        if (data !== null) {

            // set "cached-user"
            this.setUser(data.user);

            // set "cached-schedule"
            this.setWeekSchedule(data.lessons);

            // set "cached-homework"
            this.setHomework(data.homework);

            // set "control-works"
            this.setControlWorks(data.controlWorks);

            // set "cached-advertisements"
            this.setAdvertisements(data.advertisements);

            // set "marks"
            this.setMarks(data.marks);
        }
    }

    static getScheduleAt(date: Date): Lesson[] | null {
        const str = moment(date).startOf("day").toISOString();
        const raw = typeof localStorage !== "undefined"
            ? localStorage.getItem("cached-schedule") ?? "null"
            : "null";
        if (raw == "null") return null;
        const obj = JSON.parse(raw);
        return obj[str] ?? null;
    }

    static setWeekSchedule(lessons: Lesson[]) {
        const raw = localStorage.getItem("cached-schedule") ?? "{}";
        const obj = JSON.parse(raw);

        /**
         *  Let's store obj keys (iso string) of dates, which we already update
         *  to prevent lessons duplication.
         *  If key in obj and not in updatedKeys => in obj[key] old dates and we need to remove it and mark this key
         *  If key in obj and in updatedKeys => in obj[key] new dates and we add this date to array
         *  If key not in obj and not in updatedKeys => new date, create obj[key] = [thisDate] and mark this key
         *  fourth situation never happens
         */
        const updatedKeys: string[] = [];

        for (let lesson of lessons) {
            const key = moment(lesson.date).startOf("day").toISOString();

            // in obj[key] old dates, we need to remove it and mark this key
            if (key in obj && !updatedKeys.includes(key)) {
                obj[key] = [lesson]
                updatedKeys.push(key)
            }

            // in obj[key] new dates and we add this date to array
            else if (key in obj && updatedKeys.includes(key)) {
                obj[key].push(lesson);
            }

            // new date, create obj[key] = [thisDate] and mark this key
            else if (!(key in obj)) {
                obj[key] = [lesson]
                updatedKeys.push(key)
            }
        }

        /**
         * Time complexity of this algorithm is O(n^2) if every lesson have unique date
         * But usually this function will used to set week schedule, so usually <= 7 dates
         * And time complexity of this params is O(7n), or just O(n)
         * Old implementation had the same complexity but didn't work on bigger amount of dates
         */

        localStorage.setItem("cached-schedule", JSON.stringify(obj));
    }

    static setHomework(homework: Homework[]) {
        localStorage.setItem("cached-homework", JSON.stringify(homework));
    }

    static getHomework(): Homework[] {
        return JSON.parse(localStorage.getItem("cached-homework") ?? "null");
    }

    static setIsHomeworkDone(id: number, done: boolean) {
        // get cached data
        const raw = localStorage.getItem("cached-homework") ?? "[]";
        const obj: Homework[] = JSON.parse(raw);

        // find this homework
        const hwIndex = obj.findIndex(x => x.id === id);

        // end function if no homework with this id found
        if (hwIndex === -1) return;

        // set the done value
        obj[hwIndex].done = done;

        // save in to cache;
        localStorage.setItem("cached-homework", JSON.stringify(obj));
    }

    static setAdvertisements(advertisements: Advertisement[]) {
        localStorage.setItem("cached-advertisements", JSON.stringify(advertisements));
    }

    static addAdvertisement(advertisement: Advertisement) {
        const all = this.getAdvertisements();
        if (all !== null) {
            this.setAdvertisements([...all, advertisement]);
        }
    }

    static getAdvertisements(): Advertisement[] | null {
        const ads: Advertisement[] | null = JSON.parse(localStorage.getItem("cached-advertisements") ?? "null");
        if (ads === null) return null;
        return FormatHelper.convertAdsDateFields(ads);
    }

    static getUser(): User | null {
        return JSON.parse(localStorage.getItem("cached-user") ?? "null");
    }

    static setUser(user: User) {
        localStorage.setItem("cached-user", JSON.stringify(user));
    }

    static getControlWorks(): ControlWork[] | null {
        const controlWorks = JSON.parse(localStorage.getItem("cached-control_works") ?? "null");
        if (controlWorks === null) return null;
        return FormatHelper.convertControlWorksDateFields(controlWorks);
    }

    static setControlWorks(controlWorks: ControlWork[]) {
        localStorage.setItem("cached-control_works", JSON.stringify(controlWorks));
    }

    static addControlWork(controlWork: ControlWork) {
        const all = this.getControlWorks();
        if (all !== null) {
            this.setControlWorks([...all, controlWork]);
        }
    }

    static getMarks(): Marks | null {
        return JSON.parse(localStorage.getItem("cached-marks") ?? "null");
    }

    static setMarks(marks: Marks) {
        localStorage.setItem("cached-marks", JSON.stringify(marks));
    }

    static clearAll() {
        localStorage.removeItem("cached-schedule")
        localStorage.removeItem("cached-homework")
        localStorage.removeItem("cached-advertisements")
        localStorage.removeItem("cached-user")
        localStorage.removeItem("cached-control_works")
        localStorage.removeItem("cached-marks")
    }

    static isEmpty() {
        return localStorage.getItem("cached-schedule") === null
    }
}

type CachedSchedule = {
    [key: string]: Lesson[]
}

