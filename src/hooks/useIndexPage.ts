import { TabQuery } from "@components/header";
import DateHelper from "@helpers/date-helper";
import UiHelper from "@helpers/ui-helper";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { selectUser } from "@redux/reducers/user-reducer";
import CacheService from "@services/cache-service";
import { getData } from "@services/data-service";
import moment from "moment";
import { useEffect } from "react";
import { Dispatch } from "redux";
import { useQueryParam } from "use-query-params";
import { Lesson } from "../models/lesson";
import { navigate } from "gatsby-link";
import { setUser } from "@redux/reducers/user-reducer";
import { setLessons, setLessonsLoading, setNextLesson, SetNextLessonAction } from "@redux/reducers/lesson-reducer";
import { setControlWorks, setControlWorksLoading } from "@redux/reducers/control-work-reducer";
import { setHomework, setHomeworkLoading } from "@redux/reducers/homework-reducer";
import { setAdvertisements, setAdvertisementsLoading } from "@redux/reducers/advertisement-reducer";
import { setMarks } from "@redux/reducers/marks-reducer";

export default function useIndexPage() {
    const [tab, setTab] = useQueryParam<TabQuery>("tab");
    const handleTabChanged = (tab: TabQuery) => setTab(tab);
    const user = useAppSelector(selectUser)

    const dispatch = useAppDispatch();

    useEffect(() => {
        getData(
            data => {
                const todayLessons = extractTodayLessons(DateHelper.now, data.lessons);

                // save user
                dispatch(setUser(data.user));

                // save lessons
                dispatch(setLessons(todayLessons));

                // calculate next lesson
                calculateNextLesson(todayLessons, dispatch);

                // save control works
                dispatch(setControlWorks(data.controlWorks));

                // save homework
                dispatch(setHomework(data.homework));

                // save advertisements
                dispatch(setAdvertisements(data.advertisements));

                // save marks
                dispatch(setMarks(data.marks));

                dispatch(setAdvertisementsLoading(false));
                dispatch(setHomeworkLoading(false));
                dispatch(setControlWorksLoading(false));
                dispatch(setLessonsLoading(false));
            },
            (e: any) => {
                if (e === "forbidden") {
                    return navigate("/login");
                }

                if (e === "server-error") {
                    if (!CacheService.isEmpty()) {
                        UiHelper.showErrorToast(
                            "Похоже что наши сервисы сейчас недоступны. Повторите попытку чуть позже"
                        )
                    } else {
                        return navigate("/login");
                    }
                }

                console.error(e);
            });
    }, []);

    return {
        values: {
            user,
            tab: tab ?? "home",
        },
        handlers: {
            handleTabChanged,
        }
    }
}

/**
 * Calculate next lesson (it's lesson or lesson break) and continue running async until lessons run out
 * Independently dispatches state updates (includes every second timer update)
 * <pre>
 * The idea is
 * 1. Calculate which lesson is now
 * 2. If this lesson not in nearest 2 hours (or now) => dispatch noLessonAction
 * 3. Understand now is lesson or lesson break (event)
 * 4. Calculate time to end this event
 * 5. Every second dispatch new lesson action with updated time to event
 * 6. While time out => run recursively to calculate next event
 * </pre>
 * @param lessons - data which will used to understand time table
 * @param dispatch - redux dispatching function to emit state update
 * @return nothing
 */
export const calculateNextLesson = async (lessons: Lesson[], dispatch: Dispatch): Promise<any> => {
    // need to not create this object every time
    const noLessonAction: SetNextLessonAction = {
        nextLesson: null,
        nextLessonType: "",
        timeLeftToNextLesson: "",
    };

    // checking lessons for today
    if (lessons.length === 0) return dispatch(setNextLesson(noLessonAction));

    const now = moment(DateHelper.now);

    // sort lessons
    lessons = lessons.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    // get nearest lesson
    const nearestLesson = lessons[0];

    // checking is next lesson in nearest 2 hours.
    // That's need to not show "Next lesson is biology" in 3am
    if (moment.duration(now.diff(nearestLesson.date)).asHours() < -2) {
        return dispatch(setNextLesson(noLessonAction));
    }

    // Calculating thinking now is a lessons
    for (let i = 0; i < lessons.length; i++) {
        const lesson = lessons[i];

        // calculated start and end date using duration property
        const lessonStartDate = moment(lesson.date);
        const lessonEndDate = moment(lesson.date).add(lesson.duration, "minutes");

        // if now not this lesson -> skip
        if (!now.isBetween(lessonStartDate, lessonEndDate)) continue;

        // found lesson and calculation all necessary data
        let diff = moment.duration(now.diff(lessonEndDate)).abs();
        for (let j = 0; j < diff.asSeconds(); j++) {
            dispatch(setNextLesson({
                nextLesson: i + 1 === lessons.length ? null : lessons[i + 1],
                timeLeftToNextLesson: moment.utc(diff.asMilliseconds()).format("mm:ss"),
                nextLessonType: `до конца ${ i + 1 } урока`
            }))
            diff = diff.subtract(1, "seconds");
            await new Promise((res) => setTimeout(res, 1000));
        }

        return calculateNextLesson(lessons, dispatch);
    }


    // Calculating think now is a lesson break
    let breakStart = moment().startOf("day");
    for (let i = 0; i < lessons.length; i++) {
        const lesson = lessons[i];

        // calculated start and end date using duration property
        const lessonStartDate = moment(lesson.date);
        const lessonEndDate = moment(lesson.date).add(lesson.duration, "minutes");

        // if now not this break before this lesson -> skip
        if (!now.isBetween(breakStart, lessonStartDate)) {
            breakStart = lessonEndDate;
            continue;
        }

        // found lesson and calculation all necessary data
        let diff = moment.duration(now.diff(lessonStartDate)).abs();

        for (let j = 0; j < diff.asSeconds(); j++) {
            dispatch(setNextLesson({
                nextLesson: lesson,
                timeLeftToNextLesson: moment.utc(diff.asMilliseconds()).format("mm:ss"),
                nextLessonType: `до начала  ${ i + 1 } урока`
            }))
            diff = diff.subtract(1, "seconds");
            await new Promise((res) => setTimeout(res, 1000));
        }

        // setTimeout to recalculate next lesson when break will end
        return calculateNextLesson(lessons, dispatch);
    }

    // When lessons ended
    dispatch(setNextLesson(noLessonAction))
}

export const extractTodayLessons = (date: Date, data: Lesson[]): Lesson[] => {
    // Checking for null or undefined
    if (!date) return [];

    const target = moment(date).format(moment.HTML5_FMT.DATE);
    return data
        .filter(x => x.date.includes(target))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}
