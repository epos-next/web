import { Advertisement } from "../models/advertisement";
import { ControlWork } from "../models/control-work";
import { Homework } from "../models/homework";
import { Lesson } from "../models/lesson";
import { User } from "../models/user";

export function isUser(state: any): state is User {
    return state !== null &&
        typeof state !== "undefined" &&
        typeof state.id === "number" &&
        typeof state.name == "string";
}

export function isAdvertisement(state: any): state is Advertisement {
    return state !== null &&
        typeof state.id == "number" &&
        typeof state.content === "string" &&
        state.targetDate instanceof Date;
}

export function isControlWork(state: any): state is ControlWork {
    return state !== null &&
        typeof state.id == "number" &&
        typeof state.lesson === "string" &&
        state.date instanceof Date &&
        typeof state.name === "string";
}

export function isHomework(state: any): state is Homework {
    return state !== null &&
        typeof state.id === "number" &&
        typeof state.lesson === "string" &&
        typeof state.content === "string" &&
        typeof state.done === "boolean";
}

export function isLesson(state: any): state is Lesson {
    return state !== null &&
        typeof state.id === "number" &&
        typeof state.subject === "string" &&
        typeof state.groupId === "number" &&
        typeof state.room === "string" &&
        typeof state.date === "string" &&
        typeof state.duration === "number";
}
