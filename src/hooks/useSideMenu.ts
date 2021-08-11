import DateHelper from "@helpers/date-helper";
import { setLessonLoading, setLessons } from "@redux/actions/lesson-actions";
import { State } from "@redux/reducers/root";
import ApiService from "@services/api-service";
import CacheService from "@services/cache-service";
import moment from "moment";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Lesson } from "../models/lesson";
import { extractTodayLessons } from "./useIndexPage";

export default function useSideMenu() {
    const [selectedDate, setSelectedDate] = useState(DateHelper.now);

    const dispatch = useDispatch();

    // Lessons selectors
    const lessons = useSelector<State, Lesson[]>(state => state.lessonReducer.lessons);
    const lessonsLoading = useSelector<State, boolean>(state => state.lessonReducer.loading);

    return {
        lessons,
        lessonsLoading,
        selectedDate,
        onDateChanged: async (date: Date) => {
            setSelectedDate(date);

            // if (moment(date).startOf("isoWeek").format("YYYY-MM-DD")
            //     == moment().startOf("isoWeek").format("YYYY-MM-DD")) return;

            const isSummer = date.getMonth() >= 5 && date.getMonth() <= 7;
            if (isSummer) return dispatch(setLessons([]));

            const cachedSchedule = CacheService.getScheduleAt(date);

            // Calculation start and end of the week
            const now = moment(date);
            const from = now.startOf("isoWeek").toDate();
            const to = now.endOf("isoWeek").toDate();

            if (!cachedSchedule) {
                // show loading state
                dispatch(setLessonLoading(true));

                // Fetching lessons
                const lessons = await ApiService.getLessons(from, to);

                // Saving lessons in redux store
                dispatch(setLessons(extractTodayLessons(date, lessons)));

                // Caching lessons
                CacheService.setWeekSchedule(lessons, from);

                // show normal state view
                dispatch(setLessonLoading(false));
            } else {
                // Get lessons from cache and save in redux store
                dispatch(setLessons(cachedSchedule));
            }

        },
    }
}
