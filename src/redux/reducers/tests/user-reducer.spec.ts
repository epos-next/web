import userReducer, {initialState, setUser, State } from "@redux/reducers/user-reducer";
import { User } from "../../../models/user";

describe("Testing user reducer", () => {

    const initialsTestingState: State = {
        user: {
            name: "Yaroslav Zotov",
            id: 1,
        }
    }

    const user: User = {
        name: "Mike Wazowski",
        id: 2,
    }

    it("should handle initial state", () => {
        const state = userReducer(undefined, { type: "test" });
        expect(state).toEqual(initialState);
    })

    it("should handle setUser", () => {
        const state = userReducer(initialsTestingState, setUser(user));
        expect(state.user?.name).toEqual("Mike Wazowski")
        expect(state.user?.id).toEqual(2)
    })
})
