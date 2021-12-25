import scheduleReducer, {
    selectNewDate,
    setLoadingState,
    setNewSchedule
} from "@redux/reducers/schedule-reducer";
import { lessonsList } from "../../../../test/fixtures";

describe("Testing schedule reducer", () => {
    const emptyAction = { type: "" }

    test("should use correct initial state", () => {
        const reducer = scheduleReducer(undefined, emptyAction);
        expect(reducer).toEqual({
            type: "loading",
            loading: true,
            schedule: undefined,
            selectedDate: undefined,
        });
    })

    describe("actions", () => {
        test("should select new date", () => {
            const date = new Date(2021, 11, 21)
            const reducer = scheduleReducer(undefined, selectNewDate(date));
            expect(reducer).toEqual({
                type: "date",
                loading: false,
                schedule: undefined,
                selectedDate: date,
            });
        })

        test("should set new date", () => {
            const date = new Date(2021, 11, 21)
            const reducer = scheduleReducer(undefined, setNewSchedule({ date, schedule: lessonsList }));
            expect(reducer).toEqual({
                type: "full",
                loading: false,
                schedule: lessonsList,
                selectedDate: date,
            });
        })

        test("should set loading state", () => {
            const reducer = scheduleReducer(undefined, setLoadingState());
            expect(reducer).toEqual({
                type: "loading",
                loading: true,
                schedule: undefined,
                selectedDate: undefined,
            });
        })
    })
})
