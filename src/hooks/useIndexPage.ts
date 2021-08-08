import { TabQuery } from "@components/header";
import DateHelper from "@helpers/date-helper";
import UiHelper from "@helpers/ui-helper";
import { setAdvertisements, setAdvertisementsLoading } from "@redux/actions/advertisement-actions";
import { setControlWorks, setControlWorksLoading } from "@redux/actions/control-work-actions";
import { setHomework, setHomeworkLoading } from "@redux/actions/homework-actions";
import { setLessonLoading, setLessons, setNextLesson, SetNextLessonAction } from "@redux/actions/lesson-actions";
import { setMarks } from "@redux/actions/marks-actions";
import { setUserIdleState } from "@redux/actions/user-actions";
import { State } from "@redux/reducers/root";
import { UserState } from "@redux/reducers/user-reducer";
import CacheService from "@services/cache-service";
import { getData } from "@services/data-service";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { useQueryParam } from "use-query-params";
import { Lesson } from "../models/lesson";
import { User } from "../models/user";
import { extractTodayLessons } from "./useHomePage";
import useSideMenu from "./useSideMenu";
import { navigate } from "gatsby-link";

export default function useIndexPage() {
    const [tab, setTab] = useQueryParam<TabQuery>("tab");
    const handleTabChanged = (tab: TabQuery) => setTab(tab);
    const user = useSelector<State, UserState>(state => state.userReducer);

    const dispatch = useDispatch();

    // Side menu
    const { lessonsLoading, lessons, onDateChanged, selectedDate } = useSideMenu();

    useEffect(() => {
        getData(
            data => {
                console.log(data.lessons);
                const todayLessons = extractTodayLessons(DateHelper.now, data.lessons);

                // save user
                dispatch(setUserIdleState(data.user));

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
                dispatch(setLessonLoading(false));
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
            lessons,
            lessonsLoading,
            selectedDate,
        },
        handlers: {
            handleTabChanged,
            onDateChanged,
        }
    }
}

const calculateNextLesson = async (lessons: Lesson[], dispatch: Dispatch): Promise<any> => {
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
