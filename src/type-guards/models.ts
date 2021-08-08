import { Advertisement } from "../models/advertisement";
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
