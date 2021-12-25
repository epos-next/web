import scheduleReducer, {
    setLoadingState,
    setNewSchedule, setSelectedDate
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
            const reducer = scheduleReducer(undefined, setSelectedDate(date));
            expect(reducer).toEqual({
                type: "date",
                loading: false,
                schedule: undefined,
                selectedDate: date,
            });
        })

        describe("set new schedule", () => {
            test("should set new schedule", () => {
                const date = new Date(2021, 11, 21)
                const reducer = scheduleReducer(undefined, setNewSchedule({ date, schedule: lessonsList }));
                expect(reducer).toEqual({
                    type: "full",
                    loading: false,
                    schedule: lessonsList,
                    selectedDate: date,
                });
            })

            test("should ignore if the user managed to change the selected date", () => {
                const date1 = new Date(2021, 11, 21)
                const date2 = new Date(2021, 11, 20)
                const reducer = scheduleReducer(
                    {
                        selectedDate: date1,
                        schedule: [],
                        loading: false,
                        type: "full"
                    },
                    setNewSchedule({ date: date2, schedule: lessonsList }),
                );
                expect(reducer).toEqual({
                    selectedDate: date1,
                    schedule: [],
                    loading: false,
                    type: "full"
                });
            })

            test("should set new schedule if state is full but old selected date is the same as new selected date", () => {
                const date = new Date(2021, 11, 21)
                const reducer = scheduleReducer(
                    {
                        selectedDate: date,
                        schedule: [],
                        loading: false,
                        type: "full"
                    },
                    setNewSchedule({ date: date, schedule: lessonsList }),
                );
                expect(reducer).toEqual({
                    selectedDate: date,
                    schedule: lessonsList,
                    loading: false,
                    type: "full"
                });
            })
        })

        test("should set loading state", () => {
            const reducer = scheduleReducer(undefined, setLoadingState());
            expect(reducer).toEqual({
                type: "loading",
                loading: true,
                schedule: undefined,
                selectedDate: new Date(),
            });
        })
    })
})
