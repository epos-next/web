import homeworkReducer, { setHomeworkLoading, setHomework, invertHomeworkDone } from "@redux/reducers/homework-reducer";
import lodash from "lodash";
import { Homework } from "../../../models/homework";

describe("Testing homework reducer", () => {

    const homework: Homework = {
        done: false,
        id: 213,
        lesson: "Физика",
        content: "Some test data adsadasd"
    }
    const homeworkList = lodash.times(123).map((_, i) => ({...homework, id: i}))

    it("should handle setHomework", () => {
        const state = homeworkReducer(undefined, setHomework(homeworkList))
        expect(state.homework).toEqual(homeworkList)
    });

    it("should handle invertHomeworkDone", () => {
        const state = homeworkReducer(undefined, setHomework(homeworkList))
        const state2 = homeworkReducer(state, invertHomeworkDone(43));
        const shouldBe = [...homeworkList];
        shouldBe[43] = {...shouldBe[43], done: true }
        expect(state2.homework).toEqual(shouldBe);
        expect(state2.loading).toEqual(state.loading);
    });

    it("should handle setLessonsLoading", () => {
        const state = homeworkReducer(undefined, setHomeworkLoading(false));
        expect(state.loading).toBe(false);
        const state2 = homeworkReducer(state, setHomeworkLoading(true));
        expect(state2.loading).toBe(true);
    });

});
