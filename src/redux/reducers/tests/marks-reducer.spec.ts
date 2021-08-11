import marksReducer, { setMarks } from "@redux/reducers/marks-reducer";
import { Marks } from "../../../models/marks";

describe("Testing marks reducer", () => {

    const marks: Marks = {
        "Алгебра": {
            total: 4,
            periods: [
                {
                    total: 4,
                    all: [{ value: 4, name: "КР", date: new Date(), topic: "преобразования" }],
                },
                {
                    total: 3,
                    all: [{ value: 3, name: "КР №2", date: new Date(), topic: "преобразования" }],
                },
                {
                    total: 5,
                    all: [{ value: 5, name: "КР №3", date: new Date(), topic: "преобразования" }],
                },
                {
                    total: 4,
                    all: [{ value: 4, name: "КР №4", date: new Date(), topic: "преобразования" }],
                },
            ],
        }
    }
    it("should handle initial state", () => {
        const state = marksReducer(undefined, { type: "test" })
        expect(state.marks).toBeNull();
        expect(state.loading).toBe(true);
    })

    it("should handle setMarks action", () => {
        const state = marksReducer(undefined, setMarks(marks))
        expect(state.marks).toEqual(marks);
        expect(state.loading).toEqual(false);
    })
});
