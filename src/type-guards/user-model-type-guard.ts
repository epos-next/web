import { User } from "../models/user";

export function isUser(state: any): state is User {
    return state !== null &&
        typeof state !== "undefined" &&
        typeof state.id === "number" &&
        typeof state.name == "string";
}
