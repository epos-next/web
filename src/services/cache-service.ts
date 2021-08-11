import DateHelper from "@helpers/date-helper";
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
            const now = moment();
            const start = now.startOf("isoWeek").toDate();
            this.setWeekSchedule(data.lessons, start);

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

    static setWeekSchedule(lessons: Lesson[], startOfTheWeek: Date) {
        const raw = localStorage.getItem("cached-schedule") ?? "{}";
        const obj = JSON.parse(raw);

        for (let i = 0; i < 7; i++) {
            const date = moment(startOfTheWeek).add(i, "days").toDate();
            const todayLessons = extractTodayLessons(date, lessons);
            const str = moment(date).startOf("day").toISOString();
            obj[str] = todayLessons;
            // CacheService.setScheduleAt(date, todayLessons);
        }

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
        return JSON.parse(localStorage.getItem("cached-advertisements") ?? "null");
    }

    static getUser(): User | null {
        return JSON.parse(localStorage.getItem("cached-user") ?? "null");
    }

    static setUser(user: User) {
        localStorage.setItem("cached-user", JSON.stringify(user));
    }

    static getControlWorks(): ControlWork[] | null {
        return JSON.parse(localStorage.getItem("cached-control_works") ?? "null");
    }

    static setControlWorks(controlWorks: ControlWork[]) {
        localStorage.setItem("cached-control_works", JSON.stringify(controlWorks));
    }

    static addControlWork(controlWork: ControlWork) {
        const all = this.getControlWorks();
        if (all !== null) {
            all.push(controlWork);
            this.setControlWorks(all);
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

