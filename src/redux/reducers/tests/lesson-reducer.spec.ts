import lessonReducer, {
    setLessonsLoading,
    setNextLesson,
    SetNextLessonAction
} from "@redux/reducers/lesson-reducer";
import { Lesson } from "../../../models/lesson";

describe("Testing lesson reducer", () => {

    const lesson: Lesson = {
        date: new Date().toISOString(),
        room: "202",
        subject: "Алгебра",
        duration: 40,
        groupId: 1,
        id: 1,
    }

    const nextLesson: SetNextLessonAction = {
        nextLesson: lesson,
        timeLeftToNextLesson: "22:55",
        nextLessonType: "до конца 5 урока"
    }

    it ("should handle initial state", () => {
        const state = lessonReducer(undefined, { type: "testing" });
        expect(state.nextLesson).toBeNull();
        expect(state.timeLeftToNextLesson).toBe("");
        expect(state.loading).toBe(true);
    })

    it("should handle set next lesson", () => {
        const state = lessonReducer(undefined, setNextLesson(nextLesson));
        expect(state.nextLesson).toEqual(lesson);
        expect(state.timeLeftToNextLesson).toEqual("22:55");
        expect(state.nextLessonType).toEqual("до конца 5 урока");
    })

    it("should handle setLessonsLoading", () => {
        const state = lessonReducer(undefined, setLessonsLoading(false));
        expect(state.loading).toBe(false);
        const state2 = lessonReducer(state, setLessonsLoading(true));
        expect(state2.loading).toBe(true);
    });
});
