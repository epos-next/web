import controlWorkReducer, {
    addControlWork,
    setControlWorks,
    setIsControlWorkCreatorOpen,
    setControlWorksLoading
} from "@redux/reducers/control-work-reducer";
import lodash from "lodash";
import { ControlWork } from "../../../models/control-work";

describe("Testing control work reducer", () => {

    const controlWork: ControlWork = {
        lesson: "Физика",
        date: new Date(),
        name: "Кр",
        id: 123,
    }
    const controlWorkList = lodash.times(213).map(() => controlWork)

    it("should handle addControlWork", () => {
        const state = controlWorkReducer(undefined, addControlWork(controlWork))
        const state2 = controlWorkReducer(state, addControlWork(controlWork))
        expect(state2.controlWorks).toEqual([controlWork, controlWork])
    });

    it("should handle setControlWorks", () => {
        const state = controlWorkReducer(undefined, setControlWorks(controlWorkList))
        expect(state.controlWorks).toEqual(controlWorkList)
    });

    it("should handle setIsControlWorkCreatorOpen", () => {
        const state = controlWorkReducer(undefined, setIsControlWorkCreatorOpen(true))
        expect(state.isControlWorkCreatorOpen).toEqual(true)
        const state2 = controlWorkReducer(state, setIsControlWorkCreatorOpen(false))
        expect(state2.isControlWorkCreatorOpen).toEqual(false)
    });

    it("should handle setControlWorksLoading", () => {
        const state = controlWorkReducer(undefined, setControlWorksLoading(true))
        expect(state.loading).toEqual(true)
        const state2 = controlWorkReducer(state, setControlWorksLoading(false))
        expect(state2.loading).toEqual(false)
    });
})
